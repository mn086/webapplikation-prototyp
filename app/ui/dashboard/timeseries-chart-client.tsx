// Markiert dies als Client-Komponente für dynamisches Rendering
'use client';

// Importiere benötigte Komponenten und Funktionen
import { Card, Title, LineChart } from '@tremor/react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

// Definiere den Typ für einen Datenpunkt in der Zeitreihe
// Enthält einen Zeitstempel und beliebig viele Kanalwerte
type TimeseriesDataPoint = {
  timestamp: string;
  [key: string]: string | number | null;  // Dynamische Kanäle mit flexiblen Datentypen
};

// Hauptkomponente für die Visualisierung von Zeitreihendaten
export default function TimeseriesChartClient({ data }: { data: TimeseriesDataPoint[] }) {
  // Zeige Hinweis wenn keine Daten verfügbar sind
  if (!data || data.length === 0) {
    return <p className="mt-4 text-gray-400">Keine Daten verfügbar.</p>;
  }

  // Render das Liniendiagramm
  return (
    <Card className="w-full md:col-span-4">
      <Title>Zeitreihen Visualisierung</Title>
      <LineChart
        className="mt-6 h-[350px]"
        data={data}
        index="timestamp"
        // Extrahiere alle Kanalnamen aus den Daten (außer 'timestamp')
        categories={Object.keys(data[0] || {}).filter(key => key !== 'timestamp')}
        // Farbpalette für die verschiedenen Kanäle
        colors={['indigo', 'cyan', 'orange', 'green', 'red', 'purple', 'yellow']}
        yAxisWidth={60}
        showLegend={true}
        showAnimation={true}
        curveType="monotone"
        // Formatiere die Werte mit 2 Nachkommastellen
        valueFormatter={(value) => value != null ? value.toFixed(2) : 'N/A'}
        // Angepasster Tooltip für Details beim Hovern
        customTooltip={({ payload }) => {
          if (!payload?.[0]?.payload) return null;
          const timestamp = new Date(payload[0].payload.timestamp);
          return (
            <div className="p-2 bg-white rounded shadow">
              {/* Zeige formatiertes Datum und Uhrzeit */}
              <div className="font-medium">
                {format(timestamp, 'PPpp', { locale: de })}
              </div>
              {/* Zeige Werte aller Kanäle mit entsprechender Farbe */}
              {payload.map((item: any) => (
                <div key={item.name} style={{ color: item.color }}>
                  {item.name}: {Number(item.value).toFixed(2)}
                </div>
              ))}
            </div>
          );
        }}
      />
    </Card>
  );
}
