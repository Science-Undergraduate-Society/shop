import { NextRequest, NextResponse } from 'next/server';
import { createPaymentLink } from '@/lib/square';
import { CheckoutData } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutData = await request.json();

    // Validate required fields
    if (!body.variantId || !body.customerEmail || !body.customerName) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields' 
        },
        { status: 400 }
      );
    }

    // Validate pickup acknowledgment
    if (!body.acknowledgedPickup) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'You must acknowledge the pickup-only policy' 
        },
        { status: 400 }
      );
    }

    // Create payment link
    const paymentUrl = await createPaymentLink(body.variantId, 1);

    if (!paymentUrl) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to create payment link' 
        },
        { status: 500 }
      );
    }

    // Send confirmation email
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: body.customerEmail,
          customerName: body.customerName,
          productName: body.productName,
          variantName: body.variantName,
          price: body.price,
          paymentUrl,
        }),
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the checkout if email fails
    }

    return NextResponse.json({
      success: true,
      paymentUrl,
      message: 'Checkout created successfully',
    });
  } catch (error) {
    console.error('Error in /api/checkout:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process checkout' 
      },
      { status: 500 }
    );
  }
}
