// Zentrale Datenbankverbindung und Typdefinitionen
import postgres from 'postgres';

// Konfiguration für die Neon PostgreSQL-Verbindung
// Verwendet Connection Pooling für optimale Leistung und Skalierbarkeit
const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: 'require',              // SSL-Verschlüsselung für sichere Verbindung
    max: 10,                     // Maximale Anzahl gleichzeitiger Verbindungen
    idle_timeout: 20,            // Timeout für inaktive Verbindungen
    connect_timeout: 30,         // Timeout für Verbindungsaufbau
    connection: {
        options: '-c timezone=UTC'  // Konsistente Zeitzoneneinstellung
    }
});

// Typdefinitionen für typsichere Datenbankzugriffe

// Basistyp für Messungen: Enthält ID, Zeitstempel und die Messwerte der Kanäle
export type Measurement = {
    id: string;
    timestamp: Date;
    channel1: number | null;    // Messwerte können auch fehlen (null)
    channel2: number | null;
    channel3: number | null;
};

// Metadaten zu einer Messung: Zusätzliche Informationen und Status
export type Metadata = {
    id: string;
    measurement_id: string;     // Fremdschlüssel zur Messung
    filename: string;           // Name der Originaldatei
    created_at: Date;          // Erstellungszeitpunkt
    description: string | null; // Optionale Beschreibung
    status: 'validiert' | 'offen';  // Validierungsstatus
};

// Exportiere die SQL-Verbindungsinstanz für Verwendung in anderen Modulen
export default sql;
