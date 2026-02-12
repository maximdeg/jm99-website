"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/lib/products';
import { useCart } from '@/utils/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link href={`/tienda/producto/${product.id}`} className="block">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer h-full flex flex-col">
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <Image
            src={product.image || `https://picsum.photos/400/300?random=${product.code}`}
            alt={product.description}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
        </div>
        
        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          <div className="mb-2 flex flex-wrap gap-1">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.category}
            </span>
            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              {product.brand}
            </span>
          </div>
          
          <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 line-clamp-2 flex-1">
            {product.description}
          </h3>
          
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            Código: {product.code}
          </p>
          
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <span className="text-lg sm:text-2xl font-bold text-[#350D70]">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2">
                + IVA {product.tax}%
              </span>
            </div>
            
            <div className="text-xs sm:text-sm text-gray-600">
              Stock: {product.stock}
            </div>
          </div>
          
          <div className="flex gap-2 mt-auto">
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-[#350D70] hover:bg-[#2a0a5a] text-white text-xs sm:text-sm py-2"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              {product.stock === 0 ? 'Sin stock' : 'Agregar'}
            </Button>
            
            <Button
              variant="outline"
              className="border-[#350D70] text-[#350D70] hover:bg-[#350D70] hover:text-white px-2 sm:px-3"
            >
              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

