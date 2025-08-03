import { api } from './api/axios';
import { ApiResponse } from '@/types/api';

interface Statistics {
  total_collections: number;
  unique_locations: number;
  unique_classes: number;
  unique_families: number;
  unique_collectors: number;
  recent_collections: Array<{
    id: number;
    scientific_name: string;
    collector: string;
    collection_date: string;
    location: {
      properties: {
        name: string;
      };
    };
  }>;
  class_distribution: Record<string, number>;
}

export const statisticsService = {
  getStatistics: async (): Promise<ApiResponse<Statistics>> => {
    const response = await api.get<Statistics>('/user/statistics/');
    return {
      data: response.data,
      status: response.status,
    };
  },
};
