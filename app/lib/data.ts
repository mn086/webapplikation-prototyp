import sql from './db';

export type MeasurementWithMetadata = {
  id: string;
  filename: string;
  created_at: Date;
  description: string | null;
  status: 'offen' | 'validiert';
  channels: string[];
  data: {
    seconds_from_start: number;
    [key: string]: number;  // Dynamische Kanalwerte
  }[];
};

export type MeasurementTableEntry = {
  id: string;
  filename: string;
  created_at: Date;
  description: string | null;
  status: 'offen' | 'validiert';
  channel_count: number;
};

const ITEMS_PER_PAGE = 6;

export async function fetchTimeseriesData() {
  try {
    console.log('Lade Zeitreihendaten...');
    
    // Hole alle Messungen mit ihren Metadaten
    const measurements = await sql`
      SELECT 
        m.id,
        meta.filename,
        meta.description,
        meta.status,
        m.created_at
      FROM measurements m
      LEFT JOIN metadata meta ON m.id = meta.measurement_id
      ORDER BY m.created_at DESC
      LIMIT 100
    `;

    // Für jede Messung hole die Kanäle und Werte
    const measurementsWithData = await Promise.all(
      measurements.map(async (measurement) => {
        // Hole alle Kanäle für diese Messung
        const channels = await sql`
          SELECT id, channel_name
          FROM measurement_channels
          WHERE measurement_id = ${measurement.id}
        `;

        // Hole alle Messwerte für diese Messung
        const values = await sql`
          SELECT mv.seconds_from_start, mv.value, mc.channel_name
          FROM measurement_values mv
          JOIN measurement_channels mc ON mv.channel_id = mc.id
          WHERE mv.measurement_id = ${measurement.id}
          ORDER BY mv.seconds_from_start ASC
        `;

        // Konvertiere die Werte in das gewünschte Format
        const channelNames = channels.map(c => c.channel_name);
        const timeseriesData = values.reduce((acc: any[], curr) => {
          const existingPoint = acc.find(p => p.seconds_from_start === curr.seconds_from_start);
          if (existingPoint) {
            existingPoint[curr.channel_name] = curr.value;
          } else {
            const point: any = { seconds_from_start: curr.seconds_from_start };
            point[curr.channel_name] = curr.value;
            acc.push(point);
          }
          return acc;
        }, []);

        return {
          ...measurement,
          channels: channelNames,
          data: timeseriesData
        };
      })
    );

    console.log('Zeitreihendaten erfolgreich geladen');
    return measurementsWithData;
  } catch (error) {
    console.error('Datenbankfehler:', error);
    throw new Error('Fehler beim Laden der Zeitreihendaten.');
  }
}

export async function fetchLatestMetadata() {
  try {
    const data = await sql`
      SELECT m.* 
      FROM metadata m
      ORDER BY m.created_at DESC
      LIMIT 5
    `;
    
    return data;
  } catch (error: unknown) {
    console.error('Datenbankfehler:', error);
    throw new Error('Fehler beim Laden der aktuellen Metadaten.');
  }
}

export async function fetchDashboardData() {
  try {
    const measurementCountPromise = sql`SELECT COUNT(*) FROM measurements`;
    const metadataCountPromise = sql`SELECT COUNT(*) FROM metadata`;
    const statusCountPromise = sql`SELECT
         COUNT(CASE WHEN status = 'validiert' THEN 1 END) AS "validiert",
         COUNT(CASE WHEN status = 'offen' THEN 1 END) AS "offen"
         FROM metadata`;

    const data = await Promise.all([
      measurementCountPromise,
      metadataCountPromise,
      statusCountPromise,
    ]);

    const numberOfMeasurements = Number(data[0][0].count ?? '0');
    const numberOfMetadata = Number(data[1][0].count ?? '0');
    const validatedCount = Number(data[2][0].validiert ?? '0');
    const openCount = Number(data[2][0].offen ?? '0');

    return {
      numberOfMeasurements,
      numberOfMetadata,
      validatedCount,
      openCount,
    };
  } catch (error: unknown) {
    console.error('Datenbankfehler:', error);
    throw new Error('Fehler beim Laden der Dashboard-Daten.');
  }
}

export async function fetchMeasurementStats() {  try {
    // Hole Statistiken für die Karten
    const stats = await sql`
      SELECT 
        COUNT(DISTINCT m.id) as total,
        COUNT(DISTINCT CASE WHEN meta.status = 'validiert' THEN m.id END) as validated,
        COUNT(DISTINCT CASE WHEN meta.status = 'offen' THEN m.id END) as open
      FROM measurements m
      LEFT JOIN metadata meta ON m.id = meta.measurement_id
    `;
    
    return {
      totalMeasurements: Number(stats[0].total) || 0,
      validatedMeasurements: Number(stats[0].validated) || 0,
      openMeasurements: Number(stats[0].open) || 0,
    };
  } catch (error) {
    console.error('Datenbankfehler:', error);
    throw new Error('Fehler beim Laden der Messungsstatistiken.');
  }
}

export async function fetchFilteredMetadata(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const metadata = await sql`
      SELECT
        m.*
      FROM metadata m
      WHERE
        m.filename ILIKE ${`%${query}%`} OR
        m.description ILIKE ${`%${query}%`}
      ORDER BY m.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return metadata;
  } catch (error: unknown) {
    console.error('Datenbankfehler:', error);
    throw new Error('Fehler beim Laden der Metadaten.');
  }
}

export async function fetchFilteredMeasurements(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const measurements = await sql`
      WITH ChannelCounts AS (
        SELECT 
          measurement_id,
          COUNT(*) as channel_count
        FROM measurement_channels
        GROUP BY measurement_id
      )
      SELECT 
        m.id,
        meta.filename,
        meta.created_at,
        meta.description,
        meta.status,
        COALESCE(cc.channel_count, 0) as channel_count
      FROM measurements m
      LEFT JOIN metadata meta ON m.id = meta.measurement_id
      LEFT JOIN ChannelCounts cc ON m.id = cc.measurement_id
      WHERE
        meta.filename ILIKE ${`%${query}%`} OR
        meta.description ILIKE ${`%${query}%`}
      ORDER BY meta.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return measurements.map(m => ({
      id: m.id,
      filename: m.filename,
      created_at: m.created_at,
      description: m.description,
      status: m.status as 'offen' | 'validiert',
      channel_count: Number(m.channel_count)
    }));
  } catch (error) {
    console.error('Datenbankfehler:', error);
    throw new Error('Fehler beim Laden der Messungen.');
  }
}

export async function fetchMetadataPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM metadata m
    WHERE
      m.filename ILIKE ${`%${query}%`} OR
      m.description ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error: unknown) {
    console.error('Datenbankfehler:', error);
    throw new Error('Fehler beim Laden der Gesamtanzahl der Metadaten-Einträge.');
  }
}

export async function fetchMeasurementPages(query: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM measurements m
      LEFT JOIN metadata meta ON m.id = meta.measurement_id
      WHERE
        meta.filename ILIKE ${`%${query}%`} OR
        meta.description ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Datenbankfehler:', error);
    throw new Error('Fehler beim Laden der Seitenzahl.');
  }
}