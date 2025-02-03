"use client";
import { useState } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { InvoiceForm } from "../components/InvoiceForm";
import { PDFDocument } from "../components/PDFDocument";
import { Button } from "../components/ui/button";
import { InvoiceFormData } from "../components/InvoiceForm";

export default function Home() {
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (data: InvoiceFormData) => {
    setInvoiceData(data);
    setShowPreview(true);
  };

  if (showPreview && invoiceData) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={() => setShowPreview(false)}>Back to Form</Button>
          <PDFDownloadLink
            document={<PDFDocument invoiceData={invoiceData} />}
            fileName={`invoice-${invoiceData.invoiceNumber}.pdf`}
          >
            <>
              {({ loading }: any) => (
                <Button disabled={loading}>
                  {loading ? "Preparing..." : "Download PDF"}
                </Button>
              )}
            </>
          </PDFDownloadLink>
        </div>
        <div className="w-full h-[calc(100vh-100px)]">
          <PDFViewer className="w-full h-full">
            <PDFDocument invoiceData={invoiceData} />
          </PDFViewer>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Invoice Generator</h1>
      <InvoiceForm onSubmit={handleSubmit} />
    </div>
  );
}
