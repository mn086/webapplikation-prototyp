// API-Route zur Überprüfung der Datenbankstruktur
// Analysiert Tabellen, Spalten, Indizes und Fremdschlüsselbeziehungen
import sql from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Hole eine Übersicht aller Tabellen im 'public' Schema
        // Für jede Tabelle wird auch die Anzahl ihrer Spalten ermittelt
        const tables = await sql`
            SELECT table_name, 
                   (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
            FROM information_schema.tables t
            WHERE table_schema = 'public'
            AND table_type = 'BASE TABLE';
        `;

        // Analysiere die Struktur der metadata Tabelle
        // Zeigt Spaltennamen, Datentypen und Null-Erlaubnis
        const metadata = await sql`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns 
            WHERE table_name = 'metadata'
            AND table_schema = 'public';
        `;

        // Analysiere die Struktur der measurements Tabelle
        // Analog zur metadata Tabelle
        const measurements = await sql`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns 
            WHERE table_name = 'measurements'
            AND table_schema = 'public';
        `;

        // Ermittle alle Indizes in der Datenbank
        // Zeigt Tabellenname, Indexname, indizierte Spalten und Unique-Flags
        const indices = await sql`
            SELECT
                t.relname as table_name,
                i.relname as index_name,
                a.attname as column_name,
                ix.indisunique as is_unique
            FROM pg_class t
            JOIN pg_index ix ON t.oid = ix.indrelid
            JOIN pg_class i ON i.oid = ix.indexrelid
            JOIN pg_attribute a ON a.attrelid = t.oid
            WHERE a.attnum = ANY(ix.indkey)
            AND t.relkind = 'r'
            AND t.relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
            ORDER BY t.relname, i.relname;
        `;

        // Ermittle alle Fremdschlüsselbeziehungen zwischen den Tabellen
        // Zeigt die verknüpften Tabellen und Spalten sowie den Constraint-Namen
        const foreignKeys = await sql`
            SELECT
                tc.table_schema, 
                tc.constraint_name, 
                tc.table_name, 
                kcu.column_name,
                ccu.table_name AS foreign_table_name,
                ccu.column_name AS foreign_column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
                ON tc.constraint_name = kcu.constraint_name
                AND tc.table_schema = kcu.table_schema
            JOIN information_schema.constraint_column_usage AS ccu
                ON ccu.constraint_name = tc.constraint_name
                AND ccu.table_schema = tc.table_schema
            WHERE tc.constraint_type = 'FOREIGN KEY'
            AND tc.table_schema = 'public';
        `;

        // Fasse alle Ergebnisse in einer JSON-Antwort zusammen
        return NextResponse.json({
            tables: tables,
            metadata_structure: metadata,
            measurements_structure: measurements,
            indices: indices,
            foreign_keys: foreignKeys,
            message: 'Datenbankstruktur erfolgreich überprüft'
        }, { 
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        // Im Fehlerfall: Protokolliere den Fehler und sende eine Fehlermeldung
        console.error('Fehler bei der Tabellenprüfung:', error);
        return NextResponse.json(
            { error: 'Tabellenprüfung fehlgeschlagen', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
