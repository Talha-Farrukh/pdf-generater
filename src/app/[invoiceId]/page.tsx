import { getInvoice } from "../actions";
import PDFRenderer from "./pdf-renderer";
import { Suspense } from "react";

export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const invoice = await getInvoice(params.invoiceId);
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4 justify-between items-center mb-4">
        <Suspense fallback={<div>Loading PDF...</div>}>
          <PDFRenderer
            invoice={{
              ...invoice,
              date: new Date(invoice.date),
              hours: parseInt(invoice.hours),
              ratePerHour: parseInt(invoice.ratePerHour),
            }}
          />
        </Suspense>
      </div>
    </div>
  );
}
