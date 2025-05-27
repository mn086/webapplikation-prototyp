/**
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
};