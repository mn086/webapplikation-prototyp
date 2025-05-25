// Data Access Layer: Zentrale Stelle für alle Datenbankzugriffe
import sql from './db';
import { MeasurementForm } from '@/app/lib/definitions';

// Erweiterter Typ für Messungen mit Metadaten und Zeitreihen
export type MeasurementWithMetadata = {
    id: string;
    filename: string;
    created_at: Date;
    description: string | null;
    status: 'offen' | 'validiert';
    channels: string[];            // Liste der Kanalnamen
    data: {                        // Zeitreihendaten
        seconds_from_start: number;
        [key: string]: number;     // Dynamische Kanalwerte
    }[];
};

// Vereinfachter Typ für Tabelleneinträge
export type MeasurementTableEntry = {
    id: string;
    filename: string;
    created_at: Date;
    description: string | null;
    status: 'offen' | 'validiert';
    channel_count: number;
};

// Konstante für die Paginierung
const ITEMS_PER_PAGE = 6;

// Lädt Zeitreihendaten für die Visualisierung
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

// Lädt die neuesten Metadaten für die Timeline
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

// Lädt aggregierte Daten für das Dashboard (Statistik-Karten)
export async function fetchDashboardData() {
  try {
    // Führe Abfragen parallel aus für bessere Performance
    const measurementCountPromise = sql`SELECT COUNT(*) FROM measurements`;
    const statusCountPromise = sql`
      SELECT
        COUNT(CASE WHEN status = 'validiert' THEN 1 END) AS "validiert",
        COUNT(CASE WHEN status = 'offen' THEN 1 END) AS "offen"
      FROM metadata
    `;

    // Warte auf beide Abfragen
    const data = await Promise.all([
      measurementCountPromise,
      statusCountPromise,
    ]);

    // Extrahiere und konvertiere die Ergebnisse
    const numberOfMeasurements = Number(data[0][0].count ?? '0');
    const validatedCount = Number(data[1][0].validiert ?? '0');
    const openCount = Number(data[1][0].offen ?? '0');

    return {
      numberOfMeasurements,
      validatedCount,
      openCount,
    };
  } catch (error: unknown) {
    console.error('Datenbankfehler:', error);
    throw new Error('Fehler beim Laden der Dashboard-Daten.');
  }
}

// Lädt Statistiken für die Karten
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

// Lädt gefilterte Metadaten für die Tabelle
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

// Lädt gefilterte Messungen für die Tabelle
export async function fetchFilteredMeasurements(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const measurements = await sql`
      WITH ChannelCounts AS (
        SELECT measurement_id, COUNT(*) as channel_count
        FROM measurement_channels
        GROUP BY measurement_id
      )
      SELECT 
        m.id,
        meta.filename,
        meta.description,
        meta.status,
        m.created_at,
        COALESCE(cc.channel_count, 0) as channel_count
      FROM measurements m
      LEFT JOIN metadata meta ON m.id = meta.measurement_id
      LEFT JOIN ChannelCounts cc ON m.id = cc.measurement_id
      WHERE
        meta.filename ILIKE ${`%${query}%`} OR
        meta.description ILIKE ${`%${query}%`}
      ORDER BY m.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return measurements;
  } catch (error) {
    console.error('Datenbankfehler:', error);
    throw new Error('Fehler beim Laden der gefilterten Messungen.');
  }
}

// Lädt die Gesamtanzahl der Metadaten-Seiten
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

// Lädt die Seitenanzahl für Messungen
export async function fetchMeasurementsPages(query: string) {
  try {
    const count = await sql`
      SELECT COUNT(*) 
      FROM metadata 
      WHERE filename ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Datenbankfehler:', error);
    throw new Error('Fehler beim Laden der Seitenanzahl.');
  }
}

// Lädt eine Messung nach ID
export async function fetchMeasurementById(id: string): Promise<MeasurementForm | null> {
  try {
    // Hole die Messung mit Metadaten
    const measurement = await sql`
      SELECT 
        m.id,
        meta.filename,
        meta.description,
        meta.status,
        m.created_at
      FROM measurements m
      LEFT JOIN metadata meta ON m.id = meta.measurement_id
      WHERE m.id = ${id}
    `;

    if (!measurement || measurement.length === 0) {
      return null;
    }

    // Hole alle Kanäle für diese Messung
    const channels = await sql`
      SELECT id, channel_name
      FROM measurement_channels
      WHERE measurement_id = ${id}
    `;

    // Hole alle Messwerte für diese Messung
    const values = await sql`
      SELECT mv.seconds_from_start, mv.value, mc.channel_name
      FROM measurement_values mv
      JOIN measurement_channels mc ON mv.channel_id = mc.id
      WHERE mv.measurement_id = ${id}
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
    }, []);    const result = {
      id: measurement[0].id,
      filename: measurement[0].filename || '',
      description: measurement[0].description || '',
      status: measurement[0].status || 'offen',
      channels: channelNames,
      data: timeseriesData
    };
    return result;
  } catch (error) {
    console.error('Datenbankfehler:', error);
    throw new Error('Fehler beim Laden der Messung.');
  }
}