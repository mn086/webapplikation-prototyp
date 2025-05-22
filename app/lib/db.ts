import postgres from 'postgres';

// Konfiguration für die Neon Postgres-Verbindung
const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: 'require',
    max: 10,
    idle_timeout: 20,
    connect_timeout: 30,
    connection: {
        options: '-c timezone=UTC'
    },
    transform: {
        undefined: null,
    },
    onnotice: (notice) => {
        console.log('Database notice:', notice);
    },
    debug: (connection, query, params) => {
        console.log('Database query:', query, params);
    },
});

// Typdefinitionen
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

export default sql;
