"use client";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Algae } from "@/types/api";
import { useDeleteAlgae } from "@/hooks/useAlgae";
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

interface AlgaeViewProps {
  algae: Algae;
}

export default function AlgaeView({ algae }: AlgaeViewProps) {
  const navigate = useNavigate();
  const deleteAlgae = useDeleteAlgae();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this algae specimen?")) {
      try {
        await deleteAlgae.mutateAsync(algae.id);
        toast.success("Algae specimen deleted successfully!");
        navigate("/algae");
      } catch (error) {
        toast.error("Failed to delete algae specimen.");
        console.error("Error deleting algae:", error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/algae")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Catalog
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{algae.scientific_name}</h1>
            {algae.common_name && (
              <p className="text-lg text-muted-foreground">{algae.common_name}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/algae/${algae.id}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteAlgae.isPending}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image and Basic Info */}
        <div className="space-y-6">
          {/* Image */}
          {algae.image_url && (
            <Card>
              <CardContent className="p-0">
                <img
                  src={algae.image_url}
                  alt={algae.scientific_name}
                  className="w-full h-96 object-cover rounded-t-lg"
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
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Class</Label>
                  <p className="font-medium">{algae.class_name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Order</Label>
                  <p className="font-medium">{algae.order}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Family</Label>
                  <p className="font-medium">{algae.family}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Genus</Label>
                  <p className="font-medium">{algae.genus || "Not specified"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Species</Label>
                  <p className="font-medium">{algae.species || "Not specified"}</p>
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
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Collection Date:</span>
                <span className="font-medium">
                  {new Date(algae.collection_date).toLocaleDateString()}
                </span>
              </div>
              {algae.collector && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Collector:</span>
                  <span className="font-medium">{algae.collector}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Description and Map */}
        <div className="space-y-6">
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
                <p className="text-sm leading-relaxed">{algae.description}</p>
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
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">{algae.location.properties.name}</h4>
                {algae.location.properties.description && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {algae.location.properties.description}
                  </p>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {algae.location.geometry.coordinates[1].toFixed(4)}, {algae.location.geometry.coordinates[0].toFixed(4)}
                  </span>
                </div>
              </div>
              
              {/* Map */}
              <div className="mt-4">
                <AlgaeLocationMap location={algae.location} />
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Created:</span>
                <span>{new Date(algae.created_at).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated:</span>
                <span>{new Date(algae.updated_at).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 