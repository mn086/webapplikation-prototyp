import sql, { Measurement, Metadata } from './db';

export async function fetchTimeseriesData() {
  try {
    console.log('Fetching timeseries data...');
    
    const data = await sql<Measurement[]>`
      SELECT * FROM measurements 
      ORDER BY timestamp DESC 
      LIMIT 100
    `;

    console.log('Timeseries data fetched successfully');
    return data;
  } catch (error: unknown) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch timeseries data.');
  }
}

export async function fetchLatestMetadata() {
  try {
    const data = await sql<Metadata[]>`
      SELECT m.* 
      FROM metadata m
      ORDER BY m.created_at DESC
      LIMIT 5
    `;
    
    return data;
  } catch (error: unknown) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest metadata.');
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
    console.error('Database Error:', error);
    throw new Error('Failed to fetch dashboard data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredMetadata(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const metadata = await sql<Metadata[]>`
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
    console.error('Database Error:', error);
    throw new Error('Failed to fetch metadata.');
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
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of metadata entries.');
  }
}
