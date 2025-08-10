import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full bg-primary text-primary-foreground py-6 mt-auto">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium">© 2024 Algae Research Data Archive</p>
          <p className="text-xs opacity-90">Department of Botany, S.T. Hindu College</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <nav className="flex gap-4">
            <a href="/" className="text-xs hover:text-accent transition-colors duration-200">Home</a>
            <a href="/overview" className="text-xs hover:text-accent transition-colors duration-200">Overview</a>
            <a href="/about" className="text-xs hover:text-accent transition-colors duration-200">About</a>
            <a href="/algae" className="text-xs hover:text-accent transition-colors duration-200">Catalog</a>
          </nav>
          <nav className="flex gap-4">
            <a href="/map" className="text-xs hover:text-accent transition-colors duration-200">Collection Map</a>
            <a href="/dashboard" className="text-xs hover:text-accent transition-colors duration-200">Dashboard</a>
            <a href="/locations" className="text-xs hover:text-accent transition-colors duration-200">Locations</a>
          </nav>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;