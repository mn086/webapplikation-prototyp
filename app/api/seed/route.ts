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
    
    if (!tableExists[0]?.exists) {
      const schemaPath = path.join(process.cwd(), 'app', 'lib', 'schema.sql');
      const schemaScript = await fs.readFile(schemaPath, 'utf8');
      await sql.unsafe(schemaScript);
      console.log('Schema initialized successfully');
    }

    // Now insert test data step by step
    console.log('Creating new measurement...');
    const measurementResult = await sql`
      INSERT INTO measurements DEFAULT VALUES RETURNING id;
    `;
    const measurementId = measurementResult[0].id;
    console.log('Created measurement with ID:', measurementId);

    console.log('Adding metadata...');
    await sql`
      INSERT INTO metadata (measurement_id, filename, description, status)
      VALUES (${measurementId}, 'temperatur_druck_20250521.csv', 'Temperatur- und Druckmessung Anlage A', 'validiert');
    `;

    console.log('Creating temperature channel...');
    const tempChannelResult = await sql`
      INSERT INTO measurement_channels (measurement_id, channel_name, unit)
      VALUES (${measurementId}, 'Temperatur', '°C')
      RETURNING id;
    `;
    const tempChannelId = tempChannelResult[0].id;

    console.log('Creating pressure channel...');
    const pressureChannelResult = await sql`
      INSERT INTO measurement_channels (measurement_id, channel_name, unit)
      VALUES (${measurementId}, 'Druck', 'bar')
      RETURNING id;
    `;
    const pressureChannelId = pressureChannelResult[0].id;

    console.log('Adding temperature values...');
    await sql`
      INSERT INTO measurement_values (measurement_id, channel_id, seconds_from_start, value)
      SELECT ${measurementId}, ${tempChannelId}, seconds, 20 + random() * 5
      FROM generate_series(0, 60, 10) AS t(seconds);
    `;

    console.log('Adding pressure values...');
    await sql`
      INSERT INTO measurement_values (measurement_id, channel_id, seconds_from_start, value)
      SELECT ${measurementId}, ${pressureChannelId}, seconds, 2.5 + random() * 0.5
      FROM generate_series(0, 60, 10) AS t(seconds);
    `;

    console.log('Seeding completed successfully');
    return NextResponse.json({ 
      message: 'Test data seeded successfully',
      measurementId 
    });
  } catch (error) {
    console.error('Error seeding test data:', error);
    return NextResponse.json(
      { error: 'Failed to seed test data', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
