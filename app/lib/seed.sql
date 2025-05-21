-- Create a measurement
INSERT INTO measurements DEFAULT VALUES;

-- Get the measurement ID we just created
DO $$
DECLARE
    m_id uuid;
    temp_id uuid;
    pressure_id uuid;
BEGIN
    SELECT id INTO m_id FROM measurements ORDER BY created_at DESC LIMIT 1;
    
    -- Add metadata
    INSERT INTO metadata (measurement_id, filename, description, status)
    VALUES (m_id, 'temperatur_druck_20250521.csv', 'Temperatur- und Druckmessung Anlage A', 'validiert');
    
    -- Create channels
    INSERT INTO measurement_channels (measurement_id, channel_name, unit)
    VALUES (m_id, 'Temperatur', '°C')
    RETURNING id INTO temp_id;
    
    INSERT INTO measurement_channels (measurement_id, channel_name, unit)
    VALUES (m_id, 'Druck', 'bar')
    RETURNING id INTO pressure_id;
    
    -- Add sample values for temperature
    INSERT INTO measurement_values (measurement_id, channel_id, seconds_from_start, value)
    SELECT m_id, temp_id, t.seconds, 20 + random() * 5
    FROM generate_series(0, 60, 10) AS t(seconds);
    
    -- Add sample values for pressure
    INSERT INTO measurement_values (measurement_id, channel_id, seconds_from_start, value)
    SELECT m_id, pressure_id, t.seconds, 2.5 + random() * 0.5
    FROM generate_series(0, 60, 10) AS t(seconds);
END $$;
chan1 AS (
  INSERT INTO measurement_channels (measurement_id, channel_name, unit)
  SELECT id, 'Temperatur', '°C'  FROM new_measurement1
  RETURNING id, measurement_id
),
chan2 AS (
  INSERT INTO measurement_channels (measurement_id, channel_name, unit)
  SELECT id, 'Druck', 'bar'
  FROM new_measurement1
  RETURNING id, measurement_id
),
-- Definiere Messkanäle für die zweite Messung
chan3 AS (
  INSERT INTO measurement_channels (measurement_id, channel_name, unit)
  SELECT id, 'Durchfluss', 'l/min'
  FROM new_measurement2
  RETURNING id, measurement_id
),
chan4 AS (
  INSERT INTO measurement_channels (measurement_id, channel_name, unit)
  SELECT id, 'Temperatur', '°C'
  FROM new_measurement2
  RETURNING id, measurement_id
)
-- Füge Messwerte für die erste Messung hinzu
INSERT INTO measurement_values (measurement_id, channel_id, seconds_from_start, value)
SELECT 
  measurement_id,
  id,
  t.seconds,
  CASE 
    WHEN channel_name = 'Temperatur' THEN 20 + random() * 5
    WHEN channel_name = 'Druck' THEN 2.5 + random() * 0.5
  END
FROM (VALUES (0), (10), (20), (30), (40), (50), (60)) as t(seconds)
CROSS JOIN chan1
UNION ALL
SELECT 
  measurement_id,
  id,
  t.seconds,
  CASE 
    WHEN channel_name = 'Durchfluss' THEN 100 + random() * 10
    WHEN channel_name = 'Temperatur' THEN 18 + random() * 3
  END
FROM (VALUES (0), (10), (20), (30), (40), (50), (60)) as t(seconds)
CROSS JOIN chan2;
