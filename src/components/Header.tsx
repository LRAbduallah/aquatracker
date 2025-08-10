import React, { useState } from 'react';
import { Menu, Search, X, Droplets, Waves, Fish, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from "react-router-dom";
import { UserProfileModal } from './UserProfileModal';
import { authService } from '@/lib/authService';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  showProfile?: boolean;
  onSearch?: (query: string) => void;
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = "AquaTrack", 
  showSearch = true, 
  showProfile = true,
  onSearch,
  onMenuToggle
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login');
    }
  };
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
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo and Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Hamburger menu for mobile only */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleMobileMenu}
              className="lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <a 
                href="https://www.sthinducollege.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/images/college-logo.png" 
                  alt="S.T. Hindu College Logo" 
                  className="h-8 w-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </a>
              <Link to="/" className="flex flex-col hover:opacity-80 transition-opacity">
                <h1 className="text-lg font-bold text-primary leading-tight">AquaTracker</h1>
                <p className="text-xs text-muted-foreground leading-tight">Research Platform</p>
              </Link>
            </div>
          </div>

          {/* Center: Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
            <Link to="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/map" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Map
            </Link>
            <Link to="/algae" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Algae
            </Link>
            <Link to="/locations" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Locations
            </Link>
          </nav>

          {/* Right: Search and Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {showSearch && (
              <div className="hidden md:block">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="pl-9 w-48 lg:w-64"
                  />
                </form>
              </div>
            )}
            {showProfile && (
              <UserProfileModal onLogout={handleLogout} />
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background">
              {showSearch && (
                <div className="px-3 py-2">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="pl-12 w-full"
                    />
                  </form>
                </div>
              )}
              <Link 
                to="/" 
                className="block px-3 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/map" 
                className="block px-3 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Map
              </Link>
              <Link 
                to="/algae" 
                className="block px-3 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Algae
              </Link>
              <Link 
                to="/locations" 
                className="block px-3 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Locations
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};