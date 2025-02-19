import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function InvoiceFormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-[200px]" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-[72px]" />
          <Skeleton className="h-[72px]" />
        </div>

        <Skeleton className="h-[72px]" />

        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-[72px]" />
          <Skeleton className="h-[72px]" />
        </div>

        <Skeleton className="h-[72px]" />

        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-[72px]" />
          <Skeleton className="h-[72px]" />
          <Skeleton className="h-[72px]" />
        </div>

        <Skeleton className="h-[72px]" />

        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-[72px]" />
          <Skeleton className="h-[72px]" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-[72px]" />
          <Skeleton className="h-[72px]" />
        </div>

        <Skeleton className="h-[72px]" />
        <Skeleton className="h-[72px]" />

        <div className="flex justify-between">
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </CardContent>
    </Card>
  );
}
