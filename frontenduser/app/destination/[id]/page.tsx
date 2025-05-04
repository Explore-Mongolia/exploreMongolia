"use client";

import { useDestination } from "@/hooks/useDestination";
import RateDestinationDialog from "./_components/RateDestination";
import { useParams } from "next/navigation";

export default function ExperienceList() {
  const { id } = useParams();
  const destinationId = Array.isArray(id) ? id[0] : id;

  const { data, isLoading, error } = destinationId
    ? useDestination(destinationId)
    : { data: null, isLoading: false, error: "Invalid destination ID" };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Error loading destination
      </p>
    );

  const destination = data?.destination;

  if (!destination)
    return <p className="text-center mt-10">No destination found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 mt-10">
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <div className="mt-4">
        <RateDestinationDialog destinationId={destination._id} />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{destination.name}</h1>
        <p className="text-gray-700 mt-2">{destination.description}</p>
        <p className="text-lg font-semibold text-green-600 mt-4">
          Cost: {destination.cost}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Company Info
        </h2>
        <div className="space-y-1 text-gray-700">
          <p>
            <span className="font-medium">Name:</span>{" "}
            {destination.company.name}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {destination.company.contact.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span>{" "}
            {destination.company.contact.phoneNumber}
          </p>
          <p>
            <span className="font-medium">Website:</span>{" "}
            {destination.company.contact.website}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Vibes</h2>
        <div className="flex flex-wrap gap-2">
          {destination.vibesAvailable.map((vibe: string) => (
            <span
              key={vibe}
              className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
            >
              {vibe}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
