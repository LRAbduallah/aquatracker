import React from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from '@/hooks/useLocations';
import LocationForm from '@/components/LocationForm';
import type { LocationFeature } from '@/types/api';

export default function LocationFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  
const { data: locationResponse, isLoading } = useLocation(id ? parseInt(id) : 0);
const backend = locationResponse?.data;
const location: LocationFeature | undefined = backend
  ? {
      id: backend.id,
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: backend.coordinates,
      },
      properties: {
        name: backend.name,
        description: backend.description,
        created_at: backend.created_at,
        updated_at: backend.updated_at,
      },
    }
  : undefined;

  if (isEdit && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <LocationForm 
      initialData={location} 
      isEdit={isEdit} 
    />
  );
}