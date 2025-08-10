import { api } from './api/axios';
import { Algae, AlgaeInput, ApiResponse, AlgaeResponse, BackendLocation } from '../types/api';
import { normalizeLocations } from './utils/locationUtils';

export const algaeService = {
  getAll: async (params?: {
    class_name?: string;
    order?: string;
    family?: string;
    location?: number;
    search?: string;
    page?: number;
  }): Promise<ApiResponse<AlgaeResponse>> => {
    const response = await api.get<AlgaeResponse>('/algae/', { params });
    
    // Normalize locations in the response
    if (response.data?.results) {
      response.data.results = response.data.results.map(item => {
        if (item.raw_locations) {
          item.locations = normalizeLocations(item.raw_locations);
        } else if (item.locations && item.locations.length > 0 && !('geometry' in item.locations[0])) {
          // If locations are in the old format, normalize them
          item.raw_locations = item.locations as unknown as BackendLocation[];
          item.locations = normalizeLocations(item.raw_locations);
        }
        return item;
      });
    }
    
    return {
      data: response.data,
      status: response.status,
    };
  },

  getById: async (id: number): Promise<ApiResponse<Algae>> => {
    const response = await api.get<Algae>(`/algae/${id}/`);
    
    // Normalize locations if raw_locations exist, otherwise use locations as-is
    const data = response.data;
    if (data.raw_locations) {
      data.locations = normalizeLocations(data.raw_locations);
    } else if (data.locations && data.locations.length > 0 && !('geometry' in data.locations[0])) {
      // If locations are in the old format, normalize them
      data.raw_locations = data.locations as unknown as BackendLocation[];
      data.locations = normalizeLocations(data.raw_locations);
    }
    
    return {
      data,
      status: response.status,
    };
  },

  create: async (data: FormData | Record<string, any>): Promise<ApiResponse<Algae>> => {
    let response;
    
    if (data instanceof FormData) {
      // Handle FormData (for file uploads)
      response = await api.post<Algae>('/algae/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      // Handle JSON data
      response = await api.post<Algae>('/algae/', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    return {
      data: response.data,
      status: response.status,
    };
  },

  update: async (id: number, data: FormData | Record<string, any>): Promise<ApiResponse<Algae>> => {
    let response;
    
    if (data instanceof FormData) {
      // Handle FormData (for file uploads)
      response = await api.put<Algae>(`/algae/${id}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      // Handle JSON data
      response = await api.put<Algae>(`/algae/${id}/`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    return {
      data: response.data,
      status: response.status,
    };
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/algae/${id}/`);
    return {
      data: undefined,
      status: response.status,
    };
  },
}; 