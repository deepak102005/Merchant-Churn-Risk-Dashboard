import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { merchantId, message } = await req.json();
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return NextResponse.json({ success: true, message: `Email sent to ${merchantId}` });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 400 });
  }
}
