import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Star
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
      popular: true,
      pricing: "Starting at $125/hour"
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
      ],
      pricing: "Starting at $85/hour"
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
      ],
      pricing: "Starting at $135/hour"
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
      ],
      pricing: "Starting at $115/hour"
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
      ],
      pricing: "Starting at $95/hour"
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
      ],
      pricing: "Starting at $105/hour"
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
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Events We Serve
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            From intimate celebrations to grand occasions, we provide luxury transportation 
            that makes every event special and memorable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="xl" className="shadow-glow">
              <Phone className="mr-2 h-5 w-5" />
              Call (412) 385-3877
            </Button>
            <Button variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
              Get Event Quote
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
            <p className="text-xl text-muted-foreground">
              Whatever you're celebrating, we have the experience and vehicles to make it extraordinary
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
                  <div className="text-lg font-semibold text-accent">{event.pricing}</div>
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
                    <Button variant="hero" className="w-full">
                      Book This Event
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More
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

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make Your Event Unforgettable?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let us handle the transportation while you focus on enjoying your special occasion.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="luxury" size="xl">
              <Phone className="mr-2 h-5 w-5" />
              Call (412) 385-3877
            </Button>
            <Button variant="secondary" size="xl">
              Get Event Quote
            </Button>
          </div>
          
          <div className="mt-8 opacity-90">
            <p className="text-sm">Available 24/7 • Same-day quotes • Expert event planning</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;