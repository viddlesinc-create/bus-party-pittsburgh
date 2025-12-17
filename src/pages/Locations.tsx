import { MetaTags } from "@/components/MetaTags";
import { StructuredData, organizationSchema } from "@/components/StructuredData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin,
  Phone,
  Clock,
  Car,
  Star,
  Users,
  CheckCircle,
  Calendar,
  Navigation as NavigationIcon
} from "lucide-react";

const Locations = () => {
  const serviceAreas = [
    {
      name: "Downtown Pittsburgh",
      slug: "downtown",
      description: "The heart of the Steel City with iconic landmarks, restaurants, and nightlife venues.",
      landmarks: ["Heinz Field", "PNC Park", "Strip District", "Market Square"],
      popular: true,
      events: ["Corporate Events", "Concerts", "Sports Games", "Nightlife Tours"],
      distance: "0 miles from our location"
    },
    {
      name: "Oakland",
      slug: "oakland",
      description: "University area home to Pitt Panthers, CMU, and vibrant student life.",
      landmarks: ["University of Pittsburgh", "Carnegie Mellon", "Phipps Conservatory", "Carnegie Museums"],
      events: ["Graduation Parties", "College Events", "Academic Functions"],
      distance: "3 miles from downtown"
    },
    {
      name: "Shadyside",
      slug: "shadyside",
      description: "Upscale neighborhood known for boutique shopping and fine dining establishments.",
      landmarks: ["Walnut Street", "Highland Park", "East End Food Co-op"],
      events: ["Weddings", "Bridal Showers", "Upscale Dining Tours"],
      distance: "5 miles from downtown"
    },
    {
      name: "Lawrenceville", 
      slug: "lawrenceville",
      description: "Trendy neighborhood with art galleries, craft breweries, and hip venues.",
      landmarks: ["Butler Street", "Arsenal Park", "Children's Hospital"],
      events: ["Art Crawls", "Brewery Tours", "Bachelor/Bachelorette Parties"],
      distance: "4 miles from downtown"
    },
    {
      name: "South Side",
      slug: "south-side",
      description: "Entertainment district famous for its nightlife and restaurant scene.",
      landmarks: ["Carson Street", "Station Square", "Mount Washington"],
      events: ["Bar Crawls", "Birthday Parties", "Night Out Events"],
      distance: "2 miles from downtown"
    },
    {
      name: "North Hills",
      slug: "north-hills",
      description: "Suburban communities including Cranberry, Wexford, and Pine Township.",
      landmarks: ["Cranberry Township", "North Hills Village", "Seneca Valley"],
      events: ["Wedding Receptions", "Prom Transportation", "Corporate Shuttles"],
      distance: "15-25 miles north"
    },
    {
      name: "South Hills",
      slug: "south-hills",
      description: "Affluent suburbs including Mt. Lebanon, Upper St. Clair, and Peters Township.",
      landmarks: ["South Hills Village", "The Galleria", "Boyce Park"],
      events: ["Country Club Events", "High School Proms", "Wedding Transportation"],
      distance: "10-20 miles south"
    },
    {
      name: "East End",
      slug: "east-end",
      description: "Including Squirrel Hill, Point Breeze, and Regent Square neighborhoods.",
      landmarks: ["Frick Park", "Carnegie Mellon", "Squirrel Hill"],
      events: ["University Events", "Cultural Celebrations", "Family Gatherings"],
      distance: "5-8 miles east"
    },
    {
      name: "West End",
      slug: "west-end",
      description: "Growing area including Robinson Township and Moon Township near the airport.",
      landmarks: ["Pittsburgh Airport", "Robinson Town Centre", "Settler's Ridge"],
      events: ["Airport Transfers", "Corporate Travel", "Shopping Tours"],
      distance: "15-20 miles west"
    }
  ];

  const testimonials = [
    {
      location: "Shadyside Wedding",
      name: "Jennifer & Michael",
      text: "Perfect service from our hotel in Shadyside to our reception in Oakland. The driver knew all the best routes!",
      rating: 5
    },
    {
      location: "North Hills Prom",
      name: "Pine-Richland High School",
      text: "Great experience taking our prom group from Cranberry to downtown Pittsburgh. Safe and fun!",
      rating: 5
    },
    {
      location: "South Side Bachelor Party",
      name: "Tom's Bachelor Party",
      text: "Epic night on Carson Street! The party bus was perfect for bar hopping. Driver was awesome!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <MetaTags 
        title="Service Areas - Pittsburgh Party Bus Coverage"
        description="Party bus and limousine service throughout Pittsburgh and surrounding areas. Downtown, Oakland, South Side, North Shore, and all Allegheny County locations."
        canonical="/locations"
      />
      <StructuredData data={organizationSchema} />
      <Navigation />
      
      <section className="py-12 bg-hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Pittsburgh Party Bus Service Areas & Locations
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            We proudly serve Pittsburgh and all surrounding communities with premium <Link to="/fleet" className="text-white hover:underline font-semibold">party bus</Link> and 
            limousine transportation. From downtown to the suburbs, we know the Steel City inside and out. Our experienced drivers navigate 
            Pittsburgh's unique terrain and neighborhoods with ease, ensuring prompt pickups and timely arrivals for 
            all <Link to="/events" className="text-white hover:underline font-semibold">events</Link>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="xl" className="shadow-glow" asChild>
              <a href="tel:4123853877">
                <Phone className="mr-2 h-5 w-5" />
                Call (412) 385-3877
              </a>
            </Button>
            <Button variant="outline" size="xl" className="bg-primary-foreground/10 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground backdrop-blur-sm" asChild>
              <Link to="/contact">
                <NavigationIcon className="mr-2 h-5 w-5" />
                Get Service Quote
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Areas Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Areas We Serve Throughout Pittsburgh
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              From the city center to suburban communities - we bring luxury transportation everywhere. 
              Whether you're planning a <Link to="/events" className="text-accent hover:underline font-semibold">wedding</Link>, 
              {" "}<Link to="/events" className="text-accent hover:underline font-semibold">corporate event</Link>, or 
              {" "}<Link to="/events" className="text-accent hover:underline font-semibold">night out</Link>, 
              our <Link to="/fleet" className="text-accent hover:underline font-semibold">fleet</Link> reaches every corner of the Pittsburgh metro area.
            </p>
            <p className="text-lg text-muted-foreground">
              Check our <Link to="/pricing" className="text-accent hover:underline font-semibold">transparent pricing</Link> and 
              read our <Link to="/blog/top-events-pittsburgh" className="text-accent hover:underline font-semibold">guide to top Pittsburgh events</Link> to 
              plan your perfect outing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceAreas.map((area, index) => {
              const hasDetailPage = ['downtown', 'oakland', 'south-side', 'north-hills', 'south-hills'].includes(area.slug);
              
              return (
                <Card key={index} className="border-border shadow-card-custom hover:shadow-party transition-all duration-300 relative">
                  {area.popular && (
                    <Badge className="absolute -top-2 left-4 bg-accent text-accent-foreground font-semibold z-10">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-accent" />
                        {area.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-sm text-muted-foreground">
                      {area.distance}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{area.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Popular Landmarks:</h4>
                      <div className="flex flex-wrap gap-1">
                        {area.landmarks.map((landmark, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {landmark}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Common Events:</h4>
                      <ul className="space-y-1">
                        {area.events.map((event, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center">
                            <CheckCircle className="h-3 w-3 mr-2 text-accent flex-shrink-0" />
                            {event}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4 space-y-2">
                      {hasDetailPage ? (
                        <>
                          <Button variant="hero" className="w-full" asChild>
                            <Link to={`/locations/${area.slug}`}>
                              Explore {area.name} Services
                            </Link>
                          </Button>
                          <Button variant="outline" className="w-full bg-background/50 border-2" asChild>
                            <Link to="/contact">Get Quote</Link>
                          </Button>
                        </>
                      ) : (
                        <Button variant="hero" className="w-full" asChild>
                          <Link to="/contact">Get Quote for {area.name}</Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Central Pittsburgh Location
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-semibold">Pitt Party Bus</div>
                    <div className="text-muted-foreground">2101 Centre Ave, Pittsburgh, PA 15219</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-accent" />
                  <div className="text-muted-foreground">(412) 385-3877</div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-accent" />
                  <div className="text-muted-foreground">Available 24/7 for your convenience</div>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-8">
                Strategically located in the heart of Pittsburgh, we can reach any destination in the 
                greater Pittsburgh area quickly and efficiently. Our central location ensures prompt 
                service to all neighborhoods and suburbs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="accent" size="lg">
                  Get Directions
                </Button>
                <Button variant="outline" size="lg" className="bg-background/50 border-2">
                  Request Pickup
                </Button>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-8 shadow-card-custom">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                  <p className="text-muted-foreground text-sm">
                    Google Maps integration would go here showing our service areas and location
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Local Customer Experiences
            </h2>
            <p className="text-xl text-muted-foreground">
              See what customers from across Pittsburgh are saying about our service
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border shadow-card-custom">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.location}</CardDescription>
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

      {/* Service Details */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-border shadow-card-custom">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-hero-gradient rounded-full w-fit">
                  <Clock className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Response Times</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Downtown: 10-15 minutes</li>
                  <li>Close suburbs: 20-30 minutes</li>
                  <li>Outer areas: 30-45 minutes</li>
                  <li>Airport: 25-35 minutes</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-border shadow-card-custom">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-hero-gradient rounded-full w-fit">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Service Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>All Pittsburgh neighborhoods</li>
                  <li>Allegheny County suburbs</li>
                  <li>Airport transportation</li>
                  <li>Special long-distance trips</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-border shadow-card-custom">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-hero-gradient rounded-full w-fit">
                  <Car className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Fleet Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>15+ vehicles in our fleet</li>
                  <li>Multiple size options</li>
                  <li>Same-day availability</li>
                  <li>Backup vehicles ready</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Book Transportation in Your Area?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            No matter where you are in Pittsburgh, we'll get to you quickly with premium service.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="luxury" size="xl">
              <Phone className="mr-2 h-5 w-5" />
              Call (412) 385-3877
            </Button>
            <Button variant="secondary" size="xl">
              <Calendar className="mr-2 h-5 w-5" />
              Check Availability
            </Button>
          </div>
          
          <div className="mt-8 opacity-90">
            <p className="text-sm">Serving all of Pittsburgh • Fast response times • Local expertise</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Locations;