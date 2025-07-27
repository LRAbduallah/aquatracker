import React, { useState } from 'react';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  showProfile?: boolean;
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = "AquaTrack", 
  showSearch = true, 
  showProfile = true,
  onSearch 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="flex w-full items-center justify-between flex-wrap px-10 py-3 border-[rgba(229,232,235,1)] border-b max-md:px-5">
      <div className="self-stretch flex min-w-60 items-center gap-8 flex-wrap my-auto">
        <div className="self-stretch flex items-center gap-4 my-auto">
          <img
            src="https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/cf360fec89c452485b997466aa98e533ed0c2450?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-4 flex-1"
            alt="Logo"
          />
          <h1 className="self-stretch text-lg text-white font-bold whitespace-nowrap leading-none my-auto">
            {title}
          </h1>
        </div>
        
        <nav className="self-stretch flex min-w-60 items-center gap-9 text-sm text-white font-medium whitespace-nowrap my-auto">
          <a href="#dashboard" className="hover:text-[rgba(26,148,229,1)] transition-colors">Dashboard</a>
          <a href="#reports" className="hover:text-[rgba(26,148,229,1)] transition-colors">Reports</a>
          <a href="#alerts" className="hover:text-[rgba(26,148,229,1)] transition-colors">Alerts</a>
          <a href="#settings" className="hover:text-[rgba(26,148,229,1)] transition-colors">Settings</a>
        </nav>
      </div>
      
      {(showSearch || showProfile) && (
        <div className="self-stretch flex min-w-60 gap-8 flex-wrap flex-1 shrink basis-[0%] my-auto">
          {showSearch && (
            <form onSubmit={handleSearchSubmit} className="min-w-40 w-40 max-w-64">
              <div className="flex w-full items-stretch flex-1 h-full rounded-lg">
                <div className="bg-[rgba(41,51,56,1)] flex items-center justify-center h-10 w-10 pl-4 rounded-[8px_0px_0px_8px]">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/b60858ac5fa59ee0379e5d2058c8f2c47dca3944?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-6 self-stretch flex-1 shrink basis-[0%] my-auto"
                    alt="Search"
                  />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[rgba(41,51,56,1)] flex items-center overflow-hidden text-base text-[rgba(158,173,184,1)] font-normal whitespace-nowrap h-full flex-1 shrink basis-[0%] pl-2 pr-4 py-2 rounded-[0px_8px_8px_0px] border-none outline-none"
                  placeholder="Search"
                />
              </div>
            </form>
          )}
          
          {showProfile && (
            <img
              src="https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/19ed300201ae72f88f65a32f1e5a511d061eccd7?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-10 shrink-0 rounded-[20px] cursor-pointer hover:opacity-80 transition-opacity"
              alt="Profile"
            />
          )}
        </div>
      )}
    </header>
  );
};
