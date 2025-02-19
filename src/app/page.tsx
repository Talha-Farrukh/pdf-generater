"use client";

import { Suspense } from "react";
import { InvoiceForm } from "../components/InvoiceForm";
import { InvoiceFormSkeleton } from "../components/InvoiceFormSkeleton";

export default function Home() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {/* <h1 className="text-2xl font-bold mb-6">Invoice Generator</h1> */}
      <Suspense fallback={<InvoiceFormSkeleton />}>
        <InvoiceForm />
      </Suspense>
    </div>
  );
}
