import React from 'react';
import { useParams } from 'react-router-dom';
import { useAlgae } from '@/hooks/useAlgae';
import AlgaeView from '@/components/AlgaeView';

export default function AlgaeViewPage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: algaeData, isLoading, error } = useAlgae(id ? parseInt(id) : 0);
  const algae = algaeData?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    // Allow public viewing; show friendly message if backend restricts access
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Unable to load specimen</h2>
          <p className="text-muted-foreground">This data may require login or is temporarily unavailable.</p>
        </div>
      </div>
    );
  }

  if (!algae) {
    return null;
  }

  return <AlgaeView algae={algae} />;
}