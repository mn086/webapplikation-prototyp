// API-Route zur Initialisierung der Datenbank
// Erstellt das Datenbankschema und fügt Testdaten ein
import sql from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

// Definiere die Benutzer für die initiale Einrichtung
const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'User',
        email: 'user@nextmail.com',
        password: '123456',
    },
];

// Funktion zum Anlegen der Benutzertabelle und Einfügen der Benutzer
async function seedUsers(sql: any) {
    console.log('Erstelle Benutzertabelle...');
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
        CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
    `;

    console.log('Füge Benutzer ein...');
    const insertedUsers = await Promise.all(
        users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return sql`
                INSERT INTO users (id, name, email, password)
                VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
                ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );

    return insertedUsers;
}

export async function GET() {
    try {
        console.log('Starte Datenbankinitialisierung...');

        // Lade die SQL-Datei mit der Datenbankstruktur
        const schemaPath = path.join(process.cwd(), 'app', 'lib', 'schema.sql');
        const createScript = await fs.readFile(schemaPath, 'utf8');
        console.log('Schema-Datei geladen');

        // Führe alle Datenbankoperationen in einer Transaktion aus
        // Dies stellt sicher, dass die Datenbank entweder vollständig oder gar nicht initialisiert wird
        await sql.begin(async (sql) => {
            // Erstelle zuerst die Benutzer
            await seedUsers(sql);
            console.log('Benutzer erfolgreich angelegt');

            // Dann erstelle die restliche Datenbankstruktur
            console.log('Führe Schema-Skript aus...');
            await sql.unsafe(createScript);
            console.log('Datenbankstruktur erfolgreich erstellt');

            // Lade die SQL-Datei mit den Testdaten
            const seedPath = path.join(process.cwd(), 'app', 'lib', 'seed.sql');
            const seedScript = await fs.readFile(seedPath, 'utf8');
            console.log('Testdaten-Datei geladen');

            // Füge die Testdaten in die Datenbank ein
            console.log('Füge Testdaten ein...');
            await sql.unsafe(seedScript);
            console.log('Testdaten erfolgreich eingefügt');
        });

        // Sende Erfolgsmeldung zurück
        return NextResponse.json({ 
            message: 'Datenbank erfolgreich initialisiert und mit Testdaten gefüllt'
        }, { status: 200 });
    } catch (error) {
        // Im Fehlerfall: Protokolliere den Fehler und sende eine Fehlermeldung
        console.error('Fehler bei der Datenbankinitialisierung:', error);
        return NextResponse.json(
            { error: 'Datenbankinitialisierung fehlgeschlagen', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
