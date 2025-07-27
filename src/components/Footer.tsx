import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full bg-background border-t border-border py-4 mt-auto animate-fade-in">
    <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
      <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} AquaTracker. All rights reserved.</span>
      <nav className="flex gap-4">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">GitHub</a>
        <a href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">Privacy</a>
        <a href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">Terms</a>
      </nav>
    </div>
  </footer>
);

export default Footer; 