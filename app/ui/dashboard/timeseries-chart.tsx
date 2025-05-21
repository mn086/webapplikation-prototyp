import { fetchTimeseriesData } from '@/app/lib/data';
import TimeseriesChartClient from './timeseries-chart-client';

export default async function TimeseriesChart() {
  const data = await fetchTimeseriesData();
  return <TimeseriesChartClient data={data} />;
}
