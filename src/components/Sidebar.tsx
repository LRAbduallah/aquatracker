import React from 'react';
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const location = useLocation();
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', to: '/dashboard', icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/469630f1a094cfa2b2e80eefd227e4107e23b618?placeholderIfAbsent=true' },
    { id: 'map', label: 'Map', to: '/map', icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/b54d8671083888e80f4f4cb3be6a1f95db33e894?placeholderIfAbsent=true' },
    { id: 'reports', label: 'Reports', to: '/reports', icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/168be014cbcff8edfdc683ca9cd5fbad767a123b?placeholderIfAbsent=true' },
    { id: 'settings', label: 'Settings', to: '/settings', icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/46f1f4d26578572920b1ab6e9fe019c722f421b5?placeholderIfAbsent=true' },
  ];

  return (
    <aside className="min-w-60 overflow-hidden w-80 bg-background border-r border-border">
      <nav className="flex min-h-[700px] w-full flex-col items-stretch justify-center p-4">
        <header className="w-full mb-4">
          <div className="w-full">
            <h2 className="w-full text-base text-foreground font-medium">Algae Tracker</h2>
            <p className="w-full text-sm text-muted-foreground font-normal whitespace-nowrap">v1.2</p>
          </div>
        </header>
        <div className="w-full">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              className={`flex w-full items-center gap-3 mt-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === item.to
                  ? 'bg-secondary text-secondary-foreground scale-105 shadow-lg'
                  : 'hover:bg-secondary/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="w-4 h-4 bg-current rounded"></div>
              </div>
              <span className="text-sm font-medium whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
};
