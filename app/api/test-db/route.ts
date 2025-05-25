// API-Route zum Testen der Datenbankverbindung
import { NextResponse } from 'next/server';
import sql from '@/app/lib/db';

export async function GET() {
  try {
    // Einfache Abfrage um die Datenbankverbindung zu testen
    // Führt "SELECT 1" aus, was bei erfolgreicher Verbindung immer funktioniert
    const result = await sql`SELECT 1 as test;`;
    // Erfolgreiche Antwort mit Testergebnis zurückgeben
    return NextResponse.json({ success: true, result });
  } catch (error) {
    // Bei einem Fehler: Protokolliere den Fehler und sende eine Fehlermeldung
    console.error('Datenbanktest fehlgeschlagen:', error);
    return NextResponse.json(
      { error: 'Datenbanktest fehlgeschlagen', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
