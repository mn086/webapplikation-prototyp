-- Beispieldaten für die measurements Tabelle
INSERT INTO measurements (id, timestamp, channel1, channel2, channel3) VALUES
  (gen_random_uuid(), NOW() - INTERVAL '1 hour', 1.5, 2.3, 3.1),
  (gen_random_uuid(), NOW() - INTERVAL '50 minutes', 1.7, 2.5, 3.3),
  (gen_random_uuid(), NOW() - INTERVAL '40 minutes', 1.6, 2.4, 3.2),
  (gen_random_uuid(), NOW() - INTERVAL '30 minutes', 1.8, 2.6, 3.4),
  (gen_random_uuid(), NOW() - INTERVAL '20 minutes', 2.0, 2.8, 3.6),
  (gen_random_uuid(), NOW() - INTERVAL '10 minutes', 1.9, 2.7, 3.5),
  (gen_random_uuid(), NOW(), 2.1, 2.9, 3.7);

-- Beispieldaten für die metadata Tabelle
INSERT INTO metadata (id, measurement_id, filename, created_at, description, status) 
SELECT 
  gen_random_uuid(),
  m.id,
  'messung_' || TO_CHAR(m.timestamp, 'YYYY_MM_DD_HH24_MI') || '.csv',
  m.timestamp,
  CASE (random() * 2)::integer
    WHEN 0 THEN 'Routinemessung'
    WHEN 1 THEN 'Kalibrierungsmessung'
    ELSE 'Testmessung'
  END,
  CASE (random() * 2)::integer
    WHEN 0 THEN 'validiert'
    ELSE 'offen'
  END
FROM measurements m;
