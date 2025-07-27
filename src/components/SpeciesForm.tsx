import React, { useState } from 'react';
import { FileUpload } from './FileUpload';

export const SpeciesForm: React.FC = () => {
  const [formData, setFormData] = useState({
    speciesName: '',
    classification: '',
    characteristics: '',
    habitats: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Species form submitted:', formData);
  };

  return (
    <main className="flex min-w-60 w-full max-w-[960px] flex-col overflow-hidden flex-1 shrink basis-[0%] py-5">
      <header className="self-stretch flex w-full gap-[12px_0px] text-[32px] text-white font-bold leading-none justify-between flex-wrap p-4">
        <h1 className="min-w-72 min-h-10 w-[359px]">Add New Algae Species</h1>
      </header>
      
      <form onSubmit={handleSubmit}>
        <section className="flex w-[480px] max-w-full gap-4 text-base flex-wrap px-4 py-3">
          <div className="min-w-40 w-full flex-1 shrink basis-[0%]">
            <label className="w-full text-white font-medium pb-2 block">
              Species Name
            </label>
            <input
              type="text"
              value={formData.speciesName}
              onChange={(e) => handleInputChange('speciesName', e.target.value)}
              className="bg-[rgba(41,51,56,1)] flex min-h-14 w-full items-center overflow-hidden text-[rgba(158,173,184,1)] font-normal p-4 rounded-xl border-none outline-none"
              placeholder="Enter common name"
              required
            />
          </div>
        </section>
        
        <section className="flex w-[480px] max-w-full gap-4 text-base flex-wrap px-4 py-3">
          <div className="min-w-40 w-full flex-1 shrink basis-[0%]">
            <label className="w-full text-white font-medium pb-2 block">
              Scientific Classification
            </label>
            <input
              type="text"
              value={formData.classification}
              onChange={(e) => handleInputChange('classification', e.target.value)}
              className="bg-[rgba(41,51,56,1)] flex min-h-14 w-full items-center overflow-hidden text-[rgba(158,173,184,1)] font-normal p-4 rounded-xl border-none outline-none"
              placeholder="e.g., Chlorophyta"
              required
            />
          </div>
        </section>
        
        <section className="flex w-[480px] max-w-full gap-4 text-base text-white font-medium whitespace-nowrap flex-wrap px-4 py-3">
          <div className="min-w-40 w-full flex-1 shrink basis-[0%]">
            <label className="w-full pb-2 block">Characteristics</label>
            <textarea
              value={formData.characteristics}
              onChange={(e) => handleInputChange('characteristics', e.target.value)}
              className="bg-[rgba(41,51,56,1)] flex min-h-36 w-full flex-1 py-4 px-4 rounded-xl resize-none border-none outline-none text-[rgba(158,173,184,1)]"
              placeholder="Describe the characteristics of this species..."
              required
            />
          </div>
        </section>
        
        <section className="flex w-[480px] max-w-full gap-4 text-base text-white font-medium flex-wrap px-4 py-3">
          <div className="min-w-40 w-full flex-1 shrink basis-[0%]">
            <label className="w-full pb-2 block">Typical Habitats</label>
            <textarea
              value={formData.habitats}
              onChange={(e) => handleInputChange('habitats', e.target.value)}
              className="bg-[rgba(41,51,56,1)] flex min-h-36 w-full flex-1 py-4 px-4 rounded-xl resize-none border-none outline-none text-[rgba(158,173,184,1)]"
              placeholder="Describe typical habitats where this species is found..."
              required
            />
          </div>
        </section>
        
        <FileUpload
          title="Upload Images"
          description="Drag and drop images here, or click to browse"
          accept="image/*"
        />
        
        <section className="self-stretch flex w-full text-sm text-white font-bold whitespace-nowrap text-center px-4 py-3">
          <button
            type="submit"
            className="bg-[rgba(26,148,229,1)] flex min-w-[84px] min-h-10 w-[84px] items-center overflow-hidden justify-center max-w-[480px] px-4 rounded-[20px] hover:bg-[rgba(26,148,229,0.9)] transition-colors"
          >
            Submit
          </button>
        </section>
      </form>
    </main>
  );
};
