"use client";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Algae, LocationFeature } from "@/types/api";
import { useLocations } from "@/hooks/useLocations";
import { useCreateAlgae, useUpdateAlgae } from "@/hooks/useAlgae";
import { toast } from "sonner";
import { useState } from "react";

const algaeSchema = z.object({
  scientific_name: z.string().min(2, "Scientific name must be at least 2 characters"),
  common_name: z.string().optional(),
  class_name: z.string().min(1, "Class is required"),
  order: z.string().min(1, "Order is required"),
  family: z.string().min(1, "Family is required"),
  genus: z.string().optional(),
  species: z.string().optional(),
  description: z.string().optional(),
  location_ids: z.array(z.number().int().positive("Location ID must be a positive number")).min(1, "At least one location is required"),
  collection_date: z.string().optional(),
  collector: z.string().optional(),
  image: z.any().optional(),
});

type AlgaeFormData = z.infer<typeof algaeSchema>;

interface AlgaeFormProps {
  initialData?: Algae;
  isEdit?: boolean;
}

export default function AlgaeForm({ initialData, isEdit = false }: AlgaeFormProps) {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialData?.image_url || null
  );

  // Fetch locations from backend
  const { data: locationsResponse, isLoading: isLoadingLocations } = useLocations();
  const locations = locationsResponse?.data?.results || [];

  const createAlgae = useCreateAlgae();
  const updateAlgae = useUpdateAlgae();

  const form = useForm<AlgaeFormData>({
    resolver: zodResolver(algaeSchema),
    defaultValues: {
      scientific_name: initialData?.scientific_name || "",
      common_name: initialData?.common_name || "",
      class_name: initialData?.class_name || "",
      order: initialData?.order || "",
      family: initialData?.family || "",
      genus: initialData?.genus || "",
      species: initialData?.species || "",
      description: initialData?.description || "",
      location_ids: initialData?.locations?.map(loc => loc.id) || [],
      collection_date: initialData?.collection_date || "",
      collector: initialData?.collector || "",
    },
  });

  const onSubmit = async (data: AlgaeFormData) => {
    try {
      // Prepare the request data
      const requestData: any = { ...data };
      
      // Deduplicate location_ids
      if (Array.isArray(data.location_ids)) {
        requestData.location_ids = [...new Set(data.location_ids)];
      }
      
      // Handle image file separately if present
      const imageFile = form.getValues("image");
      
      if (isEdit && initialData) {
        if (imageFile instanceof File) {
          // For updates with file, use FormData
          const formData = new FormData();
          formData.append('image', imageFile);
          // Convert other fields to JSON and append as a single field
          const { image, ...jsonData } = requestData;
          formData.append('data', JSON.stringify(jsonData));
          
          await updateAlgae.mutateAsync({ 
            id: initialData.id, 
            data: formData 
          });
        } else {
          // No file, send as JSON
          await updateAlgae.mutateAsync({ 
            id: initialData.id, 
            data: requestData 
          });
        }
        toast.success("Algae specimen updated successfully!");
      } else {
        if (imageFile instanceof File) {
          // For new records with file, use FormData with JSON data
          const formData = new FormData();
          formData.append('image', imageFile);
          // Convert other fields to JSON and append as a single field
          const { image, ...jsonData } = requestData;
          formData.append('data', JSON.stringify(jsonData));
          
          await createAlgae.mutateAsync(formData);
        } else {
          // No file, send as JSON
          await createAlgae.mutateAsync(requestData);
        }
        toast.success("Algae specimen created successfully!");
      }
      
      navigate("/algae");
    } catch (error) {
      toast.error("Failed to save algae specimen. Please try again.");
      console.error("Error saving algae:", error);
    }
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {isEdit ? "Edit Algae Specimen" : "Add New Algae Specimen"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Image Upload */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <div className="relative h-32 w-32 overflow-hidden rounded-lg bg-secondary border">
                          {previewImage ? (
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-muted-foreground">
                              No image
                            </div>
                          )}
                        </div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                          className="flex-1"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Scientific Name */}
              <FormField
                control={form.control}
                name="scientific_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scientific Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter scientific name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Common Name */}
              <FormField
                control={form.control}
                name="common_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Common Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter common name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location Selection */}
              <FormField
                control={form.control}
                name="location_ids"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collection Locations *</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        const currentValues = form.getValues('location_ids') || [];
                        const locationId = Number(value);
                        if (!currentValues.includes(locationId)) {
                          form.setValue('location_ids', [...currentValues, locationId]);
                        }
                      }}
                      value=""
                      disabled={isLoadingLocations}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Add a location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations
                          .filter(location => !form.getValues('location_ids')?.includes(location.id))
                          .map((location) => (
                            <SelectItem key={location.id} value={location.id.toString()}>
                              {location.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <div className="mt-2 space-y-2">
                      {form.getValues('location_ids')?.map((locationId) => {
                        const location = locations.find(loc => loc.id === locationId);
                        return location ? (
                          <div key={location.id} className="flex items-center justify-between p-2 bg-secondary rounded">
                            <span>{location.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const currentValues = form.getValues('location_ids') || [];
                                form.setValue(
                                  'location_ids',
                                  currentValues.filter(id => id !== locationId)
                                );
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ) : null;
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isLoadingLocations && (
                <p className="text-sm text-muted-foreground">Loading locations...</p>
              )}
              {/* Taxonomic Classification */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="class_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter class" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter order" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="family"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Family *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter family" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="genus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genus</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter genus" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="species"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Species</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter species" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter description" rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Collection Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="collection_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Collection Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="collector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Collector</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter collector name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/algae")}
                  disabled={form.formState.isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting || createAlgae.isPending || updateAlgae.isPending}
                >
                  {form.formState.isSubmitting || createAlgae.isPending || updateAlgae.isPending
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