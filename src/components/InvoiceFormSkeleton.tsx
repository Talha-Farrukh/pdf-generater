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

        {/* Projects section */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-8 w-[120px]" />
          </div>
          
          <Skeleton className="h-[72px]" />
          
          <div className="border rounded-md p-4 space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-[80px]" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            
            <Skeleton className="h-[72px]" />
            
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-[72px]" />
              <Skeleton className="h-[72px]" />
            </div>
          </div>
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
