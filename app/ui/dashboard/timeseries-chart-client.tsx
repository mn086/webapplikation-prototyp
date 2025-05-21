'use client';

import { Card, Title, LineChart } from '@tremor/react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

type TimeseriesDataPoint = {
  timestamp: string;
  channel1: number | null;
  channel2: number | null;
  channel3: number | null;
};

export default function TimeseriesChartClient({ data }: { data: TimeseriesDataPoint[] }) {
  if (!data || data.length === 0) {
    return <p className="mt-4 text-gray-400">Keine Daten verfügbar.</p>;
  }

  return (
    <Card className="w-full md:col-span-4">
      <Title>Zeitreihen Visualisierung</Title>
      <LineChart
        className="mt-6 h-[350px]"
        data={data}
        index="timestamp"
        categories={['channel1', 'channel2', 'channel3']}
        colors={['indigo', 'cyan', 'orange']}
        yAxisWidth={60}
        showLegend={true}
        showAnimation={true}
        curveType="monotone"
        valueFormatter={(value) => value != null ? value.toFixed(2) : 'N/A'}
        customTooltip={({ payload }) => {
          if (!payload?.[0]?.payload) return null;
          const timestamp = new Date(payload[0].payload.timestamp);
          return (
            <div className="p-2 bg-white rounded shadow">
              <div className="font-medium">
                {format(timestamp, 'PPpp', { locale: de })}
              </div>
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
