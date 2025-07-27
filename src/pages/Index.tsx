import React, { useState } from 'react';
import { LoginForm } from '@/components/LoginForm';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { MapView } from '@/components/MapView';
import { LocationDetails } from '@/components/LocationDetails';
import { ReportForm } from '@/components/ReportForm';
import { SettingsPage } from '@/components/SettingsPage';
import { SpeciesForm } from '@/components/SpeciesForm';
import { SpeciesDetails } from '@/components/SpeciesDetails';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('Dashboard');
  const [currentApp, setCurrentApp] = useState('algae-tracker'); // algae-tracker, aqua-track, aqua-watch

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    setIsLoggedIn(true);
  };

  const handleSidebarItemClick = (item: string) => {
    setCurrentView(item);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Map':
        return <MapView />;
      case 'LocationDetails':
        return <LocationDetails />;
      case 'ReportForm':
        return <ReportForm />;
      case 'Settings':
        return <SettingsPage />;
      case 'SpeciesForm':
        return <SpeciesForm />;
      case 'SpeciesDetails':
        return <SpeciesDetails />;
      default:
        return <Dashboard />;
    }
  };

  const getAppTitle = () => {
    switch (currentApp) {
      case 'aqua-track':
        return 'AquaTrack';
      case 'aqua-watch':
        return 'AquaWatch';
      default:
        return 'Algae Tracker';
    }
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="bg-background min-h-screen w-full overflow-hidden">
      <div className="w-full">
        {/* Demo Navigation */}
        <div className="flex w-full items-center justify-center gap-4 p-4 border-b border-border">
          <button
            onClick={() => setCurrentView('Dashboard')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              currentView === 'Dashboard'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('Map')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              currentView === 'Map'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            Map View
          </button>
          <button
            onClick={() => setCurrentView('LocationDetails')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              currentView === 'LocationDetails'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            Location Details
          </button>
          <button
            onClick={() => setCurrentView('ReportForm')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              currentView === 'ReportForm'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            Report Form
          </button>
          <button
            onClick={() => setCurrentView('Settings')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              currentView === 'Settings'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            Settings
          </button>
          <button
            onClick={() => setCurrentView('SpeciesForm')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              currentView === 'SpeciesForm'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            Species Form
          </button>
          <button
            onClick={() => setCurrentView('SpeciesDetails')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              currentView === 'SpeciesDetails'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            Species Details
          </button>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-2 rounded text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/80 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Main Application Layout */}
        {(currentView === 'Dashboard' || currentView === 'Settings') ? (
          <div className="flex w-full gap-1 justify-center flex-1 flex-wrap h-full px-6 py-5">
            <Sidebar activeItem={currentView} onItemClick={handleSidebarItemClick} />
            {renderCurrentView()}
          </div>
        ) : currentView === 'Map' || currentView === 'LocationDetails' || currentView === 'ReportForm' || currentView === 'SpeciesForm' || currentView === 'SpeciesDetails' ? (
          <div className="w-full">
            <Header title={getAppTitle()} />
            <div className="flex w-full justify-center flex-1 h-full px-40 py-5 max-md:px-5">
              {renderCurrentView()}
            </div>
          </div>
        ) : (
          renderCurrentView()
        )}
      </div>
    </div>
  );
};

export default Index;
