// Importiere den NextAuth Konfigurationstyp
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
} satisfies NextAuthConfig;