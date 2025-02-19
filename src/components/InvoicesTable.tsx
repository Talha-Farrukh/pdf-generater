"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { format } from "date-fns";
import { Copy, Eye } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: Date;
  billTo: string;
  email: string;
  amount: string;
  currency: string;
  status: string;
}

interface InvoicesTableProps {
  invoices: any[];
}

export function InvoicesTable({ invoices }: InvoicesTableProps) {
  const router = useRouter();

  const handleCopy = (invoice: any) => {
    const searchParams = new URLSearchParams({
      invoiceNumber: invoice.invoiceNumber,
      billTo: invoice.billTo,
      address: invoice.address,
      currency: invoice.currency,
      hours: invoice.hours,
      ratePerHour: invoice.ratePerHour,
      bankName: invoice.bankName,
      accountNumber: invoice.accountNumber,
      iban: invoice.iban,
      accountHolderName: invoice.accountHolderName,
      contactNumber: invoice.contactNumber,
      email: invoice.email,
      cnicNumber: invoice.cnicNumber,
      branchName: invoice.branchName,
      branchAddress: invoice.branchAddress,
    });

    router.push(`/?${searchParams.toString()}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Bill To</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => {
            const amount = Number(invoice.hours) * Number(invoice.ratePerHour);
            return (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>
                  {format(new Date(invoice.date), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>{invoice.billTo}</TableCell>
                <TableCell>{invoice.email}</TableCell>
                <TableCell>
                  {amount.toLocaleString()} {invoice.currency}
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(invoice)}
                    className="hover:text-primary"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="hover:text-primary"
                  >
                    <Link href={`/${invoice.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
