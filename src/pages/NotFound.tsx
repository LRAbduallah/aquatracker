import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-6">
          <div className="w-12 h-12 bg-primary-foreground rounded"></div>
        </div>
        <div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">404</h1>
          <p className="text-xl text-muted-foreground mb-6">Oops! Page not found</p>
          <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
        </div>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
