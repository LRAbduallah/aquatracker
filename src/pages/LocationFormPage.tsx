import React from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from '@/hooks/useLocations';
import LocationForm from '@/components/LocationForm';

export default function LocationFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  
  const { data: locationResponse, isLoading } = useLocation(id ? parseInt(id) : 0);
  const location = locationResponse?.data;

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