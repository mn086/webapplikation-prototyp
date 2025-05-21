import { NextResponse } from 'next/server';
import sql from '@/app/lib/db';

export async function GET() {
  try {
    // Simple query to test database connection
    const result = await sql`SELECT 1 as test;`;
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { error: 'Database test failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
