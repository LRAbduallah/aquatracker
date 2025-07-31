import React, { useState } from 'react';
import { FilterBar } from './FilterBar';
import { useLocations } from '../hooks/useLocations';

export const MapView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: locations, isLoading, error } = useLocations();

  return (
    <main className="min-w-60 w-full max-w-[960px] overflow-hidden flex-1 shrink basis-[0%]">
      <section className="flex w-full gap-[12px_0px] justify-between flex-wrap p-4">
        <div className="min-w-72 w-[498px]">
          <h1 className="min-h-10 w-full text-[32px] text-white font-bold leading-none">
            Algae Growth Map
          </h1>
          <p className="w-full text-sm text-[rgba(158,173,184,1)] font-normal mt-3">
            Explore real-time and historical data on algae growth across different regions.
          </p>
        </div>
      </section>
      
      <section className="flex w-full flex-col items-stretch justify-center px-4 py-3">
        <div className="min-w-40 min-h-12 w-full">
          <form className="flex w-full items-stretch flex-1 flex-wrap h-full rounded-lg">
            <div className="bg-[rgba(41,51,56,1)] flex items-center justify-center h-full w-10 pl-4 rounded-[8px_0px_0px_8px]">
              <img
                src="https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/f0208529564301207cad585dab803df3ba9f4b96?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-6 self-stretch flex-1 shrink basis-[0%] my-auto"
                alt="Search"
              />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[rgba(41,51,56,1)] flex min-w-60 items-center overflow-hidden text-base text-[rgba(158,173,184,1)] font-normal h-full flex-1 shrink basis-[0%] pl-2 pr-4 py-2 rounded-[0px_8px_8px_0px] border-none outline-none"
              placeholder="Search by location or region"
            />
          </form>
        </div>
      </section>
      
      <FilterBar />
      
      <section className="flex flex-col relative min-h-[425px] w-full flex-1">
        <img
          src="https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/28cda5258d3b04a33600e44fac4ee08e93b33498?placeholderIfAbsent=true"
          className="absolute h-full w-full object-cover inset-0"
          alt="Algae Growth Map"
        />
        <div className="relative flex min-h-[425px] w-full flex-1 py-3">
          {isLoading && <div>Loading locations...</div>}
          {error && <div>Error loading locations.</div>}
          {locations && locations.data?.results?.features && (
            <ul className="bg-black/60 rounded p-4">
              {locations.data.results.features.map((feature: any) => (
                <li key={feature.id}>
                  {feature.properties.name} ({feature.geometry.coordinates.join(', ')})
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      
      <footer className="w-full text-sm text-[rgba(158,173,184,1)] font-normal text-center pt-1 pb-3 px-4">
        <p>Data updated every 24 hours</p>
      </footer>
    </main>
  );
};
