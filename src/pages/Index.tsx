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
        return <LocationDetails locationId={1} />;
      case 'ReportForm':
        return <ReportForm />;
      case 'Settings':
        return <SettingsPage />;
      case 'SpeciesForm':
        return <SpeciesForm />;
      case 'SpeciesDetails':
        return <SpeciesDetails algaeId={1} />;
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

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="bg-background min-h-screen w-full">
      <div className="w-full">
        {/* Main Application Layout */}
        {(currentView === 'Dashboard' || currentView === 'Settings') ? (
          <div className="flex min-h-screen">
            <Sidebar activeItem={currentView} onItemClick={handleSidebarItemClick} />
            <div className="flex-1 flex flex-col">
              <Header 
                title={getAppTitle()} 
                onLogout={handleLogout}
                showSearch={false}
              />
              <main className="flex-1 p-6">
                {renderCurrentView()}
              </main>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <Header 
              title={getAppTitle()} 
              onLogout={handleLogout}
            />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {renderCurrentView()}
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
