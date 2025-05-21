import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import sql from '@/app/lib/db';

export async function GET() {
  try {
    console.log('Starting to seed test data...');
    
    // First check if we need to initialize the schema
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'measurements'
      );
    `;
    console.log('Table exists check:', tableExists[0]?.exists);
    
    if (!tableExists[0]?.exists) {
      const schemaPath = path.join(process.cwd(), 'app', 'lib', 'schema.sql');
      const schemaScript = await fs.readFile(schemaPath, 'utf8');
      console.log('Initializing schema...');
      await sql.unsafe(schemaScript);
      console.log('Schema initialized successfully');
    }

    // Read seed script
    const seedPath = path.join(process.cwd(), 'app', 'lib', 'seed.sql');
    const seedScript = await fs.readFile(seedPath, 'utf8');
    console.log('Read seed script, length:', seedScript.length);
    
    // Execute seed script in transaction
    console.log('Starting transaction...');
    await sql.begin(async (sql) => {
      console.log('Executing first measurement insert...');
      await sql.unsafe(seedScript);
      console.log('Seed script executed successfully');
    });
    
    // Verify the results
    const status = await sql`
      SELECT 
        (SELECT COUNT(*) FROM measurements) as total_measurements,
        (SELECT COUNT(*) FROM metadata WHERE status = 'validiert') as validated_count,
        (SELECT COUNT(*) FROM metadata WHERE status = 'offen') as open_count,
        array_agg(row_to_json(m)) as measurement_details
      FROM (
        SELECT m.id, meta.status, meta.filename
        FROM measurements m
        LEFT JOIN metadata meta ON m.id = meta.measurement_id
        ORDER BY m.created_at DESC
      ) m;
    `;
    
    console.log('Seeding verification:', status[0]);
    return NextResponse.json({ 
      message: 'Test data seeded successfully',
      status: status[0]
    });
  } catch (error) {
    console.error('Error details:', error);
    return NextResponse.json(
      { error: 'Failed to seed test data', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
