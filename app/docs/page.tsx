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
            </Link>            <Link href="#architecture" className="block hover:text-blue-600 text-sm">
              2.3 Gesamtarchitektur und Integration
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
            </div>            <h4 className="text-lg font-semibold mt-6 mb-4">Datenbankverbindung und Typdefinitionen</h4>
            <p className="mb-4">
              Die Datenbankverbindung wird zentral konfiguriert und stellt sicher, dass alle Verbindungen 
              verschlüsselt und mit optimalen Timeouts versehen sind. Zusätzlich werden TypeScript-Interfaces 
              für die wichtigsten Datenstrukturen definiert.
            </p>
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
            </div>            <h4 className="text-lg font-semibold mt-6 mb-4">Optimierte Datenbankabfragen</h4>
            <p className="mb-4">
              Die Data Access Layer Funktionen nutzen moderne Features wie parallele Abfragen und 
              Promises für optimale Performance. Das folgende Beispiel zeigt, wie mehrere Statistiken 
              gleichzeitig und typsicher aus der Datenbank geladen werden.
            </p>
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
          </section>          {/* PHP-API */}
          <section id="php-api" className="mt-8">
            <h3 className="text-xl font-semibold mt-8 mb-4">2.2 Externe PHP-API</h3>
            <p className="mb-4">
              Über eine externe PHP-API werden weitere Messdaten im JSON-Format von einem Apache Webserver 
              bereitgestellt. Diese Messungen können über das Dashboard eingelesen, in der PostgreSQL-Datenbank 
              gespeichert und anschließend ausgewertet werden. Die API ist in einem Docker-Container 
              containerisiert und bietet einfache REST-Endpoints für den Zugriff auf die Messdaten.
            </p>

            <h4 className="text-lg font-semibold mt-6 mb-4">Containerisierte API-Struktur</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg text-sm mb-6">
{`apache-php-measurements/
├── docker-compose.yml          # Container-Konfiguration
├── Dockerfile                  # Apache & PHP Setup
├── measurements-api/
│   ├── measurements/          # JSON-Messdaten
│   │   ├── measurement_001.json
│   │   ├── measurement_002.json
│   │   └── ...
│   └── api/                   # PHP-Endpoints
│       ├── list.php          # GET: Listet verfügbare Messungen
│       ├── get.php           # GET: Details einer Messung
│       └── count.php         # GET: Gesamtanzahl der Messungen`}</pre>

            <h4 className="text-lg font-semibold mt-6 mb-4">Datenfluss und Komponenten</h4>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <ol className="list-decimal list-inside space-y-4">
                <li className="mb-4">
                  <span className="font-medium">PHP-API Adapter (<code className="text-sm bg-gray-100 px-1">lib/php-api.ts</code>)</span>
                  <p className="ml-5 mt-1 text-sm text-gray-600">
                    Zentrale TypeScript-Schnittstelle für alle API-Zugriffe mit Typsicherheit und Fehlerbehandlung
                  </p>
                </li>
                <li className="mb-4">
                  <span className="font-medium">Messdaten-Typen (<code className="text-sm bg-gray-100 px-1">lib/definitions.ts</code>)</span>
                  <p className="ml-5 mt-1 text-sm text-gray-600">
                    Interface-Definitionen für JSON-Formate und API-Antworten
                  </p>
                </li>
                <li className="mb-4">
                  <span className="font-medium">Server Actions (<code className="text-sm bg-gray-100 px-1">lib/actions.ts</code>)</span>
                  <p className="ml-5 mt-1 text-sm text-gray-600">
                    Funktionen zum Import und Speichern der Messdaten in der Datenbank
                  </p>
                </li>
              </ol>
            </div>            <h4 className="text-lg font-semibold mt-6 mb-4">TypeScript Integration</h4>
            <p className="mb-4">
              Der folgende Code zeigt die TypeScript-Implementierung der PHP-API-Anbindung. 
              Diese Schnittstelle ermöglicht den typensicheren Zugriff auf die externen Messdaten 
              und behandelt potenzielle Fehler durch eine robuste Fehlerbehandlung.
            </p>
            <div className="rounded-lg overflow-hidden">
              <div className="bg-gray-700 text-gray-200 px-4 py-2 text-sm font-mono">
                📄 app/lib/php-api.ts
              </div>
              <pre className="bg-gray-800 text-gray-100 p-4 text-sm">
                <code className="language-typescript">
{`/**
 * Modul für die Integration der externen PHP-API
 * Stellt typsichere Funktionen für den Zugriff auf Messdaten bereit
 */
import { PHPMeasurementData, PHPListResponse } from './definitions';

// Basis-URL für die PHP-API
const API_BASE_URL = 'http://localhost:8090';

/**
 * Ruft eine Liste aller verfügbaren Messungen von der PHP-API ab
 * @returns Array von Messungs-IDs und Metadaten
 * @throws Error bei Netzwerk- oder API-Fehlern
 */
export async function fetchAvailableMeasurements() {
  try {
    const response = await fetch(\`\${API_BASE_URL}/measurements/api/list.php\`);
    if (!response.ok) {
      throw new Error(\`API-Fehler: \${response.statusText}\`);
    }
    const data: PHPListResponse = await response.json();
    return data.measurements;
  } catch (error) {
    console.error('Fehler beim Abrufen der PHP-Messungen:', error);
    throw new Error('Messungen konnten nicht geladen werden');
  }
}

/**
 * Lädt die detaillierten Daten einer einzelnen Messung
 * @param id - Die ID der abzurufenden Messung
 * @returns Vollständige Messdaten inklusive Zeitreihen
 * @throws Error bei Netzwerk- oder API-Fehlern
 */
export async function fetchMeasurementData(id: string) {
  try {
    const response = await fetch(
      \`\${API_BASE_URL}/measurements/api/get.php?id=\${id}\`
    );
    if (!response.ok) {
      throw new Error(\`API-Fehler: \${response.statusText}\`);
    }
    const data: PHPMeasurementData = await response.json();
    return data;
  } catch (error) {
    console.error('Fehler beim Laden der Messung:', error);
    throw new Error(\`Messung \${id} konnte nicht geladen werden\`);
  }
}`}</code></pre>
            </div>            <h4 className="text-lg font-semibold mt-6 mb-4">Server Action für Datenimport</h4>
            <p className="mb-4">
              Die folgende Server Action implementiert den Import von Messdaten aus der PHP-API in die 
              PostgreSQL-Datenbank. Sie demonstriert die sichere Handhabung von Datenbankoperationen 
              und die automatische Cache-Invalidierung nach erfolgreichen Schreibvorgängen.
            </p>
            <div className="rounded-lg overflow-hidden">
              <div className="bg-gray-700 text-gray-200 px-4 py-2 text-sm font-mono">
                📄 app/lib/actions.ts
              </div>
              <pre className="bg-gray-800 text-gray-100 p-4 text-sm">
                <code className="language-typescript">
{`'use server';

import { fetchMeasurementData } from './php-api';
import { sql } from './db';
import { revalidatePath } from 'next/cache';

export async function importMeasurement(id: string) {
  try {
    // Lade Daten von der PHP-API
    const data = await fetchMeasurementData(id);
    
    // Speichere in der Datenbank
    await sql\`
      INSERT INTO measurements (id, timestamp, channel1, channel2, channel3)
      VALUES (\${data.id}, \${data.timestamp}, \${data.channel1}, \${data.channel2}, \${data.channel3})
    \`;

    // Metadata separat speichern
    await sql\`
      INSERT INTO metadata (measurement_id, filename, description, status)
      VALUES (\${data.id}, \${data.metadata.filename}, \${data.metadata.description}, 'offen')
    \`;

    // Cache ungültig machen
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Import error:', error);
    return { success: false, error };
  }
}`}</code></pre>
            </div>

            <p className="mt-6 mb-4">
              Durch diese Architektur können Messdaten effizient importiert und in der zentralen 
              Datenbank konsolidiert werden. Die typsichere Integration gewährleistet dabei Datenintegrität 
              und vereinfacht die Wartung.
            </p>
          </section>
        </div>
      </section>      {/* Integration Architecture */}
      <section id="architecture" className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">2.3 Gesamtarchitektur und Integration</h2>
          <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">
            ↑ Nach oben
          </Link>
        </div>
        
        <p className="mb-4">
          Die Anwendung integriert zwei unterschiedliche Datenquellen in einer einheitlichen, 
          typensicheren Architektur. Dabei werden moderne Entwicklungsprinzipien und Best Practices 
          durchgängig umgesetzt.
        </p>

        <h3 className="text-xl font-semibold mb-4">Architekturprinzipien</h3>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold mb-2">Zentrale Designentscheidungen:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Typsicherheit durch TypeScript</span>
              <p className="text-sm text-gray-600 mt-1">
                Durchgängige Typisierung von der Datenbank bis zur UI, einheitliche Interfaces für beide Datenquellen
              </p>
            </li>
            <li>
              <span className="font-medium">React Server Components First</span>
              <p className="text-sm text-gray-600 mt-1">
                Optimierte Performance durch direkte Datenbankzugriffe, Client-Komponenten nur für interaktive Features
              </p>
            </li>
            <li>
              <span className="font-medium">Zentrales Datenmodell</span>
              <p className="text-sm text-gray-600 mt-1">
                PostgreSQL als Single Source of Truth, externe Daten werden importiert und validiert
              </p>
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mb-4">Systemübergreifende Features</h3>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold mb-2">Technische Implementierung:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Fehlerbehandlung</span>
              <p className="text-sm text-gray-600 mt-1">
                Error Boundaries auf Komponentenebene, typisierte Error-Handling in allen Datenzugriffen
              </p>
            </li>
            <li>
              <span className="font-medium">Caching-Strategien</span>
              <p className="text-sm text-gray-600 mt-1">
                Next.js Server Component Caching für Datenbankzugriffe, selektive Cache-Invalidierung bei Updates
              </p>
            </li>
            <li>
              <span className="font-medium">Validierung</span>
              <p className="text-sm text-gray-600 mt-1">
                Mehrstufige Validierung: TypeScript zur Entwicklungszeit, Runtime-Checks, Datenbankconstraints
              </p>
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mb-4">Integrierter Datenfluss</h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold mb-2">Zusammenspiel der Komponenten:</h4>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <span className="font-medium">Datenquellen</span>
              <ul className="list-disc pl-6 mt-1 text-sm text-gray-600">
                <li>Primärdatenbank: Direkte Abfragen via Data Access Layer</li>
                <li>PHP-API: Import über typsichere Adapter</li>
              </ul>
            </li>
            <li>
              <span className="font-medium">Verarbeitung</span>
              <ul className="list-disc pl-6 mt-1 text-sm text-gray-600">
                <li>Validierung und Transformation der Daten</li>
                <li>Einheitliche Fehlerbehandlung</li>
                <li>Automatische Cache-Invalidierung</li>
              </ul>
            </li>
            <li>
              <span className="font-medium">Präsentation</span>
              <ul className="list-disc pl-6 mt-1 text-sm text-gray-600">
                <li>Server Components für statische Darstellung</li>
                <li>Client Components für interaktive Features</li>
                <li>Zentrale UI-Komponenten für konsistentes Design</li>
              </ul>
            </li>
          </ol>
        </div>
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
