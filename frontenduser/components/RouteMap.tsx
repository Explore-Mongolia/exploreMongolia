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

const RouteMap = ({ lng, lat, zoom = 5, destinationName }: MapProps) => {
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
        zoom,
      });

      setTimeout(() => {
        mapRef.current?.resize();
      }, 100);

      mapRef.current.on("load", () => {
        const tripStops = [
          { name: "Start", lat, lng },
          { name: "Stop 1", lat: lat + 0.5, lng: lng + 0.5 },
          { name: "Stop 2", lat: lat + 1.0, lng: lng + 0.2 },
          { name: "End", lat: lat + 1.5, lng: lng - 0.3 },
        ];

        tripStops.forEach((stop, index) => {
          new mapboxgl.Marker({
            color:
              index === 0
                ? "red"
                : index === tripStops.length - 1
                ? "green"
                : "blue",
          })
            .setLngLat([stop.lng, stop.lat])
            .setPopup(
              new mapboxgl.Popup().setHTML(`
                <div class="text-foreground bg-background p-2">
                  <h3 class="font-bold">${stop.name}</h3>
                </div>
              `)
            )
            .addTo(mapRef.current!);
        });

        mapRef.current.addSource("trip-line", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
            },
          },
        });

        mapRef.current.addLayer({
          id: "trip-line-layer",
          type: "line",
          source: "trip-line",
          paint: {
            "line-color": "#007AFF",
            "line-width": 4,
            "line-dasharray": [1, 1],
          },
        });
      });
    } else {
      mapRef.current.setCenter([lng, lat]);
      mapRef.current.setZoom(zoom);
    }
  }, [isMounted, lng, lat, zoom]);

  if (!isMounted) return null;

  return <div ref={mapContainerRef} className="w-full h-full rounded-lg" />;
};

export default RouteMap;
