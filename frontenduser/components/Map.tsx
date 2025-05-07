"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface MapProps {
  lng: number;
  lat: number;
  zoom?: number;
  destinationName?: string;
}

const Map = ({ lng, lat, zoom = 14, destinationName }: MapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isMounted || !mapContainerRef.current) return;

    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: zoom,
      });

      // Fix for dialog rendering issue
      setTimeout(() => {
        mapRef.current?.resize();
      }, 100);

      mapRef.current.on("load", () => {
        new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(`
              <div class="text-foreground bg-background p-2">
                <h3 class="font-bold">${destinationName || "Location"}</h3>
                <p>${lat.toFixed(4)}, ${lng.toFixed(4)}</p>
              </div>
            `)
          )
          .addTo(mapRef.current!);
      });
    } else {
      mapRef.current.setCenter([lng, lat]);
      mapRef.current.setZoom(zoom);
    }
  }, [isMounted, lng, lat, zoom, destinationName]);

  if (!isMounted) return null;

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-full rounded-lg"
    />
  );
};

export default Map;