import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star,
  Quote,
  Heart,
  Users,
  GraduationCap,
  Briefcase,
  Calendar,
  Camera,
  MessageSquare,
  Trophy,
  CheckCircle
} from "lucide-react";

const Testimonials = () => {
  const featuredTestimonial = {
    name: "Jennifer & Michael Thompson",
    event: "Wedding Reception",
    date: "September 2023",
    rating: 5,
    image: "/placeholder.svg",
    text: "Pitt Party Bus made our wedding day absolutely magical! From the moment we first contacted them to the end of our reception, everything was flawless. Our coordinator Sarah went above and beyond to ensure our timeline was perfect. The party bus was pristine, the driver Mark was professional and courteous, and our bridal party had such a blast! Our guests are still talking about how amazing the transportation was. We can't recommend them highly enough - they truly made our special day even more special!",
    location: "Shadyside to Heinz Chapel",
    highlights: ["Professional coordination", "Pristine vehicle", "Outstanding driver", "Perfect timing"]
  };

  const testimonials = [
    {
      name: "Sarah Martinez",
      event: "Sweet 16 Birthday",
      date: "August 2023",
      rating: 5,
      image: "/placeholder.svg",
      text: "My daughter's Sweet 16 was absolutely perfect thanks to Pitt Party Bus! The party bus was decorated beautifully, and Sarah felt like a celebrity. The driver was so patient with all the teenagers and made sure everyone had a great time safely.",
      location: "South Hills",
      category: "birthday"
    },
    {
      name: "Tech Solutions Pittsburgh",
      event: "Corporate Retreat",
      date: "October 2023",
      rating: 5,
      image: "/placeholder.svg",
      text: "Outstanding service for our annual corporate retreat. The executive party bus was perfect for our team of 22. Professional, punctual, and helped make our event a huge success. Already planning to book again next year!",
      location: "Downtown to Nemacolin",
      category: "corporate"
    },
    {
      name: "Mike Rodriguez & the Crew",
      event: "Bachelor Party",
      date: "July 2023",
      rating: 5,
      image: "/placeholder.svg",
      text: "Epic bachelor party weekend! The party bus was exactly what we needed for hitting multiple spots in the Strip District and South Side. Driver knew all the best routes and timing. Made the whole night stress-free and unforgettable!",
      location: "Multiple Pittsburgh venues",
      category: "bachelor"
    },
    {
      name: "Pine-Richland High School",
      event: "Prom Night 2023",
      date: "May 2023",
      rating: 5,
      image: "/placeholder.svg",
      text: "Amazing prom transportation! Our group of 16 felt so special in the luxury party bus. Parents loved the safety aspect, and we loved the fun atmosphere. Perfect photos and memories that will last forever!",
      location: "Cranberry to Heinz History Center",
      category: "prom"
    },
    {
      name: "Amanda Chen",
      event: "Bachelorette Party",
      date: "June 2023",
      rating: 5,
      image: "/placeholder.svg",
      text: "The best bachelorette party ever! Pitt Party Bus coordinated our entire day from brunch in Lawrenceville to dinner in Shadyside. The party bus kept the energy high between stops, and our driver was fantastic!",
      location: "Multiple neighborhoods",
      category: "bachelorette"
    },
    {
      name: "David & Lisa Wedding",
      event: "Wedding Transportation",
      date: "September 2023",
      rating: 5,
      image: "/placeholder.svg",
      text: "Seamless wedding day coordination! They handled transportation for our entire wedding party from the hotel to the ceremony to the reception. Everything ran perfectly on schedule. Highly recommend!",
      location: "Oakland to North Hills",
      category: "wedding"
    },
    {
      name: "Robert Stevens",
      event: "50th Birthday Celebration",
      date: "November 2023",
      rating: 5,
      image: "/placeholder.svg",
      text: "Celebrated my 50th in style! The luxury party bus was perfect for our group of friends. Great sound system, comfortable seating, and the driver made sure everyone had a blast. Worth every penny!",
      location: "Downtown Pittsburgh",
      category: "birthday"
    },
    {
      name: "Steelers Fan Club",
      event: "Game Day Transportation",
      date: "December 2023",
      rating: 5,
      image: "/placeholder.svg",
      text: "No more parking hassles! The party bus gets our group to every Steelers home game. Pre-game tailgating on the bus is always a blast, and we never have to worry about designated drivers. Go Steelers!",
      location: "North Hills to Heinz Field",
      category: "sports"
    },
    {
      name: "Carnegie Mellon Alumni",
      event: "Reunion Weekend",
      date: "October 2023",
      rating: 5,
      image: "/placeholder.svg",
      text: "Perfect for our college reunion! The party bus took us to all our favorite old spots in Oakland and the South Side. Brought back so many memories and created new ones. Professional service all around!",
      location: "Oakland area",
      category: "reunion"
    }
  ];

  const stats = [
    { number: "500+", label: "5-Star Reviews", icon: Star },
    { number: "98%", label: "Customer Satisfaction", icon: Trophy },
    { number: "1000+", label: "Events Completed", icon: Calendar },
    { number: "24/7", label: "Customer Support", icon: MessageSquare }
  ];

  const categories = [
    { name: "Weddings", count: 150, icon: Heart, color: "bg-rose-100 text-rose-600" },
    { name: "Proms", count: 89, icon: GraduationCap, color: "bg-blue-100 text-blue-600" },
    { name: "Bachelor/Bachelorette", count: 123, icon: Users, color: "bg-purple-100 text-purple-600" },
    { name: "Corporate Events", count: 67, icon: Briefcase, color: "bg-green-100 text-green-600" },
    { name: "Birthday Parties", count: 94, icon: Camera, color: "bg-yellow-100 text-yellow-600" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Customer Reviews & Testimonials
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            Don't just take our word for it - see what Pittsburgh customers say about 
            their amazing party bus and limousine experiences with us.
          </p>
          
          <div className="flex items-center justify-center space-x-6 text-primary-foreground">
            <div className="flex text-accent-glow">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 fill-current" />
              ))}
            </div>
            <div className="text-2xl font-bold">4.9/5</div>
            <div className="text-lg">500+ Reviews</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-border shadow-card-custom">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 p-3 bg-hero-gradient rounded-full w-fit">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-accent mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-accent text-accent-foreground font-semibold mb-4">Featured Review</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Customer Spotlight
            </h2>
          </div>

          <Card className="border-border shadow-luxury overflow-hidden max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <img 
                  src={featuredTestimonial.image} 
                  alt={featuredTestimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{featuredTestimonial.name}</h3>
                  <p className="text-muted-foreground">{featuredTestimonial.event} • {featuredTestimonial.date}</p>
                  <div className="flex text-accent mt-1">
                    {[...Array(featuredTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <Quote className="h-12 w-12 text-accent/20" />
              </div>
              
              <blockquote className="text-lg leading-relaxed text-muted-foreground mb-6 italic">
                "{featuredTestimonial.text}"
              </blockquote>
              
              <div className="border-t border-border pt-6">
                <div className="flex flex-wrap items-center justify-between">
                  <div className="text-sm text-muted-foreground mb-4 md:mb-0">
                    <CheckCircle className="inline h-4 w-4 mr-1 text-accent" />
                    Route: {featuredTestimonial.location}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {featuredTestimonial.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reviews by Category */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Reviews by Event Type
            </h2>
            <p className="text-xl text-muted-foreground">
              See how we've made different types of events unforgettable
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 mb-16">
            {categories.map((category, index) => (
              <Card key={index} className="text-center border-border shadow-card-custom hover:shadow-party transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className={`mx-auto mb-4 p-3 rounded-full w-fit ${category.color}`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} reviews</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real experiences from real Pittsburgh customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border shadow-card-custom hover:shadow-party transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle className="text-base">{testimonial.name}</CardTitle>
                        <CardDescription className="text-sm">{testimonial.event}</CardDescription>
                      </div>
                    </div>
                    <div className="flex text-accent">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs">
                    {testimonial.date}
                  </Badge>
                </CardHeader>
                
                <CardContent>
                  <blockquote className="text-muted-foreground italic text-sm leading-relaxed mb-3">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1 text-accent" />
                    {testimonial.location}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leave a Review CTA */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Share Your Experience
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Had an amazing experience with Pitt Party Bus? We'd love to hear about it! 
            Your feedback helps us serve Pittsburgh even better.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="luxury" size="xl">
              <Star className="mr-2 h-5 w-5" />
              Leave a Review
            </Button>
            <Button variant="secondary" size="xl">
              <MessageSquare className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
          </div>
          
          <div className="mt-8 opacity-90">
            <p className="text-sm">Reviews help other Pittsburgh families choose the best transportation</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;