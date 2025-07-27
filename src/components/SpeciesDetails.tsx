import React from 'react';
import { ImageGallery } from './ImageGallery';

export const SpeciesDetails: React.FC = () => {
  const breadcrumbs = [
    { label: 'Species', href: '#species' },
    { label: 'Species Details', href: '#', active: true }
  ];

  const speciesData = {
    name: 'Ulva Lactuca',
    classification: 'Chlorophyta',
    characteristics: 'Green algae with thin, flat blades',
    habitat: 'Coastal marine environments'
  };

  const images = [
    'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/d36aa306bcc42dfeb2ac5e7c87101a6368effcfc?placeholderIfAbsent=true',
    'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/bb9fb12302f9fc7751e566632a5bfc1896bdefda?placeholderIfAbsent=true',
    'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/3b30b5da4859e18f756a6aadde11ed4228f676ab?placeholderIfAbsent=true'
  ];

  return (
    <main className="min-w-60 w-full max-w-[960px] overflow-hidden flex-1 shrink basis-[0%]">
      <nav className="flex w-full gap-2 text-base text-[rgba(158,173,184,1)] font-medium flex-wrap p-4">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="whitespace-nowrap">/</span>}
            <a
              href={crumb.href}
              className={`whitespace-nowrap ${
                crumb.active ? 'text-white' : 'hover:text-white transition-colors'
              }`}
            >
              {crumb.label}
            </a>
          </React.Fragment>
        ))}
      </nav>
      
      <header className="flex w-full gap-[12px_100px] text-white justify-between flex-wrap p-4">
        <h1 className="min-w-72 min-h-10 text-[32px] font-bold leading-none w-72">
          Species Details
        </h1>
        <button className="bg-[rgba(41,51,56,1)] flex min-w-[84px] min-h-8 max-w-[480px] items-center overflow-hidden text-sm font-medium whitespace-nowrap text-center justify-center w-[84px] px-4 rounded-2xl hover:bg-[rgba(41,51,56,0.8)] transition-colors">
          Edit
        </button>
      </header>
      
      <section className="min-h-[47px] w-full text-lg text-white font-bold leading-none pt-4 pb-2 px-4">
        <h2>Species Information</h2>
      </section>
      
      <section className="w-full text-sm font-normal p-4">
        <div className="flex w-full items-stretch gap-6 flex-1 flex-wrap h-full">
          <div className="grow shrink w-[149px] py-5 border-[rgba(229,232,235,1)] border-t">
            <div className="flex w-full items-stretch text-[rgba(158,173,184,1)] flex-1 h-full">
              <div className="w-full flex-1 shrink basis-[0%]">Species Name</div>
            </div>
            <div className="flex w-full items-stretch text-white flex-1 h-full">
              <div className="w-full flex-1 shrink basis-[0%]">{speciesData.name}</div>
            </div>
          </div>
          <div className="min-w-60 whitespace-nowrap grow shrink w-[681px] py-5 border-[rgba(229,232,235,1)] border-t">
            <div className="flex w-full items-stretch text-[rgba(158,173,184,1)] flex-1 h-full">
              <div className="min-w-60 w-full flex-1 shrink basis-[0%]">Classification</div>
            </div>
            <div className="flex w-full items-stretch text-white flex-1 h-full">
              <div className="min-w-60 w-full flex-1 shrink basis-[0%]">{speciesData.classification}</div>
            </div>
          </div>
        </div>
        
        <div className="flex w-full items-stretch gap-6 flex-1 flex-wrap h-full mt-6">
          <div className="grow shrink w-[149px] py-5 border-[rgba(229,232,235,1)] border-t">
            <div className="flex w-full text-[rgba(158,173,184,1)] whitespace-nowrap">
              <div className="w-full flex-1 shrink basis-[0%]">Characteristics</div>
            </div>
            <div className="flex w-full text-white leading-[21px]">
              <div className="w-full flex-1 shrink basis-[0%]">{speciesData.characteristics}</div>
            </div>
          </div>
          <div className="min-w-60 grow shrink w-[681px] py-5 border-[rgba(229,232,235,1)] border-t">
            <div className="flex w-full items-stretch text-[rgba(158,173,184,1)] whitespace-nowrap flex-1 h-full">
              <div className="min-w-60 w-full flex-1 shrink basis-[0%]">Habitat</div>
            </div>
            <div className="flex w-full items-stretch text-white flex-1 h-full">
              <div className="min-w-60 w-full flex-1 shrink basis-[0%]">{speciesData.habitat}</div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full text-lg text-white font-bold whitespace-nowrap leading-none pt-4 pb-2 px-4">
        <h2>Images</h2>
      </section>
      
      <ImageGallery images={images} />
      
      <section className="w-full text-lg text-white font-bold whitespace-nowrap leading-none pt-4 pb-2 px-4">
        <h2>Locations</h2>
      </section>
      
      <section className="w-full text-base text-white font-normal pt-1 pb-3 px-4">
        <p>View locations where this species has been observed.</p>
      </section>
      
      <section className="flex w-full text-sm text-white font-bold text-center px-4 py-3">
        <button className="bg-[rgba(41,51,56,1)] flex min-w-[84px] min-h-10 w-[134px] max-w-[480px] items-center overflow-hidden justify-center px-4 rounded-[20px] hover:bg-[rgba(41,51,56,0.8)] transition-colors">
          View Locations
        </button>
      </section>
    </main>
  );
};
