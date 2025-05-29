import { fetchTimeseriesData } from '@/app/lib/data';
import TimeseriesChartClient from './timeseries-chart-client';
import { type TimeseriesDataPoint } from '@/app/lib/definitions';

export default async function TimeseriesChart() {
  const rawData = await fetchTimeseriesData();
  
  // Transformiere die Daten in das erwartete Format
  const transformedData: TimeseriesDataPoint[] = [];
  
  for (const measurement of rawData) {
    for (const point of measurement.data) {
      const dataPoint: TimeseriesDataPoint = {
        seconds: point.seconds_from_start
      };
      
      // Füge alle Kanalwerte hinzu
      for (const channel of measurement.channels) {
        if (typeof point[channel] === 'number') {
          dataPoint[channel] = point[channel];
        }
      }
      
      transformedData.push(dataPoint);
    }
  }

  return <TimeseriesChartClient data={transformedData} />;
}
