import { Skeleton } from "./ui/skeleton";

export function ExperienceCardSkeleton() {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse flex flex-col">
        <div className="w-full h-48 bg-gray-200" />
  
        <div className="p-4 flex flex-col flex-1">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-3" />
          <div className="h-4 bg-gray-300 rounded w-full mb-2" />
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-4" />
  
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
  
          <div className="flex items-center gap-5 text-sm text-gray-400 mb-4">
            <div className="h-4 bg-gray-300 rounded w-24" />
            <div className="h-4 bg-gray-300 rounded w-20" />
          </div>
  
          <div className="flex items-center mt-auto pt-2 border-t border-gray-100">
            <div className="w-8 h-8 bg-gray-300 rounded-full mr-3" />
            <div className="h-4 bg-gray-300 rounded w-24" />
          </div>
        </div>
      </div>
    );
  }
  