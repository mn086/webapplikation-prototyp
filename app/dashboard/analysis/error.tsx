// Markiert diese Komponente als Client-Komponente, da sie interaktive Elemente enthält
'use client';
 
// Importiere den useEffect Hook für Seiteneffekte
import { useEffect } from 'react';
 
// Error-Boundary-Komponente für die Analyse-Seite
// Diese Komponente wird automatisch von Next.js angezeigt, wenn in der Analyse-Seite
// oder deren Unterkomponenten ein Fehler auftritt
export default function Error({
  error,   // Der aufgetretene Fehler (kann einen optionalen digest für Fehler-Tracking enthalten)
  reset,   // Funktion zum Zurücksetzen der Komponente und erneuten Versuch
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Protokolliere den Fehler in der Browser-Konsole
  // Hier könnte auch ein Fehler-Tracking-Service wie Sentry eingebunden werden
  useEffect(() => {
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Etwas ist schiefgelaufen!</h2>
      <button
        className="mt-4 rounded-md bg-[#3E4847] px-4 py-2 text-sm text-white transition-colors hover:bg-[#4a5553]"
        onClick={
          // Versuche die Seite neu zu laden durch Aufruf der reset-Funktion
          () => reset()
        }
      >
        Erneut versuchen
      </button>
    </main>
  );
}