'use client';

import Link from 'next/link';

export default function DocsPage() {
  return (
    <main className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Projektdokumentation</h1>
        {/* Inhaltsverzeichnis */}
      <div className="mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Inhaltsverzeichnis</h2>
        <nav className="space-y-2">
          <Link href="#aufgabenstellung" className="block hover:text-blue-600">
            1. Aufgabenstellung und Umsetzung
          </Link>
          <Link href="#json-endpoints" className="block hover:text-blue-600">
            2. Datenabruf via JSON-Endpoints
          </Link>
          <div className="pl-4 space-y-1">
            <Link href="#nextjs-api" className="block hover:text-blue-600 text-sm">
              2.1 Next.js API Routes
            </Link>
            <Link href="#php-api" className="block hover:text-blue-600 text-sm">
              2.2 Externe PHP-API
            </Link>
          </div>
        </nav>
      </div>

      {/* Aufgabenstellung */}
      <section id="aufgabenstellung" className="mb-12">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-6">1. Aufgabenstellung und Umsetzung</h2>
          <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">
            ↑ Nach oben
          </Link>
        </div>

        <div className="prose max-w-none">
          <p className="mb-6 text-lg">
            Erstellen Sie eine Web-Applikation und einen Web-Service-Endpoint, der Daten aus einem 
            vorhandenen Datenpool in grafischer Form darstellt.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Anforderungen an die Web-Applikation</h3>
          <ul className="space-y-3">
            <RequirementItem 
              text="Nutzung von React und Next.js-Framework für den Web-Client"
              implemented={true}
            />
            <RequirementItem 
              text="Nutzung von Pages Router oder App Router in Next.js (präferiert wird App Router)"
              implemented={true}
              details="App Router implementiert"
            />            <RequirementItem 
              text="Abruf der Daten vom Web-Service-Endpoint im JSON-Format"
              implemented={true}
              details={<>Sowohl <Link href="#nextjs-api" className="text-blue-600 hover:underline">Next.js API Routes</Link> als auch <Link href="#php-api" className="text-blue-600 hover:underline">externe PHP-API</Link></>}
            />
            <RequirementItem 
              text="Grafische Darstellung der Daten mit Hilfe einer geeigneten JS-Charting-Bibliothek"
              implemented={true}
              details="Tremor für interaktive Diagramme"
            />
            <RequirementItem 
              text="Möglichkeit der Selektion/Filterung von Daten auf Client- bzw. Server-Seite"
              implemented={true}
              details="Server-side Filtering & Pagination"
            />
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">Anforderungen an den Web-Service-Endpoint</h3>
          <ul className="space-y-3">
            <RequirementItem 
              text="Realisierung des Endpoints mit Next.js oder anderen Technologien"
              implemented={true}
              details="Next.js API Routes & PHP-Backend"
            />
            <RequirementItem 
              text="Zugriff auf eine Datenbank (relational oder nicht-relational)"
              implemented={true}
              details="PostgreSQL via Neon.tech"
            />
            <RequirementItem 
              text="Aufbereitung und Lieferung der Daten im JSON-Format"
              implemented={true}
            />
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">Optionale Features</h3>
          <ul className="space-y-3">
            <RequirementItem 
              text="Aufwendiges Frontend mit verschiedenen Optionen für den Nutzer"
              implemented={true}
              details="Dashboard, Analysewerkzeuge, Responsive Design"
            />
            <RequirementItem 
              text="Speicherung von ausgesuchten Informationen durch den Benutzer"
              implemented={true}
              details="Messdaten-Validierung & Metadaten"
            />
            <RequirementItem 
              text="Implementierung eines Logins und einer Authentifizierung"
              implemented={true}
              details="NextAuth.js mit Credentials Provider"
            />
          </ul>
        </div>
      </section>

      {/* JSON-Endpoints */}
      <section id="json-endpoints" className="mb-12">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-6">2. Datenabruf via JSON-Endpoints</h2>
          <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">
            ↑ Nach oben
          </Link>
        </div>

        <div className="prose max-w-none">
          <p className="mb-6 text-lg">
            Die Anwendung verwendet zwei verschiedene Arten von JSON-Endpoints für den Datenabruf: 
            Next.js API Routes für die interne Datenbankanbindung und eine externe PHP-API für den 
            Import von Messdaten.
          </p>

          {/* Next.js API Routes */}
          <section id="nextjs-api" className="mb-8">
            <h3 className="text-xl font-semibold mt-8 mb-4">2.1 Next.js API Routes</h3>
            <p className="mb-4">
              Die Next.js API Routes bilden das Herzstück der Anwendung und ermöglichen den 
              typsicheren Zugriff auf die PostgreSQL-Datenbank. Die wichtigsten API-Endpunkte sind:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold mb-2">Kernfunktionen:</h4>
              <ul className="list-disc list-inside space-y-2">
                <li><code className="text-sm bg-gray-100 px-1">GET /api/test-data</code> - Lädt aktuelle Messdaten</li>
                <li><code className="text-sm bg-gray-100 px-1">GET /api/check-values</code> - Prüft Messwerte</li>
                <li><code className="text-sm bg-gray-100 px-1">GET /api/check-status</code> - Status der Messungen</li>
              </ul>
            </div>

            <p className="mb-4">Beispiel für einen API-Endpoint:</p>
            <div className="rounded-lg overflow-hidden">
              <div className="bg-gray-700 text-gray-200 px-4 py-2 text-sm font-mono">
                📄 app/api/test-data/route.ts
              </div>
              <pre className="bg-gray-800 text-gray-100 p-4 text-sm">
                <code className="language-typescript">
{`export async function GET() {
  try {
    const data = await sql\`
      WITH latest_measurement AS (
        SELECT id, created_at FROM measurements
        ORDER BY created_at DESC LIMIT 1
      )
      SELECT
        m.id as measurement_id,
        m.created_at,
        md.filename,
        md.description,
        md.status,
        json_agg(DISTINCT jsonb_build_object(
          'id', mc.id,
          'name', mc.channel_name,
          'unit', mc.unit,
          'values', (
            SELECT json_agg(jsonb_build_object(
              'seconds', mv.seconds_from_start,
              'value', mv.value
            ) ORDER BY mv.seconds_from_start)
            FROM measurement_values mv
            WHERE mv.channel_id = mc.id
          )
        )) as channels
      FROM latest_measurement m
      JOIN metadata md ON md.measurement_id = m.id
      JOIN measurement_channels mc ON mc.measurement_id = m.id
      GROUP BY m.id, m.created_at, md.filename, 
               md.description, md.status
    \`;
    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}`}</code></pre>
            </div>

            <p className="mb-4">
              Die API-Routes nutzen das <code>postgres</code> Package für typsichere SQL-Abfragen und 
              verwenden moderne Features wie <code>json_agg</code> und <code>jsonb_build_object</code> 
              für effiziente JSON-Aggregation.
            </p>
          </section>

          {/* PHP-API */}
          <section id="php-api" className="mb-8">
            <h3 className="text-xl font-semibold mt-8 mb-4">2.2 Externe PHP-API</h3>
            <p className="mb-4">
              Die PHP-API dient als Schnittstelle zu einem bestehenden Datenpool von Messdaten im 
              JSON-Format. Sie läuft in einem Docker-Container und bietet einfache REST-Endpoints.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold mb-2">API-Endpunkte:</h4>
              <ul className="list-disc list-inside space-y-2">
                <li><code className="text-sm bg-gray-100 px-1">GET /measurements/api/list.php</code> - Liste verfügbarer Messungen</li>
                <li><code className="text-sm bg-gray-100 px-1">GET /measurements/api/get.php?id=&#123;id&#125;</code> - Details einer Messung</li>
                <li><code className="text-sm bg-gray-100 px-1">GET /measurements/api/count.php</code> - Anzahl der Messungen</li>
              </ul>
            </div>

            <p className="mb-4">Integration in Next.js (<code>lib/php-api.ts</code>):</p>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg text-sm mb-6">
{`const API_BASE_URL = 'http://localhost:8090';

export async function fetchMeasurementData(id: string) {
  try {
    const response = await fetch(
      \`\${API_BASE_URL}/measurements/api/get.php?id=\${id}\`
    );
    if (!response.ok) {
      throw new Error(\`API error: \${response.statusText}\`);
    }
    const data: PHPMeasurementData = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching measurement:', error);
    throw error;
  }
}`}</pre>

            <p className="mb-4">PHP API Beispiel:</p>
            <div className="rounded-lg overflow-hidden">
              <div className="bg-gray-700 text-gray-200 px-4 py-2 text-sm font-mono">
                📄 api/measurements/read.php
              </div>
              <pre className="bg-gray-800 text-gray-100 p-4 text-sm">
                <code className="language-php">
{`<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../config/Database.php';
include_once '../models/Measurement.php';

$database = new Database();
$db = $database->connect();

$measurement = new Measurement($db);
$result = $measurement->read();
$num = $result->rowCount();

if($num > 0) {
    $measurements_arr = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        
        $measurement_item = array(
            'id' => $id,
            'filename' => $filename,
            'description' => $description,
            'created_at' => $created_at
        );

        array_push($measurements_arr, $measurement_item);
    }

    echo json_encode($measurements_arr);
} else {
    echo json_encode(array('message' => 'No Measurements Found'));
}`}</code></pre>
            </div>

            <p className="mb-4">
              Die PHP-API ist in Docker containerisiert und verwendet eine einfache Verzeichnisstruktur 
              für die Messdaten:
            </p>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg text-sm mb-6">
{`apache-php-measurements/
├── measurements-api/
│   ├── measurements/    # JSON-Dateien
│   └── api/
│       ├── list.php    # Listet Messungen
│       ├── get.php     # Einzelne Messung
│       └── count.php   # Anzahl Messungen`}</pre>
          </section>
        </div>
      </section>

      {/* ... weitere Sections ... */}
    </main>
  );
}

// Komponente für Anforderungspunkte
function RequirementItem({ 
  text, 
  implemented, 
  details 
}: { 
  text: string; 
  implemented: boolean; 
  details?: string | React.ReactNode; 
}) {
  return (
    <li className="flex items-start gap-3">
      <span className={`mt-1 flex-shrink-0 ${implemented ? 'text-green-600' : 'text-gray-400'}`}>
        {implemented ? '✓' : '○'}
      </span>
      <div>
        <span>{text}</span>
        {details && (
          <span className="block text-sm text-gray-600 mt-1">
            → {details}
          </span>
        )}
      </div>
    </li>
  );
}
