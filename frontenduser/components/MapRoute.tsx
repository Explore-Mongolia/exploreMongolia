"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Mapbox"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center bg-background">
      Loading map...
    </div>
  ),
});

interface Marker {
  lng: number;
  lat: number;
  label?: string;
  color?: string;
}

interface MapDialogProps {
  lng: number;
  lat: number;
  destinationName: string;
  markers?: Marker[];
}

export default function MapRoute({
  lng,
  lat,
  destinationName,
}: MapDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coordsList, setCoordsList] = useState<{ lat: number; lng: number; name: string }[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("tripPlan");

    if (!storedData) {
      console.log("No tripPlan found in localStorage");
      return;
    }

    let destinations: string[] = [];

    try {
      destinations = JSON.parse(storedData);
    } catch (error) {
      console.error("Failed to parse tripPlan JSON:", error);
      return;
    }

    Promise.all(
      destinations.map(async (dest) => {
        const coord = await getLatLngFromAddress(dest);
        return coord ? { ...coord, name: dest } : null;
      })
    ).then((results) => {
      const validCoords = results.filter(
        (coord): coord is { lat: number; lng: number; name: string } => coord !== null
      );

      validCoords.forEach((coord, index) => {
        console.log(`Destination ${index + 1}: ${coord.name}`);
        console.log(`  → Lat = ${coord.lat}, Lng = ${coord.lng}`);
      });

      setCoordsList(validCoords);
    });
  }, []);

  // Create dynamic markers
  const markers: Marker[] = coordsList.map((coord, i) => ({
    lat: coord.lat,
    lng: coord.lng,
    label: coord.name,
    color: i === 0 ? "red" : "blue",
  }));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="ml-4 h-10 -my-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition cursor-pointer">
          Show route on map
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-full p-0">
        <DialogTitle className="sr-only">{destinationName}</DialogTitle>
        <div className="relative w-full h-[500px]">
          <div className="absolute top-2 left-4 z-10 text-white bg-black/50 px-2 py-1 rounded max-h-[120px] overflow-auto">
            {coordsList.map((coord, idx) => (
              <div key={idx} className="text-sm">
                {coord.name}: Lat {coord.lat.toFixed(5)}, Lng {coord.lng.toFixed(5)}
              </div>
            ))}
          </div>
          {isOpen && (
            <Map
              lng={lng}
              lat={lat}
              destinationName={destinationName}
              markers={markers}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Geocoding function
async function getLatLngFromAddress(
  address: string
): Promise<{ lat: number; lng: number } | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "YourAppName/1.0 (your@email.com)",
    },
  });
  const results = await response.json();
  if (results.length > 0) {
    return {
      lat: parseFloat(results[0].lat),
      lng: parseFloat(results[0].lon),
    };
  } else {
    return null;
  }
}
