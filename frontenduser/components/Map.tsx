import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface MapProps {
  initialOptions?: mapboxgl.MapboxOptions;
  onMapLoaded?: (mapInstance: mapboxgl.Map) => void;
  onMapRemoved?: () => void;
}

const Map: React.FC<MapProps> = ({ initialOptions, onMapLoaded, onMapRemoved }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current && (mapContainer.current as unknown) instanceof HTMLElement
                    ? (mapContainer.current as HTMLElement)
                    : document.createElement('div'),
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40],
        zoom: 9,
        ...initialOptions,
      });

      setMap(mapInstance);

      // Add the red marker at the desired location
      mapInstance.on('load', () => {
        const marker = new mapboxgl.Marker({ color: 'red' })
          .setLngLat([-74.5, 40])  // Set marker coordinates (you can change these coordinates)
          .addTo(mapInstance);

        // Disable pointer events to prevent interaction with the marker
        marker.getElement().style.pointerEvents = 'none';
      });

      if (onMapLoaded) {
        mapInstance.on('load', () => onMapLoaded(mapInstance));
      }

      return () => {
        mapInstance.remove();
        if (onMapRemoved) {
          onMapRemoved();
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

export default Map;
