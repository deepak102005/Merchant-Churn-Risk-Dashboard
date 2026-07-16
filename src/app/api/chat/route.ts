import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    // Log the incoming message
    console.log('Received chat message:', message)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simple simulated AI logic
    let reply = "I'm a simulated AI assistant. I received your message: " + message
    
    if (message.toLowerCase().includes('churn')) {
      reply = "Churn risk is currently low. Merchants showing decreased login frequency over the past 7 days have been flagged for review."
    } else if (message.toLowerCase().includes('merchant')) {
      reply = "Which merchant are you asking about? I can provide their recent transaction history and churn risk score."
    } else if (message.toLowerCase().includes('help')) {
      reply = "I can help you analyze merchant data, draft support emails, or identify churn risks. Just ask!"
    }

    return NextResponse.json({ message: reply })
  } catch (error) {
    console.error('Error in chat route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
