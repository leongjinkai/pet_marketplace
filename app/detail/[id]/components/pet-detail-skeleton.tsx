import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function PetDetailSkeleton() {
  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image skeleton */}
        <div className="relative w-full aspect-square">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>

        {/* Info skeleton */}
        <div className="space-y-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>
          <div>
            <Skeleton className="h-10 w-32" />
          </div>
          <div>
            <Skeleton className="h-6 w-28" />
          </div>
          <div>
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
