import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface InternalLinkCTAProps {
  title: string;
  description: string;
  primaryLink: {
    text: string;
    href: string;
  };
  secondaryLink?: {
    text: string;
    href: string;
  };
  bgClass?: string;
}

export function InternalLinkCTA({
  title,
  description,
  primaryLink,
  secondaryLink,
  bgClass = "bg-hero-gradient"
}: InternalLinkCTAProps) {
  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          {title}
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="accent" size="xl" className="shadow-glow" asChild>
            <Link to={primaryLink.href}>
              {primaryLink.text}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          {secondaryLink && (
            <Button 
              variant="outline" 
              size="xl" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground"
              asChild
            >
              <Link to={secondaryLink.href}>
                {secondaryLink.text}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
