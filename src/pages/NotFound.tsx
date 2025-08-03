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
        <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
          <img
            src="/favicon.png"
            alt="AquaTrack"
            className="w-16 h-16 rounded"
            onError={(e) => {
              const fallback = document.createElement("div");
              fallback.className =
                "w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center";
              fallback.innerHTML =
                '<svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
              e.currentTarget.parentNode?.replaceChild(
                fallback,
                e.currentTarget
              );
            }}
          />
        </div>
        <div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Oops! Page not found
          </p>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist.
          </p>
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
