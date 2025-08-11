"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Algae } from "@/types/api";
import { useDeleteAlgae } from "@/hooks/useAlgae";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import AlgaeLocationMap from "@/components/AlgaeLocationMap";
import { toast } from "sonner";
import { 
  Calendar, 
  MapPin, 
  User, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Leaf,
  Database,
  FileText
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { authService } from "@/lib/authService";

interface AlgaeViewProps {
  algae: Algae;
}

export default function AlgaeView({ algae }: AlgaeViewProps) {
  const navigate = useNavigate();
  const deleteAlgae = useDeleteAlgae();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isAuthenticated = authService.isAuthenticated();

  const handleDelete = async () => {
    try {
      await deleteAlgae.mutateAsync(algae.id);
      toast.success("Algae specimen deleted successfully!");
      navigate("/algae");
    } catch (error) {
      toast.error("Failed to delete algae specimen.");
      console.error("Error deleting algae:", error);
    } finally {
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 min-w-0 flex-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/algae")}
            className="w-fit"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Back to Catalog</span>
            <span className="sm:hidden">Back</span>
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold break-words">{algae.scientific_name}</h1>
            {algae.common_name && (
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground break-words">{algae.common_name}</p>
            )}
          </div>
        </div>
        {isAuthenticated && (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => navigate(`/algae/${algae.id}/edit`)}
              className="w-full sm:w-auto"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
              disabled={deleteAlgae.isPending}
              className="w-full sm:w-auto"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Column - Image and Basic Info */}
        <div className="space-y-4 sm:space-y-6">
          {/* Image */}
          {algae.image_url && (
            <Card>
              <CardContent className="p-0">
                <img
                  src={algae.image_url}
                  alt={algae.scientific_name}
                  className="w-full h-48 sm:h-64 lg:h-96 object-cover rounded-t-lg"
                />
              </CardContent>
            </Card>
          )}

          {/* Taxonomic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Taxonomic Classification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Class</Label>
                  <p className="font-medium text-sm sm:text-base break-words">{algae.class_name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Order</Label>
                  <p className="font-medium text-sm sm:text-base break-words">{algae.order}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Family</Label>
                  <p className="font-medium text-sm sm:text-base break-words">{algae.family}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Genus</Label>
                  <p className="font-medium text-sm sm:text-base break-words">{algae.genus || "Not specified"}</p>
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-sm font-medium text-muted-foreground">Species</Label>
                  <p className="font-medium text-sm sm:text-base break-words">{algae.species || "Not specified"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Collection Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Collection Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Collection Date:</span>
                <span className="font-medium text-sm">
                  {new Date(algae.collection_date).toLocaleDateString()}
                </span>
              </div>
              {algae.collector && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Collector:</span>
                  <span className="font-medium text-sm break-words">{algae.collector}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Description and Map */}
        <div className="space-y-4 sm:space-y-6">
          {/* Description */}
          {algae.description && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed break-words">{algae.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Location Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Collection Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="space-y-4">
                {algae.locations && algae.locations.length > 0 ? (
                  algae.locations.map((location) => (
                    <div key={location.id} className="border rounded-lg p-3 sm:p-4">
                      <h4 className="font-medium mb-1 text-sm sm:text-base break-words">{location.properties.name}</h4>
                      {location.properties.description && (
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2 break-words">
                          {location.properties.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="break-all">
                          {`${location.geometry.coordinates[1].toFixed(4)}, ${location.geometry.coordinates[0].toFixed(4)}`}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground italic">No location data available</div>
                )}
              </div>
              
              {/* Map */}
              <div className="h-48 sm:h-64 rounded-lg overflow-hidden">
                {algae.locations && algae.locations.length > 0 ? (
                  <AlgaeLocationMap locations={algae.locations} />
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 text-muted-foreground">
                    <span className="text-xs sm:text-sm text-center px-4">No location data available for map</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Created:</span>
                <span className="text-right break-all">{new Date(algae.created_at).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated:</span>
                <span className="text-right break-all">{new Date(algae.updated_at).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Algae Specimen"
        description="Are you sure you want to delete this algae specimen? This action cannot be undone."
        confirmLabel="Delete"
        isLoading={deleteAlgae.isPending}
      />
    </div>
  );
}