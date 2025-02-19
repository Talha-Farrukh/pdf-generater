import { getInvoices } from "../actions";
import { InvoicesTable } from "@/src/components/InvoicesTable";
import { LogoutButton } from "@/src/components/LogoutButton";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { User } from "lucide-react";

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

          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/admin/users">
                <User className="h-4 w-4 mr-2" />
                All users
              </Link>
            </Button>
            <LogoutButton />
          </div>
        </div>
        <InvoicesTable invoices={invoices} />
      </div>
    </div>
  );
}
