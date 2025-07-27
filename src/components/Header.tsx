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
    <header className="flex w-full items-center justify-between flex-wrap px-10 py-3 border-b border-border bg-background max-md:px-5">
      <div className="self-stretch flex min-w-60 items-center gap-8 flex-wrap my-auto">
        <div className="self-stretch flex items-center gap-4 my-auto">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
          </div>
          <h1 className="self-stretch text-lg text-foreground font-bold whitespace-nowrap leading-none my-auto">
            {title}
          </h1>
        </div>
        
        <nav className="self-stretch flex min-w-60 items-center gap-9 text-sm text-foreground font-medium whitespace-nowrap my-auto">
          <a href="#dashboard" className="hover:text-primary transition-colors">Dashboard</a>
          <a href="#reports" className="hover:text-primary transition-colors">Reports</a>
          <a href="#alerts" className="hover:text-primary transition-colors">Alerts</a>
          <a href="#settings" className="hover:text-primary transition-colors">Settings</a>
        </nav>
      </div>
      
      {(showSearch || showProfile) && (
        <div className="self-stretch flex min-w-60 gap-8 flex-wrap flex-1 shrink basis-[0%] my-auto">
          {showSearch && (
            <form onSubmit={handleSearchSubmit} className="min-w-40 w-40 max-w-64">
              <div className="flex w-full items-stretch flex-1 h-full rounded-lg">
                <div className="bg-secondary flex items-center justify-center h-10 w-10 pl-4 rounded-[8px_0px_0px_8px]">
                  <div className="w-4 h-4 text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </div>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-secondary flex items-center overflow-hidden text-base text-muted-foreground font-normal whitespace-nowrap h-full flex-1 shrink basis-[0%] pl-2 pr-4 py-2 rounded-[0px_8px_8px_0px] border-none outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Search"
                />
              </div>
            </form>
          )}
          
          {showProfile && (
            <div className="w-10 h-10 bg-primary rounded-full cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center">
              <div className="w-6 h-6 text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
