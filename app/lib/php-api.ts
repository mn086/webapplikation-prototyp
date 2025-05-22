const API_BASE_URL = 'http://localhost:8090';

export type PHPMeasurement = {
  id: string;
  filename: string;
  path: string;
};

export type PHPListResponse = {
  measurements: PHPMeasurement[];
};

export type PHPMeasurementData = {
  id: string;
  metadata: {
    filename: string;
    description: string;
    status: 'offen' | 'validiert';
    created_at: string;
  };
  channels: string[];
  data: Array<{
    seconds_from_start: number;
    [channelName: string]: number;
  }>;
};

export async function fetchAvailableMeasurements(): Promise<PHPMeasurement[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/measurements/api/list.php`);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    const data: PHPListResponse = await response.json();
    return data.measurements;
  } catch (error) {
    console.error('Error fetching PHP measurements:', error);
    throw error;
  }
}

export async function fetchMeasurementData(id: string): Promise<PHPMeasurementData> {
  try {
    const response = await fetch(`${API_BASE_URL}/measurements/api/get.php?id=${encodeURIComponent(id)}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    const data: PHPMeasurementData = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching measurement data:', error);
    throw error;
  }
}
