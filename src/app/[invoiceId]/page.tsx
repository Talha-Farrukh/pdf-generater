import { getInvoice } from "../actions";
import PDFRenderer from "./pdf-renderer";
import { Suspense } from "react";

export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const invoice = await getInvoice(params.invoiceId);
  
  // Ensure projects is an array and convert numeric strings to numbers
  const formattedInvoice = {
    ...invoice,
    date: new Date(invoice.date),
    projects: Array.isArray(invoice.projects) 
      ? invoice.projects.map(project => ({
          ...project,
          hours: Number(project.hours),
          ratePerHour: Number(project.ratePerHour)
        }))
      : []
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4 justify-between items-center mb-4">
        <Suspense fallback={<div>Loading PDF...</div>}>
          <PDFRenderer invoice={formattedInvoice} />
        </Suspense>
      </div>
    </div>
  );
}
