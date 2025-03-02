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

interface Project {
  description: string;
  hours: number;
  ratePerHour: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: Date;
  billTo: string;
  email: string;
  currency: string;
  projects: Project[];
  branchName?: string | null;
  branchAddress?: string | null;
  address: string;
  bankName: string;
  accountNumber: string;
  iban: string;
  accountHolderName: string;
  contactNumber: string;
  cnicNumber: string;
}

interface InvoicesTableProps {
  invoices: Invoice[];
}

export function InvoicesTable({ invoices }: InvoicesTableProps) {
  const router = useRouter();

  const handleCopy = (invoice: Invoice) => {
    const params = new URLSearchParams({
      branchName: invoice.branchName || "",
      branchAddress: invoice.branchAddress || "",
      invoiceNumber: invoice.invoiceNumber,
      billTo: invoice.billTo,
      address: invoice.address,
      currency: invoice.currency,
      bankName: invoice.bankName,
      accountNumber: invoice.accountNumber,
      iban: invoice.iban,
      accountHolderName: invoice.accountHolderName,
      contactNumber: invoice.contactNumber,
      email: invoice.email,
      cnicNumber: invoice.cnicNumber,
      projects: JSON.stringify(invoice.projects),
    });

    router.push(`/?${params.toString()}`);
  };

  // Calculate total amount from all projects
  const calculateTotalAmount = (projects: Project[]) => {
    if (!Array.isArray(projects)) return 0;
    return projects.reduce((sum, project) => {
      const hours = typeof project.hours === 'number' ? project.hours : parseFloat(project.hours as any);
      const rate = typeof project.ratePerHour === 'number' ? project.ratePerHour : parseFloat(project.ratePerHour as any);
      return sum + (hours * rate);
    }, 0);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => {
            const totalAmount = calculateTotalAmount(invoice.projects);
            
            return (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">
                  {invoice.invoiceNumber}
                </TableCell>
                <TableCell>
                  {format(new Date(invoice.date), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>{invoice.billTo}</TableCell>
                <TableCell>
                  {totalAmount.toLocaleString()} {invoice.currency}
                </TableCell>
                <TableCell className="text-right space-x-1">
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
