import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import claidService from '@/utils/claidService';

export interface Product {
  id: string;
  code: string;
  description: string;
  price: number;
  tax: number;
  category: string;
  brand: string;
  stock: number;
  image?: string;
  images?: string[];
}

// Parse XML data and extract products
function parseProductsXML(): Product[] {
  try {
    const xmlPath = path.join(process.cwd(), 'data', 'products.xml');
    const xmlContent = fs.readFileSync(xmlPath, 'utf-8');
    
    // Extract rows from XML - look for Row tags
    const rowMatches = xmlContent.match(/<Row[^>]*>[\s\S]*?<\/Row>/g);
    if (!rowMatches) return [];

    const products: Product[] = [];
    
    rowMatches.forEach((row, index) => {
      // Skip header row and rows without enough data
      if (index === 0) return;
      
      // Extract cell data - look for Data tags within Cell tags
      const cellMatches = row.match(/<Cell[^>]*>[\s\S]*?<\/Cell>/g);
      if (!cellMatches || cellMatches.length < 6) return;
      
      const cells = cellMatches.map(cell => {
        const dataMatch = cell.match(/<Data[^>]*>(.*?)<\/Data>/);
        return dataMatch ? dataMatch[1].trim() : '';
      });
      
      // Map cells to product properties based on the XML structure we saw
      // [code, description, price, tax, grupoId, grupoName, ...]
      const [code, description, price, tax, , grupoName] = cells; // grupoId unused, replaced with empty slot
      
      if (code && description && price && !isNaN(parseFloat(price))) {
        // Extract brand from description (common patterns)
        let brand = 'Sin marca';
        const descriptionLower = description.toLowerCase();
        
        // Common brand patterns in tech products
        if (descriptionLower.includes('aruba') || descriptionLower.includes('hpe')) {
          brand = 'Hewlett Packard Enterprise';
        } else if (descriptionLower.includes('delta')) {
          brand = 'Delta';
        } else if (descriptionLower.includes('uvc') || descriptionLower.includes('uv-c')) {
          brand = 'UVC';
        } else if (descriptionLower.includes('helerman') || descriptionLower.includes('tyton')) {
          brand = 'Helerman Tyton';
        } else {
          // Try to extract brand from the beginning of description
          const brandMatch = description.match(/^([A-Z][A-Za-z\s]+?)(?:\s|$)/);
          if (brandMatch && brandMatch[1].length > 2) {
            brand = brandMatch[1].trim();
          }
        }
        
        const product: Product = {
          id: code,
          code,
          description: description
            .replace(/ó/g, 'ó')
            .replace(/á/g, 'á')
            .replace(/é/g, 'é')
            .replace(/í/g, 'í')
            .replace(/ú/g, 'ú')
            .replace(/ñ/g, 'ñ'), // Fix encoding issues
          price: parseFloat(price) || 0,
          tax: parseFloat(tax) || 0,
          category: grupoName || 'Sin categoría',
          brand: brand,
          stock: parseInt(cells[8] || '0') || 0, // LUG_Disponible
          image: `https://picsum.photos/400/300?random=${code}`, // Placeholder image
          images: [
            `https://picsum.photos/600/600?random=${code}`,
            `https://picsum.photos/600/600?random=${code}1`,
            `https://picsum.photos/600/600?random=${code}2`
          ]
        };
        
        // Only add products with valid data
        if (product.price > 0 && product.description.length > 0) {
          products.push(product);
        }
      }
    });
    
    return products;
  } catch (error) {
    console.error('Error parsing products XML:', error);
    // Return some sample products for development
    return [
      {
        id: '1',
        code: 'ACC001',
        description: 'Adaptador AC 65W Delta ADP-65JH DB',
        price: 37.00,
        tax: 21,
        category: 'Accesorios',
        brand: 'Delta',
        stock: 15,
        image: 'https://picsum.photos/400/300?random=1',
        images: [
          'https://picsum.photos/600/600?random=1',
          'https://picsum.photos/600/600?random=11',
          'https://picsum.photos/600/600?random=12'
        ]
      },
      {
        id: '2',
        code: 'ACC002',
        description: 'Accesorio Ángulo Externo Móvil 70/105°X25U',
        price: 6.38,
        tax: 21,
        category: 'Accesorios',
        brand: 'Helerman Tyton',
        stock: 38,
        image: 'https://picsum.photos/400/300?random=2',
        images: [
          'https://picsum.photos/600/600?random=2',
          'https://picsum.photos/600/600?random=21',
          'https://picsum.photos/600/600?random=22'
        ]
      },
      {
        id: '3',
        code: 'NET001',
        description: 'Access Point Aruba AP-505 WiFi6 (RW) Unified HPE',
        price: 515.86,
        tax: 11,
        category: 'Redes',
        brand: 'Hewlett Packard Enterprise',
        stock: 26,
        image: 'https://picsum.photos/400/300?random=3',
        images: [
          'https://picsum.photos/600/600?random=3',
          'https://picsum.photos/600/600?random=31',
          'https://picsum.photos/600/600?random=32'
        ]
      },
      {
        id: '4',
        code: 'NET002',
        description: 'Access Point Aruba Instant On AP11 (RW) HPE',
        price: 85.24,
        tax: 11,
        category: 'Redes',
        brand: 'Hewlett Packard Enterprise',
        stock: 12,
        image: 'https://picsum.photos/400/300?random=4',
        images: [
          'https://picsum.photos/600/600?random=4',
          'https://picsum.photos/600/600?random=41',
          'https://picsum.photos/600/600?random=42'
        ]
      },
      {
        id: '5',
        code: 'SEC001',
        description: 'UVC Etiqueta Control Radiación UV-C X100U',
        price: 51.66,
        tax: 21,
        category: 'Seguridad',
        brand: 'UVC',
        stock: 8,
        image: 'https://picsum.photos/400/300?random=5',
        images: [
          'https://picsum.photos/600/600?random=5',
          'https://picsum.photos/600/600?random=51',
          'https://picsum.photos/600/600?random=52'
        ]
      }
    ];
  }
}

// Generate images for products using Claid AI
async function generateProductImages(products: Product[]): Promise<Product[]> {
  const productsWithImages = await Promise.all(
    products.map(async (product) => {
      try {
        // Generate main product image
        const mainImage = await claidService.generateProductImage(
          product.description,
          product.code
        );
        
        // Generate multiple product views
        const productViews = await claidService.generateProductViews(
          product.description,
          product.code
        );
        
        return {
          ...product,
          image: mainImage,
          images: productViews
        };
      } catch (error) {
        console.error(`Error generating images for product ${product.code}:`, error);
        // Return product with placeholder images if generation fails
        return {
          ...product,
          image: `https://picsum.photos/800/800?random=${product.code}`,
          images: [
            `https://picsum.photos/600/600?random=${product.code}`,
            `https://picsum.photos/600/600?random=${product.code}1`,
            `https://picsum.photos/600/600?random=${product.code}2`
          ]
        };
      }
    })
  );
  
  return productsWithImages;
}

export async function GET() {
  try {
    const products = parseProductsXML();
    
    // Check if we should generate images (only for first 10 products to avoid rate limits)
    const shouldGenerateImages = process.env.NODE_ENV === 'development' && products.length <= 10;
    
    let finalProducts = products;
    if (shouldGenerateImages) {
      console.log('Generating product images with Claid AI...');
      finalProducts = await generateProductImages(products);
    }
    
    return NextResponse.json(finalProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

