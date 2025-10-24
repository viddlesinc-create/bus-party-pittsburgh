import { MetaTags } from "@/components/MetaTags";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertCircle, Scale, ShieldCheck, Ban, DollarSign, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <MetaTags 
        title="Terms of Service"
        description="Pitt Party Bus terms of service. Review our rental terms, policies, and conditions for party bus and limousine services in Pittsburgh."
        canonical="/terms"
      />
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Terms of Service", url: "/terms" }]} />
      </div>
      
      {/* Hero Section */}
      <section className="py-12 bg-hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FileText className="h-16 w-16 text-primary-foreground mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-primary-foreground/90">
            Last updated: January 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-border shadow-card-custom mb-8">
            <CardHeader>
              <div className="flex items-center">
                <Scale className="h-6 w-6 text-accent mr-3" />
                <CardTitle>Agreement to Terms</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-muted-foreground">
                By booking and using Pitt Party Bus services, you agree to be bound by these Terms of Service. Please read these terms carefully before making a reservation. If you do not agree to these terms, please do not use our services.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <div className="flex items-center">
                  <DollarSign className="h-6 w-6 text-accent mr-3" />
                  <CardTitle>Booking and Payment Terms</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Reservations</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All reservations must be made by <Link to="/contact" className="text-accent hover:underline">phone or through our website</Link></li>
                    <li>A 25% non-refundable deposit is required to secure your booking</li>
                    <li>The remaining balance is due on the day of service before departure</li>
                    <li>We accept cash, credit cards, and PayPal</li>
                    <li>All <Link to="/pricing" className="text-accent hover:underline">prices</Link> are subject to change until deposit is received</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Minimum Rental Times</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Standard bookings have a 3-4 hour minimum rental period</li>
                    <li>Peak season events (prom, weddings) may have extended minimums</li>
                    <li>Holiday events (New Year's Eve) require 5-6 hour minimums</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Additional Charges</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Gratuity: 18-20% gratuity is customary and appreciated</li>
                    <li>Extra stops: $15 per stop beyond the first 3 stops</li>
                    <li>Waiting time: $50/hour if vehicle waits beyond 15 minutes</li>
                    <li>Fuel surcharge: May apply for trips exceeding 50 miles</li>
                    <li>Cleaning fee: $100-300 for excessive mess or damage</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <div className="flex items-center">
                  <AlertCircle className="h-6 w-6 text-accent mr-3" />
                  <CardTitle>Cancellation and Refund Policy</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Cancellations by Customer</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Cancellations 30+ days before event: Full refund minus $50 processing fee</li>
                    <li>Cancellations 15-29 days before event: 50% refund of deposit</li>
                    <li>Cancellations 7-14 days before event: 25% refund of deposit</li>
                    <li>Cancellations within 7 days: No refund</li>
                  </ul>
                  <p className="mt-3">For questions about cancellations, please <Link to="/contact" className="text-accent hover:underline">contact us</Link>.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Modifications</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Changes to date, time, or <Link to="/fleet" className="text-accent hover:underline">vehicle</Link> can be made up to 48 hours before event at no charge</li>
                    <li>Changes within 48 hours subject to availability and may incur fees</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Cancellations by Company</h3>
                  <p>In rare cases where we must cancel (mechanical failure, severe weather), we will:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Provide a comparable replacement vehicle when possible</li>
                    <li>Offer a full refund if no replacement is available</li>
                    <li>Not be liable for any indirect or consequential damages</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <div className="flex items-center">
                  <Ban className="h-6 w-6 text-accent mr-3" />
                  <CardTitle>Prohibited Activities and Conduct</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>The following activities are strictly prohibited:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Smoking:</strong> Smoking of any kind (cigarettes, cigars, vaping) inside the vehicle ($300 fine)</li>
                  <li><strong>Illegal substances:</strong> Use or possession of illegal drugs will result in immediate service termination</li>
                  <li><strong>Underage drinking:</strong> We check IDs. No alcohol for anyone under 21</li>
                  <li><strong>Excessive intoxication:</strong> Driver reserves right to refuse service for safety</li>
                  <li><strong>Property damage:</strong> Customer is liable for any damage to vehicle</li>
                  <li><strong>Standing through sunroof:</strong> For safety, this is not permitted while vehicle is in motion</li>
                  <li><strong>Disrespecting driver:</strong> Verbal or physical abuse will not be tolerated</li>
                  <li><strong>Exceeding capacity:</strong> Vehicles may not exceed posted passenger limits</li>
                </ul>
                <p className="mt-4 font-semibold text-foreground">
                  Violation of these rules may result in immediate service termination without refund.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <div className="flex items-center">
                  <ShieldCheck className="h-6 w-6 text-accent mr-3" />
                  <CardTitle>Safety and Liability</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Insurance and Licensing</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All vehicles are fully insured with $2M liability coverage</li>
                    <li>All drivers hold valid commercial driver's licenses (CDL)</li>
                    <li>All vehicles undergo regular DOT safety inspections</li>
                    <li>Background checks and drug testing for all drivers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Customer Responsibility</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Customer is responsible for behavior of all passengers</li>
                    <li>Customer liable for any damage beyond normal wear and tear</li>
                    <li>Customer must ensure all passengers follow rules and driver instructions</li>
                    <li>Customer assumes risk for personal belongings left in vehicle</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Limitation of Liability</h3>
                  <p>
                    Pitt Party Bus liability is limited to direct damages not exceeding the rental fee. We are not liable for indirect, incidental, or consequential damages including missed events, travel delays, or emotional distress.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <CardTitle>Service Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Pickup and Schedule</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Please be ready 15 minutes before scheduled pickup time</li>
                    <li>Vehicle will wait up to 15 minutes before late charges apply</li>
                    <li>Traffic delays beyond our control do not entitle customer to refund</li>
                    <li>Multiple stops may affect overall timeline</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Service Area</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>We primarily serve <Link to="/locations" className="text-accent hover:underline">Pittsburgh and surrounding Allegheny County areas</Link></li>
                    <li>Out-of-area trips may require fuel surcharges and extended minimum hours</li>
                    <li>Long-distance trips must be discussed and approved in advance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Weather Policy</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>We operate in most weather conditions</li>
                    <li>Severe weather (blizzards, ice storms) may result in cancellation for safety</li>
                    <li>Weather-related cancellations by company result in full refund</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <CardTitle>Alcohol Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Passengers 21+ may bring their own alcoholic beverages (BYOB)</li>
                  <li>We do not provide or sell alcohol</li>
                  <li>Valid ID required for all passengers consuming alcohol</li>
                  <li>Driver has final say on passenger intoxication levels</li>
                  <li>Glass bottles should be avoided; cans and plastic bottles preferred</li>
                  <li>We provide ice, cups, and cooler space</li>
                  <li>Customer responsible for cleaning up spills</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <CardTitle>Dispute Resolution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Any disputes arising from these terms or your use of our services will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association in Pittsburgh, Pennsylvania. You waive your right to participate in class action lawsuits.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <CardTitle>Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Continued use of our services after changes constitutes acceptance of the new terms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-4">
                  If you have questions about these Terms of Service, please <Link to="/contact" className="text-accent hover:underline">contact us</Link>:
                </p>
                <div className="space-y-2">
                  <p><strong>Pitt Party Bus</strong></p>
                  <p>2101 Centre Ave, Pittsburgh, PA 15219</p>
                  <p>Phone: <a href="tel:4123853877" className="text-accent hover:underline">(412) 385-3877</a></p>
                  <p>Email: <a href="mailto:Pittpartybus412@gmail.com" className="text-accent hover:underline">Pittpartybus412@gmail.com</a></p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card-custom bg-muted/50">
              <CardHeader>
                <div className="flex items-center">
                  <ExternalLink className="h-6 w-6 text-accent mr-3" />
                  <CardTitle>Helpful Resources</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Find more information about our services:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Link to="/fleet" className="text-accent hover:underline flex items-center">
                    → Browse Our Fleet
                  </Link>
                  <Link to="/pricing" className="text-accent hover:underline flex items-center">
                    → View Pricing & Packages
                  </Link>
                  <Link to="/events" className="text-accent hover:underline flex items-center">
                    → Event Types We Serve
                  </Link>
                  <Link to="/locations" className="text-accent hover:underline flex items-center">
                    → Service Areas
                  </Link>
                  <Link to="/contact" className="text-accent hover:underline flex items-center">
                    → Get in Touch
                  </Link>
                  <Link to="/privacy" className="text-accent hover:underline flex items-center">
                    → Privacy Policy
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
