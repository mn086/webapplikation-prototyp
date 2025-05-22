import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function MeasurementStatus({ status }: { status: 'validiert' | 'offen' }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium',
        {
          'bg-green-500 text-white': status === 'validiert',
          'bg-gray-100 text-gray-600': status === 'offen',
        },
      )}
    >
      {status === 'validiert' ? (
        <>
          <CheckIcon className="mr-1 w-4" />
          validiert
        </>
      ) : (
        <>
          <ClockIcon className="mr-1 w-4" />
          offen
        </>
      )}
    </span>
  );
}
