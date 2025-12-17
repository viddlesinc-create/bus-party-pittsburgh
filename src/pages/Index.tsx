import { MetaTags } from "@/components/MetaTags";
import { StructuredData, organizationSchema, websiteSchema } from "@/components/StructuredData";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { LatestArticles } from "@/components/LatestArticles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
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
  CheckCircle,
  GraduationCap,
  Briefcase,
  Calendar
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
    <>
      <MetaTags 
        title="Party Bus Rental Pittsburgh | Limo & Bus Services | Pitt Party Bus"
        description="Premium party bus and limo rentals in Pittsburgh, PA. Perfect for weddings, proms, bachelor parties & special events. Get your free quote today!"
        canonical="/"
      />
      <StructuredData data={combinedSchema} />
      <Navigation />
      <Hero />
      
      <main id="main-content">
        {/* Features Section */}
        <section className="py-20 bg-background" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
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
      <section className="py-20 bg-muted/50" aria-labelledby="fleet-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="fleet-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Premium Fleet
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                From intimate gatherings to large celebrations, our diverse fleet of luxury 
                vehicles ensures we have the perfect ride for your special occasion. Not sure which to choose? 
                Read our <Link to="/blog/party-bus-vs-limo" className="text-accent hover:underline font-semibold">party bus vs limo comparison</Link>.
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
                <Button variant="hero" size="lg" asChild>
                  <Link to="/fleet">
                    <Car className="mr-2 h-5 w-5" />
                    View Full Fleet
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-background/50 border-2" asChild>
                  <Link to="/contact">
                    Get Fleet Quote
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={fleetImage}
                alt="Pittsburgh party bus fleet including luxury coaches and limousines"
                className="rounded-lg shadow-luxury w-full h-auto"
                width="800"
                height="600"
                loading="lazy"
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
      <section className="py-20 bg-background" aria-labelledby="interior-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={interiorImage}
                alt="Luxury party bus interior featuring LED lights, premium sound system, and leather seating"
                className="rounded-lg shadow-luxury w-full h-auto"
                width="800"
                height="600"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-2 rounded-lg font-semibold">
                Premium Interior
              </div>
            </div>
            
            <div>
              <h2 id="interior-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-6">
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
              
              <Button variant="accent" size="lg" asChild>
                <Link to="/contact">
                  Book Your Experience
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-20 bg-background" aria-labelledby="service-areas-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="service-areas-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Serving All of Pittsburgh and Beyond
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              As Pittsburgh's premier party bus rental service, we proudly serve the entire greater Pittsburgh area. 
              From <Link to="/locations" className="text-accent hover:underline font-semibold">downtown Pittsburgh</Link> to 
              the North and South Hills, our luxury transportation is available wherever you need us.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-border shadow-card-custom hover:shadow-party transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">City & Neighborhoods</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" /> Downtown Pittsburgh</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" /> Oakland & Universities</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" /> Shadyside & Squirrel Hill</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" /> South Side & Strip District</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" /> Lawrenceville & East End</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-card-custom hover:shadow-party transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Suburban Communities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" /> North Hills & Cranberry</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" /> South Hills & Mt. Lebanon</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" /> West Hills & Moon Township</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" /> Wexford & Pine Township</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" /> Peters Township & McMurray</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-card-custom hover:shadow-party transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Special Destinations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" /> Pittsburgh Airport (PIT)</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" /> Heinz Field & PNC Park</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" /> PPG Paints Arena</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" /> Station Square & North Shore</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" /> Surrounding Counties</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Whether you need transportation for a <Link to="/events" className="text-accent hover:underline font-semibold">wedding in Shadyside</Link>, 
              a <Link to="/events" className="text-accent hover:underline font-semibold">prom in the North Hills</Link>, or 
              a <Link to="/events" className="text-accent hover:underline font-semibold">corporate event downtown</Link>, 
              we provide prompt, professional service throughout the entire Pittsburgh metropolitan area.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/locations">View All Service Areas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Events We Serve Section */}
      <section className="py-20 bg-muted/50" aria-labelledby="events-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="events-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Perfect Transportation for Every Occasion
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From intimate celebrations to grand affairs, our <Link to="/fleet" className="text-accent hover:underline font-semibold">luxury fleet</Link> provides 
              the perfect transportation solution for any event type in Pittsburgh. Explore 
              the <Link to="/blog/top-events-pittsburgh" className="text-accent hover:underline font-semibold">top events in Pittsburgh</Link> perfect for a party bus.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="border-border shadow-card-custom hover:shadow-party transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="p-2 bg-hero-gradient rounded-lg mr-3">
                    <Users className="h-5 w-5 text-primary-foreground" />
                  </div>
                  Weddings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Make your special day flawless with our <Link to="/events" className="text-accent hover:underline">wedding transportation services</Link>. 
                  We coordinate bridal party shuttles, guest transportation, and ensure everyone arrives on time and in style.
                </p>
                <Link to="/blog/wedding-transportation" className="text-accent hover:underline text-sm font-semibold">
                  Read our wedding transportation guide →
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-card-custom hover:shadow-party transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="p-2 bg-hero-gradient rounded-lg mr-3">
                    <GraduationCap className="h-5 w-5 text-primary-foreground" />
                  </div>
                  Prom & Graduation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Safe, stylish <Link to="/events" className="text-accent hover:underline">prom transportation</Link> that parents trust and students love. 
                  Professional chauffeurs ensure a memorable night with complete peace of mind.
                </p>
                <Link to="/blog/prom-transportation-safety" className="text-accent hover:underline text-sm font-semibold">
                  Learn about our safety standards →
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-card-custom hover:shadow-party transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="p-2 bg-hero-gradient rounded-lg mr-3">
                    <Users className="h-5 w-5 text-primary-foreground" />
                  </div>
                  Bachelor Parties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Party in style with our <Link to="/events" className="text-accent hover:underline">bachelor and bachelorette party buses</Link>. 
                  Visit multiple venues across Pittsburgh without worrying about parking or designated drivers.
                </p>
                <Link to="/blog/bachelor-bachelorette-ideas" className="text-accent hover:underline text-sm font-semibold">
                  Get party planning ideas →
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-card-custom hover:shadow-party transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="p-2 bg-hero-gradient rounded-lg mr-3">
                    <Briefcase className="h-5 w-5 text-primary-foreground" />
                  </div>
                  Corporate Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Impress clients and reward employees with professional <Link to="/events" className="text-accent hover:underline">corporate transportation</Link>. 
                  Perfect for conferences, team outings, and executive travel.
                </p>
                <Link to="/blog/corporate-event-transportation" className="text-accent hover:underline text-sm font-semibold">
                  Explore corporate solutions →
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-card-custom hover:shadow-party transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="p-2 bg-hero-gradient rounded-lg mr-3">
                    <Music className="h-5 w-5 text-primary-foreground" />
                  </div>
                  Concerts & Sports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Skip parking hassles at Heinz Field, PNC Park, or PPG Arena. Our <Link to="/events" className="text-accent hover:underline">concert and game day transportation</Link> includes 
                  pre-game tailgating and post-event pickup.
                </p>
                <Link to="/blog/concert-party-bus" className="text-accent hover:underline text-sm font-semibold">
                  Plan your concert experience →
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-card-custom hover:shadow-party transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="p-2 bg-hero-gradient rounded-lg mr-3">
                    <Calendar className="h-5 w-5 text-primary-foreground" />
                  </div>
                  Birthday Celebrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Celebrate another year with luxury <Link to="/events" className="text-accent hover:underline">birthday party transportation</Link>. 
                  Sweet 16s, milestone birthdays, or any age - we make it special.
                </p>
                <Link to="/blog/top-events-pittsburgh" className="text-accent hover:underline text-sm font-semibold">
                  Discover top Pittsburgh events →
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Button variant="accent" size="lg" asChild>
              <Link to="/events">Explore All Events We Serve</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background" aria-labelledby="pricing-preview-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="pricing-preview-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Transparent, Competitive Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We believe in honest, upfront <Link to="/pricing" className="text-accent hover:underline font-semibold">party bus pricing</Link> with no hidden fees. 
              Our rates are competitive, and we offer the best value for luxury transportation in Pittsburgh. Check out 
              our <Link to="/blog/party-bus-pricing-guide" className="text-accent hover:underline font-semibold">complete pricing guide</Link> to 
              understand what factors affect your rental cost.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="border-border shadow-card-custom text-center">
              <CardHeader>
                <CardTitle className="text-2xl text-accent">$100+</CardTitle>
                <CardDescription>Mini Party Bus</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">8-12 passengers<br/>Perfect for small groups</p>
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-card-custom text-center">
              <CardHeader>
                <CardTitle className="text-2xl text-accent">$125+</CardTitle>
                <CardDescription>Party Van</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">13-15 passengers<br/>Great for medium events</p>
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-card-custom text-center">
              <CardHeader>
                <CardTitle className="text-2xl text-accent">$150+</CardTitle>
                <CardDescription>Executive Bus</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">20-25 passengers<br/>Ideal for weddings</p>
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-card-custom text-center">
              <CardHeader>
                <CardTitle className="text-2xl text-accent">$175+</CardTitle>
                <CardDescription>Luxury Bus</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">35-40 passengers<br/>Ultimate party experience</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-center">What's Included in Every Rental</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span>Professional licensed chauffeur</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span>Fuel and tolls included</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span>Full insurance coverage</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span>Ice, cups, and napkins</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span>Red carpet service</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span>Complimentary water</span>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button variant="hero" size="lg" asChild>
                <Link to="/pricing">Get Detailed Pricing</Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Or get an <Link to="/blog/accurate-party-bus-estimate" className="text-accent hover:underline">accurate instant estimate online</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't just take our word for it - read over 500+ five-star reviews from happy Pittsburgh customers. 
              Visit our <Link to="/testimonials" className="text-accent hover:underline font-semibold">testimonials page</Link> to see why we're the #1 rated party bus service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
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
          
          <div className="text-center">
            <Button variant="outline" size="lg" className="bg-background/50 border-2" asChild>
              <Link to="/testimonials">Read All Reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-20 bg-background" aria-labelledby="faq-preview-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="faq-preview-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Common Questions About Party Bus Rentals
            </h2>
            <p className="text-xl text-muted-foreground">
              Get quick answers to frequently asked questions about our <Link to="/fleet" className="text-accent hover:underline">fleet</Link>, 
              {" "}<Link to="/pricing" className="text-accent hover:underline">pricing</Link>, and rental policies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <CardTitle className="text-lg">How far in advance should I book?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We recommend booking 2-4 weeks in advance for regular events. For peak seasons like prom (April-June) and weddings (May-October), 
                  book 6-8 weeks ahead. However, we often have same-day availability for last-minute celebrations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <CardTitle className="text-lg">What areas do you serve?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We serve all of Pittsburgh and surrounding areas including Oakland, Shadyside, South Side, North Hills, South Hills, and beyond. 
                  Check our <Link to="/locations" className="text-accent hover:underline font-semibold">service areas page</Link> for complete coverage details.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <CardTitle className="text-lg">Can we bring our own alcohol?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! Passengers 21+ may bring their own alcoholic beverages. We provide ice, cups, and cooler space. 
                  Learn more about our policies in our <Link to="/blog/party-bus-safety-tips" className="text-accent hover:underline">safety tips guide</Link>.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <CardTitle className="text-lg">What's included in the rental price?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every rental includes a professional chauffeur, fuel, insurance, basic amenities (ice, cups, napkins), and red carpet service. 
                  View our complete <Link to="/pricing" className="text-accent hover:underline font-semibold">pricing breakdown</Link> for details.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/faqs">View All FAQs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <LatestArticles />

      {/* CTA Section */}
      <section className="py-20 bg-hero-gradient" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Make Your Event Unforgettable?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Get your free quote today and let us handle the transportation while you enjoy the celebration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="xl" className="shadow-glow" asChild>
              <Link to="/contact">
                Get Free Quote Now
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <a href="tel:4123853877">
                Call (412) 385-3877
              </a>
            </Button>
          </div>
          
          <div className="mt-8 text-primary-foreground/80">
            <p className="text-sm">Available 24/7 • Free Quotes • No Hidden Fees</p>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </>
  );
};

export default Index;