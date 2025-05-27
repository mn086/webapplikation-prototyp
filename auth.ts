// Importiere benötigte Abhängigkeiten
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
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
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
});