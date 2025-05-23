// Importiere die benötigten Komponenten und Module
import Pagination from '@/app/ui/pagination';           // Komponente für die Seitennavigation
import Search from '@/app/ui/search';                  // Suchleiste
import Table from '@/app/ui/analysis/table';           // Tabelle für die Messungsliste 
import { CreateAnalysis } from '@/app/ui/analysis/buttons';  // Button zum Erstellen einer neuen Auswertung
import { lusitana } from '@/app/ui/fonts';            // Spezielle Schriftart für Überschriften
import { MeasurementsTableSkeleton } from '@/app/ui/skeletons';  // Lade-Animation für die Tabelle
import { Suspense } from 'react';                     // React-Komponente für asynchrones Laden
import { fetchMeasurementsPages } from '@/app/lib/data';  // Funktion zum Abrufen der Seitenanzahl
import { Metadata } from 'next';                      // Next.js Metadaten-Typ

// Definiere die Metadaten für die Seite (wird im Browser-Tab angezeigt)
export const metadata: Metadata = {
  title: 'Messungen',
};

// Hauptkomponente der Messungsübersicht
// Props enthalten die URL-Suchparameter für Suche und Paginierung
export default async function Page(props: {
    searchParams?: Promise<{
      query?: string;      // Suchbegriff aus der URL
      page?: string;       // Aktuelle Seitennummer
    }>;
  }) {
    // Extrahiere und verarbeite die URL-Parameter
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';              // Suchbegriff (leer wenn nicht vorhanden)
    const currentPage = Number(searchParams?.page) || 1;  // Aktuelle Seite (1 wenn nicht vorhanden)
    const totalPages = await fetchMeasurementsPages(query);  // Hole Gesamtanzahl der Seiten
   
    return (
      <div className="w-full">
        {/* Kopfbereich mit Titel */}
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Messungen</h1>
        </div>
        {/* Suchleiste und Button für neue Auswertung */}
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Messungen durchsuchen..." />
          <CreateAnalysis />
        </div>
        {/* Tabelle mit Messungen, eingepackt in Suspense für asynchrones Laden */}
        <Suspense key={query + currentPage} fallback={<MeasurementsTableSkeleton />}>
          <Table query={query} currentPage={currentPage} />
        </Suspense>
        {/* Seitennavigation */}
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    );
  }