"use client";

import { useExperience } from "@/hooks/useExperience";
import { useParams } from "next/navigation";
import InlineEmojiRating from "./_components/EmojiRating";

export default function ExperienceList() {
  const { id } = useParams();
  const { data: experience, isLoading, error } = useExperience(id as string);

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">Error loading experiences</p>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Experience</h1>

      <div
        key={experience._id}
        className="border rounded-2xl overflow-hidden shadow-md"
      >
        <img
          src={experience.images?.[0] || "/placeholder.jpg"}
          alt={experience.name}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">{experience.name}</h2>
          <p className="text-gray-700 mb-4">{experience.description}</p>

          <div className="mb-4 space-y-1 text-sm text-gray-600">
            <p>
              <strong>Visited Places:</strong>{" "}
              {experience.visitedPlaces.join(", ")}
            </p>
            <p>
              <strong>Highlights:</strong> {experience.highlights}
            </p>
            <p>
              <strong>Tips:</strong> {experience.tips}
            </p>
            <p>
              <strong>Total Cost:</strong> ${experience.totalCost}
            </p>
          </div>

          {experience.vibes.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {experience.vibes.map((vibe: string) => (
                <span
                  key={vibe}
                  className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full"
                >
                  #{vibe}
                </span>
              ))}
            </div>
          )}

          <InlineEmojiRating
            experienceId={experience._id}
            reactions={experience.reactions}
          />
        </div>
      </div>
    </div>
  );
}
