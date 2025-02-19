"use client";
import { useState } from "react";
import { PDFViewer, PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import { InvoiceForm } from "../components/InvoiceForm";
import { InvoiceFormData } from "../hooks/useInvoiceForm";
import { PDFDocument } from "../components/PDFDocument";
import { Button } from "../components/ui/button";

export default function Home() {
  const [invoiceData, setInvoiceData] = useState<InvoiceFormData | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // const handleReset = () => {
  //   setInvoiceData(null)
  //   setShowPreview(false)
  // }

  if (showPreview && invoiceData) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={() => setShowPreview(false)}>Back to Form</Button>
          <BlobProvider document={<PDFDocument invoiceData={invoiceData} />}>
            {({ loading }) => (
              <Button
                disabled={loading}
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = URL.createObjectURL(new Blob([]));
                  link.download = `invoice-${invoiceData.invoiceNumber}.pdf`;
                  link.click();
                }}
              >
                {loading ? "Preparing..." : "Download PDF"}
              </Button>
            )}
          </BlobProvider>
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
      {/* <h1 className="text-2xl font-bold mb-6">Invoice Generator</h1> */}
      <InvoiceForm />
    </div>
  );
}
