import { NextRequest, NextResponse } from 'next/server';
import claidService from '@/utils/claidService';

export async function POST(request: NextRequest) {
  try {
    const { productCode, productDescription } = await request.json();

    if (!productCode || !productDescription) {
      return NextResponse.json(
        { error: 'Product code and description are required' },
        { status: 400 }
      );
    }

    // Generate main product image
    const mainImage = await claidService.generateProductImage(
      productDescription,
      productCode
    );

    // Generate multiple product views
    const productViews = await claidService.generateProductViews(
      productDescription,
      productCode
    );

    return NextResponse.json({
      success: true,
      mainImage,
      productViews,
      productCode,
      productDescription
    });

  } catch (error) {
    console.error('Error generating images:', error);
    return NextResponse.json(
      { error: 'Failed to generate images' },
      { status: 500 }
    );
  }
}
