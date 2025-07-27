'use client';

import { MapContainer, TileLayer, Marker } from "react-leaflet";
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
  location: LocationFeature;
}

const AlgaeLocationMap = ({ location }: AlgaeLocationMapProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400">Loading map...</span>
      </div>
    );
  }

  const coordinates = [
    location.geometry.coordinates[1], // latitude
    location.geometry.coordinates[0], // longitude
  ];

  return (
    <MapContainer
      center={coordinates as [number, number]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
      className="rounded-lg"
    >
      <MapMarkerIcon />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates as [number, number]} />
    </MapContainer>
  );
};

export default AlgaeLocationMap; 