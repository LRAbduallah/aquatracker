import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // This component is no longer needed as we handle routing in App.tsx
  // Redirect to dashboard (which will be protected by ProtectedRoute)
  return <Navigate to="/" replace />;
};

export default Index;