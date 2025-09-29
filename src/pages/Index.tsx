import { SEOHead } from "@/components/SEOHead";
import { StructuredData, organizationSchema, websiteSchema } from "@/components/StructuredData";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Clock, 
  Shield, 
  Star, 
  Trophy,
  Car,
  Music,
  Wifi,
  GlassWater,
  Camera,
  CheckCircle
} from "lucide-react";
import fleetImage from "@/assets/fleet-showcase.jpg";
import interiorImage from "@/assets/party-bus-interior.jpg";

const Index = () => {
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, websiteSchema]
  };

  const features = [
    {
      icon: Users,
      title: "Professional Chauffeurs",
      description: "Licensed, insured, and experienced drivers for your safety and peace of mind."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "We're here when you need us - day or night, weekends and holidays."
    },
    {
      icon: Shield,
      title: "Fully Licensed & Insured",
      description: "Complete insurance coverage and all required transportation licenses."
    },
    {
      icon: Trophy,
      title: "#1 Rated Service",
      description: "Highest rated party bus service in Pittsburgh with 500+ five-star reviews."
    }
  ];

  const amenities = [
    { icon: Music, name: "Premium Sound System" },
    { icon: Wifi, name: "Free WiFi" },
    { icon: GlassWater, name: "Full Bar Setup" },
    { icon: Camera, name: "LED Light Shows" },
    { icon: Star, name: "Luxury Seating" },
    { icon: CheckCircle, name: "Climate Control" }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      event: "Wedding Party",
      rating: 5,
      text: "Absolutely amazing service! The party bus was perfect for our wedding party and the driver was so professional. Highly recommend!"
    },
    {
      name: "Mike R.",
      event: "Bachelor Party",
      rating: 5,
      text: "Best bachelor party ever! The bus was exactly what we needed and made the night unforgettable. Will definitely book again!"
    },
    {
      name: "Jennifer L.",
      event: "Prom Night",
      rating: 5,
      text: "Made our prom night so special! The kids loved the party bus and it was the perfect way to travel together safely."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Pittsburgh Party Bus & Limo Rental"
        description="Premium party bus and limousine rentals in Pittsburgh, PA. Luxury transportation for weddings, proms, bachelor parties, corporate events. Available 24/7. Book now!"
        canonical="/"
      />
      <StructuredData data={combinedSchema} />
      <Navigation />
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Pitt Party Bus?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're Pittsburgh's most trusted party bus and limo rental service, 
              committed to making your special events extraordinary.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-border shadow-card-custom hover:shadow-party transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-hero-gradient rounded-full w-fit">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Preview Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Premium Fleet
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                From intimate gatherings to large celebrations, our diverse fleet of luxury 
                vehicles ensures we have the perfect ride for your special occasion.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <amenity.icon className="h-5 w-5 text-accent" />
                    <span className="text-foreground font-medium">{amenity.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="lg">
                  <Car className="mr-2 h-5 w-5" />
                  View Full Fleet
                </Button>
                <Button variant="outline" size="lg">
                  Get Fleet Quote
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={fleetImage}
                alt="Pitt Party Bus Fleet Showcase"
                className="rounded-lg shadow-luxury w-full h-auto"
              />
              <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground p-4 rounded-lg shadow-glow">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm">Premium Vehicles</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interior Showcase */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={interiorImage}
                alt="Luxury Party Bus Interior"
                className="rounded-lg shadow-luxury w-full h-auto"
              />
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-2 rounded-lg font-semibold">
                Premium Interior
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Luxury That Moves You
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Step into a world of luxury with our meticulously maintained party buses. 
                Every detail is designed to create an unforgettable experience for you and your guests.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Premium leather seating for ultimate comfort</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>State-of-the-art sound system with Bluetooth</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>LED lighting with customizable colors</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Full bar setup with ice and glassware</span>
                </li>
              </ul>
              
              <Button variant="accent" size="lg">
                Book Your Experience
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't just take our word for it - see what Pittsburgh loves about us
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border shadow-card-custom">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.event}</CardDescription>
                    </div>
                    <div className="flex text-accent">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Make Your Event Unforgettable?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Get your free quote today and let us handle the transportation while you enjoy the celebration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="xl" className="shadow-glow">
              Get Free Quote Now
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground"
            >
              Call (412) 385-3877
            </Button>
          </div>
          
          <div className="mt-8 text-primary-foreground/80">
            <p className="text-sm">Available 24/7 • Free Quotes • No Hidden Fees</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;