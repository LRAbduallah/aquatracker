import { api } from './api/axios';
import { LocationFeature, LocationResponse, LocationInput, ApiResponse, BackendLocation } from '../types/api';
import { normalizeLocation } from './utils/locationUtils';

export const locationService = {
  getAll: async (): Promise<ApiResponse<LocationResponse>> => {
    const response = await api.get<LocationResponse>('/locations/');
    
    // The API returns BackendLocation[] in the results
    // We'll keep it as is and let components normalize when needed
    return {
      data: response.data,
      status: response.status,
    };
  },

  getById: async (id: number): Promise<ApiResponse<LocationFeature>> => {
    const response = await api.get<BackendLocation>(`/locations/${id}/`);
    
    // Normalize the location data
    const normalizedLocation = normalizeLocation(response.data);
    
    return {
      data: normalizedLocation,
      status: response.status,
    };
  },

  create: async (data: LocationInput): Promise<ApiResponse<LocationFeature>> => {
    const response = await api.post<BackendLocation>('/locations/', data);
    
    // Normalize the created location
    const normalizedLocation = normalizeLocation(response.data);
    
    return {
      data: normalizedLocation,
      status: response.status,
    };
  },

  update: async (id: number, data: LocationInput): Promise<ApiResponse<LocationFeature>> => {
    const response = await api.put<BackendLocation>(`/locations/${id}/`, data);
    
    // Normalize the updated location
    const normalizedLocation = normalizeLocation(response.data);
    
    return {
      data: normalizedLocation,
      status: response.status,
    };
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/locations/${id}/`);
    return {
      data: undefined,
      status: response.status,
    };
  },
}; 