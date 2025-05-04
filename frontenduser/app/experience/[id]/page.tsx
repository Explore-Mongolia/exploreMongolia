"use client";

import { useExperiences } from "@/hooks/useExperiences";
import { Experience } from "@/lib/types";
import { useParams } from "next/navigation";
import InlineEmojiRating from "./_components/EmojiRating";

export default function ExperienceList() {
  const { data: experiences, isLoading, error } = useExperiences();
  const { id } = useParams();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading experiences</p>;

  return (
    <div>
      <h1>Experiences</h1>
      {experiences.map((experience: Experience) => (
        <div key={experience._id} className="border rounded-lg p-4 mb-4">
          <h2 className="text-xl font-bold">{experience.name}</h2>
          <p>{experience.description}</p>
          <InlineEmojiRating experienceId={experience._id} />
        </div>
      ))}
    </div>
  );
}
