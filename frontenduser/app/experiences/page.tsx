"use client";

import { useState, useMemo } from "react";
import { useExperiences } from "@/hooks/useExperiences";
import { Experience } from "@/lib/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { ExperienceCardSkeletonGrid } from "./_components/ExperienceCardGridSkeleton";
import { timeAgo } from "@/lib/CalculateTime";

export default function AllExperiencesPage() {
  const { data: experiences, isLoading, error } = useExperiences();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"mostRecent" | "mostReacted">("mostRecent");
  const [visitedPlaceFilter, setVisitedPlaceFilter] = useState("all");

  const router = useRouter();

  
  const allPlaces = useMemo(() => {
    const places = new Set<string>();
    experiences?.forEach((exp: Experience) =>
      exp.visitedPlaces.forEach((p) => places.add(p))
    );
    return Array.from(places).sort();
  }, [experiences]);

  const filteredExperiences = useMemo(() => {
    let result = experiences || [];

    if (search.trim()) {
      result = result.filter((exp: Experience) =>
        exp.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (visitedPlaceFilter !== "all") {
    result = result.filter((exp: Experience) =>
      exp.visitedPlaces.includes(visitedPlaceFilter)
    );
    }

    interface SortableExperience {
      reactionsCount: number;
      createdAt: string | Date;
    }

    result = result.sort((a: SortableExperience, b: SortableExperience) => {
      if (sortBy === "mostReacted") {
        return b.reactionsCount - a.reactionsCount;
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  }, [experiences, search, sortBy, visitedPlaceFilter]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center sm:text-left mb-6">
        All Traveler Experiences
      </h1>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <Input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-sm"
        />

        <div className="flex gap-4 w-full sm:w-auto">
          {/* Sort By */}
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mostRecent">Most Recent</SelectItem>
              <SelectItem value="mostReacted">Most Reacted</SelectItem>
            </SelectContent>
          </Select>

          {/* Place Filter */}
          <Select
            value={visitedPlaceFilter}
            onValueChange={(value) => setVisitedPlaceFilter(value)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Visited Place" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Places</SelectItem>
              {allPlaces.map((place) => (
                <SelectItem key={place} value={place}>
                  {place}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <ExperienceCardSkeletonGrid />
      ) : error ? (
        <p className="text-center text-red-500">Error loading experiences.</p>
      ) : filteredExperiences.length === 0 ? (
        <p className="text-center text-gray-600">No experiences found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredExperiences.map((experience: Experience) => (
            <div
              key={experience._id}
              onClick={() => router.push(`/experience/${experience._id}`)}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer flex flex-col justify-between group"
            >
              {/* Image */}
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
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <div className="absolute bottom-0 w-full px-4 py-3 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="flex justify-between text-sm font-medium">
                      <span>💬 {experience.reactionsCount} reactions</span>
                      <span className="opacity-80">{timeAgo(experience.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              {/* Content */}
              <div className="p-5 flex flex-col justify-between h-full">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-blue-600">{experience.name}</h2>
                  <p className="text-gray-700 line-clamp-3">{experience.description}</p>
                  <p className="text-sm text-gray-500">
                    Visited Places:{" "}
                    <span className="italic">{experience.visitedPlaces.join(", ")}</span>
                  </p>
                </div>
                <div className="flex items-center border-t pt-2 mt-3 border-gray-100">
                  <div className="relative w-8 h-8 mr-3">
                    <Image
                      src={experience.user.profileImage}
                      alt={experience.user.name}
                      fill
                      className="rounded-full object-cover"
                      sizes="32px"
                    />
                  </div>
                  <h4 className="text-sm font-medium text-gray-800">{experience.user.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
