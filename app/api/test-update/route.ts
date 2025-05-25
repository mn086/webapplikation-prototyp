// API-Route zum Testen der Datenbank-Update-Funktionalität
// Führt eine Reihe von Tests durch, um die korrekte Funktionsweise von
// INSERT- und UPDATE-Operationen in der Datenbank zu überprüfen
import sql from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // 1. Überprüfe zunächst die vorhandenen Tabellen in der Datenbank
        // Dies stellt sicher, dass die erforderlichen Tabellen existieren
        const tables = await sql`
            SELECT tablename 
            FROM pg_catalog.pg_tables 
            WHERE schemaname = 'public';
        `;
        console.log('Vorhandene Tabellen:', tables);

        // 2. Erstelle einen neuen Messdatensatz
        // Verwendet DEFAULT VALUES, da die Tabelle automatisch Zeitstempel setzt
        const measurement = await sql`
            INSERT INTO measurements DEFAULT VALUES
            RETURNING id;
        `;
        const measurementId = measurement[0].id;

        // 3. Füge zugehörige Metadaten zur Messung hinzu
        // Erstellt einen initialen Datensatz mit Status 'offen'
        const metadata = await sql`
            INSERT INTO metadata (measurement_id, filename, description, status)
            VALUES (${measurementId}, 'test.csv', 'Test Beschreibung', 'offen')
            RETURNING *;
        `;

        // 4. Aktualisiere die Metadaten
        // Simuliert einen typischen Workflow, bei dem Metadaten nach der Validierung aktualisiert werden
        const updatedMetadata = await sql`
            UPDATE metadata
            SET filename = 'updated.csv',
                description = 'Aktualisierte Beschreibung',
                status = 'validiert'
            WHERE measurement_id = ${measurementId}
            RETURNING *;
        `;

        // Sende die Ergebnisse aller Testschritte zurück
        return NextResponse.json({
            tables,
            measurement,
            metadata,
            updatedMetadata
        });
    } catch (error) {
        // Im Fehlerfall: Protokolliere den Fehler und sende eine Fehlermeldung
        console.error('Test-Update fehlgeschlagen:', error);
        return NextResponse.json(
            { error: 'Test-Update fehlgeschlagen', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
