import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { BackendLocation } from '@/types/api';
import { useCreateLocation, useUpdateLocation } from '@/hooks/useLocations';
import { toast } from 'sonner';

const locationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  latitude: z.number().min(-90, "Latitude must be >= -90").max(90, "Latitude must be <= 90"),
  longitude: z.number().min(-180, "Longitude must be >= -180").max(180, "Longitude must be <= 180"),
});

type LocationFormData = z.infer<typeof locationSchema>;

interface LocationFormProps {
  initialData?: BackendLocation;
  isEdit?: boolean;
}

export default function LocationForm({ initialData, isEdit = false }: LocationFormProps) {
  const navigate = useNavigate();
  const createLocation = useCreateLocation();
  const updateLocation = useUpdateLocation();

  const form = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      latitude: initialData?.coordinates?.[1] || 0,
      longitude: initialData?.coordinates?.[0] || 0,
    },
  });

  const onSubmit = async (data: LocationFormData) => {
    try {
      const locationInput = {
        name: data.name,
        description: data.description || "",
        coordinates: [data.longitude, data.latitude] as [number, number]
      };

      if (isEdit && initialData) {
        try {
          await updateLocation.mutateAsync({ 
            id: initialData.id, 
            data: locationInput 
          });
          toast.success("Location updated successfully!");
          navigate("/locations");
        } catch (error) {
          console.error("Error updating location:", error);
          throw error; // Re-throw to be caught by the outer catch
        }
      } else {
        try {
          await createLocation.mutateAsync(locationInput);
          toast.success("Location created successfully!");
          navigate("/locations");
        } catch (error) {
          console.error("Error creating location:", error);
          throw error; // Re-throw to be caught by the outer catch
        }
      }
    } catch (error) {
      toast.error("Failed to save location. Please try again.");
      console.error("Error in form submission:", error);
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold">
            {isEdit ? "Edit Location" : "Add New Location"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter location name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter location description" rows={3} className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Coordinates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="any"
                          placeholder="e.g., 40.7128" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="any"
                          placeholder="e.g., -74.0060" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/locations")}
                  disabled={form.formState.isSubmitting}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting || createLocation.isPending || updateLocation.isPending}
                  className="w-full sm:w-auto"
                >
                  {form.formState.isSubmitting || createLocation.isPending || updateLocation.isPending
                    ? "Saving..."
                    : isEdit
                    ? "Update"
                    : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}