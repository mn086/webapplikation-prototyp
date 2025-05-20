# Next.js Dashboard Anwendung

Diese Anwendung ist ein Rechnungs-Dashboard, das mit Next.js App Router erstellt wurde. Sie demonstriert moderne Web-Entwicklungspraktiken und Features wie:
- Server-seitige Rendering mit Next.js 
- Authentifizierung und Autorisierung
- Formularvalidierung mit Zod
- Responsive Design mit Tailwind CSS
- Datenbankintegration mit PostgreSQL
- Moderne Komponenten-Architektur

## Projektstruktur

```
app/
├── dashboard/           # Dashboard-Bereich
│   ├── (overview)/     # Übersichtsseite mit Statistiken
│   ├── customers/      # Kundenverwaltung
│   └── invoices/       # Rechnungsverwaltung
│       ├── create/     # Neue Rechnung erstellen
│       └── [id]/edit/  # Rechnung bearbeiten
├── lib/                # Hilfsfunktionen & Definitionen
│   ├── actions.ts      # Server Actions
│   └── data.ts        # Datenbankzugriffe
├── login/             # Login-Seite
└── ui/                # UI-Komponenten
    ├── dashboard/     # Dashboard-spezifische Komponenten
    ├── invoices/     # Rechnungs-Komponenten
    └── customers/     # Kunden-Komponenten
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

3. `.env` Datei im Projektroot erstellen:
   ```env
   AUTH_SECRET=dein-secret-key
   POSTGRES_URL=deine-postgres-connection-url
   ```

4. Datenbank initialisieren:
   - Besuche `http://localhost:3000/seed` oder
   - Führe die Seed-Skripte manuell aus

5. Development Server starten:
   ```powershell
   pnpm dev
   ```

6. Im Browser öffnen:
   - URL: `http://localhost:3000`
   - Login mit:
     - Email: user@nextmail.com
     - Passwort: 123456

## Technologie-Stack

- Framework: Next.js
- Styling: Tailwind CSS
- Datenbank: PostgreSQL
- Authentifizierung: NextAuth.js
- Form-Validierung: Zod
- Package Manager: pnpm
