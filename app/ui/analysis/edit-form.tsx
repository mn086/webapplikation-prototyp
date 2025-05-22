'use client';

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

type State = {
  errors?: {
    filename?: string[];
    description?: string[];
    status?: string[];
  };
  message: string | null;
};

export default function EditAnalysisForm({
  measurement,
}: {
  measurement: MeasurementForm;
}) {  
  const initialState: State = { message: null, errors: {} };
  // Create an action that takes state and form data
  const updateMeasurementWithId = async (prevState: State, formData: FormData) => {
    try {
      // Validiere die Formulardaten vor dem Senden
      if (!formData.get('filename')) {
        return {
          errors: {
            filename: ['Bitte geben Sie einen Namen ein.']
          },
          message: 'Fehlende Felder. Aktualisierung der Messung fehlgeschlagen.',
        };
      }

      if (!formData.get('status')) {
        return {
          errors: {
            status: ['Bitte wählen Sie einen Status.']
          },
          message: 'Fehlende Felder. Aktualisierung der Messung fehlgeschlagen.',
        };
      }

      const result = await updateMeasurement(measurement.id, formData);
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

  const [state, formAction] = useActionState(updateMeasurementWithId, initialState);// Convert data to expected format for TimeseriesChartClient
  const chartData = measurement.data.map(point => {
    const timestamp = new Date();
    timestamp.setSeconds(timestamp.getSeconds() - (measurement.data.length - measurement.data.indexOf(point)));
    
    // Erstelle ein Objekt mit allen Kanälen als null
    const channelData = {
      channel1: null,
      channel2: null,
      channel3: null
    };
    
    // Setze die tatsächlichen Werte für die vorhandenen Kanäle
    measurement.channels.forEach((channel, index) => {
      if (index < 3) { // Wir unterstützen maximal 3 Kanäle
        channelData[`channel${index + 1}` as keyof typeof channelData] = point[channel] ?? null;
      }
    });
    
    return {
      timestamp: timestamp.toISOString(),
      ...channelData
    };
  }) as TimeseriesDataPoint[];

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Timeseries Chart */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Messdaten Visualisierung</h2>
          <div className="rounded-md border border-gray-200 bg-white p-4">
            <TimeseriesChartClient data={chartData} />
          </div>
        </div>

        {/* Measurement File Name */}
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
          {state.errors?.filename && (
            <div id="filename-error" aria-live="polite" className="mt-2 text-sm text-red-500">
              {state.errors.filename.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
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
          {state.errors?.description && (
            <div id="description-error" aria-live="polite" className="mt-2 text-sm text-red-500">
              {state.errors.description.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>

        {/* Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
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
          {state.errors?.status && (
            <div id="status-error" aria-live="polite" className="mt-2 text-sm text-red-500">
              {state.errors.status.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </fieldset>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/measurements"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Abbrechen
        </Link>
        <Button type="submit">Änderungen speichern</Button>
      </div>

      {state.message && (
        <div aria-live="polite" className="mt-2 text-sm text-red-500">
          <p>{state.message}</p>
        </div>
      )}
    </form>
  );
}