import {
  ChartBarIcon,
  DocumentIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchDashboardData } from '@/app/lib/data';

const iconMap = {
  measurements: ChartBarIcon,
  metadata: DocumentIcon,
  validated: CheckCircleIcon,
  open: ClockIcon,
};

export default async function CardWrapper() {
  const {
    numberOfMeasurements,
    numberOfMetadata,
    validatedCount,
    openCount,
  } = await fetchDashboardData();
  
  return (
    <>
      <Card 
        title="Messungen" 
        value={numberOfMeasurements} 
        type="measurements" 
      />
      <Card 
        title="Metadaten" 
        value={numberOfMetadata} 
        type="metadata" 
      />
      <Card 
        title="Validierte Einträge" 
        value={validatedCount} 
        type="validated" 
      />
      <Card
        title="Offene Einträge"
        value={openCount}
        type="open"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'measurements' | 'metadata' | 'validated' | 'open';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
