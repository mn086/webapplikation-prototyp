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
          <Link href="#json-endpoints" className="block hover:text-blue-600">            2. Datenbankanbindung und Datenverarbeitung
          </Link>
          <div className="pl-4 space-y-1">
            <Link href="#nextjs-api" className="block hover:text-blue-600 text-sm">
              2.1 Datenbankanbindung und Data Access Layer
            </Link>
            <Link href="#php-api" className="block hover:text-blue-600 text-sm">
              2.2 Externe PHP-API
            </Link>
            <Link href="#data-flow" className="block hover:text-blue-600 text-sm">
              2.3 Datenfluss im Detail
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
              details="App Router implementiert"            />            <RequirementItem 
              text="Abruf der Daten vom Web-Service-Endpoint im JSON-Format"
              implemented={true}
              details={<>Sowohl <Link href="#json-endpoints" className="text-blue-600 hover:underline">Next.js API Routes</Link> als auch <Link href="#php-api" className="text-blue-600 hover:underline">externe PHP-API</Link></>}
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
          <h2 className="text-2xl font-bold mb-6">2. Datenbankanbindung und Datenverarbeitung</h2>
          <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">
            ↑ Nach oben
          </Link>
        </div>

        <div className="prose max-w-none">          <p className="mb-6 text-lg">
            Die produktive Anwendung nutzt einen effizienten, mehrschichtigen Ansatz für Datenbankzugriffe 
            ohne zusätzliche API-Routes. Die Setup-API-Routen werden ausschließlich für die initiale 
            Einrichtung und Diagnose benötigt.
          </p>

          {/* Setup & Diagnose API-Routes */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold mb-2">Setup & Diagnose API-Routes:</h4>
              <pre className="bg-gray-800 text-gray-100 p-4 text-sm mb-4">
{`app/api/
├── check-status/       # [Diag] Validierungsstatus
├── check-tables/       # [Diag] Datenbankstruktur
├── check-values/       # [Diag] Datenintegrität
├── create-indices/     # [Setup] Erstellt Datenbankindizes
├── init/              # [Setup] Initiale Datenbankinitialisierung
├── seed/              # [Optional] Testdaten-Import
├── test-data/         # [Debug] Datenabfrage
├── test-db/           # [Debug] Verbindungstest
└── test-update/       # [Debug] Update-Test`}</pre>
          </div>

          {/* Datenbankzugriff */}
          <section id="nextjs-api" className="mb-8">
            <h3 className="text-xl font-semibold mt-8 mb-4">2.1 Datenbankanbindung und Data Access Layer</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold mb-2">Dreischichtiger Datenzugriff:</h4>
              <ol className="list-decimal list-inside space-y-2">
                <li className="mb-4">
                  <span className="font-medium">Server Components</span>
                  <p className="ml-5 mt-1 text-sm text-gray-600">
                    Direkter Datenbankzugriff über den Data Access Layer, keine zusätzlichen API-Routes erforderlich
                  </p>
                </li>
                <li className="mb-4">
                  <span className="font-medium">Data Access Layer (<code className="text-sm bg-gray-100 px-1">lib/data.ts</code>)</span>
                  <p className="ml-5 mt-1 text-sm text-gray-600">
                    Zentrale Stelle für alle Datenbankoperationen, implementiert typsichere Funktionen
                  </p>
                </li>
                <li className="mb-4">
                  <span className="font-medium">Datenbankverbindung (<code className="text-sm bg-gray-100 px-1">lib/db.ts</code>)</span>
                  <p className="ml-5 mt-1 text-sm text-gray-600">
                    Konfiguriert Verbindungsparameter (SSL, Timeouts), definiert Basis-Typen, exportiert SQL-Instanz
                  </p>
                </li>
              </ol>
            </div>            <p className="mb-4">
              Die zentrale Datenbankverbindung wird in <code className="text-sm bg-gray-100 px-1">db.ts</code> konfiguriert 
              und stellt typsichere Datenbankzugriffe bereit. Der Data Access Layer in <code className="text-sm bg-gray-100 px-1">data.ts</code> 
              implementiert alle notwendigen Datenbankoperationen für das Dashboard.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold mb-2">Kernfunktionen des Data Access Layers:</h4>
              <ul className="list-disc list-inside space-y-2">
                <li><code className="text-sm bg-gray-100 px-1">fetchDashboardData()</code> - Lädt Statistiken für die Übersicht</li>
                <li><code className="text-sm bg-gray-100 px-1">fetchTimeseriesData()</code> - Lädt Zeitreihendaten für Visualisierungen</li>
                <li><code className="text-sm bg-gray-100 px-1">fetchFilteredMeasurements()</code> - Implementiert Suche und Paginierung</li>
              </ul>
            </div>            <p className="mb-4">Datenbankverbindung (db.ts):</p>
            <div className="rounded-lg overflow-hidden">
              <div className="bg-gray-700 text-gray-200 px-4 py-2 text-sm font-mono">
                📄 app/lib/db.ts
              </div>
              <pre className="bg-gray-800 text-gray-100 p-4 text-sm">
                <code className="language-typescript">
{`import postgres from 'postgres';

// Konfiguration für die Neon Postgres-Verbindung
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
export type Measurement = {
    id: string;
    timestamp: Date;
    channel1: number | null;
    channel2: number | null;
    channel3: number | null;
};

export type Metadata = {
    id: string;
    measurement_id: string;
    filename: string;
    created_at: Date;
    description: string | null;
    status: 'validiert' | 'offen';
};

export default sql;`}</code></pre>
            </div>

            <p className="mb-4">Beispiel einer Data Access Layer Funktion (data.ts):</p>
            <div className="rounded-lg overflow-hidden">
              <div className="bg-gray-700 text-gray-200 px-4 py-2 text-sm font-mono">
                📄 app/lib/data.ts
              </div>
              <pre className="bg-gray-800 text-gray-100 p-4 text-sm">
                <code className="language-typescript">
{`export async function fetchDashboardData() {
  try {
    // Führe Abfragen parallel aus für bessere Performance
    const measurementCountPromise = sql\`SELECT COUNT(*) FROM measurements\`;
    const statusCountPromise = sql\`
      SELECT
        COUNT(CASE WHEN status = 'validiert' THEN 1 END) AS "validiert",
        COUNT(CASE WHEN status = 'offen' THEN 1 END) AS "offen"
      FROM metadata
    \`;

    // Warte auf beide Abfragen
    const data = await Promise.all([
      measurementCountPromise,
      statusCountPromise,
    ]);

    // Extrahiere und konvertiere die Ergebnisse
    return {
      numberOfMeasurements: Number(data[0][0].count ?? '0'),
      validatedCount: Number(data[1][0].validiert ?? '0'),
      openCount: Number(data[1][0].offen ?? '0'),
    };
  } catch (error) {
    console.error('Datenbankfehler:', error);
    throw new Error('Fehler beim Laden der Dashboard-Daten.');
  }
}`}</code></pre>
            </div>

            <p className="mb-4">
              Der Data Access Layer nutzt die typsichere SQL-Verbindung und implementiert 
              effiziente Datenbankabfragen mit modernen Features wie Parallel Queries und 
              typsicheren Rückgabewerten.
            </p>
          </section>

          {/* PHP-API */}
          <section id="php-api" className="mt-8">
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

      {/* Data Flow */}
      <section id="data-flow" className="mt-8">
        <h2 className="text-2xl font-bold mb-4">2.3 Datenfluss im Detail</h2>
        
        <p className="mb-4">
          Der Datenfluss in der Anwendung folgt einem strukturierten Muster, das die Wartbarkeit und Skalierbarkeit gewährleistet:
        </p>

        <h3 className="text-xl font-semibold mb-2">Komponenten-Übersicht</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>React Server Components laden Daten direkt über die Data Access Layer</li>
          <li>Client Components nutzen API-Routen für dynamische Datenaktualisierungen</li>
          <li>Error Boundaries fangen Fehler auf Komponentenebene ab</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Verarbeitungskette</h3>
        <ol className="list-decimal pl-6 mb-4">
          <li>Datenabfrage über die Data Access Layer (`data.ts`)</li>
          <li>Typensichere Verarbeitung durch TypeScript Interfaces</li>
          <li>Fehlerbehandlung auf jeder Ebene der Verarbeitungskette</li>
          <li>Caching und Optimierung durch Next.js</li>
        </ol>

        <p className="mb-4">
          Besonders wichtig ist die Integration von TypeScript, die eine durchgängige Typsicherheit von der Datenbank bis zur Benutzeroberfläche gewährleistet.
        </p>
      </section>
      {/* ...remaining content... */}
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
