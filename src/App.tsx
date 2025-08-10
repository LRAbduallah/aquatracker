import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import OverviewPage from "./pages/OverviewPage";
import AboutPage from "./pages/AboutPage";
import { Dashboard } from "@/components/Dashboard";
import { MapView } from "@/components/MapView";
import { ReportForm } from "@/components/ReportForm";
import { SettingsPage } from "@/components/SettingsPage";
import Layout from "@/components/Layout";
import AlgaeListPage from './pages/AlgaeListPage';
import AlgaeFormPage from './pages/AlgaeFormPage';
import AlgaeViewPage from './pages/AlgaeViewPage';

import LocationsPage from './pages/LocationsPage';
import LocationFormPage from './pages/LocationFormPage';
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PublicRoute } from "@/components/PublicRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          } />
          
          {/* Public Academic Pages */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
          
          {/* Protected Routes */}
          <Route element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/report" element={<ReportForm />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/algae" element={<AlgaeListPage />} />
            <Route path="/algae/new" element={<AlgaeFormPage />} />
            <Route path="/algae/:id" element={<AlgaeViewPage />} />
            <Route path="/algae/:id/edit" element={<AlgaeFormPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/locations/new" element={<LocationFormPage />} />
            <Route path="/locations/:id/edit" element={<LocationFormPage />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
