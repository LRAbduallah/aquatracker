import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { algaeService } from '@/lib/algaeService';
import { Algae, AlgaeInput } from '@/types/api';

export const useAlgaeList = (params?: {
  class_name?: string;
  order?: string;
  family?: string;
  location?: number;
  search?: string;
  page?: number;
}) => {
  return useInfiniteQuery({
    queryKey: ['algae', params],
    queryFn: ({ pageParam = 1 }) => 
      algaeService.getAll({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      // If there's a next page URL, extract the page number
      if (lastPage.data.next) {
        const nextUrl = new URL(lastPage.data.next);
        const nextPage = nextUrl.searchParams.get('page');
        return nextPage ? parseInt(nextPage) : undefined;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000,   // Keep unused data in cache for 10 minutes
  });
};

export const useAlgae = (id: number) => {
  return useQuery({
    queryKey: ['algae', id],
    queryFn: () => algaeService.getById(id),
    enabled: !!id,
  });
};

export const useCreateAlgae = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => algaeService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['algae'] });
    },
  });
};

export const useUpdateAlgae = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      algaeService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['algae'] });
      queryClient.invalidateQueries({ queryKey: ['algae', id] });
    },
  });
};

export const useDeleteAlgae = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => algaeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['algae'] });
    },
  });
}; 