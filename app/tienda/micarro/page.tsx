"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus, ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import { useCart } from '@/utils/hooks/useCart';

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    alert('Funcionalidad de checkout en desarrollo');
  };

  const handleContinueShopping = () => {
    // Navigate back to store
    window.history.back();
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4 md:py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#350D70] mb-1 md:mb-2">Mi Carrito</h1>
                <p className="text-sm md:text-base text-gray-600">Gestiona tus productos seleccionados</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8 md:py-12">
            <ShoppingCart className="h-16 w-16 md:h-24 md:w-24 text-gray-300 mx-auto mb-4 md:mb-6" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Tu carrito está vacío</h2>
            <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">No tienes productos en tu carrito de compras</p>
            <Link href="/tienda">
              <Button className="bg-[#350D70] hover:bg-[#2a0a5a] text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base">
                <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#350D70] mb-1 md:mb-2">Mi Carrito</h1>
              <p className="text-sm md:text-base text-gray-600">
                {state.itemCount} {state.itemCount === 1 ? 'producto' : 'productos'} en tu carrito
              </p>
            </div>
            <Button
              onClick={clearCart}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50 text-sm md:text-base"
            >
              <Trash2 className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Vaciar Carrito</span>
              <span className="sm:hidden">Vaciar</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Productos en el carrito</h2>
              
              <div className="space-y-3 md:space-y-4">
                {state.items.map((item) => (
                  <div key={item.product.id} className="border border-gray-200 rounded-lg p-3 md:p-4">
                    {/* Mobile Layout */}
                    <div className="block sm:hidden">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.product.image || `https://picsum.photos/100/100?random=${item.product.code}`}
                            alt={item.product.description}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                            {item.product.description}
                          </h3>
                          <p className="text-xs text-gray-500 mb-1">
                            Código: {item.product.code}
                          </p>
                          <p className="text-xs text-gray-500 mb-1">
                            Categoría: {item.product.category}
                          </p>
                          <p className="text-xs text-blue-600 mb-2">
                            Marca: {item.product.brand}
                          </p>
                          <p className="text-sm font-bold text-[#350D70]">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        
                        <Button
                          onClick={() => removeItem(item.product.id)}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700 flex-shrink-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <p className="text-xs text-gray-500">
                          ${item.product.price.toFixed(2)} c/u
                        </p>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:flex items-center gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.product.image || `https://picsum.photos/100/100?random=${item.product.code}`}
                          alt={item.product.description}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {item.product.description}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Código: {item.product.code}
                        </p>
                        <p className="text-sm text-gray-500">
                          Categoría: {item.product.category}
                        </p>
                        <p className="text-sm text-blue-600">
                          Marca: {item.product.brand}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-medium w-12 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#350D70]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item.product.price.toFixed(2)} c/u
                        </p>
                      </div>
                      
                      <Button
                        onClick={() => removeItem(item.product.id)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 sticky top-8">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Resumen del pedido</h2>
              
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="flex justify-between">
                  <span className="text-sm md:text-base text-gray-600">Subtotal ({state.itemCount} items):</span>
                  <span className="text-sm md:text-base font-medium">${state.total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm md:text-base text-gray-600">Envío:</span>
                  <span className="text-sm md:text-base text-green-600 font-medium">Gratis</span>
                </div>
                
                <div className="border-t pt-3 md:pt-4">
                  <div className="flex justify-between">
                    <span className="text-base md:text-lg font-semibold">Total:</span>
                    <span className="text-xl md:text-2xl font-bold text-[#350D70]">
                      ${state.total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    Incluye impuestos aplicables
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 md:space-y-3">
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-[#350D70] hover:bg-[#2a0a5a] text-white py-2 md:py-3 text-sm md:text-lg"
                >
                  Finalizar Compra
                </Button>
                
                <Button
                  onClick={handleContinueShopping}
                  variant="outline"
                  className="w-full border-[#350D70] text-[#350D70] hover:bg-[#350D70] hover:text-white py-2 md:py-3 text-sm md:text-base"
                >
                  <ArrowLeft className="h-4 w-4 mr-1 md:mr-2" />
                  Continuar Comprando
                </Button>
              </div>
              
              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2 text-sm md:text-base">Información adicional</h3>
                <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                  <li>• Envío gratis en pedidos superiores a $50</li>
                  <li>• Garantía de 1 año en todos los productos</li>
                  <li>• Devolución gratuita hasta 30 días</li>
                  <li>• Soporte técnico especializado</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

