"use client";

import { RefreshCcw } from "lucide-react";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  TextFormField,
  NumberFormField,
  DateFormField,
  CurrencyFormField,
} from "./form/FormFields";
import { useInvoiceForm, InvoiceFormData } from "../hooks/useInvoiceForm";

interface InvoiceFormProps {
  onSubmit: (data: InvoiceFormData) => void;
}

export function InvoiceForm({ onSubmit }: InvoiceFormProps) {
  const { form, handleSubmit, handleReset } = useInvoiceForm(onSubmit);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Invoice Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <TextFormField
                control={form.control}
                name="invoiceNumber"
                label="Invoice Number"
                placeholder="INV-001"
              />
              <DateFormField control={form.control} name="date" label="Date" />
            </div>

            <TextFormField
              control={form.control}
              name="billTo"
              label="Bill To"
              placeholder="Company Name"
            />

            <div className="grid grid-cols-2 gap-4">
              <TextFormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="email@example.com"
              />
              <TextFormField
                control={form.control}
                name="cnicNumber"
                label="CNIC Number"
                placeholder="3520112345678"
              />
            </div>

            <TextFormField
              control={form.control}
              name="address"
              label="Address"
              placeholder="Complete Address"
            />

            <div className="grid grid-cols-3 gap-4">
              <CurrencyFormField
                control={form.control}
                name="currency"
                label="Currency"
              />
              <NumberFormField
                control={form.control}
                name="hours"
                label="Hours Worked"
                placeholder="0"
              />
              <NumberFormField
                control={form.control}
                name="ratePerHour"
                label="Rate per Hour"
                placeholder="0.00"
              />
            </div>

            <TextFormField
              control={form.control}
              name="bankName"
              label="Bank Name"
              placeholder="Bank Name"
            />

            <div className="grid grid-cols-2 gap-4">
              <TextFormField
                control={form.control}
                name="accountNumber"
                label="Account Number"
                placeholder="Account Number"
              />
              <TextFormField
                control={form.control}
                name="iban"
                label="IBAN"
                placeholder="IBAN"
              />
            </div>

            <TextFormField
              control={form.control}
              name="accountHolderName"
              label="Account Holder Name"
              placeholder="Account Holder Name"
            />

            <TextFormField
              control={form.control}
              name="contactNumber"
              label="Contact Number"
              placeholder="+92 XXX XXXXXXX"
            />

            <div className="flex justify-between">
              <Button type="submit">Generate Invoice</Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Reset Form
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
