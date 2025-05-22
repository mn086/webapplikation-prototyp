import postgres from 'postgres';

// Konfiguration für die Neon Postgres-Verbindung
const sql = postgres({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    ssl: true,
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
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
