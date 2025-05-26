/**
 * Diese Datei implementiert die TypeScript-Schnittstelle zur externen PHP-API.
 * Sie definiert die Datentypen und stellt Funktionen für den API-Zugriff bereit.
 */

// Basis-URL des Apache Webservers, der die PHP-API hostet
const API_BASE_URL = 'http://localhost:8090';

/**
 * Repräsentiert eine einzelne Messung in der Übersichtsliste.
 * Diese Daten werden von der list.php API zurückgegeben.
 */
export type PHPMeasurement = {
  id: string;          // Eindeutige ID zur Identifikation der Messung
  filename: string;    // Name der zugehörigen JSON-Datei
  path: string;        // Vollständiger Pfad zur JSON-Datei im Dateisystem
};

/**
 * Typ für die Antwort der list.php API.
 * Enthält ein Array aller verfügbaren Messungen.
 */
export type PHPListResponse = {
  measurements: PHPMeasurement[];  // Array mit allen verfügbaren Messungen
};

/**
 * Detaillierte Messdaten einer einzelnen Messung.
 * Diese Struktur wird von der get.php API zurückgegeben und enthält
 * sowohl Metadaten als auch die eigentlichen Messwerte.
 */
export type PHPMeasurementData = {
  id: string;
  metadata: {
    filename: string;                      // Name der Quelldatei
    description: string;                   // Optionale Beschreibung der Messung
    status: 'offen' | 'validiert';        // Aktueller Bearbeitungsstatus
    created_at: string;                    // Zeitstempel der Erstellung
  };
  channels: string[];                      // Namen der verfügbaren Messkanäle
  data: Array<{
    seconds_from_start: number;            // Zeitpunkt des Messpunkts
    [channelName: string]: number;         // Messwerte pro Kanal (dynamisch)
  }>;
};

/**
 * Typ für die Antwort der count.php API.
 * Enthält die Gesamtanzahl der verfügbaren Messungen.
 */
export type PHPCountResponse = {
  count: number;       // Gesamtanzahl der Messungen im System
};

/**
 * Ruft die Liste aller verfügbaren Messungen vom PHP-Backend ab.
 * Diese Funktion wird für die Übersichtsseite verwendet.
 * 
 * @returns Promise mit einem Array von PHPMeasurement-Objekten
 * @throws Error wenn die API nicht erreichbar ist oder einen Fehler zurückgibt
 */
export async function fetchAvailableMeasurements(): Promise<PHPMeasurement[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/measurements/api/list.php`);
    if (!response.ok) {
      throw new Error(`API-Fehler: ${response.statusText}`);
    }
    const data: PHPListResponse = await response.json();
    return data.measurements;
  } catch (error) {
    console.error('Fehler beim Abrufen der PHP-Messungen:', error);
    throw error;
  }
}

/**
 * Lädt die vollständigen Messdaten für eine bestimmte Messung.
 * 
 * @param id - Die eindeutige ID der gewünschten Messung
 * @returns Promise mit den detaillierten Messdaten
 * @throws Error bei API- oder Netzwerkfehlern
 */
export async function fetchMeasurementData(id: string): Promise<PHPMeasurementData> {
  try {
    const response = await fetch(`${API_BASE_URL}/measurements/api/get.php?id=${encodeURIComponent(id)}`);
    if (!response.ok) {
      throw new Error(`API-Fehler: ${response.statusText}`);
    }
    const data: PHPMeasurementData = await response.json();
    return data;
  } catch (error) {
    console.error('Fehler beim Laden der Messdaten:', error);
    throw error;
  }
}

/**
 * Ermittelt die Gesamtanzahl der im PHP-Backend verfügbaren Messungen.
 * Wird für Paginierung und Statistiken verwendet.
 * 
 * @returns Promise mit der Anzahl der Messungen
 * @throws Error bei Kommunikationsproblemen mit der API
 */
export async function fetchPHPMeasurementCount(): Promise<number> {
  try {
    const response = await fetch(`${API_BASE_URL}/measurements/api/count.php`);
    if (!response.ok) {
      throw new Error(`API-Fehler: ${response.statusText}`);
    }
    const data: PHPCountResponse = await response.json();
    return data.count;
  } catch (error) {
    console.error('Fehler beim Abrufen der Messungsanzahl:', error);
    throw error;
  }
}
