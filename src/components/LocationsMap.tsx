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

interface LocationsMapProps {
  locations: LocationFeature[];
  height?: string;
}

const LocationsMap = ({ locations, height = "500px" }: LocationsMapProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div 
        className="bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <span className="text-gray-500 dark:text-gray-400">Loading map...</span>
      </div>
    );
  }

  // Calculate center point from all locations
  const center = locations.length > 0 
    ? [
        locations.reduce((sum, loc) => sum + loc.geometry.coordinates[1], 0) / locations.length,
        locations.reduce((sum, loc) => sum + loc.geometry.coordinates[0], 0) / locations.length,
      ]
    : [0, 0];

  return (
    <MapContainer
      center={center as [number, number]}
      zoom={locations.length > 0 ? 10 : 2}
      style={{ height, width: "100%" , zIndex: 0 }}
      className="rounded-lg"
    >
      <MapMarkerIcon />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location) => (
        <Marker 
          key={location.id}
          position={[
            location.geometry.coordinates[1],
            location.geometry.coordinates[0]
          ]}
        >
          <Popup>
            <div>
              <h3 className="font-semibold">{location.properties.name}</h3>
              <p className="text-sm text-gray-600">{location.properties.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {location.geometry.coordinates[1].toFixed(4)}, {location.geometry.coordinates[0].toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LocationsMap; 