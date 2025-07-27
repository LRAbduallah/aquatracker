import React, { useState } from 'react';
import { FileUpload } from './FileUpload';

export const ReportForm: React.FC = () => {
  const [formData, setFormData] = useState({
    locationName: '',
    latitude: '',
    longitude: '',
    severityLevel: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handlePinLocation = () => {
    console.log('Pin location on map');
  };

  return (
    <main className="flex min-w-60 w-full max-w-[960px] flex-col overflow-hidden items-stretch flex-1 shrink basis-[0%] py-5">
      <header className="flex w-full gap-[12px_0px] text-[32px] text-white font-bold leading-none justify-between flex-wrap p-4">
        <h1 className="min-w-72 min-h-10 w-[305px]">Report Algae Bloom</h1>
      </header>
      
      <form onSubmit={handleSubmit}>
        <section className="flex w-[480px] max-w-full gap-4 text-base flex-wrap px-4 py-3">
          <div className="min-w-40 w-full flex-1 shrink basis-[0%]">
            <label className="w-full text-white font-medium pb-2 block">
              Location Name
            </label>
            <input
              type="text"
              value={formData.locationName}
              onChange={(e) => handleInputChange('locationName', e.target.value)}
              className="bg-[rgba(41,51,56,1)] flex min-h-14 w-full items-center overflow-hidden text-[rgba(158,173,184,1)] font-normal p-4 rounded-lg border-none outline-none"
              placeholder="Enter location name"
              required
            />
          </div>
        </section>
        
        <section className="flex gap-4 text-base flex-wrap px-4 py-3">
          <div className="min-w-40 flex-1 shrink basis-[0%]">
            <label className="w-full text-white font-medium whitespace-nowrap pb-2 block">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              value={formData.latitude}
              onChange={(e) => handleInputChange('latitude', e.target.value)}
              className="bg-[rgba(41,51,56,1)] flex min-h-14 w-full items-center overflow-hidden text-[rgba(158,173,184,1)] font-normal p-4 rounded-lg border-none outline-none"
              placeholder="Enter latitude"
              required
            />
          </div>
          <div className="min-w-40 flex-1 shrink basis-[0%]">
            <label className="w-full text-white font-medium whitespace-nowrap pb-2 block">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              value={formData.longitude}
              onChange={(e) => handleInputChange('longitude', e.target.value)}
              className="bg-[rgba(41,51,56,1)] flex min-h-14 w-full items-center overflow-hidden text-[rgba(158,173,184,1)] font-normal p-4 rounded-lg border-none outline-none"
              placeholder="Enter longitude"
              required
            />
          </div>
        </section>
        
        <section className="flex w-full text-sm text-white font-bold text-center px-4 py-3">
          <button
            type="button"
            onClick={handlePinLocation}
            className="bg-[rgba(41,51,56,1)] flex min-w-[84px] min-h-10 w-[168px] max-w-[480px] items-center overflow-hidden justify-center px-4 rounded-lg hover:bg-[rgba(41,51,56,0.8)] transition-colors"
          >
            Pin Location on Map
          </button>
        </section>
        
        <section className="flex w-[480px] max-w-full gap-4 text-base text-white font-medium flex-wrap px-4 py-3">
          <div className="min-w-40 w-full flex-1 shrink basis-[0%]">
            <label className="w-full pb-2 block">Severity Level</label>
            <select
              value={formData.severityLevel}
              onChange={(e) => handleInputChange('severityLevel', e.target.value)}
              className="bg-[rgba(41,51,56,1)] flex min-h-8 w-full rounded-lg p-2 border-none outline-none text-[rgba(158,173,184,1)]"
              required
            >
              <option value="">Select severity level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </section>
        
        <FileUpload
          title="Upload Photos or Drone Footage"
          description="Drag and drop files here, or browse"
          accept="image/*,video/*"
        />
        
        <section className="flex w-full text-sm text-white font-bold whitespace-nowrap text-center px-4 py-3">
          <button
            type="submit"
            className="bg-[rgba(26,148,229,1)] flex min-w-[84px] min-h-10 w-[84px] items-center overflow-hidden justify-center max-w-[480px] px-4 rounded-lg hover:bg-[rgba(26,148,229,0.9)] transition-colors"
          >
            Submit
          </button>
        </section>
      </form>
    </main>
  );
};
