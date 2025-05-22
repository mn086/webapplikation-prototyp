'use server';

// Importiere benötigte Abhängigkeiten
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import sql from './db';
import { fetchMeasurementData } from './php-api';

// Definiere den Typ für den Formularzustand
// Enthält mögliche Fehler für jedes Formularfeld und eine optionale Nachricht
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

// Schema für die Erstellung einer neuen Analyse
// Validiert die Eingabefelder mit Zod
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

// Erstellt eine neue Analyse basierend auf den Formulardaten
export async function createAnalysis(prevState: State, formData: FormData) {
  // Validiere die Eingabefelder
  const validatedFields = CreateAnalysis.safeParse({
    measurementType: formData.get('measurementType'),
    timeRange: formData.get('timeRange'),
    analysisType: formData.get('analysisType'),
  });

  // Wenn die Validierung fehlschlägt, gib Fehlermeldungen zurück
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Fehlende Felder. Erstellung der Analyse fehlgeschlagen.',
    };
  }

  const { measurementType, timeRange, analysisType } = validatedFields.data;

  try {
    // Füge die neue Analyse in die Datenbank ein
    await sql`
      INSERT INTO analyses (measurement_type, time_range, analysis_type, created_at)
      VALUES (${measurementType}, ${timeRange}, ${analysisType}, NOW())
    `;
    
    // Aktualisiere die Seite und leite um
    revalidatePath('/dashboard/analysis');
    redirect('/dashboard/analysis');
  } catch (error) {
    return {
      message: 'Datenbankfehler: Analyse konnte nicht erstellt werden.',
    };
  }
}

// Authentifiziert einen Benutzer mit den Anmeldedaten
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

// Löscht eine Messung und alle zugehörigen Daten
export async function deleteMeasurement(id: string) {
  try {
    // Lösche alle abhängigen Daten in der richtigen Reihenfolge
    await sql`DELETE FROM measurement_values WHERE measurement_id = ${id}`;
    await sql`DELETE FROM measurement_channels WHERE measurement_id = ${id}`;
    await sql`DELETE FROM metadata WHERE measurement_id = ${id}`;
    await sql`DELETE FROM measurements WHERE id = ${id}`;

    revalidatePath('/dashboard/analysis');
    return { message: 'Messung erfolgreich gelöscht.' };
  } catch (error) {
    return { message: 'Fehler beim Löschen der Messung.' };
  }
}

// Schema für die Aktualisierung einer Messung
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

// Aktualisiert die Metadaten einer Messung
export async function updateMeasurement(id: string, formData: FormData) {
  // Validiere die Eingabefelder
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
      return { message: 'Messung nicht gefunden.' };
    }

    // Prüfe, ob Metadaten existieren
    const existingMetadata = await sql`
      SELECT measurement_id FROM metadata WHERE measurement_id = ${id}
    `;

    let result;
    // Erstelle oder aktualisiere Metadaten je nach Existenz
    if (existingMetadata.length === 0) {
      result = await sql`
        INSERT INTO metadata (measurement_id, filename, description, status)
        VALUES (${id}, ${filename}, ${description}, ${status})
        RETURNING *
      `;
    } else {
      result = await sql`
        UPDATE metadata
        SET filename = ${filename},
            description = ${description},
            status = ${status}
        WHERE measurement_id = ${id}
        RETURNING *
      `;
    }

    if (!result || result.length === 0) {
      return { message: 'Keine Änderungen vorgenommen.' };
    }

    // Aktualisiere die betroffenen Seiten
    revalidatePath('/dashboard/analysis');
    revalidatePath(`/dashboard/analysis/${id}`);
    return { message: 'Messung erfolgreich aktualisiert.' };
    
  } catch (error) {
    console.error('Fehler beim Aktualisieren der Messung:', error);
    return {
      message: error instanceof Error ? error.message : 'Datenbankfehler: Messung konnte nicht aktualisiert werden.',
    };
  }
}

// Schema für den Import einer Messung
const ImportMeasurement = z.object({
  id: z.string(),
});

// Importiert eine Messung aus der PHP-API in die lokale Datenbank
export async function importMeasurement(prevState: State, formData: FormData) {
  // Validiere die Eingabe
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
    // Hole die Messungsdaten von der PHP-API
    const measurementData = await fetchMeasurementData(id);

    // Starte eine Datenbank-Transaktion für den Import
    await sql.begin(async (sql) => {
      // 1. Erstelle den Messungsdatensatz
      const [measurement] = await sql`
        INSERT INTO measurements DEFAULT VALUES
        RETURNING id
      `;
      const measurementId = measurement.id;

      // 2. Füge die Metadaten hinzu
      await sql`
        INSERT INTO metadata (measurement_id, filename, description, status)
        VALUES (
          ${measurementId}, 
          ${measurementData.metadata.filename}, 
          ${measurementData.metadata.description}, 
          ${measurementData.metadata.status}
        )
      `;

      // 3. Importiere alle Kanäle und ihre Werte
      for (const channelName of measurementData.channels) {
        // Erstelle den Kanal
        const [measurementChannel] = await sql`
          INSERT INTO measurement_channels (measurement_id, channel_name, unit)
          VALUES (${measurementId}, ${channelName}, NULL)
          RETURNING id
        `;

        // Bereite die Messwerte für den Massenimport vor
        const values = measurementData.data.map(dataPoint => ({
          measurement_id: measurementId,
          channel_id: measurementChannel.id,
          seconds_from_start: dataPoint.seconds_from_start,
          value: dataPoint[channelName]
        }));

        // Füge alle Messwerte für diesen Kanal ein
        await sql`
          INSERT INTO measurement_values ${sql(
            values,
            'measurement_id',
            'channel_id',
            'seconds_from_start',
            'value'
          )}
        `;
      }
    });
    
    // Nach erfolgreicher Transaktion: Aktualisiere und leite um
    revalidatePath('/dashboard/analysis');
    redirect('/dashboard/analysis');
  } catch (error) {
    // Behandle Weiterleitungsfehler separat
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    
    // Protokolliere andere Fehler und gib eine Fehlermeldung zurück
    console.error('Fehler beim Importieren der Messung:', error);
    return {
      message: error instanceof Error ? error.message : 'Datenbankfehler: Messung konnte nicht importiert werden.',
    };
  }
}