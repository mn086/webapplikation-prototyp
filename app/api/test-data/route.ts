import { NextResponse } from 'next/server';
import sql from '@/app/lib/db';

// Verhindert Caching der API-Route, sodass immer aktuelle Daten geladen werden
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Hole die neueste Messung mit zugehörigen Metadaten, Kanälen und Messwerten
    const data = await sql`
      -- Temporäre Tabelle mit der neuesten Messung
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
        -- Erstelle ein JSON-Array mit allen Kanälen und deren Messwerten
        json_agg(DISTINCT jsonb_build_object(
          'id', mc.id,
          'name', mc.channel_name,
          'unit', mc.unit,
          'values', (
            -- Unterabfrage für die Messwerte jedes Kanals
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
      JOIN measurement_channels mc ON mc.measurement_id = m.id      -- Gruppiere nach allen nicht-aggregierten Spalten
      GROUP BY m.id, m.created_at, md.filename, md.description, md.status;
    `;

    // Sende das erste (und einzige) Ergebnis als JSON-Response
    return NextResponse.json({ data: data[0] });
  } catch (error) {
    // Protokolliere Fehler und sende eine Fehlermeldung zurück
    console.error('Error fetching test data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch test data', 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}
