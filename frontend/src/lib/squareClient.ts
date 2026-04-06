import { SquareClient, SquareEnvironment } from 'square'

let client: SquareClient | null = null

export function getSquareClient(): SquareClient {
  if (client) {
    return client
  }

  const token = process.env.SQUARE_ACCESS_TOKEN

  if (!token) {
    throw new Error('Missing required env variable: SQUARE_ACCESS_TOKEN')
  }

  const environment = process.env.SQUARE_ENVIRONMENT === 'production'
    ? SquareEnvironment.Production
    : SquareEnvironment.Sandbox

  client = new SquareClient({
    token,
    environment
  })

  return client
}