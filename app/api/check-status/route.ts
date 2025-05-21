import { NextResponse } from 'next/server';
import sql from '@/app/lib/db';

export async function GET() {
  try {
    const measurements = await sql`
      SELECT 
        m.id,
        meta.filename,
        meta.description,
        meta.status
      FROM measurements m
      LEFT JOIN metadata meta ON m.id = meta.measurement_id
      ORDER BY m.created_at DESC;
    `;

    const counts = await sql`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'validiert' THEN 1 END) as validated,
        COUNT(CASE WHEN status = 'offen' THEN 1 END) as open
      FROM metadata;
    `;
    
    return NextResponse.json({
      counts: counts[0],
      measurements
    }, { 
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error checking status:', error);
    return NextResponse.json(
      { error: 'Status check failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
