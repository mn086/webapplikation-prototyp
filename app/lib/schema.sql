-- Lösche existierende Tabellen und Indizes
DROP TABLE IF EXISTS measurement_values CASCADE;
DROP TABLE IF EXISTS measurement_channels CASCADE;
DROP TABLE IF EXISTS metadata CASCADE;
DROP TABLE IF EXISTS measurements CASCADE;

-- Erstelle measurements Tabelle (Haupttabelle für Messungen)
CREATE TABLE measurements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Erstelle metadata Tabelle (Metadaten zu einer Messung)
CREATE TABLE metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    measurement_id UUID NOT NULL REFERENCES measurements(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    status VARCHAR(10) NOT NULL DEFAULT 'offen' CHECK (status IN ('validiert', 'offen'))
);

-- Erstelle measurement_channels Tabelle (Definiert die Kanäle einer Messung)
CREATE TABLE measurement_channels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    measurement_id UUID NOT NULL REFERENCES measurements(id) ON DELETE CASCADE,
    channel_name VARCHAR(255) NOT NULL,
    unit VARCHAR(50),
    UNIQUE(measurement_id, channel_name)
);

-- Erstelle measurement_values Tabelle (Enthält die eigentlichen Messwerte)
CREATE TABLE measurement_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    measurement_id UUID NOT NULL REFERENCES measurements(id) ON DELETE CASCADE,
    seconds_from_start DOUBLE PRECISION NOT NULL,
    channel_id UUID NOT NULL REFERENCES measurement_channels(id),
    value DOUBLE PRECISION NOT NULL
);

-- Erstelle Indizes für häufige Abfragen
CREATE INDEX idx_metadata_measurement_id ON metadata(measurement_id);
CREATE INDEX idx_metadata_status ON metadata(status);
CREATE INDEX idx_measurement_values_measurement_id ON measurement_values(measurement_id);
CREATE INDEX idx_measurement_values_seconds ON measurement_values(seconds_from_start);
CREATE INDEX idx_measurement_channels_measurement_id ON measurement_channels(measurement_id);
