"use client";

import { useState } from "react";
import { useExperiences } from "@/hooks/useExperiences";
import { Experience } from "@/lib/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { timeAgo } from "@/lib/CalculateTime";
import { ExperienceCardSkeleton } from "./ExperienceSkeleton";
import { ArrowRight } from "lucide-react";

export default function ExperienceList() {
  const { data: experiences, isLoading, error } = useExperiences();
  const [filter, setFilter] = useState<"mostRecent" | "mostReacted">(
    "mostRecent"
  );
  const router = useRouter();

  if (isLoading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ExperienceCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">
        Error loading experiences.
      </p>
    );
  }

  const sortedExperiences: Experience[] | undefined = experiences
    ?.slice()
    .sort((a: Experience, b: Experience) => {
      if (filter === "mostReacted") {
        return b.reactionsCount - a.reactionsCount;
      } else {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    });

  const visibleExperiences = sortedExperiences?.slice(0, 6);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center sm:text-left">
          Traveler Experiences
        </h1>

        <Select
          value={filter}
          onValueChange={(value) => {
            if (value === "mostRecent" || value === "mostReacted") {
              setFilter(value);
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mostRecent">Most Recent</SelectItem>
            <SelectItem value="mostReacted">Most Reacted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {visibleExperiences?.length === 0 ? (
        <p className="text-center text-gray-600">No experiences found</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {visibleExperiences?.map((experience: Experience) => (
              <div
                key={experience._id}
                onClick={() => router.push(`/experience/${experience._id}`)}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer flex flex-col justify-between group"
              >
                {/* Image Section */}
                {experience.images.length > 0 ? (
                  <div className="relative w-full h-60 overflow-hidden group">
                    <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={experience.images[0]}
                        alt={experience.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                    <div className="absolute bottom-0 w-full px-4 py-3 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <div className="flex justify-between text-sm font-medium">
                        <span>💬 {experience.reactionsCount} reactions</span>
                        <span className="opacity-80">
                          {timeAgo(experience.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}

                {/* Text Content */}
                <div className="p-5 flex flex-col justify-between h-full">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold text-blue-600">
                      {experience.name}
                    </h2>
                    <p className="text-gray-700 line-clamp-3">
                      {experience.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Visited Places:{" "}
                      <span className="italic">
                        {experience.visitedPlaces.join(", ")}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center border-t pt-2 border-gray-100">
                    <div className="relative w-8 h-8 mr-3">
                      <Image
                        src={experience.user.profileImage}
                        alt={experience.user.name}
                        fill
                        className="rounded-full object-cover"
                        sizes="32px"
                      />
                    </div>
                    <h4 className="text-sm font-medium text-gray-800">
                      {experience.user.name}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {sortedExperiences && sortedExperiences.length > 6 && (
            <div className="flex justify-end  mt-8">
              <Button
                variant="default"
                onClick={() => router.push("/experiences")}
                className="cursor-pointer flex items-center gap-2"
              >
                See More
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
