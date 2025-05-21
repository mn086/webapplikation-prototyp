BEGIN;

-- First measurement (validated)
INSERT INTO measurements DEFAULT VALUES;

DO $$
DECLARE
    m1_id uuid;
    temp1_id uuid;
    pressure_id uuid;
BEGIN
    SELECT id INTO m1_id FROM measurements ORDER BY created_at DESC LIMIT 1;
    
    -- Add metadata
    INSERT INTO metadata (measurement_id, filename, description, status)
    VALUES (m1_id, 'temperatur_druck_20250521.csv', 'Temperatur- und Druckmessung Anlage A', 'validiert');
    
    -- Create channels and store their IDs
    INSERT INTO measurement_channels (measurement_id, channel_name, unit)
    VALUES (m1_id, 'Temperatur', '°C')
    RETURNING id INTO temp1_id;
    
    INSERT INTO measurement_channels (measurement_id, channel_name, unit)
    VALUES (m1_id, 'Druck', 'bar')
    RETURNING id INTO pressure_id;
    
    -- Add temperature values (20-25°C range)
    INSERT INTO measurement_values (measurement_id, channel_id, seconds_from_start, value)
    SELECT m1_id, temp1_id, t.seconds, 20 + random() * 5
    FROM generate_series(0, 60, 10) AS t(seconds);
    
    -- Add pressure values (2.5-3.0 bar range)
    INSERT INTO measurement_values (measurement_id, channel_id, seconds_from_start, value)
    SELECT m1_id, pressure_id, t.seconds, 2.5 + random() * 0.5
    FROM generate_series(0, 60, 10) AS t(seconds);
END $$;

-- Second measurement (open)
INSERT INTO measurements DEFAULT VALUES;

DO $$
DECLARE
    m2_id uuid;
    temp2_id uuid;
    flow_id uuid;
BEGIN
    SELECT id INTO m2_id FROM measurements 
    WHERE id NOT IN (SELECT measurement_id FROM metadata)
    LIMIT 1;
    
    -- Add metadata
    INSERT INTO metadata (measurement_id, filename, description, status)
    VALUES (m2_id, 'durchfluss_20250521.csv', 'Durchfluss- und Temperaturmessung Anlage B', 'offen');
    
    -- Create channels and store their IDs
    INSERT INTO measurement_channels (measurement_id, channel_name, unit)
    VALUES (m2_id, 'Temperatur', '°C')
    RETURNING id INTO temp2_id;
    
    INSERT INTO measurement_channels (measurement_id, channel_name, unit)
    VALUES (m2_id, 'Durchfluss', 'l/min')
    RETURNING id INTO flow_id;
    
    -- Add temperature values (18-21°C range)
    INSERT INTO measurement_values (measurement_id, channel_id, seconds_from_start, value)
    SELECT m2_id, temp2_id, t.seconds, 18 + random() * 3
    FROM generate_series(0, 60, 10) AS t(seconds);
    
    -- Add flow values (100-110 l/min range)
    INSERT INTO measurement_values (measurement_id, channel_id, seconds_from_start, value)
    SELECT m2_id, flow_id, t.seconds, 100 + random() * 10
    FROM generate_series(0, 60, 10) AS t(seconds);
END $$;

COMMIT;
