import React, { useState } from 'react';
import { FilterBar } from './FilterBar';
import { useLocations } from '../hooks/useLocations';
import InteractiveMap from './InteractiveMap';
import { Search } from 'lucide-react';

export const MapView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: locationsResponse, isLoading, error } = useLocations();
  const locations = locationsResponse?.data?.results ? 
    locationsResponse.data.results.map(loc => ({
      id: loc.id,
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: loc.coordinates
      },
      properties: {
        name: loc.name,
        description: loc.description,
        created_at: loc.created_at,
        updated_at: loc.updated_at
      }
    })) : [];

  // Filter locations based on search query
  const filteredLocations = locations.filter(location =>
    location.properties.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.properties.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Algae Growth Map
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Explore real-time and historical data on algae growth across different regions.
        </p>
      </div>
      
      {/* Map Section */}
      <div className="mb-4 sm:mb-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-[400px] sm:h-[500px] lg:h-[600px] rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-[400px] sm:h-[500px] lg:h-[600px] bg-secondary rounded-lg">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-destructive mb-2">Error</h3>
              <p className="text-muted-foreground">Failed to load locations.</p>
            </div>
          </div>
        ) : (
          <InteractiveMap 
            locations={filteredLocations} 
            height={window.innerWidth < 640 ? "400px" : window.innerWidth < 1024 ? "500px" : "600px"} 
          />
        )}
      </div>

      {/* Location List */}
      {locations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredLocations.map((location) => (
            <div key={location.id} className="bg-card border border-border rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-2 break-words">{location.properties.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 break-words">{location.properties.description}</p>
              <p className="text-xs text-muted-foreground break-all">
                {location.geometry.coordinates[1].toFixed(4)}, {location.geometry.coordinates[0].toFixed(4)}
              </p>
            </div>
          ))}
        </div>
      )}
      
      <footer className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground">
        <p>Data updated every 24 hours</p>
      </footer>
    </div>
  );
};
