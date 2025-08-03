import { useQuery } from '@tanstack/react-query';
import { statisticsService } from '@/lib/statisticsService';

export const useStatistics = () => {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: () => statisticsService.getStatistics(),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000,   // Keep unused data in cache for 10 minutes
  });
};
