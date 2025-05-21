import CardWrapper from '@/app/ui/dashboard/cards';
import TimeseriesChart from '@/app/ui/dashboard/timeseries-chart';
import LatestMetadata from '@/app/ui/dashboard/latest-metadata';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardsSkeleton, LatestMetadataSkeleton, TimeseriesChartSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<TimeseriesChartSkeleton />}>
          <TimeseriesChart />
        </Suspense>
        <Suspense fallback={<LatestMetadataSkeleton />}>
          <LatestMetadata />
        </Suspense>
      </div>
    </main>
  );
}