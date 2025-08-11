import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLocations, useDeleteLocation } from '@/hooks/useLocations';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import LocationsMap from '@/components/LocationsMap';
import { BackendLocation } from '@/types/api';
import { Plus, MapPin, Calendar, Trash2, Edit, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '@/lib/authService';

export default function LocationsPage() {
  const navigate = useNavigate();
  const { data: locationsResponse, isLoading } = useLocations();
  const deleteLocation = useDeleteLocation();
  const [isMounted, setIsMounted] = useState(false);
  const [deleteDialogState, setDeleteDialogState] = useState<{ isOpen: boolean; locationId: number | null }>({
    isOpen: false,
    locationId: null,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const locations: BackendLocation[] = locationsResponse?.data?.results || [];
  const isAuthenticated = authService.isAuthenticated();
  
  console.log('Locations data:', locations); // Debug log

  const handleDeleteClick = (id: number) => {
    setDeleteDialogState({ isOpen: true, locationId: id });
  };

  const handleDelete = async () => {
    if (!deleteDialogState.locationId) return;
    
    try {
      await deleteLocation.mutateAsync(deleteDialogState.locationId);
      toast.success("Location deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete location.");
    } finally {
      setDeleteDialogState({ isOpen: false, locationId: null });
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
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Locations</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage collection locations</p>
        </div>
        {isAuthenticated && (
          <Button 
            onClick={() => navigate("/locations/new")}
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Location
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Locations List */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">All Locations</h2>
          {locations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No locations found. Create your first location to get started.
            </div>
          ) : (
            locations.map((location: BackendLocation) => (
            <Card key={location.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 sm:p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 break-words">{location.name}</h3>
                    {location.description && (
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 break-words">
                        {location.description}
                      </p>
                    )}
                    <div className="space-y-1 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Coordinates:</span>
                        <Badge variant="secondary">
                          {location.coordinates[1].toFixed(4)}, {location.coordinates[0].toFixed(4)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Created:</span>
                        <span>{new Date(location.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  {isAuthenticated && (
                    <div className="flex flex-col sm:flex-row gap-1 ml-2 sm:ml-4 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`/locations/${location.id}/edit`)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteClick(location.id)}
                        disabled={deleteLocation.isPending}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            ))
          )}
          
          {locations.length === 0 && (
            <Card>
              <CardContent className="p-6 sm:p-8 text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-semibold mb-2">No locations found</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  Get started by adding your first collection location.
                </p>
                {isAuthenticated && (
                  <Button 
                    onClick={() => navigate("/locations/new")}
                    className="w-full sm:w-auto"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Location
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Map */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Map View</h2>
          <div className="h-[400px] sm:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
            {isMounted && <LocationsMap locations={locations} height="600px" />}
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={deleteDialogState.isOpen}
        onClose={() => setDeleteDialogState({ isOpen: false, locationId: null })}
        onConfirm={handleDelete}
        title="Delete Location"
        description="Are you sure you want to delete this location? This action cannot be undone and will also remove all associated algae specimens."
        confirmLabel="Delete"
        isLoading={deleteLocation.isPending}
      />
    </div>
  );
}