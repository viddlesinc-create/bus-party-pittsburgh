import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  HelpCircle,
  Phone,
  Search,
  MessageSquare,
  Clock,
  DollarSign,
  Users,
  Car,
  Shield,
  Calendar
} from "lucide-react";

const FAQs = () => {
  const faqCategories = [
    {
      title: "Booking & Reservations",
      icon: Calendar,
      faqs: [
        {
          question: "How far in advance should I book my party bus?",
          answer: "We recommend booking 2-4 weeks in advance for regular events. For peak times like prom season (April-June), wedding season (May-October), and New Year's Eve, book 6-8 weeks ahead. However, we often have same-day availability for last-minute events."
        },
        {
          question: "Do you require a deposit to secure my booking?",
          answer: "Yes, we require a 25% deposit to secure your reservation. The remaining balance is due on the day of service. We accept cash, credit cards, and PayPal for your convenience."
        },
        {
          question: "Can I modify or cancel my reservation?",
          answer: "Modifications can be made up to 48 hours before your event at no charge. Cancellations made 7+ days in advance receive a full refund minus a $50 processing fee. Cancellations within 7 days forfeit the deposit."
        },
        {
          question: "What if I need to extend my rental time?",
          answer: "Extensions can often be accommodated if the vehicle isn't needed for another booking. We charge our standard hourly rate for extensions. Let your driver know as early as possible during your event."
        }
      ]
    },
    {
      title: "Pricing & Payment",
      icon: DollarSign,
      faqs: [
        {
          question: "How much does a party bus rental cost in Pittsburgh?",
          answer: "Pricing varies by vehicle size, day of week, and duration. Mini buses (8-12 passengers) start at $75/hour, while our largest party buses (35-40 passengers) start at $150/hour. All rentals have a 3-4 hour minimum. Contact us for exact pricing for your event."
        },
        {
          question: "What's included in the rental price?",
          answer: "Every rental includes: professional chauffeur, fuel and tolls, insurance coverage, basic amenities (ice, cups, napkins), red carpet service, and complimentary water. Additional services like decorations or extra stops may incur extra charges."
        },
        {
          question: "Are there any hidden fees I should know about?",
          answer: "No hidden fees! We're completely transparent about pricing. The only additional charges might be: gratuity (18-20% suggested), extra stops beyond 3 ($15 each), waiting time beyond 15 minutes ($50/hour), and any damage or excessive cleaning ($100-300)."
        },
        {
          question: "Do you offer any discounts?",
          answer: "Yes! We offer discounts for: weekday bookings (Monday-Thursday), off-season events, military personnel, and repeat customers. Ask about our student discounts for prom and graduation events."
        }
      ]
    },
    {
      title: "Vehicle Information",
      icon: Car,
      faqs: [
        {
          question: "What types of vehicles do you have?",
          answer: "Our fleet includes: Mini party buses (8-12), Party vans (13-15), Executive party buses (20-25), Luxury party buses (35-40), Stretch limousines (up to 10), and SUV limos (up to 20). Each vehicle is equipped with premium amenities and regularly maintained."
        },
        {
          question: "What amenities are included in your party buses?",
          answer: "Standard amenities include: premium leather seating, LED lighting systems, high-quality sound systems with Bluetooth, climate control, tinted windows, bar areas with ice and cups, and charging stations. Larger buses also feature dance floors and premium entertainment systems."
        },
        {
          question: "Can I see the vehicle before booking?",
          answer: "Absolutely! We encourage customers to visit our facility to inspect vehicles. Call ahead to schedule a viewing. We can also provide additional photos and video tours of specific vehicles upon request."
        },
        {
          question: "How do you maintain your vehicles?",
          answer: "All vehicles undergo regular DOT inspections, routine maintenance every 3,000 miles, deep cleaning after each use, and comprehensive safety checks before every trip. Our vehicles are fully licensed, insured, and DOT certified."
        }
      ]
    },
    {
      title: "Safety & Policies",
      icon: Shield,
      faqs: [
        {
          question: "Are your drivers licensed and insured?",
          answer: "Yes! All our chauffeurs have commercial driver's licenses (CDL), undergo background checks, regular drug testing, and defensive driving training. Our company carries comprehensive insurance including $2M liability coverage."
        },
        {
          question: "Can we bring our own alcohol?",
          answer: "Yes, passengers 21+ may bring their own alcoholic beverages. We provide ice, cups, and cooler space. We do not supply alcohol. The chauffeur will check IDs and has the right to refuse service to intoxicated passengers for safety reasons."
        },
        {
          question: "What's your policy on smoking?",
          answer: "Smoking is strictly prohibited inside all vehicles. This includes cigarettes, cigars, e-cigarettes, and vaping devices. Violations result in a $300 cleaning fee. We can make stops for smoking breaks upon request."
        },
        {
          question: "What happens if there's bad weather?",
          answer: "We operate in most weather conditions with appropriate safety measures. In severe weather (blizzards, ice storms), we may need to cancel for safety. If we cancel due to weather, you receive a full refund or can reschedule at no charge."
        }
      ]
    },
    {
      title: "Service Areas",
      icon: Users,
      faqs: [
        {
          question: "Where do you provide service?",
          answer: "We serve all of Pittsburgh and surrounding areas including: Downtown, Oakland, Shadyside, Lawrenceville, South Side, North Hills, South Hills, East End, West End, and most of Allegheny County. We also provide service to Pittsburgh International Airport."
        },
        {
          question: "Do you travel outside of Pittsburgh?",
          answer: "Yes! We provide transportation throughout Western Pennsylvania and can arrange trips to other states. Long-distance trips (50+ miles from Pittsburgh) may include fuel surcharges and have different minimum hour requirements."
        },
        {
          question: "How long does it take for pickup?",
          answer: "Within Pittsburgh city limits: 10-20 minutes. Suburban areas: 20-35 minutes. Airport: 25-40 minutes. We always arrive 10-15 minutes early and will contact you when we're en route."
        },
        {
          question: "Can you accommodate multiple stops?",
          answer: "Absolutely! Up to 3 stops are included in your rental. Additional stops are $15 each. We can coordinate complex itineraries including restaurant reservations, venue timing, and photo locations."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            Find answers to common questions about party bus rentals in Pittsburgh. 
            Can't find what you're looking for? Give us a call!
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search for answers..." 
                className="pl-12 pr-4 py-3 text-lg bg-background/90 border-border"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="xl" className="shadow-glow">
              <Phone className="mr-2 h-5 w-5" />
              Call (412) 385-3877
            </Button>
            <Button variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
              <MessageSquare className="mr-2 h-5 w-5" />
              Ask a Question
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Know
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive answers organized by topic for easy browsing
            </p>
          </div>

          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center mb-8">
                  <div className="p-3 bg-hero-gradient rounded-full mr-4">
                    <category.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                </div>
                
                <Card className="border-border shadow-card-custom">
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`} className="border-b border-border">
                          <AccordionTrigger className="text-left font-semibold hover:text-primary">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-muted-foreground">
              Our friendly team is here to help you plan the perfect event
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-border shadow-card-custom">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-hero-gradient rounded-full w-fit">
                  <Phone className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle>Call Us</CardTitle>
                <CardDescription>Speak directly with our team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-accent mb-2">(412) 385-3877</div>
                <p className="text-muted-foreground mb-4">Available 24/7 for immediate assistance</p>
                <Button variant="hero" size="sm" className="w-full">
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-border shadow-card-custom">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-hero-gradient rounded-full w-fit">
                  <MessageSquare className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle>Send Message</CardTitle>
                <CardDescription>Get detailed written responses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold text-accent mb-2">2-Hour Response</div>
                <p className="text-muted-foreground mb-4">During business hours</p>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Form
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-border shadow-card-custom">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-hero-gradient rounded-full w-fit">
                  <HelpCircle className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle>Expert Advice</CardTitle>
                <CardDescription>Free event planning consultation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold text-accent mb-2">Free Consultation</div>
                <p className="text-muted-foreground mb-4">Personalized recommendations</p>
                <Button variant="accent" size="sm" className="w-full">
                  Schedule Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Topics
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to our most common inquiries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { topic: "Booking Timeline", answer: "Book 2-4 weeks in advance for best availability" },
              { topic: "Group Size", answer: "We accommodate groups from 8 to 40 passengers" },
              { topic: "Service Area", answer: "All of Pittsburgh and surrounding communities" },
              { topic: "Pricing", answer: "Starting at $75/hour with 3-4 hour minimums" },
              { topic: "Alcohol Policy", answer: "BYOB allowed for passengers 21+ with valid ID" },
              { topic: "Weather Policy", answer: "We operate in most conditions, safety first" },
              { topic: "Payment", answer: "25% deposit required, balance due day of service" },
              { topic: "Cancellation", answer: "Full refund for cancellations 7+ days in advance" }
            ].map((item, index) => (
              <Card key={index} className="border-border shadow-card-custom hover:shadow-party transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-foreground mb-2">{item.topic}</h3>
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
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
            Ready to Book Your Party Bus?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Now that you have all the information, let's get your luxury transportation booked!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="luxury" size="xl">
              <Phone className="mr-2 h-5 w-5" />
              Call (412) 385-3877
            </Button>
            <Button variant="secondary" size="xl">
              <Calendar className="mr-2 h-5 w-5" />
              Get Free Quote
            </Button>
          </div>
          
          <div className="mt-8 opacity-90">
            <p className="text-sm">Available 24/7 • Free estimates • Expert guidance</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQs;