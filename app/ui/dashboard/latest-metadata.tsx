import { fetchLatestMetadata } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';

export default async function LatestMetadata() {
  const latestMetadata = await fetchLatestMetadata();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Neueste Metadaten
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestMetadata.map((metadata, i) => {
            return (
              <div
                key={metadata.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {metadata.filename}
                    </p>
                    <p className="text-xs text-gray-500 sm:hidden">
                      {metadata.description || 'Keine Beschreibung'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="hidden sm:block">
                    <p className="text-sm text-gray-500">
                      {metadata.status === 'validiert' ? (
                        <span className="text-green-600">Validiert</span>
                      ) : (
                        <span className="text-yellow-600">Offen</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(metadata.created_at, { 
                        addSuffix: true,
                        locale: de 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">
            Automatisch aktualisiert
          </h3>
        </div>
      </div>
    </div>
  );
}
