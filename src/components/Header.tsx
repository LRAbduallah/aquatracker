import React, { useState } from 'react';
import { UserProfileModal } from './UserProfileModal';
import { Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  showProfile?: boolean;
  onSearch?: (query: string) => void;
  onLogout?: () => void;
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = "AquaTrack", 
  showSearch = true, 
  showProfile = true,
  onSearch,
  onLogout = () => {},
  onMenuToggle
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo and Mobile Menu */}
          <div className="flex items-center gap-4">
            {onMenuToggle && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onMenuToggle}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
              </div>
              <h1 className="text-lg font-bold text-foreground hidden sm:block">
                {title}
              </h1>
            </div>
          </div>

          {/* Center: Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#reports" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Reports
            </a>
            <a href="#alerts" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Alerts
            </a>
            <a href="#settings" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Settings
            </a>
          </nav>

          {/* Right: Search and Profile */}
          <div className="flex items-center gap-4">
            {showSearch && (
              <div className="hidden sm:block">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="pl-9 w-64"
                  />
                </form>
              </div>
            )}
            
            {/* Mobile Search Toggle */}
            {showSearch && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="sm:hidden"
                onClick={toggleMobileMenu}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            {showProfile && (
              <UserProfileModal onLogout={onLogout} />
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {showSearch && (
                <div className="px-3 py-2">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="pl-9 w-full"
                    />
                  </form>
                </div>
              )}
              <a href="#dashboard" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors">
                Dashboard
              </a>
              <a href="#reports" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors">
                Reports
              </a>
              <a href="#alerts" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors">
                Alerts
              </a>
              <a href="#settings" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors">
                Settings
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
