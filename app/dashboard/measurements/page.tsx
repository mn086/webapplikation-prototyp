import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import Table from '@/app/ui/measurements/table';
import { CreateMeasurement } from '@/app/ui/measurements/buttons';
import { TableSkeleton } from '@/app/ui/skeletons';
import { fetchMeasurementsPages } from '@/app/lib/data';
import Pagination from '@/app/ui/pagination';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Messungen',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {  const query = (await searchParams)?.query || '';
  const currentPage = Number((await searchParams)?.page) || 1;
  const totalPages = await fetchMeasurementsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Messungen</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Messungen suchen..." />
        <CreateMeasurement />
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
