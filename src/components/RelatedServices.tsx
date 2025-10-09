import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";

interface RelatedService {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

interface RelatedServicesProps {
  services: RelatedService[];
  title?: string;
}

export function RelatedServices({ services, title = "Related Services" }: RelatedServicesProps) {
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore more of our premium transportation services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-border shadow-card-custom hover:shadow-party transition-all duration-300 group text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-hero-gradient rounded-full w-fit group-hover:scale-110 transition-transform">
                  <service.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
                
                <Button variant="outline" className="w-full bg-background/50 border-2 group-hover:bg-primary group-hover:text-primary-foreground" asChild>
                  <Link to={service.href}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Get a Free Quote for Any Service
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
