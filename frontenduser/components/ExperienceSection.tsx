"use client";

import { useExperiences } from "@/hooks/useExperiences";
import { Experience } from "@/lib/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              {experience.images.length > 0 ? (
                <div className="relative w-full h-48">
                  <Image
                    src={experience.images[0]}
                    alt={experience.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={true}
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-xl font-semibold text-blue-600 mb-2">
                  {experience.name}
                </h2>

                <p className="text-gray-700 mb-2 line-clamp-3">
                  {experience.description}
                </p>

                <p className="text-sm text-gray-500 mb-4">
                  Visited Places:{" "}
                  <span className="italic">
                    {experience.visitedPlaces.join(", ")}
                  </span>
                </p>

                <div className="flex-grow" />

                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <span className="text-lg">💬</span>
                  <span>{experience.reactionsCount} reactions</span>
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
      )}
    </section>
  );
}
