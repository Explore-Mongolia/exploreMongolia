"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center bg-background">
      Loading map...
    </div>
  ),
});

interface MapDialogProps {
  lng: number;
  lat: number;
  destinationName: string;
}

export default function MapDialog({
  lng,
  lat,
  destinationName,
}: MapDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="ml-4">See on Map</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-full p-0 ">
        <DialogTitle className="sr-only">{destinationName}</DialogTitle>
        <div className="relative w-full h-[500px]">
          <div className="absolute top-2 left-4 z-10 text-white bg-black/50 px-2 py-1 rounded">
            {destinationName}
          </div>
          {isOpen && (
            <Map lng={lng} lat={lat} destinationName={destinationName} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
