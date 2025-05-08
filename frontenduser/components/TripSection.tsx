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

  const safeCost = (value: any) => {
    if (!value) return Infinity;
    const cleaned = String(value)
      .replace(/[^0-9.]/g, "")
      .trim();
    const num = parseFloat(cleaned);
    return isNaN(num) ? Infinity : num;
  };

  return (
    <section id="Travel" className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedDestinations.map((dest: any) => (
          <div
            key={dest._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => router.push(`/destination/${dest._id}`)}
          >
            <div className="relative w-full h-60">
              <Image
                src={
                  dest.image?.startsWith("http") ? dest.image : "/fallback.jpg"
                }
                alt={dest.name || "Destination Image"}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{dest.name}</h3>
              <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                {dest.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">
                  {isNaN(dest.averageRating)
                    ? "N/A"
                    : dest.averageRating.toFixed(1)}
                </span>
              </div>

              {/* Cost */}
              <p className="text-sm text-gray-500 mt-1">${dest.cost}</p>

              {/* Company */}
              <div className="mt-4 flex items-center gap-3">
                <Image
                  src={dest.company.profileImage}
                  alt={dest.company.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">{dest.company.name}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {dest.company.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
