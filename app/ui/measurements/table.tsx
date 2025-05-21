import { fetchFilteredMeasurements } from '@/app/lib/data';
import { DeleteMeasurement, UpdateMeasurement } from '@/app/ui/measurements/buttons';
import { formatDateToLocal } from '@/app/lib/utils';
import { MeasurementTableEntry } from '@/app/lib/data';
import MeasurementStatus from '@/app/ui/measurements/status';

export default async function MeasurementsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const measurements = await fetchFilteredMeasurements(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">          <div className="md:hidden">
            {measurements?.map((measurement) => (
              <div
                key={measurement.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p className="font-medium">{measurement.filename}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatDateToLocal(measurement.created_at)}
                    </p>
                  </div>
                  <MeasurementStatus status={measurement.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{measurement.channel_count} Kanäle</p>
                    <p className="text-sm text-gray-500">{measurement.description}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateMeasurement id={measurement.id} />
                    <DeleteMeasurement id={measurement.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg bg-gray-50 text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Dateiname
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Erstellt
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Kanäle
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Beschreibung
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Aktionen</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {measurements?.map((measurement) => (
                <tr
                  key={measurement.id}
                  className="group hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap py-5 pl-6 pr-3 text-sm">
                    <p className="font-medium">{measurement.filename}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm">
                    {formatDateToLocal(measurement.created_at)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm">
                    <MeasurementStatus status={measurement.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm">
                    {measurement.channel_count}
                  </td>
                  <td className="px-3 py-5 text-sm">
                    {measurement.description || 'Keine Beschreibung'}
                  </td>
                  <td className="whitespace-nowrap py-5 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateMeasurement id={measurement.id} />
                      <DeleteMeasurement id={measurement.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
