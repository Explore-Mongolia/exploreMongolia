import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonExp = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Experience</h1>

      <div className="border rounded-2xl overflow-hidden shadow-md">
        <Skeleton className="w-full h-64" />

        <div className="p-6 space-y-4">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          <div className="space-y-1">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>

          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} className="h-6 w-20 rounded-full" />
            ))}
          </div>

          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
};
