import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLocations, useDeleteLocation } from '@/hooks/useLocations';
import LocationsMap from '@/components/LocationsMap';
import { LocationFeature } from '@/types/api';
import { Plus, MapPin, Calendar, Trash2, Edit, Eye } from 'lucide-react';
import { toast } from 'sonner';

export default function LocationsPage() {
  const navigate = useNavigate();
  const { data: locationsResponse, isLoading } = useLocations();
  const deleteLocation = useDeleteLocation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const locations = locationsResponse?.data?.results?.features || [];

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      try {
        await deleteLocation.mutateAsync(id);
        toast.success("Location deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete location.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Locations</h1>
          <p className="text-muted-foreground">Manage collection locations</p>
        </div>
        <Button onClick={() => navigate("/locations/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Location
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Locations List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">All Locations</h2>
          {locations.map((location: LocationFeature) => (
            <Card key={location.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{location.properties.name}</h3>
                    {location.properties.description && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {location.properties.description}
                      </p>
                    )}
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Coordinates:</span>
                        <Badge variant="secondary">
                          {location.geometry.coordinates[1].toFixed(4)}, {location.geometry.coordinates[0].toFixed(4)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Created:</span>
                        <span>{new Date(location.properties.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/locations/${location.id}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(location.id)}
                      disabled={deleteLocation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {locations.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No locations found</h3>
                <p className="text-muted-foreground mb-4">
                  Get started by adding your first collection location.
                </p>
                <Button onClick={() => navigate("/locations/new")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Location
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Map */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Map View</h2>
          <div className="h-[600px] rounded-lg overflow-hidden">
            {isMounted && <LocationsMap locations={locations} height="600px" />}
          </div>
        </div>
      </div>
    </div>
  );
} 