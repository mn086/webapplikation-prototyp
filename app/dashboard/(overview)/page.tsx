// Import der benötigten Komponenten und Schriftarten
import CardWrapper from '@/app/ui/dashboard/cards';
import LatestMeasurements from '@/app/ui/dashboard/latest-measurements';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardsSkeleton, LatestMeasurementsSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';

// Definition der Seiten-Metadaten für Next.js
export const metadata: Metadata = {
  title: 'Dashboard',
};

// Hauptkomponente der Dashboard-Seite
// Zeigt eine Übersicht der wichtigsten Daten und Messungen an
export default async function Page() {
  return (
    <main>
      {/* Überschrift mit angepasster Schriftart und responsiver Größe */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      {/* Grid-Layout für die Statistik-Karten
          - Auf kleinen Bildschirmen: 1 Spalte
          - Auf Tablets (sm): 2 Spalten
          - Auf großen Bildschirmen (lg): 4 Spalten */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>

      {/* Bereich für die neuesten Messungen
          Wird mit einem Abstand nach oben dargestellt */}
      <div className="mt-6">
        <Suspense fallback={<LatestMeasurementsSkeleton />}>
          <LatestMeasurements />
        </Suspense>
      </div>
    </main>
  );
}