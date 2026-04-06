import { NextRequest } from 'next/server'
import { randomUUID } from 'crypto'
import { getSquareClient } from '@/lib/squareClient'

interface CartItemPayload {
  squareVariationId: string
  productName: string
  quantity: number
  price: number // dollars
}

export async function POST(request: NextRequest) {
  try {
    const { sourceId, name, email, cartItems } = await request.json()

    if (!sourceId || !name || !email || !cartItems?.length) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const client = getSquareClient()
    const locationId = process.env.SQUARE_LOCATION_ID!

    // Step 1: Create a Square Order with line items
    const orderResponse = await client.orders.create({
      order: {
        locationId,
        lineItems: (cartItems as CartItemPayload[]).map(item => ({
          catalogObjectId: item.squareVariationId,
          quantity: String(item.quantity),
          basePriceMoney: {
            amount: BigInt(Math.round(item.price * 100)),
            currency: 'CAD',
          },
        })),
        fulfillments: [
          {
            type: 'PICKUP',
            state: 'PROPOSED',
            pickupDetails: {
              recipient: {
                displayName: name,
                emailAddress: email,
              },
              scheduleType: 'ASAP',
            },
          },
        ],
      },
      idempotencyKey: randomUUID(),
    })

    const order = orderResponse.order

    if (!order?.id || !order?.totalMoney?.amount) {
      return Response.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Step 2: Pay the order
    const paymentResponse = await client.payments.create({
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: order.totalMoney.amount,
        currency: 'CAD',
      },
      orderId: order.id,
      locationId,
      buyerEmailAddress: email,
      note: `Online order for ${name}`,
    })

    const payment = paymentResponse.payment

    return Response.json({
      paymentId: payment?.id,
      orderId: order.id,
      status: payment?.status,
      cardLast4: payment?.cardDetails?.card?.last4,
      total: Number(order.totalMoney.amount), // cents
    })
  } catch (error: unknown) {
    console.error('Square payment error:', error)
    const message = error instanceof Error ? error.message : 'Payment failed'
    return Response.json({ error: message }, { status: 500 })
  }
}
