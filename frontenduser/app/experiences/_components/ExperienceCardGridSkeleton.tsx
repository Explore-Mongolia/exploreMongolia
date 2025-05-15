"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ExperienceCardSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl bg-white shadow p-4 space-y-4">
          <Skeleton className="w-full h-48 rounded-lg" />
          <Skeleton className="w-2/3 h-6" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-1/2 h-4" />
          <div className="flex items-center gap-2 pt-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-24 h-4" />
          </div>
        </div>
      ))}
    </div>
  );
}
