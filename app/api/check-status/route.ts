// API-Route zur Überprüfung des Validierungsstatus aller Messungen
import { NextResponse } from 'next/server';
import sql from '@/app/lib/db';

export async function GET() {
  try {
    // Hole alle Messungen mit ihren Metadaten, sortiert nach Erstellungsdatum
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

    // Berechne Statistiken über die Validierungsstatus
    // - Gesamtanzahl der Messungen
    // - Anzahl der validierten Messungen
    // - Anzahl der offenen (nicht validierten) Messungen
    const counts = await sql`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'validiert' THEN 1 END) as validated,
        COUNT(CASE WHEN status = 'offen' THEN 1 END) as open
      FROM metadata;
    `;
    
    // Sende die Ergebnisse als JSON-Response
    return NextResponse.json({
      counts: counts[0],
      measurements
    }, { 
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Im Fehlerfall: Protokolliere den Fehler und sende eine Fehlermeldung
    console.error('Fehler bei der Statusprüfung:', error);
    return NextResponse.json(
      { error: 'Statusprüfung fehlgeschlagen', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
