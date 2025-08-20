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
  images?: string[]; // Array of multiple product views
}

// Cache products to avoid fetching on every request
let cachedProducts: Product[] | null = null;

export async function getProducts(): Promise<Product[]> {
  if (!cachedProducts) {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      cachedProducts = await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      // Return sample products as fallback
      cachedProducts = [
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
  return cachedProducts || [];
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getProducts();
  const searchTerm = query.toLowerCase();
  
  return products.filter(product => 
    product.description.toLowerCase().includes(searchTerm) ||
    product.code.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm)
  );
}

export function filterProductsByPrice(products: Product[], sortBy: 'low-to-high' | 'high-to-low'): Product[] {
  return [...products].sort((a, b) => {
    if (sortBy === 'low-to-high') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find(product => product.id === id);
}

export async function getRelatedProducts(currentProduct: Product, limit: number = 4): Promise<Product[]> {
  const products = await getProducts();
  return products
    .filter(product => 
      product.id !== currentProduct.id && 
      product.category === currentProduct.category
    )
    .slice(0, limit);
}

export async function getCategories(): Promise<string[]> {
  const products = await getProducts();
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories).sort();
}

export async function getBrands(): Promise<string[]> {
  const products = await getProducts();
  const brands = new Set(products.map(product => product.brand));
  return Array.from(brands).sort();
}
