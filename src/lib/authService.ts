import { api } from './api/axios';
import { LoginCredentials, LoginResponse, ApiResponse } from '../types/api';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  last_login: string;
}

export interface ChangePasswordData {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
}

export interface UserStatistics {
  total_collections: number;
  unique_locations: number;
  unique_classes: number;
  unique_families: number;
  recent_collections: any[];
  class_distribution: Record<string, number>;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post<LoginResponse>('/auth/login/', credentials);
    
    // Store tokens in localStorage
    if (response.data.access) {
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
    }
    
    return {
      data: response.data,
      status: response.status,
    };
  },

  register: async (data: RegisterData): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post<LoginResponse>('/auth/register/', data);
    
    // Store tokens in localStorage
    if (response.data.access) {
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
    }
    
    return {
      data: response.data,
      status: response.status,
    };
  },

  logout: async (): Promise<ApiResponse<void>> => {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (refreshToken) {
      try {
        await api.post('/auth/logout/', { refresh: refreshToken });
      } catch (error) {
        // Continue with logout even if API call fails
        console.error('Logout API call failed:', error);
      }
    }
    
    // Clear tokens from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    
    return {
      data: undefined,
      status: 200,
    };
  },

  getProfile: async (): Promise<ApiResponse<UserProfile>> => {
    const response = await api.get<UserProfile>('/user/profile/');
    return {
      data: response.data,
      status: response.status,
    };
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> => {
    const response = await api.put<UserProfile>('/user/update-profile/', data);
    return {
      data: response.data,
      status: response.status,
    };
  },

  changePassword: async (data: ChangePasswordData): Promise<ApiResponse<void>> => {
    const response = await api.post('/user/change-password/', data);
    return {
      data: undefined,
      status: response.status,
    };
  },

  getUserStatistics: async (): Promise<ApiResponse<UserStatistics>> => {
    const response = await api.get<UserStatistics>('/user/statistics/');
    return {
      data: response.data,
      status: response.status,
    };
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  getCurrentUser: (): any => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      // Decode JWT token to get user info (basic implementation)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
};