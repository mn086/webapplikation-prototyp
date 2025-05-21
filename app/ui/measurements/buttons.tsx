import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteMeasurement } from '@/app/lib/actions';

export function CreateMeasurement() {
  return (
    <Link
      href="/dashboard/measurements/create"
      className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-600"
    >
      <PlusIcon className="w-5" />
      <span>Neue Messung</span>
    </Link>
  );
}

export function UpdateMeasurement({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/measurements/${id}/edit`}
      className="rounded-md border p-2 transition-colors hover:bg-blue-50 hover:text-blue-600"
    >
      <span className="sr-only">Bearbeiten</span>
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteMeasurement({ id }: { id: string }) {
  const deleteMeasurementWithId = deleteMeasurement.bind(null, id);
  
  return (
    <form action={deleteMeasurementWithId}>
      <button className="rounded-md border p-2 transition-colors hover:bg-red-50 hover:text-red-600">
        <span className="sr-only">Löschen</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
