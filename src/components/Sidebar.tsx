import React from 'react';

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeItem = 'Dashboard', onItemClick }) => {
  const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/469630f1a094cfa2b2e80eefd227e4107e23b618?placeholderIfAbsent=true' },
    { id: 'Zones', label: 'Zones', icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/b54d8671083888e80f4f4cb3be6a1f95db33e894?placeholderIfAbsent=true' },
    { id: 'Alerts', label: 'Alerts', icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/4a9881455a4dddf283f720def6b61a4da94b2a18?placeholderIfAbsent=true' },
    { id: 'Reports', label: 'Reports', icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/168be014cbcff8edfdc683ca9cd5fbad767a123b?placeholderIfAbsent=true' },
    { id: 'Settings', label: 'Settings', icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/46f1f4d26578572920b1ab6e9fe019c722f421b5?placeholderIfAbsent=true' },
  ];

  const handleItemClick = (itemId: string) => {
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  return (
    <aside className="min-w-60 overflow-hidden w-80 bg-[rgba(18,20,23,1)]">
      <nav className="flex min-h-[700px] w-full flex-col items-stretch justify-center p-4">
        <header className="w-full mb-4">
          <div className="w-full">
            <h2 className="w-full text-base text-white font-medium">Algae Tracker</h2>
            <p className="w-full text-sm text-[rgba(158,173,184,1)] font-normal whitespace-nowrap">v1.2</p>
          </div>
        </header>
        
        <div className="w-full">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`flex w-full items-center gap-3 mt-2 px-3 py-2 rounded-lg transition-colors ${
                activeItem === item.id
                  ? 'bg-[rgba(41,51,56,1)]'
                  : 'hover:bg-[rgba(41,51,56,0.5)]'
              }`}
            >
              <img
                src={item.icon}
                className="aspect-[1] object-contain w-6 flex-1"
                alt={item.label}
              />
              <span className="text-sm text-white font-medium whitespace-nowrap">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
};
