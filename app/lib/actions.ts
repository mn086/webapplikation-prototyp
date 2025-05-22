'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import sql from './db';  // Importiere den vorhandenen SQL-Client
import { fetchMeasurementData } from './php-api';

export type State = {
  errors?: {
    measurementType?: string[];
    timeRange?: string[];
    analysisType?: string[];
    filename?: string[];
    description?: string[];
    status?: string[];
    id?: string[];
  };
  message?: string | null;
};

const CreateAnalysis = z.object({
  measurementType: z.enum(['temperature', 'humidity', 'pressure'], {
    invalid_type_error: 'Bitte wählen Sie einen Messungstyp.',
  }),
  timeRange: z.enum(['1h', '24h', '7d', '30d'], {
    invalid_type_error: 'Bitte wählen Sie einen Zeitraum.',
  }),
  analysisType: z.enum(['trend', 'anomaly'], {
    invalid_type_error: 'Bitte wählen Sie einen Analysetyp.',
  }),
});

export async function createAnalysis(prevState: State, formData: FormData) {
  const validatedFields = CreateAnalysis.safeParse({
    measurementType: formData.get('measurementType'),
    timeRange: formData.get('timeRange'),
    analysisType: formData.get('analysisType'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Fehlende Felder. Erstellung der Analyse fehlgeschlagen.',
    };
  }

  const { measurementType, timeRange, analysisType } = validatedFields.data;

  try {
    await sql`
      INSERT INTO analyses (measurement_type, time_range, analysis_type, created_at)
      VALUES (${measurementType}, ${timeRange}, ${analysisType}, NOW())
    `;
    
    revalidatePath('/dashboard/analysis');
    redirect('/dashboard/analysis');
  } catch (error) {
    return {
      message: 'Datenbankfehler: Analyse konnte nicht erstellt werden.',
    };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function deleteMeasurement(id: string) {
  try {
    await sql`
      DELETE FROM measurement_values
      WHERE measurement_id = ${id}
    `;
    
    await sql`
      DELETE FROM measurement_channels
      WHERE measurement_id = ${id}
    `;

    await sql`
      DELETE FROM metadata
      WHERE measurement_id = ${id}
    `;

    await sql`
      DELETE FROM measurements
      WHERE id = ${id}
    `;

    revalidatePath('/dashboard/measurements');
    return { message: 'Messung erfolgreich gelöscht.' };
  } catch (error) {
    return { message: 'Fehler beim Löschen der Messung.' };
  }
}

const UpdateMeasurement = z.object({
  id: z.string(),
  filename: z.string({
    invalid_type_error: 'Bitte geben Sie einen Namen ein.',
  }),
  description: z.string().nullable(),
  status: z.enum(['offen', 'validiert'], {
    invalid_type_error: 'Bitte wählen Sie einen Status.',
  }),
});

export async function updateMeasurement(id: string, formData: FormData) {
  const validatedFields = UpdateMeasurement.safeParse({
    id,
    filename: formData.get('filename'),
    description: formData.get('description') || null,
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Fehlende Felder. Aktualisierung der Messung fehlgeschlagen.',
    };
  }

  const { filename, description, status } = validatedFields.data;

  try {
    // Prüfe zuerst, ob die Messung existiert
    const measurement = await sql`
      SELECT id FROM measurements WHERE id = ${id}
    `;

    if (!measurement || measurement.length === 0) {
      return {
        message: 'Messung nicht gefunden.',
      };
    }

    // Prüfe, ob Metadaten existieren
    const existingMetadata = await sql`
      SELECT measurement_id FROM metadata WHERE measurement_id = ${id}
    `;

    let result;
    if (existingMetadata.length === 0) {
      // Metadaten existieren nicht, erstelle sie
      result = await sql`
        INSERT INTO metadata (measurement_id, filename, description, status)
        VALUES (${id}, ${filename}, ${description}, ${status})
        RETURNING *
      `;
    } else {
      // Metadaten existieren, aktualisiere sie
      result = await sql`
        UPDATE metadata
        SET filename = ${filename},
            description = ${description},
            status = ${status}
        WHERE measurement_id = ${id}
        RETURNING *
      `;
    }    if (!result || result.length === 0) {
      return {
        message: 'Keine Änderungen vorgenommen.',
      };
    }    revalidatePath('/dashboard/measurements');
    revalidatePath(`/dashboard/analysis/${id}`);
    return { message: 'Messung erfolgreich aktualisiert.' };
    
  } catch (error) {
    console.error('Fehler beim Aktualisieren der Messung:', error);
    return {
      message: error instanceof Error ? error.message : 'Datenbankfehler: Messung konnte nicht aktualisiert werden.',
    };
  }
}

const ImportMeasurement = z.object({
  id: z.string(),
});

export async function importMeasurement(prevState: State, formData: FormData) {
  const validatedFields = ImportMeasurement.safeParse({
    id: formData.get('measurement'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Bitte wählen Sie eine Messung aus.',
    };
  }

  const { id } = validatedFields.data;

  try {
    // Fetch measurement data from PHP API
    const measurementData = await fetchMeasurementData(id);

    // Start database import transaction
    await sql.begin(async (sql) => {
      // 1. Insert measurement
      const [measurement] = await sql`
        INSERT INTO measurements DEFAULT VALUES
        RETURNING id
      `;
      const measurementId = measurement.id;

      // 2. Insert metadata
      await sql`
        INSERT INTO metadata (measurement_id, filename, description, status)
        VALUES (
          ${measurementId}, 
          ${measurementData.metadata.filename}, 
          ${measurementData.metadata.description}, 
          ${measurementData.metadata.status}
        )
      `;      console.log('Importing channels:', measurementData.channels);      // 3. Insert channels and their values
      for (const channelName of measurementData.channels) {
        console.log('Processing channel:', channelName);
        
        // Create channel (unit is optional in our schema)
        const [measurementChannel] = await sql`
          INSERT INTO measurement_channels (measurement_id, channel_name, unit)
          VALUES (${measurementId}, ${channelName}, NULL)
          RETURNING id
        `;

        // Insert all values for this channel from the data array
        const values = measurementData.data.map(dataPoint => ({
          measurement_id: measurementId,
          channel_id: measurementChannel.id,
          seconds_from_start: dataPoint.seconds_from_start,
          value: dataPoint[channelName]
        }));

        await sql`
          INSERT INTO measurement_values ${sql(
            values,
            'measurement_id',
            'channel_id',
            'seconds_from_start',
            'value'
          )}
        `;
      }    });
    
    // Nach erfolgreicher Transaktion
    revalidatePath('/dashboard/analysis');
    redirect('/dashboard/analysis');
  } catch (error) {
    // Wenn es ein Redirect-Fehler ist, werfen wir ihn weiter
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    
    // Bei allen anderen Fehlern geben wir eine Fehlermeldung zurück
    console.error('Fehler beim Importieren der Messung:', error);
    return {
      message: error instanceof Error ? error.message : 'Datenbankfehler: Messung konnte nicht importiert werden.',
    };
  }
}