// API-Route zur Abfrage aller Messwerte mit zugehörigen Kanal- und Metadaten
import { NextResponse } from 'next/server';
import sql from '@/app/lib/db';

export async function GET() {
  try {
    // Komplexe SQL-Abfrage zur Zusammenstellung aller Messdaten
    const data = await sql`
      -- Temporäre Tabelle für die Zwischenspeicherung der Messdetails
      WITH MeasurementDetails AS (
        SELECT 
          m.id,
          meta.filename,
          meta.status,
          -- Erstelle ein JSON-Array mit allen Kanälen und ihren Messwerten
          json_agg(
            json_build_object(
              'channel_name', mc.channel_name,
              'unit', mc.unit,
              'values', (
                -- Unterabfrage für die Messwerte jedes Kanals
                -- Sortiert nach der Zeitachse (seconds_from_start)
                SELECT json_agg(
                  json_build_object(
                    'seconds', mv.seconds_from_start,
                    'value', mv.value
                  ) ORDER BY mv.seconds_from_start
                )
                FROM measurement_values mv
                WHERE mv.channel_id = mc.id
              )
            ) ORDER BY mc.channel_name  -- Kanäle alphabetisch sortieren
          ) as channels
        FROM measurements m
        JOIN metadata meta ON m.id = meta.measurement_id
        JOIN measurement_channels mc ON m.id = mc.measurement_id
        GROUP BY m.id, meta.filename, meta.status
      )
      -- Erstelle das finale JSON-Objekt mit allen Messungen
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
    
    // Sende das erste (und einzige) Ergebnis als JSON-Response
    return NextResponse.json(data[0]);
  } catch (error) {
    // Im Fehlerfall: Protokolliere den Fehler und sende eine Fehlermeldung
    console.error('Fehler beim Abruf der Messwerte:', error);
    return NextResponse.json(
      { error: 'Abruf der Messwerte fehlgeschlagen', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
