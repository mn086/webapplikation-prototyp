# Zeitreihen-Visualisierungs Dashboard

Diese Anwendung ist ein Dashboard zur Visualisierung von Zeitreihendaten, das mit Next.js App Router erstellt wurde. Sie demonstriert moderne Web-Entwicklungspraktiken und Features wie:
- Server-seitige Rendering mit Next.js 
- Authentifizierung und Autorisierung mit NextAuth
- Formvalidierung mit Zod
- Visualisierung von Zeitreihendaten
- Responsive Design mit Tailwind CSS
- Datenbankintegration mit Neon PostgreSQL
- Moderne Komponenten-Architektur mit TypeScript

## Projektstruktur

```
├── app/                    # Next.js App Router basierte Anwendung
│   ├── favicon.ico        # Favicon
│   ├── layout.tsx         # Root Layout
│   ├── page.tsx          # Homepage
│   ├── opengraph-image.png # Social Media Preview
│   ├── api/              # Setup & Debug API-Routes
│   │   ├── check-status/ # [Diag] Statusabfrage der Datenbank
│   │   ├── check-tables/ # [Diag] Überprüfung der Datenbankstruktur
│   │   ├── check-values/ # [Diag] Überprüfung der Messwerte
│   │   ├── create-indices/ # [Setup] Einmalige Indexerstellung
│   │   ├── init/        # [Setup] Initiale Datenbankinitialisierung
│   │   ├── seed/        # [Optional] Initiales Einfügen von Testdaten
│   │   ├── test-data/   # [Debug] Testdatenabfrage
│   │   ├── test-db/     # [Debug] Datenbankverbindungstest
│   │   └── test-update/ # [Debug] Update-Tests
├── dashboard/              # Dashboard-Bereich
│   ├── layout.tsx        # Gemeinsames Layout für Dashboard
│   ├── (overview)/       # Übersichts-Route
│   │   ├── loading.tsx  # Lade-Animation
│   │   └── page.tsx     # Dashboard-Hauptseite mit Statistiken
│   └── analysis/        # Analyse-Route
│       ├── error.tsx    # Fehlerbehandlung
│       ├── page.tsx     # Messungsübersicht
│       ├── [id]/        # Dynamische Messungs-Route
│       │   └── edit/    # Bearbeitung einer Messung
│       │       ├── not-found.tsx  # 404-Seite
│       │       └── page.tsx       # Bearbeitungsformular
│       └── create/      # Neue Messung erstellen
│           └── page.tsx # Erstellungsformular
├── lib/                   # Hilfsfunktionen & Definitionen
│   ├── actions.ts         # Server Actions
│   ├── data.ts           # Datenbankzugriffe
│   ├── db.ts             # Datenbankverbindung
│   ├── definitions.ts    # Typdefinitionen
│   ├── php-api.ts        # PHP-API Integration
│   ├── schema.sql        # Datenbankschema
│   ├── seed.sql          # Testdaten
│   └── utils.ts          # Utility-Funktionen
├── login/                 # Login-Bereich
│   └── page.tsx          # Login-Seite
├── types/                # TypeScript Typdefinitionen
│   └── svg.d.ts         # SVG Modul-Deklarationen
└── ui/                    # UI-Komponenten
    ├── analysis/         # Analyse-Komponenten
    │   ├── breadcrumbs.tsx
    │   ├── buttons.tsx
    │   ├── create-form.tsx
    │   ├── edit-form.tsx
    │   ├── status.tsx
    │   └── table.tsx
    ├── branding/         # Branding-Elemente
    │   └── hdm-logo.tsx
    ├── dashboard/        # Dashboard-Komponenten
    │   ├── cards.tsx
    │   ├── latest-measurements.tsx
    │   ├── nav-links.tsx
    │   ├── sidenav.tsx
    │   ├── timeseries-chart.tsx
    │   └── timeseries-chart-client.tsx
    ├── measurements/     # Messungs-Komponenten
    │   ├── status.tsx
    │   └── table.tsx
    ├── button.tsx       # Wiederverwendbare UI-Elemente
    ├── code-block.tsx   # Syntax-Highlighting für Code
    ├── fonts.ts         # Schriftarten-Konfiguration
    ├── global.css       # Globale Styles
    ├── home.module.css  # Home-spezifische Styles
    ├── login-form.tsx   # Authentifizierung
    ├── pagination.tsx   # Seitennavigation
    ├── search.tsx       # Suchfunktion
    └── skeletons.tsx    # Lade-Platzhalter

apache-php-measurements/   # Apache PHP Backend
├── docker-compose.yml    # Docker-Konfiguration
├── Dockerfile           # Apache/PHP Docker-Image
└── measurements-api/    # PHP REST-API
    ├── measurements/   # Messdaten (JSON)
    │   ├── measurement_001.json
    │   ├── measurement_002.json
    │   └── measurement_003.json
    └── api/           # PHP-Endpunkte
        ├── count.php  # Anzahl der Messungen
        ├── get.php    # Einzelne Messung abrufen
        └── list.php   # Liste aller Messungen

public/                 # Statische Assets
├── hero-desktop.png   # Hero-Bild Desktop
├── hero-mobile.png    # Hero-Bild Mobile
├── branding/          # Branding Assets
│   └── hochschule-der-medien-hdm-vector-logo.svg
└── docs/             # Dokumentations-Assets
    ├── analysis.png
    ├── edit.png
    └── search-flow.png



# Konfigurationsdateien
auth.config.ts        # NextAuth Konfiguration
auth.ts              # Auth Setup
middleware.ts        # Next.js Middleware
next-env.d.ts        # Next.js Typdefinitionen
next.config.ts       # Next.js Konfiguration
package.json         # Projekt-Konfiguration
pnpm-lock.yaml       # PNPM Lockfile
pnpm-workspace.yaml  # PNPM Workspace
postcss.config.js    # PostCSS Konfiguration
tailwind.config.ts   # Tailwind Konfiguration
tsconfig.json        # TypeScript Konfiguration
```

## Installation und Start

1. Repository klonen:
   ```powershell
   git clone [repository-url]
   cd nextjs-dashboard
   ```

2. Dependencies installieren:
   ```powershell
   pnpm install
   ```

3. `.env.local` Datei im Projektroot erstellen:
   ```env
   # Datenbankverbindung (mit Connection Pooling)
   POSTGRES_URL=postgres://benutzer:passwort@host:port/datenbankname?sslmode=require

   # NextAuth Authentifizierungsschlüssel
   # Generieren Sie einen neuen Schlüssel auf https://generate-secret.vercel.app/32
   AUTH_SECRET=ihr-auth-secret-schlüssel
   ```

4. Datenbank einrichten:
   Führen Sie die folgenden Schritte in dieser Reihenfolge aus:

   a) Datenbank initialisieren (ERFORDERLICH)
   ```powershell
   # Development Server starten
   pnpm dev
   # Dann im Browser aufrufen:
   http://localhost:3000/api/init
   ```

   b) Indizes erstellen für optimale Performance (ERFORDERLICH)
   ```powershell
   # Im Browser aufrufen:
   http://localhost:3000/api/create-indices
   ```

   c) Testdaten einfügen (OPTIONAL)
   ```powershell
   # Nur wenn Sie mit Beispieldaten arbeiten möchten:
   http://localhost:3000/api/seed
   ```

   Alternativ können Sie diese Schritte auch direkt über einen SQL-Client ausführen:
   ```powershell
   # In psql oder einem anderen PostgreSQL-Client:
   \i app/lib/schema.sql   # Initialisierung
   \i app/lib/indices.sql  # Indizes
   \i app/lib/seed.sql     # Testdaten
   ```

5. Development Server starten:
   ```powershell
   pnpm dev
   ```

6. Im Browser öffnen:
   - URL: `http://localhost:3000`
   - Login mit E-Mail und Passwort
   - Nach erfolgreicher Anmeldung wird das Dashboard angezeigt

## Technologie-Stack

- Framework: Next.js 14
- Styling: Tailwind CSS
- Datenbank: Neon PostgreSQL
- Authentifizierung: NextAuth.js
- Formvalidierung: Zod
- Charting: Tremor (geplant)
- Package Manager: pnpm

## Umgebungsvariablen

Die Anwendung benötigt zwei essenzielle Umgebungsvariablen, die in der `.env.local` Datei konfiguriert werden:

1. `POSTGRES_URL`: Die vollständige Verbindungs-URL zur PostgreSQL-Datenbank
   - Verwendet Connection Pooling via pgBouncer für optimale Leistung
   - Format: `postgres://benutzer:passwort@host:port/datenbankname?sslmode=require`

2. `AUTH_SECRET`: Sicherheitsschlüssel für die NextAuth-Authentifizierung
   - Muss ein sicherer, zufällig generierter String sein
   - Kann auf https://generate-secret.vercel.app/32 generiert werden
   - Darf nicht im Git-Repository gespeichert werden

Hinweis: Die `.env.local` Datei enthält sensitive Daten und ist bereits in `.gitignore` aufgeführt. Stellen Sie sicher, dass Sie diese Datei niemals in ein öffentliches Repository pushen.

## Apache PHP API

Die Anwendung enthält ein separates PHP-Backend, das als Datenquelle für neu bereitgestellte Messdaten dient. Dieses Backend läuft in einem Docker-Container und stellt eine REST-API bereit.

### API-Endpunkte

1. `GET /measurements/api/list.php`
   - Listet alle verfügbaren Messungen auf
   - Rückgabe: JSON-Array mit ID, Dateiname und Pfad

2. `GET /measurements/api/get.php?id={id}`
   - Lädt die detaillierten Daten einer spezifischen Messung
   - Parameter: `id` = Messungs-ID
   - Rückgabe: JSON mit Metadaten, Kanälen und Messwerten

3. `GET /measurements/api/count.php`
   - Gibt die Gesamtanzahl verfügbarer Messungen zurück
   - Rückgabe: JSON mit Anzahl der Messungen

### Integration

Die PHP-API wird über `lib/php-api.ts` in die Next.js-Anwendung integriert. Diese Schnittstelle:
- Kommuniziert mit dem Apache/PHP-Backend
- Konvertiert die Daten in TypeScript-Typen
- Ermöglicht den Import von Messdaten in die PostgreSQL-Datenbank

### Docker-Setup

Das PHP-Backend wird über Docker bereitgestellt:
```bash
cd apache-php-measurements
docker-compose up -d
```
- Apache läuft auf Port 8090
- Logs werden in `logs/` gespeichert
- Messdaten liegen als JSON-Dateien in `measurements/`

## Datenbankstruktur & Wichtige Dateien

Die Anwendung nutzt eine PostgreSQL-Datenbank zur Speicherung von Zeitreihendaten. Die wichtigsten Dateien und ihre Funktionen sind:

### Datenbankzugriff
- `lib/db.ts`: Zentrale Datenbankverbindung mit Connection Pooling
- `lib/schema.sql`: Definition der Tabellen und Indizes
- `lib/seed.sql`: SQL-Skript zum Befüllen mit Testdaten
- `lib/data.ts`: Data Access Layer mit TypeScript-Typen und Datenbankfunktionen

### API-Endpunkte
- `api/init/route.ts`: Initialisiert die Datenbankstruktur
- `api/seed/route.ts`: Befüllt die Datenbank mit Testdaten
- `api/test-data/route.ts`: API zum Abfragen der Daten

### Datenbankfunktionen (data.ts)
Der Data Access Layer bietet folgende Hauptfunktionen:
- `fetchTimeseriesData()`: Lädt Zeitreihendaten mit Metadaten
- `fetchDashboardData()`: Liefert aggregierte Daten fürs Dashboard
- `fetchFilteredMeasurements()`: Implementiert Suche und Paginierung
- `fetchMeasurementStats()`: Liefert Statistiken über Messungen

### Datenbankschema
Die Datenbank verwendet folgende Tabellen:
- `measurements`: Haupttabelle für Messungen
- `metadata`: Zusatzinformationen zu Messungen
- `measurement_channels`: Definiert die Messkanäle
- `measurement_values`: Eigentliche Messwerte mit Zeitstempeln

Alle Datenbankzugriffe sind typsicher durch TypeScript-Definitionen und verwenden parametrisierte SQL-Abfragen für optimale Sicherheit.
