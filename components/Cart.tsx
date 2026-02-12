"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/utils/hooks/useCart';

const Cart: React.FC = () => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    alert('Funcionalidad de checkout en desarrollo');
  };

  return (
    <div className="relative">
      {/* Cart Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-[#350D70] hover:bg-[#2a0a5a] text-white"
      >
        <ShoppingCart className="h-5 w-5" />
        {state.itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {state.itemCount}
          </span>
        )}
      </Button>

      {/* Cart Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Carrito ({state.itemCount} items)
              </h3>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {state.items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Tu carrito está vacío</p>
              </div>
            ) : (
              <>
                <div className="max-h-64 overflow-y-auto space-y-3 mb-4">
                  {state.items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={item.product.image || `https://picsum.photos/100/100?random=${item.product.code}`}
                          alt={item.product.description}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-800 truncate">
                          {item.product.description}
                        </h4>
                        <p className="text-xs text-gray-500">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-1">
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
                      
                      <Button
                        onClick={() => removeItem(item.product.id)}
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-[#350D70]">
                      ${state.total.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCheckout}
                      className="flex-1 bg-[#350D70] hover:bg-[#2a0a5a] text-white"
                    >
                      Finalizar Compra
                    </Button>
                    <Button
                      onClick={clearCart}
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50"
                    >
                      Vaciar
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Cart;

