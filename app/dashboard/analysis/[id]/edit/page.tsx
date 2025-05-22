import Form from '@/app/ui/analysis/edit-form';
import Breadcrumbs from '@/app/ui/analysis/breadcrumbs';
import { fetchMeasurementById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MeasurementForm } from '@/app/lib/definitions';

export const metadata: Metadata = {
  title: 'Messung analysieren',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {  const params = await props.params;
  const id = params.id;  const rawMeasurement = await fetchMeasurementById(id);

  if (!rawMeasurement) {
    notFound();
  }

  const measurement: MeasurementForm = {
    ...rawMeasurement,
    id,
    filename: rawMeasurement.filename || '',
    description: rawMeasurement.description || '',
    status: rawMeasurement.status || 'offen'
  };
  
  return (
    <main>      <Breadcrumbs
        breadcrumbs={[
          { label: 'Messungen', href: '/dashboard/measurements' },
          {
            label: 'Messung analysieren',
            href: `/dashboard/analysis/${id}`,
            active: true,
          },
        ]}
      />
      <Form measurement={measurement} />
    </main>
  );
}