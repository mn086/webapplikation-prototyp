import { fetchTimeseriesData } from '@/app/lib/data';
import { Card } from '@tremor/react';
import { LineChart } from '@tremor/react';

export default async function TimeseriesChart() {
  const data = await fetchTimeseriesData();

  const chartData = data.map((measurement) => ({
    timestamp: measurement.timestamp.toISOString(),
    'Kanal 1': measurement.channel1 || 0,
    'Kanal 2': measurement.channel2 || 0,
    'Kanal 3': measurement.channel3 || 0,
  }));

  return (
    <Card className="mt-6">
      <h3 className="text-lg font-medium">Zeitreihen Visualisierung</h3>
      <LineChart
        className="mt-4 h-72"
        data={chartData}
        index="timestamp"
        categories={['Kanal 1', 'Kanal 2', 'Kanal 3']}
        colors={['blue', 'green', 'red']}
        yAxisWidth={40}
        enableLegend={true}
      />
    </Card>
  );
}
