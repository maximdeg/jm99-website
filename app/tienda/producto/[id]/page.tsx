"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Truck, Shield, RotateCcw, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProductById, getRelatedProducts, Product } from '@/lib/products';
import { useCart } from '@/utils/hooks/useCart';
import ProductCard from '@/components/ProductCard';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      if (params.id) {
        try {
          const productId = Array.isArray(params.id) ? params.id[0] : params.id;
          const foundProduct = await getProductById(productId);
          
          if (foundProduct) {
            setProduct(foundProduct);
            const related = await getRelatedProducts(foundProduct, 4);
            setRelatedProducts(related);
          } else {
            router.push('/tienda');
          }
        } catch (error) {
          console.error('Error loading product:', error);
          router.push('/tienda');
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadProduct();
  }, [params.id, router]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      
      // Show success notification
      setShowAddedNotification(true);
      setTimeout(() => {
        setShowAddedNotification(false);
      }, 3000);
    }
  };

  const nextImage = () => {
    if (product?.images && product.images.length > 0) {
      setSelectedImageIndex((prev) => 
        prev === product.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product?.images && product.images.length > 0) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? product.images!.length - 1 : prev - 1
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#350D70] mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando producto...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
            <Link href="/tienda">
              <Button className="bg-[#350D70] hover:bg-[#2a0a5a]">
                Volver a la tienda
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalWithTax = product.price * (1 + product.tax / 100);
  const productImages = product.images || [product.image || `https://picsum.photos/600/600?random=${product.code}`];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Notification */}
      {showAddedNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <Check className="h-5 w-5" />
          <span>¡Producto agregado al carrito!</span>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/tienda" className="hover:text-[#350D70]">
              Tienda
            </Link>
            <span>/</span>
            <Link href={`/tienda?category=${product.category}`} className="hover:text-[#350D70]">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.description}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image Gallery */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Main Image */}
            <div className="relative h-96 mb-4">
              <Image
                src={productImages[selectedImageIndex]}
                alt={`${product.description} - Vista ${selectedImageIndex + 1}`}
                fill
                className="object-contain rounded-lg"
              />
              
              {/* Navigation Arrows */}
              {productImages.length > 1 && (
                <>
                  <Button
                    onClick={prevImage}
                    variant="ghost"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-md"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    onClick={nextImage}
                    variant="ghost"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-md"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="flex gap-2 justify-center">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-[#350D70] shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.description} - Miniatura ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {product.category}
              </span>
              <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                {product.brand}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.description}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(4.8 - 120 reseñas)</span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-[#350D70]">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${(product.price * 1.15).toFixed(2)}
                </span>
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                  -15%
                </span>
              </div>
              <p className="text-sm text-gray-600">
                + IVA {product.tax}% = ${totalWithTax.toFixed(2)}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Código:</strong> {product.code}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Marca:</strong> {product.brand}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Stock disponible:</strong> {product.stock} unidades
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">Envío gratis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Garantía 1 año</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5 text-orange-600" />
                  <span className="text-sm text-gray-600">Devolución 30 días</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <label className="text-sm font-medium text-gray-700">Cantidad:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    variant="ghost"
                    className="h-8 w-8 p-0"
                  >
                    -
                  </Button>
                  <span className="px-4 py-1 text-center min-w-[3rem]">
                    {quantity}
                  </span>
                  <Button
                    onClick={() => setQuantity(quantity + 1)}
                    variant="ghost"
                    className="h-8 w-8 p-0"
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-[#350D70] hover:bg-[#2a0a5a] text-white py-3 text-lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.stock === 0 ? 'Sin stock' : `Agregar ${quantity} al carrito`}
              </Button>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Descripción del producto</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Este producto de alta calidad ofrece un rendimiento excepcional y durabilidad. 
                Perfecto para uso profesional y personal. Incluye garantía del fabricante y 
                soporte técnico especializado.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
