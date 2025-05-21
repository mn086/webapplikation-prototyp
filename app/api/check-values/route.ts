import { NextResponse } from 'next/server';
import sql from '@/app/lib/db';

export async function GET() {
  try {
    const data = await sql`
      WITH MeasurementDetails AS (
        SELECT 
          m.id,
          meta.filename,
          meta.status,
          json_agg(
            json_build_object(
              'channel_name', mc.channel_name,
              'unit', mc.unit,
              'values', (
                SELECT json_agg(
                  json_build_object(
                    'seconds', mv.seconds_from_start,
                    'value', mv.value
                  ) ORDER BY mv.seconds_from_start
                )
                FROM measurement_values mv
                WHERE mv.channel_id = mc.id
              )
            ) ORDER BY mc.channel_name
          ) as channels
        FROM measurements m
        JOIN metadata meta ON m.id = meta.measurement_id
        JOIN measurement_channels mc ON m.id = mc.measurement_id
        GROUP BY m.id, meta.filename, meta.status
      )
      SELECT json_agg(
        json_build_object(
          'id', id,
          'filename', filename,
          'status', status,
          'channels', channels
        )
      ) as measurements
      FROM MeasurementDetails;
    `;
    
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error fetching measurement values:', error);
    return NextResponse.json(
      { error: 'Failed to fetch measurement values', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
