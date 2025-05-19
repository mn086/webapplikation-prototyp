'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({ 
    invalid_type_error: 'Bitte wählen Sie einen Kunden aus.' 
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Bitte geben Sie einen Betrag größer als $0 ein.' }),
  status: z.enum(['pending', 'paid'], { 
    invalid_type_error: 'Bitte wählen Sie einen Rechnungsstatus aus.' 
  }),
  date: z.string(),
});

// Verwende Zod, um die erwarteten Typen zu definieren
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  // Validieren des Formulars mit Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  // Wenn die Formularvalidierung fehlschlägt, gib frühzeitig Fehler zurück. Andernfalls fahre fort.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Fehlende Felder. Erstellung der Rechnung fehlgeschlagen.',
    };
  }
 
  // Daten für das Einfügen in die Datenbank vorbereiten
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  // Daten in die Datenbank einfügen
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // Wenn ein Datenbankfehler auftritt, gib eine spezifischere Fehlermeldung zurück.
    return {
      message: 'Datenbankfehler: Rechnung konnte nicht erstellt werden.',
    };
  }
 
  // Revalidiere den Cache für die Rechnungsseite und leite den Benutzer um
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Verwende Zod, um die erwarteten Typen zu aktualisieren
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    // den Fehler vorerst in der Konsole loggen
    console.error(error);
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}