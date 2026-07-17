import { NextResponse } from 'next/server';
import { db } from '@/lib/mockDb';

export async function GET() {
  return NextResponse.json(db.merchants.findMany());
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newMerchant = db.merchants.create(data);
    return NextResponse.json(newMerchant, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create merchant' }, { status: 400 });
  }
}
