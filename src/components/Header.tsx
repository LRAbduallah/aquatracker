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
            <div className="flex items-center gap-2 sm:gap-3">
              <img 
                src="/favicon.png" 
                alt="AquaTrack" 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded"
                onError={(e) => {
                  // Fallback to droplets icon if favicon fails
                  const fallback = document.createElement('div');
                  fallback.className = 'w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center';
                  fallback.innerHTML = '<svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
                  e.currentTarget.parentNode?.replaceChild(fallback, e.currentTarget);
                }}
              />

              <h1 className="text-sm sm:text-lg font-bold text-foreground hidden xs:block">
                {title}
              </h1>
            </div>
          </div>

          {/* Center: Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
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