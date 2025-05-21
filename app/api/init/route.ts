import sql from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
    try {
        // Lese schema.sql
        const schemaPath = path.join(process.cwd(), 'app', 'lib', 'schema.sql');
        const createScript = await fs.readFile(schemaPath, 'utf8');

        // Führe Schema-Skript aus
        await sql.unsafe(createScript);

        return NextResponse.json({ message: 'Database initialized successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error initializing database:', error);
        return NextResponse.json(
            { error: 'Failed to initialize database', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
