"use client";

import { useExperiences } from "@/hooks/useExperiences";
import { Experience } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function ExperienceList() {
  const { data: experiences, isLoading, error } = useExperiences();
  const router = useRouter();

  if (isLoading)
    return (
      <p className="text-center text-gray-500 mt-10">Loading experiences...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Error loading experiences.
      </p>
    );

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Traveler Experiences
      </h1>

      {experiences.length === 0 ? (
        <p className="text-center text-gray-600">No experiences found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {experiences.map((experience: Experience) => (
            <div
              key={experience._id}
              onClick={() => router.push(`/experience/${experience._id}`)}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
            >
              
              {experience.images.length > 0 ? (
                <img
                  src={experience.images[0]}
                  alt={experience.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              {/* Text Content */}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-blue-600 mb-2">
                  {experience.name}
                </h2>
                <p className="text-gray-700 mb-2">{experience.description}</p>
                <p className="text-sm text-gray-500">
                  Visited Places:{" "}
                  <span className="italic">
                    {experience.visitedPlaces.join(", ")}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
