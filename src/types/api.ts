export interface LocationFeature {
  id: number;
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
}

export interface LocationFeatureCollection {
  type: "FeatureCollection";
  features: LocationFeature[];
}

export interface LocationResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BackendLocation[];
}

export interface BackendLocation {
  id: number;
  name: string;
  description: string;
  coordinates: [number, number]; // [longitude, latitude]
  created_at: string;
  updated_at: string;
}

export interface Algae {
  id: number;
  scientific_name: string;
  common_name: string;
  class_name: string;
  order: string;
  family: string;
  genus: string;
  species: string;
  description: string;
  locations: LocationFeature[]; // Normalized locations for frontend
  raw_locations?: BackendLocation[]; // Raw locations from backend
  collection_date: string;
  collector: string;
  image: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface AlgaeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Algae[];
}

export interface LocationInput {
  name: string;
  description?: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export interface AlgaeInput {
  scientific_name: string;
  common_name?: string;
  class_name?: string;
  order?: string;
  family?: string;
  genus?: string;
  species?: string;
  description?: string;
  location_ids: number[];
  collection_date?: string;
  collector?: string;
  image?: File;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
} 