"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Algae, LocationFeature } from "@/types/api";
import { useLocations } from "@/hooks/useLocations";
import { useCreateAlgae, useUpdateAlgae } from "@/hooks/useAlgae";
import { toast } from "sonner";

interface AlgaeFormProps {
  initialData?: Algae;
  isEdit?: boolean;
}

export default function AlgaeForm({ initialData, isEdit = false }: AlgaeFormProps) {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialData?.image || null
  );
  const [selectedLocationId, setSelectedLocationId] = useState<string>(
    initialData?.location?.id?.toString() || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch locations from backend
  const { data: locationsResponse, isLoading: isLoadingLocations } = useLocations();
  const locations = locationsResponse?.data?.results?.features || [];

  const createAlgae = useCreateAlgae();
  const updateAlgae = useUpdateAlgae();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      // Add location_id to form data
      if (selectedLocationId) {
        formData.append("location_id", selectedLocationId);
      }
      
      if (isEdit && initialData) {
        await updateAlgae.mutateAsync({ id: initialData.id, data: formData });
        toast.success("Algae specimen updated successfully!");
      } else {
        await createAlgae.mutateAsync(formData);
        toast.success("Algae specimen created successfully!");
      }
      
      navigate("/algae");
    } catch (error) {
      toast.error("Failed to save algae specimen. Please try again.");
      console.error("Error saving algae:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <div className="flex items-center gap-4">
                <div className="relative h-32 w-32 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 border">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-500">
                      No image
                    </div>
                  )}
                </div>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Scientific Name */}
            <div className="space-y-2">
              <Label htmlFor="scientific_name">Scientific Name *</Label>
              <Input
                id="scientific_name"
                name="scientific_name"
                defaultValue={initialData?.scientific_name}
                required
                placeholder="Enter scientific name"
              />
            </div>

            {/* Common Name */}
            <div className="space-y-2">
              <Label htmlFor="common_name">Common Name</Label>
              <Input
                id="common_name"
                name="common_name"
                defaultValue={initialData?.common_name}
                placeholder="Enter common name"
              />
            </div>

            {/* Location Selection */}
            <div className="space-y-2">
              <Label htmlFor="location_id">Location *</Label>
              <Select
                value={selectedLocationId}
                onValueChange={setSelectedLocationId}
                disabled={isLoadingLocations}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location: LocationFeature) => (
                    <SelectItem key={location.id} value={location.id.toString()}>
                      {location.properties.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {isLoadingLocations && (
                <p className="text-sm text-muted-foreground">Loading locations...</p>
              )}
            </div>

            {/* Taxonomic Classification */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="class_name">Class *</Label>
                <Input
                  id="class_name"
                  name="class_name"
                  defaultValue={initialData?.class_name}
                  required
                  placeholder="Enter class"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Order *</Label>
                <Input
                  id="order"
                  name="order"
                  defaultValue={initialData?.order}
                  required
                  placeholder="Enter order"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="family">Family *</Label>
                <Input
                  id="family"
                  name="family"
                  defaultValue={initialData?.family}
                  required
                  placeholder="Enter family"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="genus">Genus</Label>
                <Input
                  id="genus"
                  name="genus"
                  defaultValue={initialData?.genus}
                  placeholder="Enter genus"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="species">Species</Label>
                <Input
                  id="species"
                  name="species"
                  defaultValue={initialData?.species}
                  placeholder="Enter species"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={initialData?.description}
                placeholder="Enter description"
                rows={4}
              />
            </div>

            {/* Collection Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="collection_date">Collection Date</Label>
                <Input
                  id="collection_date"
                  name="collection_date"
                  type="date"
                  defaultValue={initialData?.collection_date}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="collector">Collector</Label>
                <Input
                  id="collector"
                  name="collector"
                  defaultValue={initialData?.collector}
                  placeholder="Enter collector name"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/algae")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || createAlgae.isPending || updateAlgae.isPending}
              >
                {isSubmitting || createAlgae.isPending || updateAlgae.isPending
                  ? "Saving..."
                  : isEdit
                  ? "Update"
                  : "Create"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 