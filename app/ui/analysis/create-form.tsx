'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { BeakerIcon } from '@heroicons/react/24/outline';
import { fetchAvailableMeasurements, PHPMeasurement } from '@/app/lib/php-api';
import { importMeasurement } from '@/app/lib/actions';
import { useActionState } from 'react';

type FormState = {
  errors?: {
    id?: string[];
  };
  message: string;
};

export default function Form() {
  const [availableMeasurements, setAvailableMeasurements] = useState<PHPMeasurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initialState: FormState = { message: '', errors: {} };
  const [state, formAction] = useActionState<FormState, FormData>(importMeasurement, initialState);

  useEffect(() => {
    const loadMeasurements = async () => {
      try {
        const measurements = await fetchAvailableMeasurements();
        setAvailableMeasurements(measurements);
        setError(null);
      } catch (err) {
        setError('Fehler beim Laden der Messungen');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMeasurements();
  }, []);

  if (loading) {
    return <div>Lade verfügbare Messungen...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Form Error */}
        {state.message && (
          <div className="mt-2 text-red-500">
            {state.message}
          </div>
        )}
        
        {/* Select Measurement */}
        <div className="mb-4">
          <label htmlFor="measurement" className="mb-2 block text-sm font-medium">
            Messung
          </label>
          <div className="relative">
            <select
              id="measurement"
              name="measurement"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              required
              aria-describedby={state.errors?.id ? "id-error" : undefined}
            >
              <option value="" disabled>
                Messung auswählen
              </option>
              {availableMeasurements.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.filename}
                </option>
              ))}
            </select>
            <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {state.errors?.id && (
            <div id="id-error" className="mt-2 text-sm text-red-500">
              {state.errors.id.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/analysis"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Abbrechen
        </Link>
        <Button type="submit">Messung importieren</Button>
      </div>
    </form>
  );
}
