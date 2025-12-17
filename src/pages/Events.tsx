import { MetaTags } from "@/components/MetaTags";
import { StructuredData, breadcrumbSchema } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { InternalLinkCTA } from "@/components/InternalLinkCTA";
import { RelatedServices } from "@/components/RelatedServices";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Heart,
  GraduationCap,
  Users,
  Briefcase,
  Music,
  Camera,
  Calendar,
  MapPin,
  Phone,
  Clock,
  Star,
  Car,
  DollarSign
} from "lucide-react";

const Events = () => {
  const eventTypes = [
    {
      icon: Heart,
      title: "Weddings",
      description: "Make your special day perfect with elegant transportation for the wedding party, family, and guests.",
      features: [
        "Bridal party transportation",
        "Guest shuttle service", 
        "Red carpet service",
        "Champagne setup",
        "Professional coordination"
      ],
      popular: true
    },
    {
      icon: GraduationCap,
      title: "Prom & Graduation",
      description: "Safe, stylish transportation for prom night and graduation celebrations that parents can trust.",
      features: [
        "Group-friendly vehicles",
        "Safe arrival guarantee",
        "Photo opportunities", 
        "Parent peace of mind",
        "Special prom packages"
      ]
    },
    {
      icon: Users,
      title: "Bachelor/Bachelorette Parties",
      description: "Party in style with our luxury buses designed for the ultimate pre-wedding celebration.",
      features: [
        "Party atmosphere",
        "Bar setups available",
        "Multiple stop coordination",
        "Late-night availability",
        "Group entertainment"
      ]
    },
    {
      icon: Briefcase,
      title: "Corporate Events",
      description: "Impress clients and reward employees with professional transportation for corporate functions.",
      features: [
        "Executive vehicles",
        "Professional service",
        "Airport transfers",
        "Meeting coordination", 
        "Corporate billing"
      ]
    },
    {
      icon: Music,
      title: "Concerts & Sports",
      description: "Skip the parking hassles and enjoy the game or show with group transportation and tailgating.",
      features: [
        "Pre-event tailgating",
        "No parking worries",
        "Group coordination",
        "Post-event pickup",
        "Designated driver service"
      ]
    },
    {
      icon: Calendar,
      title: "Birthday Parties",
      description: "Celebrate another year in luxury with party transportation that makes birthdays unforgettable.",
      features: [
        "Birthday decorations",
        "Age-appropriate setup",
        "Multiple venue stops",
        "Party coordination",
        "Special packages"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Amanda & David",
      event: "Wedding",
      image: "/placeholder.svg",
      text: "Pitt Party Bus made our wedding day absolutely perfect! The service was impeccable and our guests are still talking about the amazing transportation.",
      rating: 5
    },
    {
      name: "Sarah's Sweet 16", 
      event: "Birthday Party",
      image: "/placeholder.svg",
      text: "The best birthday party ever! The party bus was decorated perfectly and the driver was so professional. Sarah felt like a celebrity!",
      rating: 5
    },
    {
      name: "Tech Solutions Corp",
      event: "Corporate Event",
      image: "/placeholder.svg", 
      text: "Outstanding service for our corporate retreat. Professional, punctual, and helped make our event a huge success. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <MetaTags 
        title="Party Bus Events & Event Transportation in Pittsburgh | Pitt Party Bus"
        description="Book a party bus for weddings, proms, concerts, sports games, and corporate outings in Pittsburgh. Reliable event transportation with modern buses and professional drivers."
        canonical="/events"
      />
      <StructuredData data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Events", url: "/events" }
      ])} />
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Events", url: "/events" }]} />
      </div>
      
      {/* Hero Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Party Bus Events & Event Transportation in Pittsburgh
          </h1>
          <p className="text-xl text-primary-foreground/90">
            Looking for reliable event transportation in Pittsburgh? From intimate celebrations to grand occasions, 
            we provide luxury party bus rentals that make every event special. Our <Link to="/fleet" className="text-white hover:underline font-semibold">diverse fleet</Link> includes 
            vehicles perfect for any group size, and our professional service ensures your event runs smoothly. 
            Learn about <Link to="/pricing" className="text-white hover:underline font-semibold">competitive pricing</Link> or 
            read <Link to="/blog" className="text-white hover:underline font-semibold">planning tips</Link> on our blog.
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
                Get Event Quote
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Event Types Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Perfect Transportation for Every Occasion
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              Whatever you're celebrating, we have the experience and vehicles to make it extraordinary. 
              Serving all <Link to="/locations" className="text-accent hover:underline font-semibold">Pittsburgh neighborhoods</Link> with 
              professional chauffeurs and <Link to="/fleet" className="text-accent hover:underline font-semibold">luxury vehicles</Link>.
            </p>
            <p className="text-lg text-muted-foreground">
              Get <Link to="/pricing" className="text-accent hover:underline font-semibold">instant pricing</Link> or 
              read our <Link to="/blog" className="text-accent hover:underline font-semibold">event planning guides</Link> for expert tips.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventTypes.map((event, index) => (
              <Card key={index} className="border-border shadow-card-custom hover:shadow-party transition-all duration-300 relative">
                {event.popular && (
                  <Badge className="absolute -top-2 left-4 bg-accent text-accent-foreground font-semibold z-10">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-hero-gradient rounded-full w-fit">
                    <event.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">
                    {event.description}
                  </CardDescription>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">What's Included:</h4>
                    <ul className="space-y-1">
                      {event.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center">
                          <Star className="h-3 w-3 mr-2 text-accent flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <Button variant="hero" className="w-full" asChild>
                      <Link to="/contact">
                        Book This Event
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full bg-background/50 border-2" asChild>
                      <Link to="/fleet">
                        View Our Fleet
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to perfect event transportation
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Get Quote",
                description: "Tell us about your event and get instant pricing",
                icon: Phone
              },
              {
                step: "2", 
                title: "Choose Vehicle",
                description: "Select from our premium fleet based on your group size",
                icon: Users
              },
              {
                step: "3",
                title: "Book & Confirm", 
                description: "Secure your date with easy online booking",
                icon: Calendar
              },
              {
                step: "4",
                title: "Enjoy Your Event",
                description: "Relax while we handle the transportation perfectly",
                icon: Heart
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="mx-auto p-4 bg-hero-gradient rounded-full w-fit shadow-party">
                    <step.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Event Success Stories
            </h2>
            <p className="text-xl text-muted-foreground">
              Real events, real customers, real satisfaction
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border shadow-card-custom">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                      loading="lazy"
                      width="48"
                      height="48"
                    />
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.event}</CardDescription>
                    </div>
                    <div className="flex text-accent ml-auto">
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

      {/* Related Blog Posts Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Event Planning Resources
            </h2>
            <p className="text-xl text-muted-foreground">
              Expert tips and guides for your Pittsburgh celebration
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/blog/wedding-transportation" className="group">
              <Card className="h-full border-border shadow-card-custom hover:shadow-party transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base group-hover:text-primary transition-colors">Wedding Transportation Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Plan perfect wedding day transportation in Pittsburgh.</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/blog/bachelor-bachelorette-ideas" className="group">
              <Card className="h-full border-border shadow-card-custom hover:shadow-party transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base group-hover:text-primary transition-colors">Bachelor & Bachelorette Ideas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Creative party ideas for pre-wedding celebrations.</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/blog/prom-transportation-safety" className="group">
              <Card className="h-full border-border shadow-card-custom hover:shadow-party transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base group-hover:text-primary transition-colors">Prom Transportation Safety</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Keep teens safe on prom night with our tips.</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/blog/corporate-event-transportation" className="group">
              <Card className="h-full border-border shadow-card-custom hover:shadow-party transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base group-hover:text-primary transition-colors">Corporate Event Transportation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Professional transportation for business events.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto">
            <Link to="/blog/concert-party-bus" className="group">
              <Card className="h-full border-border shadow-card-custom hover:shadow-party transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base group-hover:text-primary transition-colors">Concert & Sports Event Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Hassle-free transportation to Pittsburgh venues.</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/blog/top-events-pittsburgh" className="group">
              <Card className="h-full border-border shadow-card-custom hover:shadow-party transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base group-hover:text-primary transition-colors">Top Events in Pittsburgh</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Discover the best events to enjoy with a party bus.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices 
        title="Complete Event Solutions"
        services={[
          {
            title: "View Our Fleet",
            description: "Explore our diverse range of luxury vehicles perfect for any event size and style.",
            href: "/fleet",
            icon: Car
          },
          {
            title: "Get Pricing",
            description: "Transparent pricing and instant quotes for your Pittsburgh event transportation.",
            href: "/pricing",
            icon: DollarSign
          },
          {
            title: "Read Our Blog",
            description: "Event planning tips, party ideas, and transportation guides for Pittsburgh celebrations.",
            href: "/blog",
            icon: Calendar
          }
        ]}
      />

      {/* CTA Section */}
      <InternalLinkCTA 
        title="Ready to Make Your Event Unforgettable?"
        description="Let us handle the transportation while you focus on enjoying your special occasion. Available 24/7 for all your event needs."
        primaryLink={{ text: "Get Free Quote", href: "/contact" }}
        secondaryLink={{ text: "Call (412) 385-3877", href: "tel:4123853877" }}
        bgClass="bg-accent"
      />

      <Footer />
    </div>
  );
};

export default Events;