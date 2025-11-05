import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, customerName, productName, variantName, price, paymentUrl } = body;

    // Validate required fields
    if (!to || !customerName || !productName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || 'https://calendly.com/susubc/pickup';
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              background: #667eea;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
              font-weight: bold;
            }
            .order-details {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #667eea;
            }
            .warning {
              background: #fff3cd;
              border: 1px solid #ffc107;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              color: #666;
              font-size: 12px;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎉 Order Initiated!</h1>
            <p>Science Undergraduate Society - UBC</p>
          </div>
          
          <div class="content">
            <h2>Hi ${customerName}! 👋</h2>
            
            <p>Thank you for your interest in purchasing from the SUS UBC Shop! Your order has been initiated.</p>
            
            <div class="order-details">
              <h3>📦 Order Details</h3>
              <p><strong>Product:</strong> ${productName}</p>
              ${variantName ? `<p><strong>Variant:</strong> ${variantName}</p>` : ''}
              ${price ? `<p><strong>Price:</strong> $${price.toFixed(2)} CAD (taxes included)</p>` : ''}
            </div>

            ${paymentUrl ? `
              <div style="text-align: center;">
                <a href="${paymentUrl}" class="button">Complete Payment</a>
              </div>
            ` : ''}

            <div class="warning">
              <h3>⚠️ IMPORTANT: Pickup Only</h3>
              <p><strong>This is a pickup-only order.</strong> We do not ship items.</p>
              <p>After your payment is confirmed, you will receive a separate email with a link to book your pickup time.</p>
              <p>You can also book your pickup time here:</p>
              <a href="${bookingUrl}" style="color: #667eea; font-weight: bold;">${bookingUrl}</a>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>📍 Pickup Location</h3>
              <p><strong>SUS Office</strong><br>
              Life Sciences Centre, Room 2242<br>
              2350 Health Sciences Mall<br>
              Vancouver, BC V6T 1Z3</p>
            </div>

            <p>If you have any questions, please contact us at <a href="mailto:${process.env.EMAIL_TO_ADMIN}">${process.env.EMAIL_TO_ADMIN}</a></p>

            <p>Thank you for supporting SUS UBC!</p>
          </div>

          <div class="footer">
            <p>Science Undergraduate Society<br>
            University of British Columbia<br>
            <a href="https://susubc.ca">susubc.ca</a></p>
          </div>
        </body>
      </html>
    `;

    const textContent = `
Hi ${customerName}!

Thank you for your interest in purchasing from the SUS UBC Shop! Your order has been initiated.

ORDER DETAILS
Product: ${productName}
${variantName ? `Variant: ${variantName}` : ''}
${price ? `Price: $${price.toFixed(2)} CAD (taxes included)` : ''}

${paymentUrl ? `Complete your payment: ${paymentUrl}` : ''}

⚠️ IMPORTANT: PICKUP ONLY
This is a pickup-only order. We do not ship items.
After your payment is confirmed, you will receive a separate email with a link to book your pickup time.

Book your pickup time: ${bookingUrl}

PICKUP LOCATION
SUS Office
Life Sciences Centre, Room 2242
2350 Health Sciences Mall
Vancouver, BC V6T 1Z3

If you have any questions, please contact us at ${process.env.EMAIL_TO_ADMIN}

Thank you for supporting SUS UBC!
    `;

    // Send email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: to,
      subject: 'SUS UBC Shop - Order Initiated (Pickup Only)',
      text: textContent,
      html: htmlContent,
    });

    // Send notification to admin
    if (process.env.EMAIL_TO_ADMIN) {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO_ADMIN,
        subject: `New Order: ${productName}`,
        text: `
New order initiated:

Customer: ${customerName}
Email: ${to}
Product: ${productName}
${variantName ? `Variant: ${variantName}` : ''}
${price ? `Price: $${price.toFixed(2)} CAD` : ''}
${paymentUrl ? `Payment URL: ${paymentUrl}` : ''}
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
