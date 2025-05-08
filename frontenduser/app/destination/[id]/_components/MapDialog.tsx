"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center bg-background">
      Loading map...
    </div>
  ),
});

// Define the MapDialogProps interface
interface MapDialogProps {
  lng: number;
  lat: number;
  destinationName: string;
}

export default function MapDialog({ lng, lat, destinationName }: MapDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="ml-4">See on Map</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-full h-[500px] p-0">
        <div className="w-full h-full">
          {isOpen && <Map lng={lng} lat={lat} destinationName={destinationName} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}