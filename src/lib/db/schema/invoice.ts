import { sql } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  numeric,
} from "drizzle-orm/pg-core";

export const invoices = pgTable("pdf_invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  invoiceNumber: varchar("invoice_number", { length: 191 }).notNull(),
  date: timestamp("date").notNull(),
  billTo: varchar("bill_to", { length: 191 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  currency: varchar("currency", { length: 10 }).notNull(),
  hours: numeric("hours").notNull(),
  ratePerHour: numeric("rate_per_hour").notNull(),
  bankName: varchar("bank_name", { length: 191 }).notNull(),
  accountNumber: varchar("account_number", { length: 191 }).notNull(),
  iban: varchar("iban", { length: 191 }).notNull(),
  accountHolderName: varchar("account_holder_name", { length: 191 }).notNull(),
  contactNumber: varchar("contact_number", { length: 191 }).notNull(),
  email: varchar("email", { length: 191 }).notNull(),
  cnicNumber: varchar("cnic_number", { length: 191 }).notNull(),
  branchAddress: varchar("branch_name", { length: 191 }),
  branchName: varchar("branch_name", { length: 191 }),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});
