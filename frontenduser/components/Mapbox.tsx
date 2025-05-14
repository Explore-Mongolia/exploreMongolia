"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface Marker {
  lng: number;
  lat: number;
  label?: string;
  color?: string;
}

interface MapProps {
  lng: number;
  lat: number;
  zoom?: number;
  destinationName?: string;
  markers?: Marker[];
}

const Map = ({ lng, lat, zoom = 14, destinationName, markers = [] }: MapProps) => {
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
        markers.forEach((marker, i) => {
          new mapboxgl.Marker({
            color: marker.color || (i === 0 ? "green" : i === markers.length - 1 ? "red" : "blue"),
          })
            .setLngLat([marker.lng, marker.lat])
            .setPopup(
              new mapboxgl.Popup().setHTML(`
                <div class="text-foreground bg-background p-2">
                  <h4 class="font-semibold">${marker.label || `Stop ${i + 1}`}</h4>
                  <p>${marker.lat.toFixed(4)}, ${marker.lng.toFixed(4)}</p>
                </div>
              `)
            )
            .addTo(mapRef.current!);
        });

        if (markers.length >= 2) {
          const lineCoordinates = markers.map((m) => [m.lng, m.lat]);

          mapRef.current!.addSource("journey-line", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: lineCoordinates,
              },
              properties: {},
            },
          });

          mapRef.current!.addLayer({
            id: "journey-line-layer",
            type: "line",
            source: "journey-line",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#FF5722",
              "line-width": 4,
              "line-dasharray": [2, 4],
            },
          });
        }
      });
    } else {
      mapRef.current.setCenter([lng, lat]);
      mapRef.current.setZoom(zoom);
    }
  }, [isMounted, lng, lat, zoom, destinationName, markers]);

  if (!isMounted) return null;

  return <div ref={mapContainerRef} className="w-full h-full rounded-lg" />;
};

export default Map;
