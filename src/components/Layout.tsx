import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto animate-fade-in p-4 md:p-8 transition-all duration-300 w-full max-w-5xl mx-auto">
        <Outlet key={location.pathname} />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 