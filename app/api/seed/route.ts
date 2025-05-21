import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import sql from '@/app/lib/db';

export async function GET() {
  try {
    console.log('Starting to seed test data...');
    
    // Lese seed.sql
    const seedPath = path.join(process.cwd(), 'app', 'lib', 'seed.sql');
    const seedScript = await fs.readFile(seedPath, 'utf8');

    // Führe Seed-Skript aus
    await sql.unsafe(seedScript);

    return NextResponse.json({ message: 'Test data seeded successfully' });
  } catch (error) {
    console.error('Error seeding test data:', error);
    return NextResponse.json(
      { error: 'Failed to seed test data', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
