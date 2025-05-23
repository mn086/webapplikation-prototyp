
// Importiere benötigte Icons und Komponenten
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';  // Icons für Bearbeiten, Hinzufügen und Löschen
import Link from 'next/link';                            // Next.js Link-Komponente
import { deleteMeasurement } from '@/app/lib/actions';   // Server-Action zum Löschen einer Messung

// Button-Komponente zum Erstellen einer neuen Auswertung
export function CreateAnalysis() {
  return (
    <Link
      href="/dashboard/analysis/create"
      className="flex h-10 items-center rounded-lg bg-[#3E4847] px-4 text-sm font-medium text-white transition-colors hover:bg-[#4a5553] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2001a]"
    >
      <span className="hidden md:block">Neue Auswertung</span>{' '}  {/* Text nur auf Desktop sichtbar */}
      <PlusIcon className="h-5 md:ml-4" />  {/* Plus-Icon mit Abstand auf Desktop */}
    </Link>
  );
}

// Button-Komponente zum Bearbeiten einer bestehenden Auswertung
export function UpdateAnalysis({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/analysis/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />  {/* Stift-Icon für Bearbeiten */}
    </Link>
  );
}

// Button-Komponente zum Löschen einer Auswertung
export function DeleteAnalysis({ id }: { id: string }) {
  return (
    <form action={async () => {
      'use server';  // Markiert den Code als Server-Action
      await deleteMeasurement(id);  // Führt das Löschen auf dem Server aus
    }}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Löschen</span>  {/* Text nur für Screen-Reader */}
        <TrashIcon className="w-5" />  {/* Mülleimer-Icon für Löschen */}
      </button>
    </form>
  );
}
