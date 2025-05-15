import { Skeleton } from "@/components/ui/skeleton";

export const ProfileSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-20 h-8 rounded-md" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mt-4 md:mt-0 space-y-4 md:space-y-0">
            <div className="flex flex-col items-center md:flex-row md:items-end md:space-x-4">
              <Skeleton className="w-32 h-32 rounded-full border-4 border-white shadow-lg" />
              <div className="text-center md:text-left mt-4 md:mt-0 space-y-2">
                <Skeleton className="w-40 h-6" />
                <Skeleton className="w-32 h-4" />
              </div>
            </div>

            <div className="md:hidden flex justify-end">
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:block">
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4 sticky top-6">
              <Skeleton className="w-full h-24" />
              <div className="space-y-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-2/3 h-4" />
              </div>
              <div className="space-y-2">
                <Skeleton className="w-24 h-6" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="w-16 h-6 rounded-full" />
                  <Skeleton className="w-20 h-6 rounded-full" />
                  <Skeleton className="w-12 h-6 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex space-x-2 rounded-xl bg-gray-200 p-1">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="w-1/2 h-10 rounded-lg" />
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <Skeleton className="w-40 h-6" />
              <Skeleton className="w-full h-20" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="w-full h-32 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
