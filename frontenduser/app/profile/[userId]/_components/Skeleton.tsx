import { Skeleton } from "@/components/ui/skeleton";

export const ProfileSkeleton = () => {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="relative h-48 bg-gray-200 animate-pulse"></div>
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16">
              <div className="flex items-end space-x-4">
                <Skeleton className="w-32 h-32 rounded-full border-4 border-white" />
                <div className="space-y-2">
                  <Skeleton className="w-48 h-8" />
                  <Skeleton className="w-32 h-4" />
                </div>
              </div>
              <Skeleton className="w-32 h-10 mt-4 md:mt-0" />
            </div>
          </div>
        </div>
  
        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6 space-y-4">
              <Skeleton className="w-full h-24" />
              <div className="space-y-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
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
  
          {/* Main Content Area Skeleton */}
          <div className="lg:col-span-3">
            <div className="flex space-x-1 rounded-xl bg-gray-200 p-1 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="w-full h-10 rounded-lg" />
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-full h-16" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="w-full h-32" />
                <Skeleton className="w-full h-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };