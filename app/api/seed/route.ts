// Importiere benötigte Module für Dateisystem-Operationen und API-Handling
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import sql from '@/app/lib/db';

export async function GET() {
  try {
    console.log('Starte das Einlesen der Testdaten...');
    
    // Prüfe zunächst, ob das Datenbankschema bereits existiert
    // Suche in den Systeminformationen nach der 'measurements' Tabelle
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'measurements'
      );
    `;
    console.log('Prüfung auf existierende Tabelle:', tableExists[0]?.exists);
    
    // Falls das Schema noch nicht existiert, initialisiere es
    if (!tableExists[0]?.exists) {
      // Lade das SQL-Schema aus der Datei
      const schemaPath = path.join(process.cwd(), 'app', 'lib', 'schema.sql');
      const schemaScript = await fs.readFile(schemaPath, 'utf8');
      console.log('Initialisiere Datenbankschema...');
      await sql.unsafe(schemaScript);
      console.log('Datenbankschema erfolgreich initialisiert');
    }

    // Lade das SQL-Skript mit den Testdaten
    const seedPath = path.join(process.cwd(), 'app', 'lib', 'seed.sql');
    const seedScript = await fs.readFile(seedPath, 'utf8');
    console.log('Testdaten-Skript geladen, Länge:', seedScript.length);
    
    // Führe das Testdaten-Skript in einer Transaktion aus
    // Dies stellt sicher, dass entweder alle oder keine Daten eingefügt werden
    console.log('Starte Transaktion...');
    await sql.begin(async (sql) => {
      console.log('Füge erste Messung ein...');
      await sql.unsafe(seedScript);
      console.log('Testdaten erfolgreich eingefügt');
    });
    
    // Überprüfe die eingefügten Daten durch Abfrage der Statistiken
    const status = await sql`
      SELECT 
        -- Zähle alle Messungen
        (SELECT COUNT(*) FROM measurements) as total_measurements,
        -- Zähle validierte Messungen
        (SELECT COUNT(*) FROM metadata WHERE status = 'validiert') as validated_count,
        -- Zähle offene Messungen
        (SELECT COUNT(*) FROM metadata WHERE status = 'offen') as open_count,
        -- Erstelle ein Array mit Details zu allen Messungen
        array_agg(row_to_json(m)) as measurement_details
      FROM (
        -- Hole ID, Status und Dateiname jeder Messung
        SELECT m.id, meta.status, meta.filename
        FROM measurements m
        LEFT JOIN metadata meta ON m.id = meta.measurement_id
        ORDER BY m.created_at DESC
      ) m;
    `;
    
    console.log('Überprüfung der Testdaten:', status[0]);
    // Sende erfolgreiche Antwort mit Statistiken
    return NextResponse.json({ 
      message: 'Testdaten erfolgreich eingefügt',
      status: status[0]
    });
  } catch (error) {
    // Im Fehlerfall: Protokolliere den Fehler und sende Fehlermeldung
    console.error('Fehlerdetails:', error);
    return NextResponse.json(
      { error: 'Fehler beim Einfügen der Testdaten', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
