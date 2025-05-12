import { Destination } from "@/lib/types";

export default function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg shadow-sm flex flex-col">
      <img
        src={destination.image}
        alt={destination.name}
        className="h-32 w-full object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-semibold">{destination.name}</h2>
      <p className="text-sm text-neutral-700 dark:text-neutral-300">
        {destination.description}
      </p>
      <p className="mt-2 text-sm text-neutral-800 dark:text-neutral-200 font-medium">
        Cost: {destination.cost}
      </p>
      <div className="mt-2 flex flex-wrap gap-1">
        {destination.vibesAvailable.slice(0, 3).map((vibe, index) => (
          <span
            key={index}
            className="bg-white dark:bg-neutral-700 text-xs text-neutral-800 dark:text-neutral-100 px-2 py-1 rounded-full"
          >
            {vibe}
          </span>
        ))}
      </div>
    </div>
  );
}
