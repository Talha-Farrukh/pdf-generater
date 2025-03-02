"use server";

import { db } from "../lib/db";
import { invoices } from "../lib/db/schema/invoice";
import { InvoiceFormData } from "../hooks/useInvoiceForm";
import { eq } from "drizzle-orm";
import { user } from "../lib/db/schema/auth";
import { revalidatePath as nextRevalidatePath } from "next/cache";

export async function createInvoice(formData: InvoiceFormData) {
  try {
    // Ensure projects is properly formatted
    const projectsData = Array.isArray(formData.projects) 
      ? formData.projects.map(project => ({
          description: project.description,
          hours: typeof project.hours === 'number' ? project.hours : parseFloat(project.hours as any),
          ratePerHour: typeof project.ratePerHour === 'number' ? project.ratePerHour : parseFloat(project.ratePerHour as any)
        }))
      : [];

    const result = await db
      .insert(invoices)
      .values({
        invoiceNumber: formData.invoiceNumber,
        date: formData.date,
        billTo: formData.billTo,
        address: formData.address,
        currency: formData.currency,
        projects: projectsData,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        iban: formData.iban,
        accountHolderName: formData.accountHolderName,
        contactNumber: formData.contactNumber,
        email: formData.email,
        cnicNumber: formData.cnicNumber,
        branchName: formData.branchName || null,
        branchAddress: formData.branchAddress || null,
      })
      .returning({ id: invoices.id });

    return {
      success: true,
      id: result[0].id,
    };
  } catch (error) {
    console.error("Failed to save invoice:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function getInvoice(invoiceId: string) {
  const invoice = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, invoiceId))
    .limit(1)
    .then((res) => res[0]);
  return invoice;
}

export async function getInvoices() {
  const result = await db.select().from(invoices);
  return result;
}

export async function getAllUsers() {
  const result = await db.select().from(user);
  return result;
}

export async function revalidatePath(path: string) {
  nextRevalidatePath(path);
}
