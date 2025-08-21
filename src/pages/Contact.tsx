import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  Calendar,
  Users
} from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      value: "(412) 385-3877",
      description: "Available 24/7 for immediate assistance",
      action: "tel:412-385-3877"
    },
    {
      icon: Mail,
      title: "Email Us", 
      value: "Pittpartybus412@gmail.com",
      description: "We respond within 2 hours during business hours",
      action: "mailto:Pittpartybus412@gmail.com"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "2101 Centre Ave, Pittsburgh, PA 15219",
      description: "Our central Pittsburgh location",
      action: "#"
    }
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 8:00 PM" },
    { day: "Saturday", hours: "8:00 AM - 10:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 6:00 PM" },
    { day: "Emergency/After Hours", hours: "24/7 Available" }
  ];

  const faqs = [
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking 2-4 weeks in advance, especially for peak seasons like prom and wedding season."
    },
    {
      question: "Do you provide transportation outside Pittsburgh?",
      answer: "Yes! We serve all of Pittsburgh and surrounding areas. Long-distance trips may have additional fuel charges."
    },
    {
      question: "What's included in the rental price?",
      answer: "Professional chauffeur, fuel, insurance, basic amenities (ice, cups, napkins), and red carpet service."
    },
    {
      question: "Can we bring our own alcohol?",
      answer: "Yes, you can bring your own beverages. We provide ice, cups, and cooler space. Must be 21+ to consume alcohol."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Contact Pitt Party Bus
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            Ready to book your luxury transportation? Have questions about our services? 
            We're here to help make your event planning easy and stress-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="xl" className="shadow-glow">
              <Phone className="mr-2 h-5 w-5" />
              Call (412) 385-3877
            </Button>
            <Button variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
              <MessageSquare className="mr-2 h-5 w-5" />
              Send Message
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground">
              Multiple ways to reach us - choose what's most convenient for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center border-border shadow-card-custom hover:shadow-party transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-hero-gradient rounded-full w-fit">
                    <method.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{method.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-lg font-semibold text-accent">{method.value}</div>
                  <CardDescription className="text-base">{method.description}</CardDescription>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => method.action.startsWith('tel:') || method.action.startsWith('mailto:') ? window.location.href = method.action : null}
                  >
                    Contact Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-border shadow-luxury">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form and we'll get back to you within 2 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="Your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Your last name" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="(412) 555-0123" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Event Date</Label>
                    <Input id="event-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passengers">Group Size</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Number of passengers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8-12">8-12 passengers</SelectItem>
                        <SelectItem value="13-20">13-20 passengers</SelectItem>
                        <SelectItem value="21-30">21-30 passengers</SelectItem>
                        <SelectItem value="31-40">31-40 passengers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="prom">Prom</SelectItem>
                      <SelectItem value="bachelor">Bachelor/Bachelorette Party</SelectItem>
                      <SelectItem value="birthday">Birthday Party</SelectItem>
                      <SelectItem value="corporate">Corporate Event</SelectItem>
                      <SelectItem value="concert">Concert/Sports Event</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your event, pickup/drop-off locations, and any special requests..."
                    rows={4}
                  />
                </div>
                
                <Button variant="hero" size="lg" className="w-full">
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  We'll respond within 2 hours during business hours. For immediate assistance, please call.
                </p>
              </CardContent>
            </Card>

            {/* Business Info */}
            <div className="space-y-8">
              {/* Hours */}
              <Card className="border-border shadow-card-custom">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-accent" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {businessHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                        <span className="font-medium">{schedule.day}</span>
                        <span className="text-muted-foreground">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                    <p className="text-sm font-medium text-accent">
                      Emergency & After-Hours: We're available 24/7 for urgent bookings and support!
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick FAQs */}
              <Card className="border-border shadow-card-custom">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold text-foreground">{faq.question}</h4>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      {index < faqs.length - 1 && <hr className="border-border" />}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View All FAQs
                  </Button>
                </CardContent>
              </Card>

              {/* Location Map Placeholder */}
              <Card className="border-border shadow-card-custom">
                <CardHeader>
                  <CardTitle>Our Location</CardTitle>
                  <CardDescription>
                    2101 Centre Ave, Pittsburgh, PA 15219
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                      <p className="text-muted-foreground text-sm">
                        Google Maps integration showing our central Pittsburgh location
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Get Directions
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Call Location
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Promise */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Service Promise
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: CheckCircle,
                title: "Fast Response",
                description: "2-hour response time during business hours"
              },
              {
                icon: Users,
                title: "Personal Service",
                description: "Dedicated event coordinators for your booking"
              },
              {
                icon: Phone,
                title: "24/7 Support",
                description: "Always available for emergencies and urgent needs"
              },
              {
                icon: Calendar,
                title: "Flexible Booking",
                description: "Easy rescheduling and modification policies"
              }
            ].map((promise, index) => (
              <Card key={index} className="text-center border-border shadow-card-custom">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 p-3 bg-hero-gradient rounded-full w-fit">
                    <promise.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{promise.title}</h3>
                  <p className="text-sm text-muted-foreground">{promise.description}</p>
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
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Don't wait - our calendar fills up fast, especially during peak season. 
            Contact us today to secure your date!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="luxury" size="xl">
              <Phone className="mr-2 h-5 w-5" />
              Call (412) 385-3877
            </Button>
            <Button variant="secondary" size="xl">
              <MessageSquare className="mr-2 h-5 w-5" />
              Send Quick Message
            </Button>
          </div>
          
          <div className="mt-8 opacity-90">
            <p className="text-sm">Available 24/7 • Free quotes • Same-day response</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;