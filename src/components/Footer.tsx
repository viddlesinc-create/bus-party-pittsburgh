import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-luxury-gradient text-primary-foreground" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="bg-accent text-accent-foreground px-3 py-2 rounded-lg font-bold text-xl mb-4 inline-block">
              Pitt Party Bus
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Pittsburgh's premier party bus and limousine rental service. Making your special events unforgettable since day one.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:text-accent" asChild>
                <a href="https://www.facebook.com/pittpartybus" target="_blank" rel="noopener noreferrer" aria-label="Visit Pitt Party Bus on Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:text-accent" asChild>
                <a href="https://www.instagram.com/pittpartybus" target="_blank" rel="noopener noreferrer" aria-label="Visit Pitt Party Bus on Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:text-accent" asChild>
                <a href="https://twitter.com/pittpartybus" target="_blank" rel="noopener noreferrer" aria-label="Visit Pitt Party Bus on Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Events We Serve
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Pricing & Estimates
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Service Areas
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Blog & Tips
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Wedding Transportation
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Prom & Graduation
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Bachelor/Bachelorette Parties
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Corporate Events
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Concert & Sports Events
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Birthday Parties
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Event Planning Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-accent" />
                <div>
                  <div className="font-medium">Pitt Party Bus</div>
                  <div className="text-primary-foreground/80 text-sm">
                    2101 Centre Ave<br />
                    Pittsburgh, PA 15219
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-accent" aria-hidden="true" />
                <a href="tel:4123853877" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  (412) 385-3877
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-accent" />
                <a href="mailto:Pittpartybus412@gmail.com" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Pittpartybus412@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 Pitt Party Bus. All rights reserved. Licensed & Insured.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                Terms of Service
              </Link>
              <a href="/sitemap.xml" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;