import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, Search, Phone } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead 
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist. Return to our homepage or contact us for assistance with your party bus rental needs."
      />
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/">
              <Button variant="hero" size="lg">
                <Home className="mr-2 h-5 w-5" />
                Return to Home
              </Button>
            </Link>
            <Link to="/fleet">
              <Button variant="outline" size="lg" className="bg-background/50 border-2">
                <Search className="mr-2 h-5 w-5" />
                View Our Fleet
              </Button>
            </Link>
          </div>

          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              Our team is available 24/7 to assist with your party bus rental needs.
            </p>
            <Link to="/contact">
              <Button variant="accent">
                <Phone className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
