// API-Route zur Erstellung von Datenbankindizes für Leistungsoptimierung
import sql from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Führe alle Index-Erstellungen in einer Transaktion aus
        // Dies stellt sicher, dass entweder alle oder keine Indizes erstellt werden
        await sql.begin(async (sql) => {
            // Erstelle Index für measurement_id in der metadata Tabelle
            // Beschleunigt JOIN-Operationen zwischen measurements und metadata
            await sql`
                CREATE INDEX IF NOT EXISTS idx_metadata_measurement_id 
                ON metadata(measurement_id);
            `;

            // Erstelle Index für den Status in der metadata Tabelle
            // Optimiert Abfragen nach validierten/offenen Messungen
            await sql`
                CREATE INDEX IF NOT EXISTS idx_metadata_status 
                ON metadata(status);
            `;

            // Erstelle Index für measurement_id in der measurement_channels Tabelle
            // Beschleunigt Abfragen von Kanälen zu einer bestimmten Messung
            await sql`
                CREATE INDEX IF NOT EXISTS idx_measurement_channels_measurement_id 
                ON measurement_channels(measurement_id);
            `;

            // Erstelle Index für measurement_id in der measurement_values Tabelle
            // Beschleunigt Abfragen von Messwerten zu einer bestimmten Messung
            await sql`
                CREATE INDEX IF NOT EXISTS idx_measurement_values_measurement_id 
                ON measurement_values(measurement_id);
            `;

            // Erstelle Index für channel_id in der measurement_values Tabelle
            // Optimiert Abfragen von Messwerten für einen bestimmten Kanal
            await sql`
                CREATE INDEX IF NOT EXISTS idx_measurement_values_channel_id 
                ON measurement_values(channel_id);
            `;
        });

        // Sende Erfolgsmeldung zurück
        return NextResponse.json({
            message: 'Datenbankindizes erfolgreich erstellt'
        });
    } catch (error) {
        // Im Fehlerfall: Protokolliere den Fehler und sende eine Fehlermeldung
        console.error('Fehler beim Erstellen der Indizes:', error);
        return NextResponse.json(
            { error: 'Indizes konnten nicht erstellt werden', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
