// Markiert dies als Client-Komponente
'use client';

// Importiere benötigte Komponenten und Typen
import { MeasurementForm, TimeseriesDataPoint } from '@/app/lib/definitions';
import { updateMeasurement } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { 
  DocumentTextIcon,
  InformationCircleIcon,
  CheckIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import TimeseriesChartClient from '@/app/ui/dashboard/timeseries-chart-client';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';

// Definiere den Typ für den Formularstatus mit Fehlerhandling
// Definiere den Typ für den Formularstatus mit Fehlerhandling und Statusnachrichten
type State = {
  errors?: {
    filename?: string[];      // Fehlermeldungen für den Dateinamen
    description?: string[];   // Fehlermeldungen für die Beschreibung
    status?: string[];        // Fehlermeldungen für den Status
  };
  message: string | null;     // Allgemeine Statusnachricht
};

// Hauptkomponente für das Bearbeitungsformular einer Analyse
export default function EditAnalysisForm({
  measurement,
}: {
  measurement: MeasurementForm;
}) {  
  const router = useRouter();
  // Initialisiere den Formularstatus
  const initialState: State = { message: null, errors: {} };

  // Funktion zur Verarbeitung des Formulars mit Validierung und Weiterleitung
  const updateMeasurementWithId = async (prevState: State, formData: FormData) => {
    try {
      // Prüfe ob ein Dateiname angegeben wurde
      if (!formData.get('filename')) {
        return {
          errors: {
            filename: ['Bitte geben Sie einen Namen ein.']
          },
          message: 'Fehlende Felder. Aktualisierung der Messung fehlgeschlagen.',
        };
      }

      // Prüfe ob ein Status ausgewählt wurde
      if (!formData.get('status')) {
        return {
          errors: {
            status: ['Bitte wählen Sie einen Status.']
          },
          message: 'Fehlende Felder. Aktualisierung der Messung fehlgeschlagen.',
        };
      }

      // Führe die Aktualisierung durch
      const result = await updateMeasurement(measurement.id, formData);
      
      // Wenn keine Fehler auftreten, leite zur Übersicht weiter
      if (!result.errors && !result.message) {
        router.push('/dashboard/analysis');
        return result;
      }
      
      return {
        ...prevState,
        ...result,
      };
    } catch (error) {
      console.error('Fehler beim Aktualisieren:', error);
      return {
        message: 'Ein unerwarteter Fehler ist aufgetreten.',
      };
    }
  };

  // Verbinde Formularstatus mit der Aktualisierungsfunktion
  const [state, formAction] = useActionState(updateMeasurementWithId, initialState);
  
  // Bereite die Daten für die Diagrammdarstellung vor
  const chartData = measurement.data.map(point => {
    // Erstelle dynamisch ein Objekt mit allen Kanälen
    const channelData: { [key: string]: number | null } = {};
    
    // Weise die Messwerte den entsprechenden Kanälen zu
    measurement.channels.forEach((channel) => {
      channelData[channel] = point[channel] ?? null;
    });
    
    return {
      seconds: point.seconds_from_start,
      ...channelData
    };
  }) as TimeseriesDataPoint[];

  // Render das Formular mit allen Eingabefeldern
  return (
    <form action={formAction}>
      {/* Hauptbereich des Formulars */}
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Diagrammbereich */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Messdaten Visualisierung</h2>
          <div className="rounded-md border border-gray-200 bg-white p-4">
            <TimeseriesChartClient data={chartData} />
          </div>
        </div>

        {/* Eingabefeld für den Dateinamen */}
        <div className="mb-4">
          <label htmlFor="filename" className="mb-2 block text-sm font-medium">
            Name der Messung
          </label>
          <div className="relative">
            <input
              id="filename"
              name="filename"
              type="text"
              defaultValue={measurement.filename}
              placeholder="Messungsname eingeben"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="filename-error"
            />
            <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          {/* Fehleranzeige für den Dateinamen */}
          {state.errors?.filename && (
            <div id="filename-error" aria-live="polite" className="mt-2 text-sm text-red-500">
              {state.errors.filename.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>

        {/* Eingabefeld für die Beschreibung */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Beschreibung
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              defaultValue={measurement.description || ''}
              placeholder="Beschreibung der Messung eingeben"
              rows={3}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="description-error"
            />
            <InformationCircleIcon className="pointer-events-none absolute left-3 top-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
          </div>
          {/* Fehleranzeige für die Beschreibung */}
          {state.errors?.description && (
            <div id="description-error" aria-live="polite" className="mt-2 text-sm text-red-500">
              {state.errors.description.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>

        {/* Auswahlfeld für den Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              {/* Option: Offen */}
              <div className="flex items-center">
                <input
                  id="offen"
                  name="status"
                  type="radio"
                  value="offen"
                  defaultChecked={measurement.status === 'offen'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="offen"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-600"
                >
                  Offen <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              {/* Option: Validiert */}
              <div className="flex items-center">
                <input
                  id="validiert"
                  name="status"
                  type="radio"
                  value="validiert"
                  defaultChecked={measurement.status === 'validiert'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="validiert"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600"
                >
                  Validiert <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          {/* Fehleranzeige für den Status */}
          {state.errors?.status && (
            <div id="status-error" aria-live="polite" className="mt-2 text-sm text-red-500">
              {state.errors.status.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </fieldset>
      </div>

      {/* Aktionsbuttons */}
      <div className="mt-6 flex justify-end gap-4">
        {/* Abbrechen-Button mit Link zur Übersicht */}
        <Link
          href="/dashboard/analysis"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Abbrechen
        </Link>
        {/* Speichern-Button */}
        <Button type="submit">Änderungen speichern</Button>
      </div>

      {/* Fehleranzeige */}
      {state.message && (
        <div aria-live="polite" className="mt-2 text-sm text-red-500">
          <p>{state.message}</p>
        </div>
      )}
    </form>
  );
}