// Basis-URL für den Apache Webservice
const API_BASE_URL = 'http://localhost:8090';

// Typ für eine einzelne Messung aus dem PHP-Backend
export type PHPMeasurement = {
  id: string;          // Eindeutige ID der Messung
  filename: string;    // Name der JSON-Datei
  path: string;        // Pfad zur JSON-Datei
};

// Typ für die Antwort der list.php API
export type PHPListResponse = {
  measurements: PHPMeasurement[];  // Liste aller verfügbaren Messungen
};

// Typ für die detaillierten Messdaten einer einzelnen Messung
export type PHPMeasurementData = {
  id: string;
  metadata: {
    filename: string;                      // Name der Messdatei
    description: string;                   // Beschreibung der Messung
    status: 'offen' | 'validiert';        // Validierungsstatus
    created_at: string;                    // Erstellungszeitpunkt
  };
  channels: string[];                      // Liste der verfügbaren Messkanäle
  data: Array<{
    seconds_from_start: number;            // Zeit seit Messbeginn in Sekunden
    [channelName: string]: number;         // Dynamische Kanalwerte
  }>;
};

// Typ für die Antwort der count.php API
export type PHPCountResponse = {
  count: number;       // Anzahl der verfügbaren Messungen
};

// Lädt die Liste aller verfügbaren Messungen vom PHP-Backend
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

// Lädt die detaillierten Messdaten für eine bestimmte Messung
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

// Lädt die Gesamtanzahl der verfügbaren Messungen vom PHP-Backend
export async function fetchPHPMeasurementCount(): Promise<number> {
  try {
    const response = await fetch(`${API_BASE_URL}/measurements/api/count.php`);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    const data: PHPCountResponse = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error fetching PHP measurement count:', error);
    throw error;
  }
}
