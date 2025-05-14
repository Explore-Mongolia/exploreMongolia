"use client";

import { useExperience } from "@/hooks/useExperience";
import { useParams } from "next/navigation";
import InlineEmojiRating from "./_components/EmojiRating";
import { SkeletonExp } from "./_components/Skeleton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ExperienceList() {
  const { id } = useParams();
  const { data: experience, isLoading, error } = useExperience(id as string);
  const router = useRouter();

  if (isLoading) return <SkeletonExp />;
  if (error)
    return (
      <p className="text-center text-red-500">Error loading experiences</p>
    );

  return (
    <div className="p-4 sm:p-6 mt-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="flex items-center gap-2 group transition-all"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Back</span>
      </Button>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div
          key={experience._id}
          className="border rounded-2xl overflow-hidden shadow-md"
        >
          <div className="relative w-full h-64">
            <Image
              src={experience.images?.[0] || "/placeholder.jpg"}
              alt={experience.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
              priority
            />
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">{experience.name}</h2>
            <p className="text-gray-700 mb-4">{experience.description}</p>

            <div
              className="flex items-center mb-6 cursor-pointer"
              onClick={() => router.push(`/profile/${experience.user._id}`)}
            >
              <div className="relative w-10 h-10 mr-3">
                <Image
                  src={experience.user.profileImage || "/default-profile.png"}
                  alt={experience.user.name}
                  fill
                  className="rounded-full object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  {experience.user.name}
                </h3>
                <p className="text-sm text-gray-500">{experience.user.email}</p>
              </div>
            </div>

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
    </div>
  );
}
