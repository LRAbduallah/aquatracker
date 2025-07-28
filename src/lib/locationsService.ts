import { api } from './api/axios';
import { LocationFeature, LocationResponse, LocationInput, ApiResponse } from '../types/api';

export const locationService = {
  getAll: async (): Promise<ApiResponse<LocationResponse>> => {
    const response = await api.get<LocationResponse>('/locations/');
    return {
      data: response.data,
      status: response.status,
    };
  },

  getById: async (id: number): Promise<ApiResponse<LocationFeature>> => {
    const response = await api.get<LocationFeature>(`/locations/${id}/`);
    return {
      data: response.data,
      status: response.status,
    };
  },

  create: async (data: LocationInput): Promise<ApiResponse<LocationFeature>> => {
    const response = await api.post<LocationFeature>('/locations/', data);
    return {
      data: response.data,
      status: response.status,
    };
  },

  update: async (id: number, data: LocationInput): Promise<ApiResponse<LocationFeature>> => {
    const response = await api.put<LocationFeature>(`/locations/${id}/`, data);
    return {
      data: response.data,
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