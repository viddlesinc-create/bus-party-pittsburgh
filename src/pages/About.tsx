import { MetaTags } from "@/components/MetaTags";
import { StructuredData, organizationSchema, breadcrumbSchema } from "@/components/StructuredData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LastUpdated } from "@/components/LastUpdated";
import { NAPInfo } from "@/components/NAPInfo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BUSINESS_INFO } from "@/lib/business-info";
import { Phone, ShieldCheck, MapPin, Bus, Clock, Users } from "lucide-react";

/**
 * /about
 *
 * This route also recovers a legacy URL: /about/ from the previous WordPress
 * build is still indexed and sits at position 6.5 with ~391 impressions, and
 * has been serving a 404. Netlify serves this page for both /about and /about/.
 *
 * Everything stated here is either verifiable from this repo (the fleet list on
 * /fleet, the service areas in organizationSchema, the NAP in business-info) or
 * marked TODO for the owner. No job counts, crew sizes or awards are invented.
 */
const About = () => {
  // Straight from the vehicle list rendered on /fleet — 13 vehicles spanning
  // 2 to 30 passengers. If that list changes, update this.
  const fleetCount = 13;
  const minCapacity = 2;
  const maxCapacity = 30;

  const serviceAreas = [
    "Downtown Pittsburgh", "Oakland", "South Side", "Shadyside", "Squirrel Hill",
    "Strip District", "Lawrenceville", "North Shore", "North Hills", "South Hills",
    "Cranberry Township", "Wexford", "McCandless", "Mt. Lebanon", "Upper St. Clair",
    "Peters Township", "Bethel Park", "Monroeville", "Moon Township", "Sewickley",
  ];

  return (
    <div className="min-h-screen bg-background">
      <MetaTags
        title="About Pitt Party Bus | Pittsburgh Party Bus Company"
        description="Pitt Party Bus is a party bus and limousine rental company in Pittsburgh, PA. Meet the company, our fleet and service area. Call for a free quote."
        canonical="/about"
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />
      <StructuredData data={organizationSchema} />
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "About", url: "/about" }]} />
      </div>

      <section className="py-16 bg-hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-accent text-accent-foreground mb-4">About Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            About {BUSINESS_INFO.name}
          </h1>
          <p className="text-lg text-primary-foreground/85">
            Pittsburgh&rsquo;s party bus and limousine company &mdash; who we are, what we
            drive, and where we go.
          </p>
        </div>
      </section>

      <main id="main-content">
        <section className="py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <LastUpdated />

            {/* Entity-definition sentence. Keep this as the literal first sentence
                of the page — it is what search engines and AI assistants lift when
                asked "what is Pitt Party Bus". */}
            <p className="text-xl leading-relaxed text-foreground mb-6">
              <strong>{BUSINESS_INFO.name} is a party bus and limousine rental company in
              Pittsburgh, PA, founded in {BUSINESS_INFO.foundingYear}.</strong> We rent
              chauffeured party buses, stretch limousines, luxury shuttles and private
              cars for weddings, proms, bachelor and bachelorette parties, corporate
              events, concerts and Steelers, Penguins and Pirates games, across
              Pittsburgh and the surrounding Allegheny County area.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4">
              Every booking is a chauffeured rental, not a self-drive. You give us the
              pickup, the stops and the timing; we handle the route, the parking and
              the driving, so nobody in your group has to stay sober to be the
              designated driver or fight for parking on Carson Street or the North
              Shore on a game night.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              We quote by the hour, with rates currently running{" "}
              {BUSINESS_INFO.priceRange.replace("/hour", " per hour")} depending on
              vehicle size and date, and a rental minimum that varies by vehicle. There
              are no per-mile surcharges inside our standard service area, and fuel,
              tolls and the chauffeur are included in the hourly rate.
            </p>
          </div>
        </section>

        <section className="py-10 bg-muted/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6">Our fleet</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We operate {fleetCount} vehicles seating {minCapacity} to {maxCapacity}{" "}
              passengers: party buses from 12 up to 30 passengers, Ford mini party buses
              at 12 and 14 passengers, a Denali SUV limo, a Lincoln Town Car, 14- and
              23-passenger luxury shuttles, and Ford Expedition and Lincoln Continental
              private cars. The full list, with photos, capacities and hourly rates, is
              on <Link to="/fleet" className="text-primary underline">our fleet page</Link>.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: Bus, label: `${fleetCount} vehicles in the fleet` },
                { icon: Users, label: `${minCapacity}–${maxCapacity} passengers per vehicle` },
                { icon: Clock, label: BUSINESS_INFO.hours.display },
              ].map(({ icon: Icon, label }) => (
                <Card key={label}>
                  <CardContent className="pt-6 flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="h-7 w-7 text-primary" />
              Safety, licensing and insurance
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Every {BUSINESS_INFO.name} rental is driven by a professional chauffeur.
              Our chauffeurs check IDs before serving any group that intends to bring
              alcohol aboard, and they may decline service to intoxicated passengers.
              Passengers 21 and over may bring their own alcohol; we supply ice, cups
              and cooler space, and we do not sell alcohol.
            </p>
            {/* Do not fill these in without documentation from the owner. Carrier
                name, policy limits and the PA PUC certificate number are all
                publicly checkable claims — a wrong one is worse than none. */}
            <Card className="border-dashed">
              <CardContent className="pt-6 space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Commercial insurance carrier and
                  liability limits:</strong> {"{TODO: owner to supply}"}
                </p>
                <p>
                  <strong className="text-foreground">PA PUC / DOT operating authority
                  number:</strong> {"{TODO: owner to supply}"}
                </p>
                <p>
                  <strong className="text-foreground">Chauffeur licensing and background
                  check policy:</strong> {"{TODO: owner to supply}"}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-10 bg-muted/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="h-7 w-7 text-primary" />
              Where we go
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We serve Pittsburgh and the surrounding Allegheny County area, including:
            </p>
            <ul className="grid sm:grid-cols-3 gap-x-6 gap-y-2 mb-6">
              {serviceAreas.map((area) => (
                <li key={area} className="text-sm text-muted-foreground">
                  {area}
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Dedicated pages cover{" "}
              <Link to="/locations/downtown" className="text-primary underline">Downtown</Link>,{" "}
              <Link to="/locations/oakland" className="text-primary underline">Oakland</Link>,{" "}
              <Link to="/locations/south-side" className="text-primary underline">the South Side</Link>,{" "}
              <Link to="/locations/north-hills" className="text-primary underline">the North Hills</Link>{" "}
              and{" "}
              <Link to="/locations/south-hills" className="text-primary underline">the South Hills</Link>.
              Trips outside the standard area are quoted case by case.
            </p>
          </div>
        </section>

        <section className="py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Get a quote</h2>
            <p className="text-muted-foreground mb-6">
              Tell us the date, the group size and the stops, and we&rsquo;ll price it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Button size="lg" asChild>
                <a href={BUSINESS_INFO.phoneTel}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call {BUSINESS_INFO.phone}
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Request a free quote</Link>
              </Button>
            </div>
            <NAPInfo variant="inline" className="justify-center" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
