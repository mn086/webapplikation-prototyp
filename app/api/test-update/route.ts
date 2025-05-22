import sql from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // 1. Überprüfe vorhandene Tabellen
        const tables = await sql`
            SELECT tablename 
            FROM pg_catalog.pg_tables 
            WHERE schemaname = 'public';
        `;
        console.log('Vorhandene Tabellen:', tables);

        // 2. Erstelle eine Test-Messung
        const measurement = await sql`
            INSERT INTO measurements DEFAULT VALUES
            RETURNING id;
        `;
        const measurementId = measurement[0].id;

        // 3. Füge Metadaten hinzu
        const metadata = await sql`
            INSERT INTO metadata (measurement_id, filename, description, status)
            VALUES (${measurementId}, 'test.csv', 'Test Beschreibung', 'offen')
            RETURNING *;
        `;

        // 4. Versuche die Metadaten zu aktualisieren
        const updatedMetadata = await sql`
            UPDATE metadata
            SET filename = 'updated.csv',
                description = 'Aktualisierte Beschreibung',
                status = 'validiert'
            WHERE measurement_id = ${measurementId}
            RETURNING *;
        `;

        return NextResponse.json({
            tables,
            measurement,
            metadata,
            updatedMetadata
        });
    } catch (error) {
        console.error('Test-Update fehlgeschlagen:', error);
        return NextResponse.json(
            { error: 'Test-Update fehlgeschlagen', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
