import sql from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Erstelle Indices für Fremdschlüssel und häufig abgefragte Spalten
        await sql.begin(async (sql) => {
            // Index für measurement_id in metadata Tabelle
            await sql`
                CREATE INDEX IF NOT EXISTS idx_metadata_measurement_id 
                ON metadata(measurement_id);
            `;

            // Index für status in metadata Tabelle
            await sql`
                CREATE INDEX IF NOT EXISTS idx_metadata_status 
                ON metadata(status);
            `;

            // Index für measurement_id in measurement_channels Tabelle
            await sql`
                CREATE INDEX IF NOT EXISTS idx_measurement_channels_measurement_id 
                ON measurement_channels(measurement_id);
            `;

            // Index für measurement_id in measurement_values Tabelle
            await sql`
                CREATE INDEX IF NOT EXISTS idx_measurement_values_measurement_id 
                ON measurement_values(measurement_id);
            `;

            // Index für channel_id in measurement_values Tabelle
            await sql`
                CREATE INDEX IF NOT EXISTS idx_measurement_values_channel_id 
                ON measurement_values(channel_id);
            `;
        });

        return NextResponse.json({
            message: 'Database indices created successfully'
        });
    } catch (error) {
        console.error('Error creating indices:', error);
        return NextResponse.json(
            { error: 'Failed to create indices', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
