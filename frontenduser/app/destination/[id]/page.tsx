"use client";

import { useDestination } from "@/hooks/useDestination";
import RateDestinationDialog from "./_components/RateDestination";
import { useParams } from "next/navigation";
import Image from "next/image";
import { SkeletonDes } from "./_components/Skeleton";
import MapDialog from "./_components/MapDialog";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function ExperienceList() {
  const { id } = useParams();
  const destinationId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const { mongoUserId } = useUserStore();
  const userId = mongoUserId;

  const { data, isLoading, error } = destinationId
    ? useDestination(destinationId)
    : { data: null, isLoading: false, error: "Invalid destination ID" };

  if (isLoading) return <SkeletonDes />;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Error loading destination
      </p>
    );

  const destination = data?.destination;

  const hasRated = destination.ratings?.some(
    (r: { user: string }) => r.user === userId
  );
  const userRating = destination.ratings?.find(
    (r: { user: string }) => r.user === userId
  )?.rating;

  if (!destination)
    return <p className="text-center mt-10">No destination found</p>;

  return (
    <div className="p-4 sm:p-6 mt-6">
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-md text-sm font-medium shadow"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </button>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow-md">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Destination Details */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">{destination.name}</h1>
          <p className="text-gray-700 text-base leading-relaxed">
            {destination.description}
          </p>
          <p className="text-lg font-medium text-green-600">
            Cost: ${destination.cost}
          </p>
        </div>
        <div className="flex gap-4 flex-wrap">
          <RateDestinationDialog
            destinationId={destination._id}
            alreadyRated={hasRated}
            initialRating={userRating}
          />

          <MapDialog
            lng={destination.location?.coordinates?.[0] ?? 106.9155}
            lat={destination.location?.coordinates?.[1] ?? 47.8864}
            destinationName={destination.name}
          />
        </div>
        <div
          className="bg-white p-6 rounded-2xl shadow-md cursor-pointer transition hover:shadow-lg"
          onClick={() => router.push(`/company/${destination.company._id}`)}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Company Info
          </h2>
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src={destination.company?.profileImage}
              alt={destination.company?.name}
              width={64}
              height={64}
              className="rounded-full object-cover border border-gray-300"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {destination.company.name}
              </h3>
              <p className="text-sm text-gray-500">Trusted travel partner</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-sm text-gray-700">
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
              <a
                href={destination.company.contact.website}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {destination.company.contact.website}
              </a>
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Vibes</h2>
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
    </div>

  );
}
