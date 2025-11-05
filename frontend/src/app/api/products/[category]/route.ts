import { NextRequest, NextResponse } from 'next/server';
import { getProductsByCategory } from '@/lib/square';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    const products = await getProductsByCategory(category);
    
    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(`Error in /api/products/${(await params).category}:`, error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch products for category' 
      },
      { status: 500 }
    );
  }
}
