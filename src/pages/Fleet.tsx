import { MetaTags } from "@/components/MetaTags";
import { StructuredData, serviceSchema, breadcrumbSchema } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { InternalLinkCTA } from "@/components/InternalLinkCTA";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  Users, 
  CheckCircle,
  Phone,
  Calendar
} from "lucide-react";

// Party Buses
import partyBus30Ext from "@/assets/party-bus-30-passenger-exterior.jpg";
import partyBus30Int from "@/assets/party-bus-30-passenger-interior.jpg";
import partyBus28Ext from "@/assets/party-bus-28-passenger-exterior.jpg";
import partyBus28Int from "@/assets/party-bus-28-passenger-interior.jpg";
import partyBus26Ext from "@/assets/party-bus-26-passenger-exterior.jpg";
import partyBus26Int from "@/assets/party-bus-26-passenger-interior.jpg";
import partyBus24Ext from "@/assets/party-bus-24-passenger-exterior.jpg";
import partyBus24Int from "@/assets/party-bus-24-passenger-interior.jpg";
import partyBus22Ext from "@/assets/party-bus-22-passenger-exterior.jpg";
import partyBus22Int from "@/assets/party-bus-22-passenger-interior.jpg";

// Mini Party Buses
import miniPartyBus12Ext from "@/assets/mini-party-bus-12-passenger-exterior.jpg";
import miniPartyBus12Int from "@/assets/mini-party-bus-12-passenger-interior.jpg";
import miniPartyBus14Ext from "@/assets/mini-party-bus-14-passenger-exterior.jpg";
import miniPartyBus14Int from "@/assets/mini-party-bus-14-passenger-interior.jpg";

// Limousines
import limoLincolnExt from "@/assets/limousine-lincoln-towncar-exterior.jpg";
import limoLincolnInt from "@/assets/limousine-lincoln-towncar-interior.jpg";
import limoDenaliExt from "@/assets/limousine-denali-exterior.jpg";
import limoDenaliInt from "@/assets/limousine-denali-interior.jpg";

// Shuttle Service
import shuttle23Ext from "@/assets/shuttle-bus-23-passenger-exterior.jpg";
import shuttle23Int from "@/assets/shuttle-bus-23-passenger-interior.jpg";
import shuttle14Ext from "@/assets/shuttle-bus-14-passenger-exterior.jpg";

// Private Car
import expeditionExt from "@/assets/private-car-expedition-exterior.jpg";
import expeditionInt from "@/assets/private-car-expedition-interior.jpg";
import continentalExt from "@/assets/private-car-lincoln-continental-exterior.jpg";
import continentalInt from "@/assets/private-car-lincoln-continental-interior.jpg";

const Fleet = () => {
  const fleetCategories = {
    partyBuses: [
      {
        id: 1,
        name: "30 Passenger Party Bus",
        capacity: "26-30 Passengers",
        images: [partyBus30Ext, partyBus30Int],
        features: [
          "Premium leather seating",
          "LED light show system",
          "High-end sound system",
          "Full bar with coolers",
          "Dance floor area",
          "Climate control"
        ],
        description: "Our largest party bus, perfect for big celebrations and events. Features luxurious amenities and plenty of space to party."
      },
      {
        id: 2,
        name: "28 Passenger Party Bus",
        capacity: "24-28 Passengers",
        images: [partyBus28Ext, partyBus28Int],
        features: [
          "Luxury leather seating",
          "Color-changing LED lights",
          "Premium audio system",
          "Bar area with ice",
          "Flat screen TVs",
          "Bluetooth connectivity"
        ],
        description: "Premium party bus ideal for weddings, proms, and corporate events. Top-of-the-line entertainment system."
      },
      {
        id: 3,
        name: "26 Passenger Party Bus",
        capacity: "20-26 Passengers",
        images: [partyBus26Ext, partyBus26Int],
        features: [
          "Comfortable leather seating",
          "Dynamic LED lighting",
          "Quality sound system",
          "Bar setup",
          "Entertainment center",
          "A/C & heating"
        ],
        description: "Great mid-size option for birthday parties, bachelor/bachelorette parties, and special occasions."
      },
      {
        id: 4,
        name: "24 Passenger Party Bus",
        capacity: "18-24 Passengers",
        images: [partyBus24Ext, partyBus24Int],
        features: [
          "Plush seating",
          "LED accent lighting",
          "Premium speakers",
          "Cooler space",
          "Phone charging ports",
          "Climate controlled"
        ],
        description: "Perfect size for medium groups wanting a party atmosphere. Ideal for nights out and celebrations."
      },
      {
        id: 5,
        name: "22 Passenger Party Bus",
        capacity: "14-22 Passengers",
        images: [partyBus22Ext, partyBus22Int],
        features: [
          "Comfortable seating",
          "Colorful LED lights",
          "Sound system",
          "Bar area",
          "Entertainment options",
          "Easy access"
        ],
        description: "Intimate party bus setting perfect for smaller celebrations while still providing the full party experience."
      }
    ],
    miniPartyBuses: [
      {
        id: 6,
        name: "12 Passenger Ford Mini Party Bus",
        capacity: "12 Passengers",
        images: [miniPartyBus12Ext, miniPartyBus12Int],
        features: [
          "Intimate seating arrangement",
          "LED lighting",
          "Quality audio",
          "Bar setup",
          "Comfortable interior",
          "Perfect for small groups"
        ],
        description: "Compact party bus perfect for intimate celebrations and small group outings."
      },
      {
        id: 7,
        name: "14 Passenger Ford Mini Party Bus",
        capacity: "14 Passengers",
        images: [miniPartyBus14Ext, miniPartyBus14Int],
        features: [
          "Modern interior",
          "LED lighting system",
          "Premium sound",
          "Cooler access",
          "Charging ports",
          "Climate control"
        ],
        description: "Ideal for small parties, wine tours, and intimate gatherings. All the amenities in a compact package."
      }
    ],
    limousines: [
      {
        id: 8,
        name: "Lincoln Town Car",
        capacity: "2-6 Passengers",
        images: [limoLincolnExt, limoLincolnInt],
        features: [
          "Luxury leather seats",
          "Privacy partition",
          "Premium sound",
          "Bar service",
          "Mood lighting",
          "Professional chauffeur"
        ],
        description: "Classic elegance for airport transfers, weddings, and special occasions."
      },
      {
        id: 9,
        name: "Denali SUV Limo",
        capacity: "10-14 Passengers",
        images: [limoDenaliExt, limoDenaliInt],
        features: [
          "Executive seating",
          "Entertainment system",
          "Full bar setup",
          "LED lighting",
          "Premium audio",
          "Spacious interior"
        ],
        description: "Luxury SUV limousine perfect for executive travel and VIP occasions."
      }
    ],
    shuttleService: [
      {
        id: 10,
        name: "23 Passenger Luxury Shuttle",
        capacity: "Up to 23 Passengers",
        images: [shuttle23Ext, shuttle23Int],
        features: [
          "Comfortable seating",
          "Climate control",
          "Large luggage space",
          "PA system",
          "Professional driver",
          "Corporate travel ready"
        ],
        description: "Perfect for airport shuttles, corporate events, and group transportation. Ask about split packages!"
      },
      {
        id: 11,
        name: "14 Passenger Shuttle",
        capacity: "Up to 14 Passengers",
        images: [shuttle14Ext],
        features: [
          "Comfortable seats",
          "A/C & heating",
          "Luggage capacity",
          "Reliable service",
          "Professional driver",
          "Flexible scheduling"
        ],
        description: "Ideal for smaller group transportation, airport transfers, and corporate shuttle needs."
      }
    ],
    privateCar: [
      {
        id: 12,
        name: "Ford Expedition",
        capacity: "Up to 6 Passengers",
        images: [expeditionExt, expeditionInt],
        features: [
          "Luxury SUV comfort",
          "Spacious interior",
          "Leather seating",
          "Climate control",
          "Entertainment system",
          "Professional service"
        ],
        description: "Executive SUV service for airport transfers, corporate travel, and private transportation."
      },
      {
        id: 13,
        name: "Lincoln Continental",
        capacity: "Up to 3 Passengers",
        images: [continentalExt, continentalInt],
        features: [
          "Executive sedan",
          "Premium comfort",
          "Quiet ride",
          "Professional driver",
          "Business ready",
          "Airport service"
        ],
        description: "Elegant sedan service for business executives, airport transportation, and professional needs."
      }
    ]
  };

  const VehicleCard = ({ vehicle }: { vehicle: any }) => (
    <Card className="border-border shadow-card-custom hover:shadow-party transition-all duration-300 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-4 p-6">
        <div className="space-y-4">
          {vehicle.images.map((image: string, idx: number) => (
            <img 
              key={idx}
              src={image} 
              alt={`${vehicle.name} - View ${idx + 1}`}
              className="w-full h-48 object-cover rounded-lg"
              loading="lazy"
              width="400"
              height="300"
            />
          ))}
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{vehicle.name}</h3>
            <div className="flex items-center text-muted-foreground mb-4">
              <Users className="h-5 w-5 mr-2" />
              <span className="text-lg font-semibold">{vehicle.capacity}</span>
            </div>
            <p className="text-muted-foreground">{vehicle.description}</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Features:</h4>
            <div className="grid grid-cols-1 gap-2">
              {vehicle.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Button variant="accent" className="w-full shadow-glow" asChild>
            <Link to="/contact">
              <Calendar className="mr-2 h-4 w-4" />
              Get Quote for This Vehicle
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <MetaTags 
        title="Our Fleet - Party Buses & Limousines"
        description="Explore our premium fleet of party buses and limousines in Pittsburgh. Vehicles for 6-40 passengers with luxury amenities. View photos and features."
        canonical="/fleet"
      />
      <StructuredData data={serviceSchema({
        name: "Party Bus & Limousine Fleet",
        description: "Premium party bus and limousine rental fleet serving Pittsburgh, PA",
        price: "$100-175 per hour"
      })} />
      <StructuredData data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Fleet", url: "/fleet" }
      ])} />
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Fleet", url: "/fleet" }]} />
      </div>
      
      {/* Hero Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Our Premium Fleet
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            Explore our diverse fleet of luxury vehicles perfect for any <Link to="/events" className="text-white hover:underline font-semibold">event</Link>. 
            From intimate limousines to spacious party buses, we have the perfect vehicle for every occasion and group size. 
            All vehicles serve the entire <Link to="/locations" className="text-white hover:underline font-semibold">Pittsburgh area</Link> with 
            competitive <Link to="/pricing" className="text-white hover:underline font-semibold">hourly rates</Link>. 
            Read our <Link to="/blog/party-bus-vs-limo" className="text-white hover:underline font-semibold">party bus vs limo guide</Link> to 
            choose the right vehicle.
          </p>
          <Button variant="accent" size="xl" className="shadow-glow" asChild>
            <a href="tel:4123853877">
              <Phone className="mr-2 h-5 w-5" />
              Call (412) 385-3877
            </a>
          </Button>
        </div>
      </section>

      {/* Fleet Categories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="party" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-12">
              <TabsTrigger value="party" className="text-sm md:text-base">PARTY BUSES</TabsTrigger>
              <TabsTrigger value="mini" className="text-sm md:text-base">MINI PARTY BUSES</TabsTrigger>
              <TabsTrigger value="limo" className="text-sm md:text-base">LIMOUSINES</TabsTrigger>
              <TabsTrigger value="shuttle" className="text-sm md:text-base">SHUTTLE SERVICE</TabsTrigger>
              <TabsTrigger value="private" className="text-sm md:text-base">PRIVATE CAR</TabsTrigger>
            </TabsList>
            
            <TabsContent value="party" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">PARTY BUSES</h2>
                <p className="text-xl text-muted-foreground">22-30 Passengers</p>
              </div>
              {fleetCategories.partyBuses.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </TabsContent>
            
            <TabsContent value="mini" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">MINI PARTY BUSES</h2>
                <p className="text-xl text-muted-foreground">Perfect for intimate celebrations</p>
              </div>
              {fleetCategories.miniPartyBuses.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </TabsContent>
            
            <TabsContent value="limo" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">LIMOUSINES</h2>
                <p className="text-xl text-muted-foreground">Classic luxury transportation</p>
              </div>
              {fleetCategories.limousines.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </TabsContent>
            
            <TabsContent value="shuttle" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">SHUTTLE SERVICE</h2>
                <p className="text-xl text-muted-foreground">Up to 23 Passengers</p>
                <p className="text-sm text-muted-foreground italic mt-2">*Ask about our split packages to accommodate your shuttle needs!</p>
              </div>
              {fleetCategories.shuttleService.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </TabsContent>
            
            <TabsContent value="private" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">PRIVATE CAR</h2>
                <p className="text-xl text-muted-foreground">Executive transportation</p>
              </div>
              {fleetCategories.privateCar.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </TabsContent>
          </Tabs>
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
                  <CheckCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Premium Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>LED lighting systems</li>
                  <li>Premium sound systems</li>
                  <li>Climate control</li>
                  <li>Bluetooth connectivity</li>
                  <li>Entertainment centers</li>
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
      <InternalLinkCTA 
        title="Ready to Reserve Your Vehicle?"
        description="Get an instant quote and reserve your perfect party bus or limousine today. Browse our event services to see which vehicle fits your celebration best."
        primaryLink={{ text: "Get Free Quote", href: "/contact" }}
        secondaryLink={{ text: "View Event Services", href: "/events" }}
        bgClass="bg-accent"
      />

      {/* Quick Links Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <Link to="/pricing" className="group">
              <div className="p-6 border border-border rounded-lg hover:border-primary hover:shadow-card-custom transition-all text-center">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary">View Pricing →</h3>
                <p className="text-sm text-muted-foreground">Transparent rates & packages</p>
              </div>
            </Link>
            <Link to="/events" className="group">
              <div className="p-6 border border-border rounded-lg hover:border-primary hover:shadow-card-custom transition-all text-center">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary">Event Services →</h3>
                <p className="text-sm text-muted-foreground">Perfect for any occasion</p>
              </div>
            </Link>
            <Link to="/blog" className="group">
              <div className="p-6 border border-border rounded-lg hover:border-primary hover:shadow-card-custom transition-all text-center">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary">Planning Tips →</h3>
                <p className="text-sm text-muted-foreground">Expert event guides</p>
              </div>
            </Link>
            <Link to="/faqs" className="group">
              <div className="p-6 border border-border rounded-lg hover:border-primary hover:shadow-card-custom transition-all text-center">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary">FAQs →</h3>
                <p className="text-sm text-muted-foreground">Common questions answered</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fleet;