import { SEOHead } from "@/components/SEOHead";
import { StructuredData, serviceSchema, breadcrumbSchema } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { InternalLinkCTA } from "@/components/InternalLinkCTA";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DollarSign,
  Clock,
  Users,
  Calendar,
  CheckCircle,
  Phone,
  Calculator,
  Star,
  Shield,
  Info
} from "lucide-react";

const Pricing = () => {
  const pricingTiers = [
    {
      name: "Mini Party Bus (8-12)",
      hourlyRate: "$100",
      minimumHours: 3,
      popular: false,
      features: [
        "Professional chauffeur",
        "Basic sound system", 
        "LED accent lighting",
        "Cooler space",
        "Insurance included"
      ],
      bestFor: "Small groups, short trips"
    },
    {
      name: "Party Van (13-15)",
      hourlyRate: "$125",
      minimumHours: 3,
      popular: false,
      features: [
        "Professional chauffeur",
        "Premium sound system",
        "LED lighting",
        "Bar setup available",
        "Climate control"
      ],
      bestFor: "Medium groups, local events"
    },
    {
      name: "Executive Party Bus (20-25)",
      hourlyRate: "$150",
      minimumHours: 4,
      popular: true,
      features: [
        "Professional chauffeur",
        "Premium entertainment",
        "Full bar setup",
        "Dance floor space",
        "VIP treatment"
      ],
      bestFor: "Weddings, corporate events"
    },
    {
      name: "Luxury Party Bus (35-40)",
      hourlyRate: "$175",
      minimumHours: 4,
      popular: false,
      features: [
        "Professional chauffeur",
        "State-of-the-art sound",
        "Full bar & ice",
        "Largest Interior Space",
        "Premium amenities"
      ],
      bestFor: "Large groups, special celebrations"
    }
  ];

  const additionalServices = [
    { service: "Red carpet service", price: "Complimentary" },
    { service: "Decorations setup", price: "$25-50" },
    { service: "Extra stops (beyond 3)", price: "$15 per stop" },
    { service: "Waiting time", price: "$50/hour" },
    { service: "Airport pickup/drop-off", price: "$25 fee" },
    { service: "Gratuity", price: "18-20% suggested" }
  ];

  const priceFactors = [
    {
      icon: Clock,
      title: "Duration",
      description: "Most rentals have 3-4 hour minimums. Longer rentals get better per-hour rates."
    },
    {
      icon: Calendar,
      title: "Date & Time", 
      description: "Peak times (Friday/Saturday nights, prom season) may have premium pricing."
    },
    {
      icon: Users,
      title: "Group Size",
      description: "Larger vehicles cost more but offer better per-person value for big groups."
    },
    {
      icon: DollarSign,
      title: "Distance",
      description: "Local trips within Pittsburgh area included. Long-distance may have fuel surcharges."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Pricing & Rates - Pittsburgh Party Bus Rental"
        description="Transparent party bus pricing in Pittsburgh. Mini $100, Party Van $125, Executive $150, Luxury $175 per hour. Free quotes. No hidden fees."
        canonical="/pricing"
      />
      <StructuredData data={serviceSchema({
        name: "Party Bus Rental Pricing",
        description: "Competitive party bus rental rates in Pittsburgh starting at $100 per hour",
        price: "$100-175 per hour"
      })} />
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Pricing", url: "/pricing" }]} />
      </div>
      
      {/* Hero Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Pricing & Estimates
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            Transparent, competitive pricing for premium party bus and limousine rentals in Pittsburgh. 
            Get your free estimate in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="xl" className="shadow-glow">
              <Calculator className="mr-2 h-5 w-5" />
              Get Instant Quote
            </Button>
            <Button variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
              <Phone className="mr-2 h-5 w-5" />
              Call (412) 385-3877
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-border shadow-luxury">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Get Your Free Estimate</CardTitle>
              <CardDescription className="text-lg">
                Fill out the details below for an instant pricing estimate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Event Date</Label>
                    <Input id="event-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input id="start-time" type="time" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="5">5 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="8">8 hours</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="passengers">Number of Passengers</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select group size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8-12">8-12 passengers</SelectItem>
                        <SelectItem value="13-15">13-15 passengers</SelectItem>
                        <SelectItem value="16-20">16-20 passengers</SelectItem>
                        <SelectItem value="21-25">21-25 passengers</SelectItem>
                        <SelectItem value="26-30">26-30 passengers</SelectItem>
                        <SelectItem value="31-40">31-40 passengers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-type">Event Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="prom">Prom</SelectItem>
                        <SelectItem value="bachelor">Bachelor/Bachelorette</SelectItem>
                        <SelectItem value="birthday">Birthday Party</SelectItem>
                        <SelectItem value="corporate">Corporate Event</SelectItem>
                        <SelectItem value="concert">Concert/Sports</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(412) 555-0123" />
                  </div>
                </div>
              </div>
              <Button variant="hero" size="lg" className="w-full">
                <Calculator className="mr-2 h-5 w-5" />
                Calculate My Estimate
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Pricing Structure
            </h2>
            <p className="text-xl text-muted-foreground">
              Competitive rates with no hidden fees - what you see is what you pay
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className="border-border shadow-card-custom hover:shadow-party transition-all duration-300 relative">
                {tier.popular && (
                  <Badge className="absolute -top-2 left-4 bg-accent text-accent-foreground font-semibold z-10">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                  <div className="text-2xl font-bold text-accent">{tier.hourlyRate}</div>
                  <CardDescription>starting per hour</CardDescription>
                  <div className="text-sm text-muted-foreground">
                    {tier.minimumHours} hour minimum
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="text-sm font-medium text-center text-muted-foreground">
                    {tier.bestFor}
                  </div>
                  
                  <ul className="space-y-2">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-3 w-3 mr-2 text-accent flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    Select This Option
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Price Factors */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Affects Your Price?
            </h2>
            <p className="text-xl text-muted-foreground">
              Understanding the factors that influence your party bus rental cost
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {priceFactors.map((factor, index) => (
              <Card key={index} className="text-center border-border shadow-card-custom">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-hero-gradient rounded-full w-fit">
                    <factor.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{factor.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{factor.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Additional Services & Fees
            </h2>
            <p className="text-xl text-muted-foreground">
              Optional extras and additional charges - full transparency
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-border shadow-card-custom">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {additionalServices.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                      <span className="font-medium">{item.service}</span>
                      <span className="text-accent font-semibold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-border shadow-card-custom">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-hero-gradient rounded-full w-fit">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Price Lock Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your quoted price is locked in when you book. No surprise charges or hidden fees.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border shadow-card-custom">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-hero-gradient rounded-full w-fit">
                  <Star className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Best Price Promise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We'll match any legitimate competitor's quote for comparable service and vehicles.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border shadow-card-custom">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-hero-gradient rounded-full w-fit">
                  <Info className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Free Estimates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All quotes are completely free with no obligation. Get multiple options to choose from.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Plan Your Perfect Event</h2>
            <p className="text-muted-foreground">Explore everything you need for memorable transportation</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <Link to="/fleet" className="group">
              <div className="p-6 border border-border rounded-lg hover:border-primary hover:shadow-card-custom transition-all text-center">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary">View Fleet →</h3>
                <p className="text-sm text-muted-foreground">Browse our luxury vehicles</p>
              </div>
            </Link>
            <Link to="/events" className="group">
              <div className="p-6 border border-border rounded-lg hover:border-primary hover:shadow-card-custom transition-all text-center">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary">Event Types →</h3>
                <p className="text-sm text-muted-foreground">See what we specialize in</p>
              </div>
            </Link>
            <Link to="/blog/party-bus-pricing-guide" className="group">
              <div className="p-6 border border-border rounded-lg hover:border-primary hover:shadow-card-custom transition-all text-center">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary">Pricing Guide →</h3>
                <p className="text-sm text-muted-foreground">Complete cost breakdown</p>
              </div>
            </Link>
            <Link to="/faqs" className="group">
              <div className="p-6 border border-border rounded-lg hover:border-primary hover:shadow-card-custom transition-all text-center">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary">Have Questions? →</h3>
                <p className="text-sm text-muted-foreground">View common FAQs</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <InternalLinkCTA 
        title="Ready for Your Free Quote?"
        description="Get accurate pricing in minutes, not days. No pressure, just honest estimates from Pittsburgh's most trusted party bus service."
        primaryLink={{ text: "Get Quote Online", href: "/contact" }}
        secondaryLink={{ text: "Call (412) 385-3877", href: "tel:4123853877" }}
        bgClass="bg-accent"
      />

      <Footer />
    </div>
  );
};

export default Pricing;