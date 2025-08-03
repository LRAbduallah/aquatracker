import React, { useState } from 'react';
import { FilterBar } from './FilterBar';
import { useLocations } from '../hooks/useLocations';
import InteractiveMap from './InteractiveMap';
import { Search } from 'lucide-react';

export const MapView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: locationsResponse, isLoading, error } = useLocations();
  const locations = locationsResponse?.data?.results?.features || [];

  // Filter locations based on search query
  const filteredLocations = locations.filter(location =>
    location.properties.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.properties.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Algae Growth Map
        </h1>
        <p className="text-muted-foreground">
          Explore real-time and historical data on algae growth across different regions.
        </p>
      </div>
      
      {/* Map Section */}
      <div className="mb-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-[600px] rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-[600px] bg-secondary rounded-lg">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-destructive mb-2">Error</h3>
              <p className="text-muted-foreground">Failed to load locations.</p>
            </div>
          </div>
        ) : (
          <InteractiveMap locations={filteredLocations} height="600px" />
        )}
      </div>

      {/* Location List */}
      {locations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLocations.map((location) => (
            <div key={location.id} className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">{location.properties.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{location.properties.description}</p>
              <p className="text-xs text-muted-foreground">
                {location.geometry.coordinates[1].toFixed(4)}, {location.geometry.coordinates[0].toFixed(4)}
              </p>
            </div>
          ))}
        </div>
      )}
      
      <footer className="text-center mt-8 text-sm text-muted-foreground">
        <p>Data updated every 24 hours</p>
      </footer>
    </div>
  );
};
