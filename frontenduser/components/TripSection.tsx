"use client";
import React from "react";
import useTrips from "@/hooks/useTrips";
import { Destination } from "@/lib/types";

export default function TripSection() {
  const { data: destinations, isLoading, error } = useTrips();

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

  return (
    <section id="Travel" className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">
          Travel Destinations
        </h2>
        <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto">
          Explore amazing destinations across Mongolia, from the Gobi Desert to
          Khuvsgul Lake.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinations?.map((destination: Destination) => (
            <div
              key={destination._id}
              className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow"
            >
              <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
              {destination.description}
              </p>
              <p className="text-sm text-gray-500">
              Cost: <span className="font-bold">${destination.cost}</span>
              </p>
              <p className="text-sm text-gray-500">
              Vibes Available:{" "}
              <span className="italic">{destination.vibesAvailable.join(", ")}</span>
              </p>
            </div>
            ))}
        </div>
      </div>
    </section>
  );
}
