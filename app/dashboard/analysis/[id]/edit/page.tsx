// Importiere benötigte Komponenten und Funktionen
import Form from '@/app/ui/analysis/edit-form';
import Breadcrumbs from '@/app/ui/analysis/breadcrumbs';
import { fetchMeasurementById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MeasurementForm } from '@/app/lib/definitions';

// Setze den Seitentitel für die Metadaten
export const metadata: Metadata = {
  title: 'Messung analysieren',
};

// Hauptkomponente der Seite für die Analyse-Bearbeitung
// Props enthalten die Messungs-ID aus der URL
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  // Hole die Messungsdaten aus der Datenbank
  const rawMeasurement = await fetchMeasurementById(id);

  // Zeige 404-Seite, wenn keine Messung gefunden wurde
  if (!rawMeasurement) {
    notFound();
  }

  // Bereite die Messungsdaten für das Formular vor
  // Setze Standardwerte für optionale Felder
  const measurement: MeasurementForm = {
    ...rawMeasurement,
    id,
    filename: rawMeasurement.filename || '',
    description: rawMeasurement.description || '',
    status: rawMeasurement.status || 'offen'
  };
  
  return (
    <main>
      {/* Navigationsleiste mit Breadcrumbs für die Navigation */}
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Messungen', href: '/dashboard/analysis' },
          {
            label: 'Messung analysieren',
            href: `/dashboard/analysis/${id}`,
            active: true,
          },
        ]}
      />
      {/* Bearbeitungsformular mit den Messungsdaten */}
      <Form measurement={measurement} />
    </main>
  );
}