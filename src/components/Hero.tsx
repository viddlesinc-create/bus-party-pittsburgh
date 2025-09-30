import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Users, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-party-bus.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero section">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={heroImage}
          alt="Luxury party bus exterior in Pittsburgh"
          className="w-full h-full object-cover"
          width="1920"
          height="1080"
        />
        <div className="absolute inset-0 bg-luxury-gradient opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="ml-2 text-primary-foreground font-medium">Rated #1 in Pittsburgh</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Premium Party Bus & Limo Rentals in{" "}
              <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
                Pittsburgh
              </span>
            </h1>
            
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Make your special event unforgettable with our luxury fleet of party buses and limousines. 
              Perfect for weddings, proms, bachelor parties, and corporate events.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="accent" size="xl" className="shadow-glow opacity-100" asChild>
                <Link to="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Now
                </Link>
              </Button>
              <Button variant="hero" size="xl" className="bg-white/20 text-white border-2 border-white/40 hover:bg-white hover:text-foreground opacity-100 backdrop-blur-sm" asChild>
                <Link to="/fleet">
                  View Fleet
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-primary-foreground">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-accent" />
                <span>Serving All of Pittsburgh</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-accent" />
                <span>Groups of 8-40</span>
              </div>
            </div>
          </div>

          {/* Quick Quote Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md bg-card-gradient shadow-luxury border border-accent/20">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-card-foreground mb-2">Get Instant Quote</h3>
                  <p className="text-muted-foreground">Free estimates in under 60 seconds</p>
                </div>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Event Date</Label>
                      <Input 
                        id="date" 
                        type="date" 
                        className="border-border focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input 
                        id="time" 
                        type="time" 
                        className="border-border focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="passengers">Number of Passengers</Label>
                    <Select>
                      <SelectTrigger className="border-border focus:border-primary">
                        <SelectValue placeholder="Select group size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8-12">8-12 passengers</SelectItem>
                        <SelectItem value="13-20">13-20 passengers</SelectItem>
                        <SelectItem value="21-30">21-30 passengers</SelectItem>
                        <SelectItem value="31-40">31-40 passengers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event-type">Event Type</Label>
                    <Select>
                      <SelectTrigger className="border-border focus:border-primary">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="prom">Prom</SelectItem>
                        <SelectItem value="bachelor">Bachelor/Bachelorette</SelectItem>
                        <SelectItem value="birthday">Birthday Party</SelectItem>
                        <SelectItem value="corporate">Corporate Event</SelectItem>
                        <SelectItem value="concert">Concert/Show</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="(412) 555-0123"
                      className="border-border focus:border-primary"
                    />
                  </div>
                  
                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    Get Free Quote Now
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    No spam. We respect your privacy.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;