import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Fleet", href: "/fleet" },
    { name: "Events", href: "/events" },
    { name: "Locations", href: "/locations" },
    { name: "Pricing", href: "/pricing" },
    { name: "FAQs", href: "/faqs" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header>
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-card-custom" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="bg-hero-gradient text-primary-foreground px-3 py-2 rounded-lg font-bold text-xl">
                Pitt Party Bus
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              <a href="tel:4123853877" className="flex items-center text-accent hover:text-accent-glow font-semibold" aria-label="Call Pitt Party Bus at 412-385-3877">
                <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                (412) 385-3877
              </a>
              <Button variant="hero" size="sm" asChild>
                <Link to="/contact">
                  Get Free Quote
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <a href="tel:4123853877" className="mr-4" aria-label="Call Pitt Party Bus">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <Button variant="hero" size="sm" className="w-full">
                Get Free Quote
              </Button>
            </div>
          </div>
        </div>
      )}
      </nav>
    </header>
  );
};

export default Navigation;