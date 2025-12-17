import { Link } from "react-router-dom";
import { MetaTags } from "@/components/MetaTags";
import { StructuredData, breadcrumbSchema } from "@/components/StructuredData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  CheckCircle, 
  Star, 
  Calendar,
  Users,
  Car,
  Clock
} from "lucide-react";

interface LocationPageLayoutProps {
  areaName: string;
  areaSlug: string;
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  landmarks: string[];
  neighborhoods: string[];
  popularEvents: Array<{
    name: string;
    description: string;
  }>;
  testimonial: {
    name: string;
    event: string;
    text: string;
  };
  nearbyAreas: Array<{
    name: string;
    slug: string;
  }>;
}

export function LocationPageLayout({
  areaName,
  areaSlug,
  metaTitle,
  metaDescription,
  heroDescription,
  landmarks,
  neighborhoods,
  popularEvents,
  testimonial,
  nearbyAreas
}: LocationPageLayoutProps) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Pitt Party Bus - ${areaName}`,
    "description": metaDescription,
    "url": `https://pittpartybus.com/locations/${areaSlug}`,
    "telephone": "+1-412-385-3877",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": areaName,
      "addressRegion": "PA",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "Place",
      "name": areaName
    },
    "priceRange": "$100-$175/hour",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "500"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MetaTags 
        title={metaTitle}
        description={metaDescription}
        canonical={`/locations/${areaSlug}`}
      />
      <StructuredData data={localBusinessSchema} />
      <StructuredData data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Locations", url: "/locations" },
        { name: areaName, url: `/locations/${areaSlug}` }
      ])} />
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-accent text-accent-foreground mb-4">Local Service Area</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Party Bus Rental in {areaName}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            {heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="xl" className="shadow-glow" asChild>
              <a href="tel:4123853877">
                <Phone className="mr-2 h-5 w-5" />
                Call (412) 385-3877
              </a>
            </Button>
            <Button variant="outline" size="xl" className="bg-primary-foreground/10 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground" asChild>
              <Link to="/contact">Get Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us for This Area */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Pitt Party Bus for {areaName}?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're the local experts for party bus transportation in {areaName} and surrounding Pittsburgh neighborhoods.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-border shadow-card-custom">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-hero-gradient rounded-full w-fit">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">Local Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Our drivers know {areaName} inside and out - every street, venue, and shortcut.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border shadow-card-custom">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-hero-gradient rounded-full w-fit">
                  <Clock className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">Quick Arrival</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Fast response times to {areaName} from our central Pittsburgh location.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border shadow-card-custom">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-hero-gradient rounded-full w-fit">
                  <Car className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">Full Fleet Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  All <Link to="/fleet" className="text-accent hover:underline">party buses</Link> available for {areaName} events.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border shadow-card-custom">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-hero-gradient rounded-full w-fit">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">Trusted Locally</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Hundreds of 5-star reviews from {areaName} residents.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Landmarks & Venues */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Popular {areaName} Destinations
              </h2>
              <p className="text-muted-foreground mb-6">
                We provide transportation to and from all major venues, landmarks, and event spaces in {areaName}:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {landmarks.map((landmark, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-sm">{landmark}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Neighborhoods We Serve
              </h2>
              <p className="text-muted-foreground mb-6">
                Our {areaName} party bus service covers all nearby neighborhoods and communities:
              </p>
              <div className="flex flex-wrap gap-2">
                {neighborhoods.map((neighborhood, idx) => (
                  <Badge key={idx} variant="secondary" className="text-sm py-1 px-3">
                    {neighborhood}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Events */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Events in {areaName}
            </h2>
            <p className="text-xl text-muted-foreground">
              Common occasions our {areaName} customers book party buses for
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularEvents.map((event, idx) => (
              <Card key={idx} className="border-border shadow-card-custom hover:shadow-party transition-all">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-accent" />
                    {event.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="hero" size="lg" asChild>
              <Link to="/events">View All Event Types</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Local Testimonial */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-border shadow-luxury">
            <CardContent className="p-8">
              <div className="flex text-accent mb-4 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-center italic text-muted-foreground mb-6">
                "{testimonial.text}"
              </blockquote>
              <div className="text-center">
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.event} in {areaName}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-hero-gradient rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {areaName} Party Bus Pricing
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Get transparent, competitive pricing for party bus rentals in {areaName}. 
              No hidden fees, no surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-primary-foreground/10 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground" asChild>
                <Link to="/blog/party-bus-pricing-guide">Read Pricing Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Also Serving Nearby Areas
            </h2>
            <p className="text-muted-foreground">
              Explore our party bus services in other Pittsburgh neighborhoods
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {nearbyAreas.map((area, idx) => (
              <Link key={idx} to={`/locations/${area.slug}`}>
                <Badge variant="outline" className="text-base py-2 px-4 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                  <MapPin className="h-4 w-4 mr-2" />
                  {area.name}
                </Badge>
              </Link>
            ))}
            <Link to="/locations">
              <Badge variant="outline" className="text-base py-2 px-4 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                View All Locations →
              </Badge>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Book Your {areaName} Party Bus?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get your free quote today and experience Pittsburgh's best party bus service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="luxury" size="xl" asChild>
              <Link to="/contact">Get Free Quote</Link>
            </Button>
            <Button variant="secondary" size="xl" asChild>
              <a href="tel:4123853877">
                <Phone className="mr-2 h-5 w-5" />
                (412) 385-3877
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LocationPageLayout;
