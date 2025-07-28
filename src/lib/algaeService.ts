import { api } from './api/axios';
import { Algae, AlgaeInput, ApiResponse, AlgaeResponse } from '../types/api';

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
    return {
      data: response.data,
      status: response.status,
    };
  },

  getById: async (id: number): Promise<ApiResponse<Algae>> => {
    const response = await api.get<Algae>(`/algae/${id}/`);
    return {
      data: response.data,
      status: response.status,
    };
  },

  create: async (data: FormData): Promise<ApiResponse<Algae>> => {
    const response = await api.post<Algae>('/algae/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return {
      data: response.data,
      status: response.status,
    };
  },

  update: async (id: number, data: FormData): Promise<ApiResponse<Algae>> => {
    const response = await api.put<Algae>(`/algae/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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