import sql from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
    try {
        console.log('Starting database initialization...');

        // Lese schema.sql
        const schemaPath = path.join(process.cwd(), 'app', 'lib', 'schema.sql');
        const createScript = await fs.readFile(schemaPath, 'utf8');
        console.log('Schema file loaded');

        // Führe Schema-Skript in einer Transaktion aus
        await sql.begin(async (sql) => {
            console.log('Executing schema script...');
            await sql.unsafe(createScript);
            console.log('Schema created successfully');

            // Lese seed.sql für Testdaten
            const seedPath = path.join(process.cwd(), 'app', 'lib', 'seed.sql');
            const seedScript = await fs.readFile(seedPath, 'utf8');
            console.log('Seed file loaded');

            // Führe Seed-Skript aus
            console.log('Executing seed script...');
            await sql.unsafe(seedScript);
            console.log('Test data inserted successfully');
        });

        return NextResponse.json({ 
            message: 'Database initialized and seeded successfully'
        }, { status: 200 });
    } catch (error) {
        console.error('Error initializing database:', error);
        return NextResponse.json(
            { error: 'Failed to initialize database', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
