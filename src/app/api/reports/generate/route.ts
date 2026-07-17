import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { reportType } = await req.json();
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return NextResponse.json({ success: true, message: `Report "${reportType}" generated successfully`, url: '#' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 400 });
  }
}
