import React, { useState } from 'react';

export const FilterBar: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filters = [
    { id: 'severity', label: 'Severity', icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/58d02cbd7cefb43f9ec784b8b3e4a1578d2d80ac?placeholderIfAbsent=true' },
    { id: 'dateRange', label: 'Date Range', icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/162af43d915bc6f77f5d2e2c208484808308500d?placeholderIfAbsent=true' },
    { id: 'region', label: 'Region', icon: 'https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/a016f3f5bdfb69cebc9c41bc1efe846efe9a6d68?placeholderIfAbsent=true' },
  ];

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <section className="flex w-full gap-3 flex-wrap pl-3 pr-4 py-3">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => toggleFilter(filter.id)}
          className={`bg-[rgba(41,51,56,1)] flex min-h-8 items-center gap-2 justify-center pl-4 pr-2 rounded-lg hover:bg-[rgba(41,51,56,0.8)] transition-colors ${
            activeFilters.includes(filter.id) ? 'ring-2 ring-[rgba(26,148,229,1)]' : ''
          }`}
        >
          <span className="text-sm text-white font-medium whitespace-nowrap text-center">
            {filter.label}
          </span>
          <img
            src={filter.icon}
            className="aspect-[1] object-contain w-5 flex-1"
            alt={`${filter.label} filter`}
          />
        </button>
      ))}
    </section>
  );
};
