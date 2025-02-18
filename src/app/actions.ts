"use server";

import { db } from "../lib/db";
import { invoices } from "../lib/db/schema/invoice";
import { InvoiceFormData } from "../hooks/useInvoiceForm";

export async function createInvoice(formData: InvoiceFormData) {
  try {
    await db.insert(invoices).values({
      invoiceNumber: formData.invoiceNumber,
      date: formData.date,
      billTo: formData.billTo,
      address: formData.address,
      currency: formData.currency,
      hours: formData.hours.toString(),
      ratePerHour: formData.ratePerHour.toString(),
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      iban: formData.iban,
      accountHolderName: formData.accountHolderName,
      contactNumber: formData.contactNumber,
      email: formData.email,
      cnicNumber: formData.cnicNumber,
    });

    return {
      success: true as const,
    };
  } catch (error) {
    console.error("Failed to save invoice:", error);
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Failed to save invoice",
    };
  }
}
