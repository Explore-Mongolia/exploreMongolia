"use client";

import { useExperience } from "@/hooks/useExperience";
import { useParams } from "next/navigation";
import InlineEmojiRating from "./_components/EmojiRating";
import { SkeletonExp } from "./_components/Skeleton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
        variant="default"
        size="sm"
        onClick={() => router.push("/")}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Button>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div
          key={experience._id}
          className="border rounded-2xl overflow-hidden shadow-md"
        >
          {experience.images?.length > 0 ? (
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {experience.images.map((img: string, index: number) => (
                    <CarouselItem key={index}>
                      <div className="relative w-full h-64">
                        <Image
                          src={img}
                          alt={`Experience Image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="100vw"
                          priority={index === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
              </Carousel>
            </div>
          ) : (
            <div className="relative w-full h-64">
              <Image
                src="/placeholder.jpg"
                alt="Placeholder"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          )}

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
