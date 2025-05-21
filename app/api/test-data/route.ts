import { NextResponse } from 'next/server';
import sql from '@/app/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get the most recent measurement with its metadata, channels, and sample values
    const data = await sql`
      WITH latest_measurement AS (
        SELECT id, created_at
        FROM measurements
        ORDER BY created_at DESC
        LIMIT 1
      )
      SELECT
        m.id as measurement_id,
        m.created_at,
        md.filename,
        md.description,
        md.status,
        json_agg(DISTINCT jsonb_build_object(
          'id', mc.id,
          'name', mc.channel_name,
          'unit', mc.unit,
          'values', (
            SELECT json_agg(jsonb_build_object(
              'seconds', mv.seconds_from_start,
              'value', mv.value
            ) ORDER BY mv.seconds_from_start)
            FROM measurement_values mv
            WHERE mv.channel_id = mc.id
          )
        )) as channels
      FROM latest_measurement m
      JOIN metadata md ON md.measurement_id = m.id
      JOIN measurement_channels mc ON mc.measurement_id = m.id
      GROUP BY m.id, m.created_at, md.filename, md.description, md.status;
    `;

    return NextResponse.json({ data: data[0] });
  } catch (error) {
    console.error('Error fetching test data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch test data', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
