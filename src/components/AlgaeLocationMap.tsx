'use client';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LocationFeature } from "@/types/api";
import MapMarkerIcon from "@/components/MapMarkerIcon";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// Fix for default marker icon
import L from "leaflet";

let DefaultIcon = L.icon({
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface AlgaeLocationMapProps {
  locations: LocationFeature[];
}

const AlgaeLocationMap = ({ locations }: AlgaeLocationMapProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [map, setMap] = useState<L.Map | null>(null);
  const [bounds, setBounds] = useState<L.LatLngBounds | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate bounds when locations change
  useEffect(() => {
    if (locations.length === 0 || !map) return;

    const newBounds = new L.LatLngBounds(
      locations.map(loc => [
        loc.geometry.coordinates[1], // latitude
        loc.geometry.coordinates[0], // longitude
      ])
    );
    
    // Add some padding to the bounds
    newBounds.pad(0.1);
    setBounds(newBounds);
    map.fitBounds(newBounds);
  }, [locations, map]);

  if (!isMounted) {
    return (
      <div className="h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400">Loading map...</span>
      </div>
    );
  }

  // Use first location as center if available, or default to [0, 0]
  const center = locations.length > 0
    ? [
        locations[0].geometry.coordinates[1], // latitude
        locations[0].geometry.coordinates[0], // longitude
      ]
    : [0, 0];

  return (
    <MapContainer
      center={center as [number, number]}
      zoom={locations.length === 1 ? 13 : 2}
      style={{ height: "300px", width: "100%" }}
      className="rounded-lg"
      whenReady={() => {
        // The map is ready
      }}
      ref={(map) => map && setMap(map)}
    >
      <MapMarkerIcon />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, index) => (
        <Marker 
          key={location.id} 
          position={[
            location.geometry.coordinates[1], // latitude
            location.geometry.coordinates[0], // longitude
          ] as [number, number]}
          title={location.properties.name}
        >
          <Popup>
            <div className="text-sm">
              <div className="font-medium">{location.properties.name}</div>
              {location.properties.description && (
                <div className="text-gray-600">{location.properties.description}</div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default AlgaeLocationMap; 