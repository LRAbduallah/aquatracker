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
  results: LocationFeatureCollection;
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
  location: LocationFeature;
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
  coordinates: {
    type: 'Point';
    coordinates: [number, number];
  };
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
  location_id: number;
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