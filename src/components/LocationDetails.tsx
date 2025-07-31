import React, { useState } from 'react';
import { Timeline } from './Timeline';
import { ImageGallery } from './ImageGallery';
import { SensorChart } from './SensorChart';
import { useLocation } from '../hooks/useLocations';

export const LocationDetails: React.FC<{ locationId: string | number }> = ({ locationId }) => {
  const { data: location, isLoading, error } = useLocation(Number(locationId));
  const [activeTab, setActiveTab] = useState('Observations');
  const [notes, setNotes] = useState('');

  const tabs = ['Overview', 'Observations', 'Data', 'Notes'];
  
  const timelineItems = [
    {
      id: '4',
      title: 'Observation 4',
      date: 'July 15, 2024',
      icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/2fe75b2a06cab25366a811d4b6d410356288a597?placeholderIfAbsent=true'
    },
    {
      id: '3',
      title: 'Observation 3',
      date: 'June 20, 2024',
      icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/048828d9f545f7b602881976580c1858fa7ac495?placeholderIfAbsent=true'
    },
    {
      id: '2',
      title: 'Observation 2',
      date: 'May 25, 2024',
      icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/38cce9ef7573b570c31ccf2fe709683f58b3d648?placeholderIfAbsent=true'
    },
    {
      id: '1',
      title: 'Observation 1',
      date: 'April 30, 2024',
      icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/edc77bace419ba989790ca05c7831ae57325e1bc?placeholderIfAbsent=true'
    }
  ];

  const images = [
    'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/2e4d0865791e890f2b9c5d7602977f469c521829?placeholderIfAbsent=true',
    'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/8488a105814f99eb6632f418e05d96da47c892e7?placeholderIfAbsent=true',
    'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/859517e221363cd6b6b11e5dc2847c4c546ec1a4?placeholderIfAbsent=true'
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading location.</div>;

  return (
    <main className="min-w-60 w-full max-w-[960px] overflow-hidden flex-1 shrink basis-[0%]">
      <header className="flex w-full gap-[12px_0px] justify-between flex-wrap p-4">
        <div className="min-w-72 w-72">
          <h1 className="min-h-10 w-full text-[32px] text-white font-bold leading-none">
            {location?.data?.properties?.name || 'Location'}
          </h1>
          <p className="w-full text-sm text-[rgba(158,173,184,1)] font-normal mt-3">
            {location?.data?.properties?.description || ''}
          </p>
        </div>
      </header>
      
      <nav className="w-full text-sm text-[rgba(158,173,184,1)] font-bold whitespace-nowrap pb-3">
        <div className="flex w-full gap-8 flex-wrap px-4 border-[rgba(61,74,84,1)] border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center justify-center pt-4 pb-[13px] border-b-[3px] transition-colors ${
                activeTab === tab
                  ? 'text-white border-[rgba(229,232,235,1)]'
                  : 'border-[rgba(229,232,235,1)] hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>
      
      <section className="w-full text-[22px] text-white font-bold whitespace-nowrap leading-none pt-5 pb-3 px-4">
        <h2>Timeline</h2>
      </section>
      
      <Timeline items={timelineItems} />
      
      <section className="w-full text-[22px] text-white font-bold whitespace-nowrap leading-none pt-5 pb-3 px-4">
        <h2>Images</h2>
      </section>
      
      <ImageGallery images={images} />
      
      <section className="min-h-[60px] w-full text-[22px] text-white font-bold leading-none pt-5 pb-3 px-4">
        <h2>Sensor Readings</h2>
      </section>
      
      <section className="flex w-full gap-4 text-base flex-wrap px-4 py-6">
        <SensorChart
          title="Temperature"
          value="25°C"
          period="Last 3 Months"
          change="+2%"
          changeColor="text-[rgba(10,217,92,1)]"
          chartImage="https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/a86ba49eec16b2b77e53e8dc4074d6f5e014bde5?placeholderIfAbsent=true"
        />
        <SensorChart
          title="pH Level"
          value="7.2"
          period="Last 3 Months"
          change="-1%"
          changeColor="text-[rgba(250,94,56,1)]"
          chartImage="https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/33f02e72c8eb4e2d02422a191f98bf4e6b7edd24?placeholderIfAbsent=true"
        />
        <SensorChart
          title="Oxygen Level"
          value="8.5 mg/L"
          period="Last 3 Months"
          change="+3%"
          changeColor="text-[rgba(10,217,92,1)]"
          chartImage="https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/83fe776ff3258ddfc5955d2af9c286a22bcd4093?placeholderIfAbsent=true"
        />
      </section>
      
      <section className="w-full text-[22px] text-white font-bold whitespace-nowrap leading-none pt-5 pb-3 px-4">
        <h2>Notes</h2>
      </section>
      
      <section className="flex w-[480px] max-w-full gap-4 text-base text-white font-medium flex-wrap px-4 py-3">
        <div className="min-w-40 w-full flex-1 shrink basis-[0%]">
          <label className="w-full pb-2 block">Add/Edit Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="bg-[rgba(28,33,38,1)] border flex min-h-36 w-full flex-1 py-[15px] px-4 rounded-lg border-[rgba(61,74,84,1)] border-solid resize-none outline-none text-white"
            placeholder="Add your notes here..."
          />
        </div>
      </section>
      
      <section className="flex w-full text-sm text-white font-bold text-center px-4 py-3">
        <button className="bg-[rgba(41,51,56,1)] flex min-w-[84px] min-h-10 w-[149px] max-w-[480px] items-center overflow-hidden justify-center px-4 rounded-lg hover:bg-[rgba(41,51,56,0.8)] transition-colors">
          Download Report
        </button>
      </section>
    </main>
  );
};
