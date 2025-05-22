import Form from '@/app/ui/analysis/create-form';
import Breadcrumbs from '@/app/ui/analysis/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Neue Auswertung',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Auswertungen', href: '/dashboard/analysis' },
          {
            label: 'Neue Auswertung',
            href: '/dashboard/analysis/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}