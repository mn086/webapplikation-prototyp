// Importiere die benötigten Icons aus der Heroicons-Bibliothek
import {
  ChartBarIcon,    // Icon für Gesamtmessungen
  CheckCircleIcon, // Icon für validierte Messungen
  ClockIcon,      // Icon für offene Messungen
  ServerIcon,     // Icon für Apache-Messungen
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchDashboardData } from '@/app/lib/data';
import { fetchPHPMeasurementCount } from '@/app/lib/php-api';

// Zuordnung von Kartentypen zu entsprechenden Icons
const iconMap = {
  measurements: ChartBarIcon,
  validated: CheckCircleIcon,
  open: ClockIcon,
  apache: ServerIcon,
};

// Komponente zum Rendern aller Statistik-Karten
// Lädt die Daten und zeigt sie in einzelnen Card-Komponenten an
export default async function CardWrapper() {
  // Hole die Statistiken aus der PostgreSQL-Datenbank
  const {
    numberOfMeasurements,
    validatedCount,
    openCount,
  } = await fetchDashboardData();
  
  // Hole die Anzahl der Messungen vom Apache Webservice
  const phpMeasurementCount = await fetchPHPMeasurementCount();

  return (
    <>
      <Card 
        title="Gesamt Messungen" 
        value={numberOfMeasurements} 
        type="measurements" 
      />
      <Card 
        title="Validierte Messungen" 
        value={validatedCount} 
        type="validated" 
      />
      <Card
        title="Offene Messungen"
        value={openCount}
        type="open"      />
      <Card
        title="Messungen auf Apache Webserver"
        value={phpMeasurementCount}
        type="apache"
      />
    </>
  );
}

// Einzelne Statistik-Karten-Komponente
// Zeigt einen Titel, einen Wert und ein passendes Icon an
export function Card({
  title,    // Titel der Karte
  value,    // Anzuzeigende Zahl oder Text
  type,     // Art der Karte (bestimmt das Icon)
}: {
  title: string;
  value: number | string;
  type: 'measurements' | 'validated' | 'open' | 'apache';
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
