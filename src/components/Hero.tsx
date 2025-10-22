import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Users, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-party-bus.jpg";
const Hero = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mathQuestion, setMathQuestion] = useState({ num1: 0, num2: 0, answer: 0 });

  useEffect(() => {
    generateMathQuestion();
  }, []);

  const generateMathQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setMathQuestion({ num1, num2, answer: num1 + num2 });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const userAnswer = parseInt(formData.get('mathAnswer') as string);
    
    if (userAnswer !== mathQuestion.answer) {
      toast({
        title: "Verification Failed",
        description: "Please solve the math problem correctly to submit the form.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      dateOfRide: formData.get('dateOfRide') as string,
      pickupCity: formData.get('pickupCity') as string,
      dropoffCity: formData.get('dropoffCity') as string,
      partySize: formData.get('partySize') as string,
      pickupTime: formData.get('pickupTime') as string,
      dropoffTime: formData.get('dropoffTime') as string,
      source: 'homepage' as const
    };
    try {
      const response = await fetch('https://formspree.io/f/mkgqvajy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        toast({
          title: "Quote Request Sent!",
          description: "We'll get back to you within 2 hours during business hours."
        });
        (e.target as HTMLFormElement).reset();
        generateMathQuestion();
      } else {
        throw new Error('Failed to submit quote request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again or call us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero section">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <img src={heroImage} alt="Luxury party bus exterior in Pittsburgh" className="w-full h-full object-cover" width="1920" height="1080" />
        <div className="absolute inset-0 bg-luxury-gradient opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
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
                  <p className="text-muted-foreground">Free estimates - Same Day!

                </p>
                </div>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" name="firstName" placeholder="Your first name" className="border-border focus:border-primary" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" name="lastName" placeholder="Your last name" className="border-border focus:border-primary" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="your.email@example.com" className="border-border focus:border-primary" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone #</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="(412) 555-0123" className="border-border focus:border-primary" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Date Of Ride</Label>
                    <Input id="date" name="dateOfRide" type="date" className="border-border focus:border-primary" required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickup-city">Pickup City w/ Zip</Label>
                       <Input id="pickup-city" name="pickupCity" placeholder="Pittsburgh, PA 15219" className="border-border focus:border-primary" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dropoff-city">Drop-off City W/ Zip</Label>
                       <Input id="dropoff-city" name="dropoffCity" placeholder="Pittsburgh, PA 15219" className="border-border focus:border-primary" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="party-size"># in Party</Label>
                     <Input id="party-size" name="partySize" type="number" placeholder="18" min="1" max="50" className="border-border focus:border-primary" required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickup-time">Pick Up Time</Label>
                       <Select name="pickupTime">
                        <SelectTrigger className="border-border focus:border-primary">
                          <SelectValue placeholder="- Select -" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10am">10 AM</SelectItem>
                          <SelectItem value="11am">11 AM</SelectItem>
                          <SelectItem value="12pm">12 PM</SelectItem>
                          <SelectItem value="1pm">1 PM</SelectItem>
                          <SelectItem value="2pm">2 PM</SelectItem>
                          <SelectItem value="3pm">3 PM</SelectItem>
                          <SelectItem value="4pm">4 PM</SelectItem>
                          <SelectItem value="5pm">5 PM</SelectItem>
                          <SelectItem value="6pm">6 PM</SelectItem>
                          <SelectItem value="7pm">7 PM</SelectItem>
                          <SelectItem value="8pm">8 PM</SelectItem>
                          <SelectItem value="9pm">9 PM</SelectItem>
                          <SelectItem value="10pm">10 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dropoff-time">Drop Off Time</Label>
                      <Select name="dropoffTime">
                        <SelectTrigger className="border-border focus:border-primary">
                          <SelectValue placeholder="- Select -" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12pm">12 PM</SelectItem>
                          <SelectItem value="1pm">1 PM</SelectItem>
                          <SelectItem value="2pm">2 PM</SelectItem>
                          <SelectItem value="3pm">3 PM</SelectItem>
                          <SelectItem value="4pm">4 PM</SelectItem>
                          <SelectItem value="5pm">5 PM</SelectItem>
                          <SelectItem value="6pm">6 PM</SelectItem>
                          <SelectItem value="7pm">7 PM</SelectItem>
                          <SelectItem value="8pm">8 PM</SelectItem>
                          <SelectItem value="9pm">9 PM</SelectItem>
                          <SelectItem value="10pm">10 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="math-answer">Security Check: What is {mathQuestion.num1} + {mathQuestion.num2}?</Label>
                    <Input 
                      id="math-answer" 
                      name="mathAnswer" 
                      type="number" 
                      placeholder="Enter answer" 
                      className="border-border focus:border-primary" 
                      required 
                    />
                  </div>
                   
                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Get Quote"}
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
    </section>;
};
export default Hero;