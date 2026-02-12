"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Download, Loader2 } from 'lucide-react';

export default function GenerateImagesPage() {
  const [productCode, setProductCode] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<{
    mainImage: string;
    productViews: string[];
  } | null>(null);
  const [error, setError] = useState('');

  const handleGenerateImages = async () => {
    if (!productCode.trim() || !productDescription.trim()) {
      setError('Please fill in both product code and description');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedImages(null);

    try {
      const response = await fetch('/api/generate-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productCode: productCode.trim(),
          productDescription: productDescription.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate images');
      }

      setGeneratedImages({
        mainImage: data.mainImage,
        productViews: data.productViews,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h1 className="text-3xl font-bold text-[#350D70] mb-2">
              Generar Imágenes de Productos
            </h1>
            <p className="text-gray-600 mb-6">
              Utiliza Claid AI para generar imágenes profesionales de productos con fondo blanco.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código del Producto
                </label>
                <Input
                  type="text"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  placeholder="Ej: ACC001"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción del Producto
                </label>
                <Textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Describe el producto detalladamente para generar imágenes precisas..."
                  rows={4}
                  className="w-full"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <Button
                onClick={handleGenerateImages}
                disabled={isGenerating}
                className="w-full bg-[#350D70] hover:bg-[#2a0a5a] text-white"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generando imágenes...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generar Imágenes
                  </>
                )}
              </Button>
            </div>
          </div>

          {generatedImages && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Imágenes Generadas
              </h2>

              {/* Main Image */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Imagen Principal
                </h3>
                <div className="relative">
                  <Image
                    src={generatedImages.mainImage}
                    alt="Imagen principal del producto"
                    width={400}
                    height={400}
                    className="w-full max-w-md h-auto rounded-lg shadow-md"
                  />
                  <Button
                    onClick={() => downloadImage(generatedImages.mainImage, `${productCode}_main.jpg`)}
                    variant="outline"
                    className="absolute top-2 right-2"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Product Views */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Vistas del Producto
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {generatedImages.productViews.map((image, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={image}
                        alt={`Vista ${index + 1} del producto`}
                        width={300}
                        height={300}
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                      <Button
                        onClick={() => downloadImage(image, `${productCode}_view_${index + 1}.jpg`)}
                        variant="outline"
                        className="absolute top-2 right-2"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Información de las Imágenes</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Imagen principal: 800x800px con fondo blanco</li>
                  <li>• Vistas del producto: 600x600px cada una</li>
                  <li>• Todas las imágenes tienen fondo blanco profesional</li>
                  <li>• Optimizadas para e-commerce</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
