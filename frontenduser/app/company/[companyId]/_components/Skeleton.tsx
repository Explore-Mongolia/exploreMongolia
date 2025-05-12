"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function CompanySkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 space-y-8 animate-pulse">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <Skeleton className="w-24 h-24 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="bg-gray-50 p-6 rounded-xl shadow-sm space-y-3">
        <Skeleton className="h-5 w-1/2 mb-2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-5 w-1/2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="p-4 border rounded-lg shadow-sm bg-white space-y-2"
            >
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
