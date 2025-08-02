import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LocationFeature } from '@/types/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface InteractiveMapProps {
  locations: LocationFeature[];
  height?: string;
  mapboxToken?: string;
}

const InteractiveMap = ({ locations, height = "600px", mapboxToken }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [tokenInput, setTokenInput] = useState('');
  const [currentToken, setCurrentToken] = useState(mapboxToken || '');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !mapContainer.current || !currentToken) return;

    // Initialize map
    mapboxgl.accessToken = currentToken;
    
    try {
      // Calculate center point from all locations
      const center = locations.length > 0 
        ? [
            locations.reduce((sum, loc) => sum + loc.geometry.coordinates[0], 0) / locations.length,
            locations.reduce((sum, loc) => sum + loc.geometry.coordinates[1], 0) / locations.length,
          ]
        : [0, 0];

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: center as [number, number],
        zoom: locations.length > 0 ? 10 : 2,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add markers for locations
      locations.forEach((location) => {
        if (map.current) {
          // Create popup
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div>
                <h3 style="font-weight: bold; margin-bottom: 8px;">${location.properties.name}</h3>
                <p style="margin-bottom: 4px; color: #666;">${location.properties.description}</p>
                <p style="font-size: 12px; color: #999;">
                  ${location.geometry.coordinates[1].toFixed(4)}, ${location.geometry.coordinates[0].toFixed(4)}
                </p>
              </div>
            `);

          // Create marker
          new mapboxgl.Marker()
            .setLngLat([location.geometry.coordinates[0], location.geometry.coordinates[1]])
            .setPopup(popup)
            .addTo(map.current);
        }
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      toast.error('Failed to initialize map. Please check your Mapbox token.');
    }

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [isMounted, locations, currentToken]);

  const handleTokenSubmit = () => {
    setCurrentToken(tokenInput);
    toast.success('Mapbox token updated!');
  };

  if (!isMounted) {
    return (
      <div 
        className="bg-secondary rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <span className="text-muted-foreground">Loading map...</span>
      </div>
    );
  }

  if (!currentToken) {
    return (
      <div 
        className="bg-secondary rounded-lg flex flex-col items-center justify-center p-8 space-y-4"
        style={{ height }}
      >
        <h3 className="text-lg font-semibold text-foreground">Mapbox Token Required</h3>
        <p className="text-muted-foreground text-center">
          To display the interactive map, please enter your Mapbox public token.<br />
          Get one at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
        </p>
        <div className="flex gap-2 w-full max-w-md">
          <Input
            type="text"
            placeholder="Enter Mapbox token..."
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleTokenSubmit} disabled={!tokenInput}>
            Apply
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-lg overflow-hidden" style={{ height }}>
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default InteractiveMap;