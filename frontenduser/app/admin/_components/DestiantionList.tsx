import DestinationCard from "./DestinationCard";
import { Destination } from "@/lib/types";

export default function DestinationList({
  destinations,
  isLoading,
  error,
}: {
  destinations: Destination[];
  isLoading: boolean;
  error: string | null;
}) {
  return (
    <div className="container mx-auto p-8 pt-24">
      {isLoading && <p>Loading destinations...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {destinations.length > 0 ? (
            destinations.map((destination) => (
              <DestinationCard key={destination._id} destination={destination} />
            ))
          ) : (
            <p className="text-center col-span-full text-neutral-500">
              No destinations found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
