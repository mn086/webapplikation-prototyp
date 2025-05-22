'use client';

import Link from 'next/link';
import {
  BeakerIcon,
  ClockIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createAnalysis, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createAnalysis, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Measurement Type */}
        <div className="mb-4">
          <label htmlFor="measurementType" className="mb-2 block text-sm font-medium">
            Messungstyp
          </label>
          <div className="relative">
            <select
              id="measurementType"
              name="measurementType"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="measurement-type-error"
            >
              <option value="" disabled>
                Messungstyp auswählen
              </option>
              <option value="temperature">Temperatur</option>
              <option value="humidity">Luftfeuchtigkeit</option>
              <option value="pressure">Luftdruck</option>
            </select>
            <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="measurement-type-error" aria-live="polite" aria-atomic="true">
            {state.errors?.measurementType &&
              state.errors.measurementType.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Time Range */}
        <div className="mb-4">
          <label htmlFor="timeRange" className="mb-2 block text-sm font-medium">
            Zeitraum
          </label>
          <div className="relative">
            <select
              id="timeRange"
              name="timeRange"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="time-range-error"
            >
              <option value="" disabled>
                Zeitraum auswählen
              </option>
              <option value="1h">Letzte Stunde</option>
              <option value="24h">Letzte 24 Stunden</option>
              <option value="7d">Letzte Woche</option>
              <option value="30d">Letzter Monat</option>
            </select>
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="time-range-error" aria-live="polite" aria-atomic="true">
            {state.errors?.timeRange &&
              state.errors.timeRange.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Analysis Type */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Analysetyp
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="trend"
                  name="analysisType"
                  type="radio"
                  value="trend"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="analysis-type-error"
                />
                <label
                  htmlFor="trend"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-600"
                >
                  Trendanalyse <ChartBarIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="anomaly"
                  name="analysisType"
                  type="radio"
                  value="anomaly"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="analysis-type-error"
                />
                <label
                  htmlFor="anomaly"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-600"
                >
                  Anomalieerkennung <BeakerIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="analysis-type-error" aria-live="polite" aria-atomic="true">
            {state.errors?.analysisType &&
              state.errors.analysisType.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        {/* General Error Message */}
        {state.message && (
          <div aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">
              {state.message}
            </p>
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/analysis"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Abbrechen
        </Link>
        <Button type="submit">Analyse erstellen</Button>
      </div>
    </form>
  );
}
