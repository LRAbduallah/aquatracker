import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => (
  <footer className="w-full bg-background py-6 mt-auto">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium">© {new Date().getFullYear()} Algae Research Data Archive</p>
          <p className="text-xs opacity-90">Department of Botany, S.T. Hindu College</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <nav className="flex gap-4">
            <Link 
              to="/" 
              className="text-xs hover:text-accent transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/overview" 
              className="text-xs hover:text-accent transition-colors duration-200"
            >
              Overview
            </Link>
            <Link 
              to="/about" 
              className="text-xs hover:text-accent transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              to="/algae" 
              className="text-xs hover:text-accent transition-colors duration-200"
            >
              Catalog
            </Link>
            <Link 
              to="/dashboard" 
              className="text-xs hover:text-accent transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link 
              to="/locations" 
              className="text-xs hover:text-accent transition-colors duration-200"
            >
              Locations
            </Link>
          </nav>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;