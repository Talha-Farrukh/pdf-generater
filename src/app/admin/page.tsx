import { getInvoices } from "../actions";
import { InvoicesTable } from "@/src/components/InvoicesTable";
import { LogoutButton } from "@/src/components/LogoutButton";

export default async function AdminPage() {
  const invoices = await getInvoices();

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
            <p className="text-muted-foreground">
              Here&apos;s a list of all your invoices
            </p>
          </div>

          <LogoutButton />
        </div>
        <InvoicesTable invoices={invoices} />
      </div>
    </div>
  );
}
