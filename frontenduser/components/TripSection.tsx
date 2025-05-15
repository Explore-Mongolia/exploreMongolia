"use client";

import React, { useState } from "react";
import useTrips from "@/hooks/useTrips";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function TripSection() {
  const { data: destinations, isLoading, error } = useTrips();
  const router = useRouter();
  const [filter, setFilter] = useState<"mostRated" | "lowestCost">("mostRated");

  if (isLoading)
    return (
      <p className="text-center text-gray-500 mt-10">Loading destinations...</p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Error loading destinations.
      </p>
    );

  const sortedDestinations = [...(destinations || [])].sort((a, b) => {
    if (filter === "mostRated") {
      return b.averageRating - a.averageRating;
    } else {
      return a.cost - b.cost;
    }
  });

  const visibleDestinations = sortedDestinations.slice(0, 6);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Top Destinations</h2>

        <Select
          value={filter}
          onValueChange={(value) => {
            if (value === "mostRated" || value === "lowestCost") {
              setFilter(value);
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mostRated">Most Rated</SelectItem>
            <SelectItem value="lowestCost">Lowest Cost</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {visibleDestinations.length === 0 ? (
        <p className="text-center text-gray-600">No destinations found</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleDestinations.map((dest: any) => (
              <div
                key={dest._id}
                className="group bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer flex flex-col"
                onClick={() => router.push(`/destination/${dest._id}`)}
              >
                <div className="relative w-full h-60 overflow-hidden group">
                  <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={
                        dest.image?.startsWith("http")
                          ? dest.image
                          : "/fallback.jpg"
                      }
                      alt={dest.name || "Destination Image"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

                  <div className="absolute bottom-0 w-full px-4 py-3 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">
                          {isNaN(dest.averageRating)
                            ? "N/A"
                            : dest.averageRating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-sm font-medium">${dest.cost}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold">{dest.name}</h3>
                  <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                    {dest.description}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <Image
                      src={dest.company?.profileImage}
                      alt={dest.company?.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm">
                        {dest.company.name}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {dest.company.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {sortedDestinations.length > 6 && (
            <div className="flex justify-end mt-8">
              <Button variant="outline" onClick={() => router.push("/destination")}>
                See More
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
