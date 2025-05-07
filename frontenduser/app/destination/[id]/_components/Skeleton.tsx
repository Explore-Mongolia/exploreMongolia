import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonDes = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 mt-10">
      <div className="relative w-full h-64 rounded-lg overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="mt-4">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-6 w-24 mt-4" />
      </div>

      <div>
        <Skeleton className="h-6 w-32 mb-2" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      </div>

      {/* Vibes Skeleton */}
      <div>
        <Skeleton className="h-6 w-24 mb-2" />
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};
