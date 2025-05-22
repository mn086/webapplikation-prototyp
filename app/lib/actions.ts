'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import sql from './db';  // Importiere den vorhandenen SQL-Client

export type State = {
  errors?: {
    measurementType?: string[];
    timeRange?: string[];
    analysisType?: string[];
    filename?: string[];
    description?: string[];
    status?: string[];
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