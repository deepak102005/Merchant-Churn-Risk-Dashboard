import { NextResponse } from 'next/server';
import { db } from '@/lib/mockDb';

export async function GET() {
  const merchants = db.merchants.findMany();
  
  // Create a simple CSV
  const header = Object.keys(merchants[0] || {}).join(',') + '\n';
  const rows = merchants.map(m => Object.values(m).join(',')).join('\n');
  const csv = header + rows;

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="merchants_export.csv"',
    },
  });
}
