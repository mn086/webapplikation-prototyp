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
app/
├── api/                # API-Routes
│   └── init/         # Endpunkt für Datenbankinitialisierung
├── dashboard/         # Dashboard-Bereich
│   └── (overview)/   # Übersichtsseite mit Zeitreihen-Visualisierung
├── lib/              # Hilfsfunktionen & Definitionen
│   ├── actions.ts    # Server Actions & Formvalidierung
│   ├── data.ts      # Datenbankzugriffe
│   ├── db.ts        # Datenbankanbindung und Typen
│   ├── definitions.ts # Typdefinitionen
│   └── schema.sql   # Datenbankschema
├── login/           # Login-Seite mit E-Mail/Passwort
└── ui/              # UI-Komponenten
    ├── dashboard/   # Dashboard-spezifische Komponenten
    │   ├── cards.tsx
    │   ├── nav-links.tsx
    │   ├── revenue-chart.tsx  # (wird zu timeseries-chart.tsx)
    │   └── sidenav.tsx
    ├── customers/   # (wird angepasst)
    └── invoices/    # (wird angepasst)
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
   POSTGRES_HOST=dein-postgres-host
   POSTGRES_DATABASE=deine-postgres-datenbank
   POSTGRES_USER=dein-postgres-user
   POSTGRES_PASSWORD=dein-postgres-password
   ```

4. Datenbank initialisieren:
   Entweder über die API-Route:
   - Development Server starten (siehe Schritt 5)
   - Im Browser aufrufen: `http://localhost:3000/api/init`
   
   Oder direkt über SQL-Client:
   ```powershell
   # In psql oder einem anderen PostgreSQL-Client:
   \i app/lib/schema.sql
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
