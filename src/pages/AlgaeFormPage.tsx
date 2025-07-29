import React from 'react';
import { useParams } from 'react-router-dom';
import { useAlgae } from '@/hooks/useAlgae';
import AlgaeForm from '@/components/AlgaeForm';

export default function AlgaeFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  
  const { data: algaeData, isLoading } = useAlgae(id ? parseInt(id) : 0);
  const algae = algaeData?.data;

  if (isEdit && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AlgaeForm 
      initialData={algae} 
      isEdit={isEdit} 
    />
  );
} 