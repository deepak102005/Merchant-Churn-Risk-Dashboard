import { NextResponse } from 'next/server';
import { db } from '@/lib/mockDb';

export async function POST() {
  const result = db.notifications.markAllRead();
  return NextResponse.json(result);
}
