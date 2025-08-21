import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Music, 
  Wifi, 
  GlassWater, 
  Camera, 
  Star,
  CheckCircle,
  Phone
} from "lucide-react";
import partyBus40 from "@/assets/party-bus-40.jpg";
import partyBus25 from "@/assets/party-bus-25.jpg";
import stretchLimo from "@/assets/stretch-limo.jpg";
import partyVan15 from "@/assets/party-van-15.jpg";
import suvLimo from "@/assets/suv-limo.jpg";
import miniBus12 from "@/assets/mini-bus-12.jpg";

const Fleet = () => {
  const vehicles = [
    {
      id: 1,
      name: "Luxury Party Bus 40",
      type: "Party Bus",
      capacity: "Up to 40 passengers",
      image: partyBus40,
      features: [
        "Premium leather seating",
        "LED lighting system", 
        "Premium sound system",
        "Full bar setup",
        "Dance floor",
        "Climate control"
      ],
      description: "Our flagship party bus perfect for large groups and special celebrations.",
      pricing: "From $150/hour",
      popular: true
    },
    {
      id: 2,
      name: "Executive Party Bus 25",
      type: "Party Bus",
      capacity: "Up to 25 passengers",
      image: partyBus25,
      features: [
        "Luxury leather seating",
        "Color-changing LED lights",
        "Bluetooth sound system",
        "Bar with ice & cups",
        "Flat screen TVs",
        "Wi-Fi connectivity"
      ],
      description: "Perfect mid-size option for corporate events and medium-sized groups.",
      pricing: "From $125/hour"
    },
    {
      id: 3,
      name: "Stretch Limousine",
      type: "Limousine", 
      capacity: "Up to 10 passengers",
      image: stretchLimo,
      features: [
        "Plush leather interior",
        "Mood lighting",
        "Premium bar setup",
        "Privacy partition",
        "Surround sound",
        "Tinted windows"
      ],
      description: "Classic elegance for weddings, proms, and intimate celebrations.",
      pricing: "From $95/hour"
    },
    {
      id: 4,
      name: "Party Van 15",
      type: "Party Van",
      capacity: "Up to 15 passengers", 
      image: partyVan15,
      features: [
        "Comfortable seating",
        "Sound system",
        "LED accent lighting",
        "Cooler space",
        "Phone chargers",
        "A/C & heating"
      ],
      description: "Great for smaller groups wanting a fun and affordable party experience.",
      pricing: "From $85/hour"
    },
    {
      id: 5,
      name: "Executive SUV Limo",
      type: "SUV Limo",
      capacity: "Up to 20 passengers",
      image: suvLimo,
      features: [
        "Executive seating",
        "Premium entertainment",
        "Full bar service",
        "Panoramic roof",
        "High-end sound",
        "VIP treatment"
      ],
      description: "Ultimate luxury for executive travel and VIP occasions.",
      pricing: "From $135/hour"
    },
    {
      id: 6,
      name: "Mini Party Bus 12",
      type: "Mini Bus",
      capacity: "Up to 12 passengers",
      image: miniBus12,
      features: [
        "Intimate setting", 
        "Quality sound system",
        "Colorful lighting",
        "Bar area",
        "Comfortable seating",
        "Easy entry/exit"
      ],
      description: "Perfect for small intimate groups and special occasions.",
      pricing: "From $75/hour"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Our Premium Fleet
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            Choose from our diverse collection of luxury party buses, limousines, and specialty vehicles. 
            Every vehicle is meticulously maintained and equipped with premium amenities.
          </p>
          <Button variant="accent" size="xl" className="shadow-glow">
            <Phone className="mr-2 h-5 w-5" />
            Get Fleet Quote - (412) 385-3877
          </Button>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Perfect Ride
            </h2>
            <p className="text-xl text-muted-foreground">
              From intimate gatherings to large celebrations - we have the right vehicle for every occasion
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="border-border shadow-card-custom hover:shadow-party transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    className="w-full h-64 object-cover"
                  />
                  {vehicle.popular && (
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground font-semibold">
                      Most Popular
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4 bg-background/90 text-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {vehicle.type}
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{vehicle.name}</CardTitle>
                      <CardDescription className="text-lg flex items-center mt-1">
                        <Users className="h-4 w-4 mr-2" />
                        {vehicle.capacity}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">{vehicle.pricing}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{vehicle.description}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Vehicle Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {vehicle.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="hero" className="flex-1">
                      Book This Vehicle
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Get Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-border shadow-card-custom">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-hero-gradient rounded-full w-fit">
                  <CheckCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>All Vehicles Include</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Professional chauffeur</li>
                  <li>Fuel and tolls included</li>
                  <li>Ice, cups, and napkins</li>
                  <li>Red carpet service</li>
                  <li>Complimentary water</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-border shadow-card-custom">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-hero-gradient rounded-full w-fit">
                  <Star className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Premium Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>LED lighting systems</li>
                  <li>Premium sound systems</li>
                  <li>Climate control</li>
                  <li>Bluetooth connectivity</li>
                  <li>Tinted windows</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-border shadow-card-custom">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-hero-gradient rounded-full w-fit">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Safety First</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>DOT certified vehicles</li>
                  <li>Licensed chauffeurs</li>
                  <li>Full insurance coverage</li>
                  <li>Regular maintenance</li>
                  <li>Safety inspections</li>
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
            Ready to Book Your Perfect Vehicle?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our fleet specialists are standing by to help you choose the perfect vehicle for your event.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="luxury" size="xl">
              Call (412) 385-3877
            </Button>
            <Button variant="secondary" size="xl">
              Get Free Fleet Quote
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fleet;