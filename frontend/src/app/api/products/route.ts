import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/square';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const products = await getAllProducts();
    
    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error('Error in /api/products:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch products' 
      },
      { status: 500 }
    );
  }
}
