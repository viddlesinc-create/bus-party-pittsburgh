import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BUSINESS_INFO } from "@/lib/business-info";

const Footer = () => {
  return (
    <footer className="bg-luxury-gradient text-primary-foreground" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info with LocalBusiness Schema */}
          <div 
            className="md:col-span-1"
            itemScope 
            itemType="https://schema.org/LocalBusiness"
          >
            <meta itemProp="name" content={BUSINESS_INFO.name} />
            <meta itemProp="url" content={BUSINESS_INFO.website} />
            <meta itemProp="priceRange" content={BUSINESS_INFO.priceRange} />
            <div className="bg-accent text-accent-foreground px-3 py-2 rounded-lg font-bold text-xl mb-4 inline-block">
              {BUSINESS_INFO.name}
            </div>
            <p className="text-primary-foreground/80 mb-4" itemProp="description">
              Pittsburgh's premier party bus and limousine rental service. Making your special events unforgettable since day one.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:text-accent" asChild>
                <a href={BUSINESS_INFO.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Visit Pitt Party Bus on Facebook" itemProp="sameAs">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:text-accent" asChild>
                <a href={BUSINESS_INFO.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit Pitt Party Bus on Instagram" itemProp="sameAs">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:text-accent" asChild>
                <a href={BUSINESS_INFO.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Visit Pitt Party Bus on Twitter" itemProp="sameAs">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
            </div>
            {/* Hidden geo coordinates for schema */}
            <div itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates" className="hidden">
              <meta itemProp="latitude" content={String(BUSINESS_INFO.geo.latitude)} />
              <meta itemProp="longitude" content={String(BUSINESS_INFO.geo.longitude)} />
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

          {/* Popular Articles */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Articles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog/party-bus-pricing-guide" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Party Bus Pricing Guide
                </Link>
              </li>
              <li>
                <Link to="/blog/top-events-pittsburgh" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Top Events in Pittsburgh
                </Link>
              </li>
              <li>
                <Link to="/blog/wedding-transportation" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Wedding Transportation
                </Link>
              </li>
              <li>
                <Link to="/blog/bachelor-bachelorette-ideas" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Bachelor Party Ideas
                </Link>
              </li>
              <li>
                <Link to="/blog/party-bus-safety-tips" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Safety Tips & Guidelines
                </Link>
              </li>
              <li>
                <Link to="/blog/prom-transportation-safety" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Prom Transportation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info with NAP Schema */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div 
                className="flex items-center"
                itemScope 
                itemType="https://schema.org/PostalAddress"
              >
                <MapPin className="h-5 w-5 mr-3 text-accent" />
                <div>
                  <div className="font-medium" itemProp="name">{BUSINESS_INFO.name}</div>
                  <div className="text-primary-foreground/80 text-sm">
                    <span itemProp="addressLocality">{BUSINESS_INFO.address.city}</span>,{" "}
                    <span itemProp="addressRegion">{BUSINESS_INFO.address.state}</span>{" "}
                    <span itemProp="postalCode">{BUSINESS_INFO.address.zip}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-accent" aria-hidden="true" />
                <a 
                  href={BUSINESS_INFO.phoneTel} 
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                  itemProp="telephone"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-accent" />
                <a 
                  href={`mailto:${BUSINESS_INFO.email}`} 
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                  itemProp="email"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved. Licensed & Insured.
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