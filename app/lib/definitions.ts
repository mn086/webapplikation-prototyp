// Diese Datei enthält die TypeScript-Definitionen für die Datenstrukturen.
// Sie beschreibt die Form der Daten und deren zulässige Datentypen.

// Benutzer-Typ für die Authentifizierung
export type User = {
  id: string;      // Eindeutige Benutzer-ID
  name: string;    // Anzeigename des Benutzers
  email: string;   // E-Mail-Adresse für Login
  password: string; // Verschlüsseltes Passwort
};

// Typ für das Messungsformular mit allen relevanten Daten
export type MeasurementForm = {
  id: string;                          // Eindeutige Messungs-ID
  filename: string;                    // Name der Messdatei
  description: string | null;          // Optionale Beschreibung der Messung
  status: 'offen' | 'validiert';      // Validierungsstatus der Messung
  channels: string[];                  // Liste der verfügbaren Messkanäle
  data: {
    seconds_from_start: number;        // Zeitpunkt der Messung in Sekunden
    [key: string]: number;            // Dynamische Kanalwerte, indiziert nach Kanalnamen
  }[];
};

// Typ für einen einzelnen Datenpunkt in der Zeitreihenvisualisierung
export type TimeseriesDataPoint = {
  timestamp: string;                           // ISO-formatierter Zeitstempel für die Darstellung
  seconds_from_start: number;                  // Relative Zeit seit Messbeginn
  [key: string]: string | number | null;      // Dynamische Kanalwerte mit flexiblen Datentypen
};
