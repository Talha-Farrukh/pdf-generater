"use client";

import { BlobProvider } from "@react-pdf/renderer";
import { PDFDocument } from "../../components/PDFDocument";
import { Button } from "../../components/ui/button";
import { InvoiceFormData } from "../../hooks/useInvoiceForm";
import dynamic from "next/dynamic";
import Link from "next/link";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading PDF viewer...</p>,
  }
);

export default function PDFRenderer({ invoice }: { invoice: InvoiceFormData }) {
  return (
    <div className="flex flex-col gap-4 justify-between items-center mb-4 w-full">
      <div className="flex gap-4 justify-between items-center w-full">
        <Button asChild>
          <Link href="/">Back to Form</Link>
        </Button>
        <BlobProvider
          document={
            <PDFDocument
              invoiceData={{
                ...invoice,
                date: new Date(invoice.date),
                hours: invoice.hours,
                ratePerHour: invoice.ratePerHour,
              }}
            />
          }
        >
          {({ blob, url, loading }) => (
            <Button
              disabled={loading}
              onClick={() => {
                if (url) {
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = `invoice-${invoice.invoiceNumber}.pdf`;
                  link.click();
                }
              }}
            >
              {loading ? "Preparing..." : "Download PDF"}
            </Button>
          )}
        </BlobProvider>
      </div>

      <div className="w-full h-[calc(100vh-100px)]">
        <PDFViewer className="w-full h-full">
          <PDFDocument
            invoiceData={{
              ...invoice,
              date: new Date(invoice.date),
              hours: invoice.hours,
              ratePerHour: invoice.ratePerHour,
            }}
          />
        </PDFViewer>
      </div>
    </div>
  );
}
