-- Lösche existierende Tabellen und Indizes
DROP TABLE IF EXISTS metadata CASCADE;
DROP TABLE IF EXISTS measurements CASCADE;

-- Erstelle measurements Tabelle
CREATE TABLE measurements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    channel1 DOUBLE PRECISION,
    channel2 DOUBLE PRECISION,
    channel3 DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Erstelle metadata Tabelle
CREATE TABLE metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    measurement_id UUID NOT NULL REFERENCES measurements(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    status VARCHAR(10) NOT NULL DEFAULT 'offen' CHECK (status IN ('validiert', 'offen'))
);

-- Erstelle Indizes für häufige Abfragen
CREATE INDEX idx_measurements_timestamp ON measurements(timestamp);
CREATE INDEX idx_metadata_measurement_id ON metadata(measurement_id);
CREATE INDEX idx_metadata_status ON metadata(status);
