import { LocationFeature } from "@/types/api";

export interface BackendLocation {
  id: number;
  name: string;
  description: string;
  coordinates: [number, number]; // [longitude, latitude]
  created_at: string;
  updated_at: string;
}

export const normalizeLocation = (location: BackendLocation): LocationFeature => {
  return {
    id: location.id,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [location.coordinates[0], location.coordinates[1]], // Keep as [lng, lat]
    },
    properties: {
      name: location.name,
      description: location.description || "",
      created_at: location.created_at,
      updated_at: location.updated_at,
    },
  };
};

export const normalizeLocations = (locations: BackendLocation[]): LocationFeature[] => {
  return locations.map(normalizeLocation);
};
