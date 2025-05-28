'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function DocsPage() {
  return (
    <main className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Projektdokumentation</h1>
        {/* Inhaltsverzeichnis */}
      <div className="mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Inhaltsverzeichnis</h2>
        <nav className="space-y-2">          <Link href="#aufgabenstellung" className="block hover:text-blue-600">
            1. Aufgabenstellung und Umsetzung
          </Link>
          <Link href="#json-endpoints" className="block hover:text-blue-600">
            2. Datenbankanbindung und Datenverarbeitung
          </Link>
          <div className="pl-4 space-y-1">
            <Link href="#nextjs-api" className="block hover:text-blue-600 text-sm">
              2.1 Datenbankanbindung und Data Access Layer
            </Link>
            <Link href="#php-api" className="block hover:text-blue-600 text-sm">
              2.2 Externe PHP-API
            </Link>
            <Link href="#architecture" className="block hover:text-blue-600 text-sm">
              2.3 Gesamtarchitektur und Integration
            </Link>
          </div>
          <Link href="#auth" className="block hover:text-blue-600">
            3. Authentifizierung und Zugriffskontrolle
          </Link>
          <div className="pl-4 space-y-1">
            <Link href="#auth-setup" className="block hover:text-blue-600 text-sm">
              3.1 NextAuth.js Konfiguration
            </Link>
            <Link href="#auth-components" className="block hover:text-blue-600 text-sm">
              3.2 Login-Komponenten
            </Link>
            <Link href="#auth-protection" className="block hover:text-blue-600 text-sm">
              3.3 Geschützte Routen
            </Link>
          </div>
          <Link href="#data-visualization" className="block hover:text-blue-600">
            4. Datenvisualisierung mit Tremor
          </Link>
          <div className="pl-4 space-y-1">
            <Link href="#tremor-architecture" className="block hover:text-blue-600 text-sm">
              4.1 Server- und Client-Komponenten
            </Link>
            <Link href="#data-flow" className="block hover:text-blue-600 text-sm">
              4.2 Datenintegration und Optimierung
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
              details={<Link href="#data-visualization" className="text-blue-600 hover:underline">Tremor für interaktive Diagramme</Link>}
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
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold mt-8 mb-4">2.1 Datenbankanbindung und Data Access Layer</h3>
              <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">
                ↑ Nach oben
              </Link>
            </div>
            
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
          <section id="php-api" className="mb-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold mt-8 mb-4">2.2 Externe PHP-API</h3>
              <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">
                ↑ Nach oben
              </Link>
            </div>
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

      {/* Authentication */}
      <section id="auth" className="mt-12 mb-12">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-6">3. Authentifizierung und Zugriffskontrolle</h2>
          <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">
            ↑ Nach oben
          </Link>
        </div>

        <div className="prose max-w-none">
          <p className="mb-6 text-lg">
            Die Anwendung implementiert ein robustes Authentifizierungssystem basierend auf NextAuth.js, 
            das den Zugriff auf geschützte Ressourcen kontrolliert und eine sichere Benutzeranmeldung 
            ermöglicht.
          </p>

          {/* NextAuth.js Setup */}
          <section id="auth-setup" className="mb-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold mt-8 mb-4">3.1 NextAuth.js Konfiguration</h3>
              <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">
                ↑ Nach oben
              </Link>
            </div>

            <p className="mb-4">
              Die Authentifizierung wird durch NextAuth.js bereitgestellt und nutzt einen 
              Credentials Provider für die Benutzeranmeldung. Die Konfiguration erfolgt in 
              mehreren zentralen Dateien.
            </p>

            <h4 className="text-lg font-semibold mt-6 mb-4">Auth Konfiguration</h4>            <p className="mb-4">
              Die Basis-Konfiguration für NextAuth.js definiert die grundlegenden Authentifizierungseinstellungen, 
              insbesondere die Zugriffskontrolle für geschützte Routen und die Weiterleitung bei fehlender Berechtigung:
            </p>
            <div className="rounded-lg overflow-hidden">
              <div className="bg-gray-700 text-gray-200 px-4 py-2 text-sm font-mono">
                📄 auth.config.ts
              </div>
              <pre className="bg-gray-800 text-gray-100 p-4 text-sm">
                <code className="language-typescript">{`// Importiere den NextAuth Konfigurationstyp
import type { NextAuthConfig } from 'next-auth';

/**
 * Hauptkonfiguration für NextAuth
 * Definiert das Authentifizierungsverhalten der Anwendung
 */
export const authConfig = {
  // Konfiguration der Authentifizierungsseiten
  pages: {
    signIn: '/login', // Pfad zur Login-Seite
  },
  callbacks: {
    /**
     * Callback zur Autorisierungsprüfung
     * Kontrolliert den Zugriff auf geschützte Routen und Weiterleitungen
     * @param auth - Authentifizierungsstatus des Benutzers
     * @param nextUrl - Ziel-URL des Requests
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnDocs = nextUrl.pathname.startsWith('/docs');

      // Erlaube Zugriff auf Dokumentation ohne Login
      if (isOnDocs) return true;

      // Prüfe Zugriffsberechtigung für Dashboard
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Leite nicht authentifizierte Benutzer zur Login-Seite weiter
      } else if (isLoggedIn && !isOnDocs) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Provider-Array bleibt vorerst leer, wird in auth.ts konfiguriert
} satisfies NextAuthConfig;`}</code>
              </pre>
            </div>            <h4 className="text-lg font-semibold mt-6 mb-4">Credentials Provider</h4>
            <p className="mb-4">
              Die Implementierung der Benutzerauthentifizierung erfolgt über einen Credentials Provider, 
              der die Anmeldedaten gegen die PostgreSQL-Datenbank prüft. Die Datei beinhaltet die 
              Datenbankanbindung, Benutzervalidierung und sichere Passwortüberprüfung mit bcrypt:
            </p>
            <div className="rounded-lg overflow-hidden">
              <div className="bg-gray-700 text-gray-200 px-4 py-2 text-sm font-mono">
                📄 auth.ts
              </div>
              <pre className="bg-gray-800 text-gray-100 p-4 text-sm">
                <code className="language-typescript">{`// Importiere benötigte Abhängigkeiten
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

// Initialisiere PostgreSQL-Verbindung mit SSL
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/**
 * Holt einen Benutzer aus der Datenbank anhand seiner E-Mail-Adresse
 * @param email - Die E-Mail-Adresse des gesuchten Benutzers
 * @returns Ein Promise, das den Benutzer oder undefined zurückgibt
 */
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>\`SELECT * FROM users WHERE email=\${email}\`;
    return user[0];
  } catch (error) {
    console.error('Fehler beim Abrufen des Benutzers:', error);
    throw new Error('Fehler beim Abrufen des Benutzers.');
  }
}

// Exportiere die NextAuth-Konfiguration mit Authentifizierungsfunktionen
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validiere die eingegebenen Anmeldedaten mit Zod Schema
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          // Suche den Benutzer in der Datenbank
          const user = await getUser(email);
          if (!user) return null;
          // Vergleiche das eingegebene Passwort mit dem gespeicherten Hash
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log('Ungültige Anmeldedaten');
        return null;
      },
    }),
  ],
});`}</code>
              </pre>
            </div>            <h4 className="text-lg font-semibold mt-6 mb-4">Login-Formular Komponente</h4>
            <p className="mb-4">
              Das Login-Formular ist eine Client-Komponente, die Server Actions für die Authentifizierung nutzt. 
              Sie verarbeitet Weiterleitungs-URLs, validiert Benutzereingaben und zeigt Fehlermeldungen an. 
              Die Komponente verwendet moderne React-Patterns wie useActionState für die Formularverarbeitung 
              und bietet eine benutzerfreundliche Oberfläche mit Icon-Integration:
            </p>
            <div className="rounded-lg overflow-hidden">
              <div className="bg-gray-700 text-gray-200 px-4 py-2 text-sm font-mono">
                📄 app/ui/login-form.tsx
              </div>
              <pre className="bg-gray-800 text-gray-100 p-4 text-sm">
                <code className="language-typescript">{`'use client';

// Importiere benötigte Komponenten und Funktionen
import { lusitana } from '@/app/ui/fonts';
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

// Login-Formular Komponente für die Benutzerauthentifizierung
export default function LoginForm() {
  // Hole URL-Parameter und setze Standard-Weiterleitungs-URL
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  // Verwende useActionState für Formularaktionen und Fehlermeldungen
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={\`\${lusitana.className} mb-3 text-2xl\`}>
          Bitte melden Sie sich an, um fortzufahren.
        </h1>

        {/* Formular-Eingabefelder */}
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              E-Mail
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Geben Sie Ihre E-Mail-Adresse ein"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Passwort
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Geben Sie Ihr Passwort ein"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Anmelden <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        {/* Fehleranzeige */}
        <div className="flex h-8 items-end space-x-1">
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}`}</code>
              </pre>
            </div>

          </section>

          {/* Login Components */}
          <section id="auth-components" className="mb-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold mt-8 mb-4">3.2 Login-Komponenten</h3>
              <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">
                ↑ Nach oben
              </Link>
            </div>

            <p className="mb-4">
              Die Login-Komponenten bestehen aus einem Login-Formular und einer Server Action für die 
              Authentifizierung. Das Formular erfasst die Benutzerdaten, während die Server Action die 
              Authentifizierung verarbeitet und die Benutzeranmeldung steuert.
            </p>

            <h4 className="text-lg font-semibold mt-6 mb-4">Login-Formular</h4>
            <p className="mb-4">
              Das Login-Formular ist eine Client-Komponente, die die Benutzereingaben erfasst und an die 
              Server Action zur Verarbeitung sendet. Es bietet eine benutzerfreundliche Oberfläche mit 
              integrierter Fehleranzeige.
            </p>
            <div className="rounded-lg overflow-hidden">
              <div className="bg-gray-700 text-gray-200 px-4 py-2 text-sm font-mono">
                📄 app/ui/login-form.tsx
              </div>
              <pre className="bg-gray-800 text-gray-100 p-4 text-sm">
                <code className="language-typescript">{`'use client';

// Importiere benötigte Komponenten und Funktionen
import { lusitana } from '@/app/ui/fonts';
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

// Login-Formular Komponente für die Benutzerauthentifizierung
export default function LoginForm() {
  // Hole URL-Parameter und setze Standard-Weiterleitungs-URL
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  // Verwende useActionState für Formularaktionen und Fehlermeldungen
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={\`\${lusitana.className} mb-3 text-2xl\`}>
          Bitte melden Sie sich an, um fortzufahren.
        </h1>

        {/* Formular-Eingabefelder */}
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              E-Mail
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Geben Sie Ihre E-Mail-Adresse ein"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Passwort
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Geben Sie Ihr Passwort ein"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Anmelden <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        {/* Fehleranzeige */}
        <div className="flex h-8 items-end space-x-1">
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}`}</code>
              </pre>
            </div>

            <h4 className="text-lg font-semibold mt-6 mb-4">Server Action: authenticate</h4>
            <p className="mb-4">
              Die Server Action <code className="text-sm bg-gray-100 px-1">authenticate</code> verarbeitet 
              die Anmeldedaten, prüft die Benutzeranmeldung und verwaltet die Sitzung. Sie wird vom Login-Formular 
              aufgerufen und steuert den Authentifizierungsworkflow.
            </p>
            <div className="rounded-lg overflow-hidden">
              <div className="bg-gray-700 text-gray-200 px-4 py-2 text-sm font-mono">
                📄 app/lib/actions.ts
              </div>
              <pre className="bg-gray-800 text-gray-100 p-4 text-sm">
                <code className="language-typescript">
{`'use server';

import { authConfig } from './auth.config';
import { sql } from './db';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcrypt';

// Authentifiziert einen Benutzer mit E-Mail und Passwort
export async function authenticate(formData: FormData) {
  'use server';

  // Extrahiere E-Mail und Passwort aus den Formulardaten
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return {
      success: false,
      error: 'Bitte füllen Sie alle Felder aus.',
    };
  }

  try {
    // Suche den Benutzer in der Datenbank
    const user = await sql\`SELECT * FROM users WHERE email = \${email}\`;

    if (user.length === 0) {
      return {
        success: false,
        error: 'Benutzer nicht gefunden.',
      };
    }

    // Vergleiche das eingegebene Passwort mit dem gespeicherten Hash
    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Ungültiges Passwort.',
      };
    }

    // Authentifizierung erfolgreich, setze die Sitzung
    const { password: _, ...userData } = user[0]; // Entferne das Passwortfeld
    revalidatePath('/dashboard'); // Cache für die Dashboard-Seite ungültig machen

    return {
      success: true,
      redirect: '/dashboard',
      user: userData,
    };
  } catch (error) {
    console.error('Fehler bei der Authentifizierung:', error);
    return {
      success: false,
      error: 'Fehler bei der Authentifizierung. Bitte versuchen Sie es später erneut.',
    };
  }
}`}</code>
              </pre>
            </div>
          </section>

          {/* Protected Routes */}
          <section id="auth-protection" className="mb-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold mt-8 mb-4">3.3 Geschützte Routen</h3>
              <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">
                ↑ Nach oben
              </Link>
            </div>

            <p className="mb-4">
              Der Zugriff auf geschützte Bereiche wird durch den Next.js Middleware-Mechanismus 
              kontrolliert. Dies ermöglicht eine zentrale Zugriffskontrolle für alle 
              geschützten Routen.
            </p>

            <h4 className="text-lg font-semibold mt-6 mb-4">Middleware für Routenschutz</h4>            <div className="rounded-lg overflow-hidden">
              <div className="bg-gray-700 text-gray-200 px-4 py-2 text-sm font-mono">
                📄 middleware.ts
              </div>
              <pre className="bg-gray-800 text-gray-100 p-4 text-sm">
                <code className="language-typescript">{`/**
 * Middleware für die Authentifizierung und Zugriffskontrolle
 * 
 * Diese Middleware wird bei jedem Request ausgeführt und prüft, ob der Benutzer
 * berechtigt ist, auf die angeforderte Route zuzugreifen. Sie nutzt NextAuth.js
 * für das Session-Management und die Authentifizierung.
 */
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// Exportiere die Authentifizierungs-Middleware von NextAuth.js
export default NextAuth(authConfig).auth;

export const config = {
  /**
   * Matcher-Konfiguration definiert, für welche Routen die Middleware aktiv ist
   * 
   * Ausgeschlossen sind:
   * - /api Routes (API-Endpoints)
   * - /_next/static (statische Dateien)
   * - /_next/image (optimierte Bilder)
   * - *.png Dateien (Bilder)
   * 
   * Alle anderen Routen werden durch die Authentifizierung geschützt
   */
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};`}</code></pre>
            </div>            <div className="bg-gray-50 rounded-lg p-6 mt-6">
              <h4 className="font-semibold mb-2">Authentifizierungs-Workflow:</h4>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <span className="font-medium">Request-Validierung</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Eingehende Anfragen werden durch die Middleware überprüft. Statische Ressourcen 
                    (Bilder, API-Routes) sind von der Authentifizierung ausgenommen, während alle anderen 
                    Routen geschützt sind.
                  </p>
                </li>
                <li>
                  <span className="font-medium">Session-Überprüfung</span>
                  <p className="text-sm text-gray-600 mt-1">
                    NextAuth.js prüft das Session-Cookie und validiert den JWT-Token. Bei gültiger 
                    Session wird der Benutzer-Kontext für die Anwendung bereitgestellt.
                  </p>
                </li>
                <li>
                  <span className="font-medium">Autorisierung</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Der authorized-Callback in auth.config.ts prüft die Zugriffsrechte basierend auf 
                    der Route. Das Dashboard erfordert eine aktive Session, während die Dokumentation 
                    öffentlich zugänglich ist.
                  </p>
                </li>
                <li>
                  <span className="font-medium">Weiterleitung</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Bei fehlendem Zugriff erfolgt eine automatische Weiterleitung zur Login-Seite, 
                    wobei die ursprüngliche URL als callbackUrl gespeichert wird. Nach erfolgreicher 
                    Anmeldung kehrt der Benutzer zur gewünschten Seite zurück.
                  </p>
                </li>
                <li>
                  <span className="font-medium">Fehlerbehandlung</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Ungültige Anmeldeversuche werden protokolliert, und dem Benutzer werden 
                    aussagekräftige Fehlermeldungen angezeigt. Die Passwortvalidierung erfolgt 
                    sicher über bcrypt.
                  </p>
                </li>
              </ol>
            </div>

          </section>
        </div>
      </section>

      {/* Data Visualization */}
      <section id="data-visualization" className="mt-12 mb-12">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-6">4. Datenvisualisierung mit Tremor</h2>
          <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">
            ↑ Nach oben
          </Link>
        </div>

        <div className="prose max-w-none">
          <p className="mb-6 text-lg">
            Die Datenvisualisierung wird mit der Tremor-Bibliothek realisiert und nutzt die React Server 
            Components Architektur von Next.js für optimale Performance. Die Implementierung teilt sich in 
            Server- und Client-Komponenten auf.
          </p>

          {/* Architecture Section */}
          <section id="tremor-architecture" className="mb-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold mt-8 mb-4">4.1 Server- und Client-Komponenten</h3>
              <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">
                ↑ Nach oben
              </Link>
            </div>

            <p className="mb-4">
              Die Architektur der Datenvisualisierung folgt dem Server Components Pattern. Die Server-Komponente 
              lädt die Daten, während die Client-Komponente die interaktive Visualisierung übernimmt.
            </p>

            <h4 className="text-lg font-semibold mt-6 mb-4">Server-Komponente</h4>
            <p className="mb-4">
              Die Server-Komponente ist für das Laden der Zeitreihendaten verantwortlich. Sie nutzt direkte 
              Datenbankzugriffe ohne zusätzliche API-Calls:
            </p>

            <div className="rounded-lg overflow-hidden">
              <div className="bg-gray-700 text-gray-200 px-4 py-2 text-sm font-mono">
                📄 app/ui/dashboard/timeseries-chart.tsx
              </div>
              <pre className="bg-gray-800 text-gray-100 p-4 text-sm">
                <code className="language-typescript">{`import { fetchTimeseriesData } from '@/app/lib/data';
import TimeseriesChartClient from './timeseries-chart-client';

export default async function TimeseriesChart() {
  const data = await fetchTimeseriesData();
  return <TimeseriesChartClient data={data} />;
}`}</code>
              </pre>
            </div>

            <h4 className="text-lg font-semibold mt-6 mb-4">Client-Komponente</h4>
            <p className="mb-4">
              Die Client-Komponente ist für die interaktive Visualisierung zuständig und verwendet Tremor's 
              LineChart-Komponente. Sie implementiert Features wie Tooltips, Achsenbeschriftungen und 
              Animationen:
            </p>

            <div className="rounded-lg overflow-hidden">
              <div className="bg-gray-700 text-gray-200 px-4 py-2 text-sm font-mono">
                📄 app/ui/dashboard/timeseries-chart-client.tsx
              </div>
              <pre className="bg-gray-800 text-gray-100 p-4 text-sm">
                <code className="language-typescript">{`'use client';

import { Card, Title, LineChart } from '@tremor/react';

type TimeseriesDataPoint = {
  seconds: number;
  [key: string]: string | number | null;
};

export default function TimeseriesChartClient({ data }: { data: TimeseriesDataPoint[] }) {
  if (!data || data.length === 0) {
    return <p className="mt-4 text-gray-400">Keine Daten verfügbar.</p>;
  }

  return (
    <Card className="w-full md:col-span-4">
      <Title>Zeitreihen Visualisierung</Title>
      <LineChart
        className="mt-6 h-[350px]"
        data={data}
        index="seconds"
        categories={Object.keys(data[0] || {}).filter(key => key !== 'seconds')}
        colors={['indigo', 'cyan', 'orange']}
        yAxisWidth={60}
        showLegend={true}
        showAnimation={true}
        curveType="monotone"
        valueFormatter={(value) => 
          value != null ? value.toFixed(2) : 'N/A'
        }
      />
    </Card>
  );
}`}</code>
              </pre>
            </div>
          </section>

          {/* Data Integration */}
          <section id="data-flow" className="mb-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold mt-8 mb-4">4.2 Datenintegration und Optimierung</h3>
              <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">
                ↑ Nach oben
              </Link>
            </div>            <p className="mb-4">
              Die Integration der Messdaten in die Visualisierung erfolgt über den <Link href="#nextjs-api" className="text-blue-600 hover:underline">Data Access Layer</Link>, 
              der die Daten direkt aus der PostgreSQL-Datenbank lädt und in Kapitel 2.1 detailliert beschrieben ist. Die Datenstruktur 
              ist auf effiziente Verarbeitung und Darstellung ausgelegt.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mt-6">
              <h4 className="font-semibold mb-2">Optimierungen:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">Server-seitiges Rendering</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Initiales Laden der Daten erfolgt auf dem Server, minimiert Time-to-First-Byte
                  </p>
                </li>
                <li>
                  <span className="font-medium">Dynamische Kanalverarbeitung</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Automatische Erkennung und Darstellung aller verfügbaren Messkanäle
                  </p>
                </li>
                <li>
                  <span className="font-medium">Datenformatierung</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Präzise Formatierung der Messwerte mit zwei Nachkommastellen für bessere Lesbarkeit
                  </p>
                </li>
              </ul>
            </div>            <h4 className="text-lg font-semibold mt-6 mb-4">Integration in die Benutzeroberfläche</h4>            <p className="mb-4">
              Die Visualisierung der Messdaten erfolgt innerhalb des Bearbeitungsformulars (`edit-form.tsx`). 
              Als Client-Komponente (`'use client'`) ist sie für die interaktive Benutzeroberfläche zuständig 
              und kombiniert die Diagrammdarstellung mit Formularfunktionen zur Datenverwaltung. Sie importiert 
              die notwendigen Komponenten und Typen, bereitet die Messdaten für die Visualisierung auf und 
              bettet das Diagramm in das Formular ein:
            </p>

            <div className="rounded-lg overflow-hidden">
              <div className="bg-gray-700 text-gray-200 px-4 py-2 text-sm font-mono">
                📄 app/ui/analysis/edit-form.tsx
              </div><pre className="bg-gray-800 text-gray-100 p-4 text-sm">
                <code className="language-typescript">{`'use client';

// Importiere benötigte Komponenten und Typen
import { MeasurementForm, TimeseriesDataPoint } from '@/app/lib/definitions';
import TimeseriesChartClient from '@/app/ui/dashboard/timeseries-chart-client';

export default function EditAnalysisForm({
  measurement,
}: {
  measurement: MeasurementForm;
}) {
  // Bereite die Daten für die Diagrammdarstellung vor
  const chartData = measurement.data.map(point => {
    // Erstelle dynamisch ein Objekt mit allen Kanälen
    const channelData: { [key: string]: number | null } = {};
    
    // Weise die Messwerte den entsprechenden Kanälen zu
    measurement.channels.forEach((channel) => {
      channelData[channel] = point[channel] ?? null;
    });
    
    return {
      seconds: point.seconds_from_start,
      ...channelData
    };
  }) as TimeseriesDataPoint[];

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Diagrammbereich */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Messdaten Visualisierung</h2>
          <div className="rounded-md border border-gray-200 bg-white p-4">
            <TimeseriesChartClient data={chartData} />
          </div>
        </div>
        {/* ...Rest des Formulars... */}
      </div>
    </form>
  );
}`}</code>
              </pre>
            </div>

            <p className="mt-4 mb-4">
              Die Edit-Seite selbst ist für das Laden der Messungsdaten zuständig und übergibt diese 
              an das Formular:
            </p>

            <div className="rounded-lg overflow-hidden">
              <div className="bg-gray-700 text-gray-200 px-4 py-2 text-sm font-mono">
                📄 app/dashboard/analysis/[id]/edit/page.tsx
              </div>
              <pre className="bg-gray-800 text-gray-100 p-4 text-sm">
                <code className="language-typescript">{`export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  // Hole die Messungsdaten aus der Datenbank
  const rawMeasurement = await fetchMeasurementById(id);
  if (!rawMeasurement) {
    notFound();
  }

  const measurement: MeasurementForm = {
    ...rawMeasurement,
    id,
    filename: rawMeasurement.filename || '',
    description: rawMeasurement.description || '',
    status: rawMeasurement.status || 'offen'
  };
  
  return (
    <main>
      <Breadcrumbs breadcrumbs={[/* ... */]} />
      <Form measurement={measurement} />
    </main>
  );
}`}</code>              </pre>
            </div>

            <p className="mt-8 mb-4">
              Die folgende Abbildung zeigt die fertige Integration des Tremor-Liniendiagramms in der 
              Bearbeitungsansicht, zusammen mit den Formularfeldern für Metadaten und Validierungsstatus:
            </p>

            <div className="mt-4 mb-8">
              <Image 
                src="/docs/edit.png"
                alt="Screenshot der Bearbeitungsansicht mit integriertem Liniendiagramm"
                width={1000}
                height={800}
                className="rounded-lg border border-gray-200"
              />
            </div>
          </section>
        </div>
      </section>
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
