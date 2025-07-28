import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { locationService } from '@/lib/locationsService';
import { LocationInput } from '@/types/api';

export const useLocations = () => {
  return useQuery({
    queryKey: ['locations'],
    queryFn: () => locationService.getAll(),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
};

export const useLocation = (id: number) => {
  return useQuery({
    queryKey: ['locations', id],
    queryFn: () => locationService.getById(id),
    enabled: !!id,
  });
};

export const useCreateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LocationInput) => locationService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
  });
};

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: LocationInput }) =>
      locationService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      queryClient.invalidateQueries({ queryKey: ['locations', id] });
    },
  });
};

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => locationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
  });
}; 