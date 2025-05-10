import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { 
  ssl: 'require',
  connect_timeout: 30,
  idle_timeout: 30
});

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}

export async function GET() {
  try {
  	return Response.json(await listInvoices());
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ error: { message: error.message } }, { status: 500 });
    }
    return Response.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
