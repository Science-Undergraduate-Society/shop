import { NextRequest } from 'next/server'
import { randomUUID } from 'crypto'
import { getSquareClient } from '@/lib/squareClient'

export async function POST(request: NextRequest) {
  try {
    const { sourceId, name, email, amount } = await request.json()

    if (!sourceId || !name || !email || !amount) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const client = getSquareClient()

    const response = await client.payments.create({
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: BigInt(amount),
        currency: 'CAD',
      },
      locationId: process.env.SQUARE_LOCATION_ID,
      buyerEmailAddress: email,
      note: `Online order for ${name}`,
    })

    const payment = response.payment

    return Response.json({
      paymentId: payment?.id,
      status: payment?.status,
      cardLast4: payment?.cardDetails?.card?.last4,
    })
  } catch (error: unknown) {
    console.error('Square payment error:', error)
    const message = error instanceof Error ? error.message : 'Payment failed'
    return Response.json({ error: message }, { status: 500 })
  }
}
