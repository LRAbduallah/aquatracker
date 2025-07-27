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
    <div className="bg-[rgba(18,20,23,1)] min-h-screen w-full overflow-hidden">
      <div className="w-full">
        {/* Demo Navigation */}
        <div className="flex w-full items-center justify-center gap-4 p-4 border-b border-[rgba(61,74,84,1)]">
          <button
            onClick={() => setCurrentView('Dashboard')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              currentView === 'Dashboard'
                ? 'bg-[rgba(26,148,229,1)] text-white'
                : 'bg-[rgba(41,51,56,1)] text-[rgba(158,173,184,1)] hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('Map')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              currentView === 'Map'
                ? 'bg-[rgba(26,148,229,1)] text-white'
                : 'bg-[rgba(41,51,56,1)] text-[rgba(158,173,184,1)] hover:text-white'
            }`}
          >
            Map View
          </button>
          <button
            onClick={() => setCurrentView('LocationDetails')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              currentView === 'LocationDetails'
                ? 'bg-[rgba(26,148,229,1)] text-white'
                : 'bg-[rgba(41,51,56,1)] text-[rgba(158,173,184,1)] hover:text-white'
            }`}
          >
            Location Details
          </button>
          <button
            onClick={() => setCurrentView('ReportForm')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              currentView === 'ReportForm'
                ? 'bg-[rgba(26,148,229,1)] text-white'
                : 'bg-[rgba(41,51,56,1)] text-[rgba(158,173,184,1)] hover:text-white'
            }`}
          >
            Report Form
          </button>
          <button
            onClick={() => setCurrentView('Settings')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              currentView === 'Settings'
                ? 'bg-[rgba(26,148,229,1)] text-white'
                : 'bg-[rgba(41,51,56,1)] text-[rgba(158,173,184,1)] hover:text-white'
            }`}
          >
            Settings
          </button>
          <button
            onClick={() => setCurrentView('SpeciesForm')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              currentView === 'SpeciesForm'
                ? 'bg-[rgba(26,148,229,1)] text-white'
                : 'bg-[rgba(41,51,56,1)] text-[rgba(158,173,184,1)] hover:text-white'
            }`}
          >
            Species Form
          </button>
          <button
            onClick={() => setCurrentView('SpeciesDetails')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              currentView === 'SpeciesDetails'
                ? 'bg-[rgba(26,148,229,1)] text-white'
                : 'bg-[rgba(41,51,56,1)] text-[rgba(158,173,184,1)] hover:text-white'
            }`}
          >
            Species Details
          </button>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-2 rounded text-sm font-medium bg-[rgba(250,94,56,1)] text-white hover:bg-[rgba(250,94,56,0.8)] transition-colors"
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
