// Shimmer-Animation für Lade-Zustände
// Erzeugt einen gleitenden Schimmer-Effekt über die Komponenten während des Ladens
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

// Skeleton für eine einzelne Statistik-Karte
// Zeigt einen Platzhalter für eine Statistik-Karte mit Icon und Wert an
export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

// Skeleton für eine Gruppe von vier Statistik-Karten
// Wird im Dashboard verwendet, um die Lade-Animation für alle Karten anzuzeigen
export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

// Skeleton für das Zeitreihen-Diagramm
// Zeigt einen Platzhalter für das Diagramm mit Überschrift und Legende an
export function TimeseriesChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="h-[350px] w-full rounded-lg bg-gray-200" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

// Haupt-Skeleton für das gesamte Dashboard
// Kombiniert alle Skeleton-Komponenten für die Dashboard-Ansicht
export default function DashboardSkeleton() {
  return (
    <>
      {/* Überschrift-Skeleton */}
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      {/* Grid für Statistik-Karten */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>      
      {/* Bereich für neueste Messdaten */}
      <div className="mt-6">
        <LatestMeasurementsSkeleton />
      </div>
    </>
  );
}

// Skeleton für eine einzelne Tabellenzeile
// Zeigt Platzhalter für alle Spalten einer Messungstabelle an
export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

// Skeleton für die mobile Ansicht einer Messung
// Zeigt einen Platzhalter für eine Messung in der mobilen Darstellung
export function MeasurementMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      {/* Oberer Bereich mit Titel und Status */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      {/* Unterer Bereich mit Zusatzinfos und Aktionsbuttons */}
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

// Skeleton für die komplette Messungstabelle
// Enthält sowohl die mobile als auch die Desktop-Ansicht der Tabelle
export function MeasurementsTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <MeasurementMobileSkeleton />
            <MeasurementMobileSkeleton />
            <MeasurementMobileSkeleton />
            <MeasurementMobileSkeleton />
            <MeasurementMobileSkeleton />
            <MeasurementMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created At
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Skeleton für die neuesten Messungen
// Zeigt Platzhalter für die letzten 5 Messungen im Dashboard an
export function LatestMeasurementsSkeleton() {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex flex-row items-center justify-between py-4"
            >
              <div className="flex items-center">
                <div className="min-w-0">
                  <div className="h-5 w-32 rounded-md bg-gray-200" />
                  <div className="mt-2 h-4 w-24 rounded-md bg-gray-200" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-16 rounded-md bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Skeleton für eine allgemeine Tabelle
// Kann für verschiedene Tabellen-Ansichten verwendet werden
export function TableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <div className="mb-2 w-full rounded-md bg-white p-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <div className="mb-2 w-32 rounded-md bg-gray-200 h-5" />
                  <div className="w-24 rounded-md bg-gray-200 h-4" />
                </div>
                <div className="h-4 w-16 rounded-md bg-gray-200" />
              </div>
              <div className="flex w-full items-center justify-between pt-4">
                <div>
                  <div className="h-5 w-16 rounded-md bg-gray-200" />
                  <div className="mt-2 h-4 w-24 rounded-md bg-gray-200" />
                </div>
                <div className="flex justify-end gap-2">
                  <div className="h-8 w-8 rounded-md bg-gray-200" />
                  <div className="h-8 w-8 rounded-md bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
