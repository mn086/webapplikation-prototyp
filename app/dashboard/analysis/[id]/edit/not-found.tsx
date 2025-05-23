// Importiere die benötigten Komponenten
import Link from 'next/link';                            // Next.js Link für clientseitige Navigation
import { FaceFrownIcon } from '@heroicons/react/24/outline';  // Trauriges Gesicht Icon für 404-Seite
 
// Diese Komponente wird automatisch von Next.js angezeigt,
// wenn eine Messung mit der angegebenen ID nicht gefunden wurde
export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      {/* Trauriges Gesicht Icon */}
      <FaceFrownIcon className="w-10 text-gray-400" />
      {/* Fehlermeldung */}
      <h2 className="text-xl font-semibold">404 Nicht gefunden</h2>
      <p>Die angeforderte Messung konnte nicht gefunden werden.</p>
      {/* Zurück-Button zur Übersicht */}
      <Link
        href="/dashboard/analysis"
        className="mt-4 rounded-md bg-[#3E4847] px-4 py-2 text-sm text-white transition-colors hover:bg-[#4a5553]"
      >
        Zurück zur Übersicht
      </Link>
    </main>
  );
}