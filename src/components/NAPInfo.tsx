import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { BUSINESS_INFO, getFormattedAddress } from "@/lib/business-info";

interface NAPInfoProps {
  variant?: "full" | "compact" | "inline";
  showIcon?: boolean;
  className?: string;
}

export function NAPInfo({ variant = "full", showIcon = true, className = "" }: NAPInfoProps) {
  const iconClass = "h-4 w-4 text-primary flex-shrink-0";
  
  if (variant === "inline") {
    return (
      <div 
        className={`flex flex-wrap items-center gap-4 text-sm ${className}`}
        itemScope 
        itemType="https://schema.org/LocalBusiness"
      >
        <meta itemProp="name" content={BUSINESS_INFO.name} />
        <span 
          className="flex items-center gap-1"
          itemProp="address" 
          itemScope 
          itemType="https://schema.org/PostalAddress"
        >
          {showIcon && <MapPin className={iconClass} />}
          <span itemProp="addressLocality">{BUSINESS_INFO.address.city}</span>,{" "}
          <span itemProp="addressRegion">{BUSINESS_INFO.address.state}</span>{" "}
          <span itemProp="postalCode">{BUSINESS_INFO.address.zip}</span>
        </span>
        <a 
          href={BUSINESS_INFO.phoneTel} 
          className="flex items-center gap-1 hover:text-primary transition-colors"
          itemProp="telephone"
        >
          {showIcon && <Phone className={iconClass} />}
          {BUSINESS_INFO.phone}
        </a>
        <a 
          href={`mailto:${BUSINESS_INFO.email}`} 
          className="flex items-center gap-1 hover:text-primary transition-colors"
          itemProp="email"
        >
          {showIcon && <Mail className={iconClass} />}
          {BUSINESS_INFO.email}
        </a>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div 
        className={`space-y-2 text-sm ${className}`}
        itemScope 
        itemType="https://schema.org/LocalBusiness"
      >
        <meta itemProp="name" content={BUSINESS_INFO.name} />
        <div 
          className="flex items-center gap-2"
          itemProp="address" 
          itemScope 
          itemType="https://schema.org/PostalAddress"
        >
          {showIcon && <MapPin className={iconClass} />}
          <span>
            <span itemProp="addressLocality">{BUSINESS_INFO.address.city}</span>,{" "}
            <span itemProp="addressRegion">{BUSINESS_INFO.address.state}</span>{" "}
            <span itemProp="postalCode">{BUSINESS_INFO.address.zip}</span>
          </span>
        </div>
        <a 
          href={BUSINESS_INFO.phoneTel} 
          className="flex items-center gap-2 hover:text-primary transition-colors"
          itemProp="telephone"
        >
          {showIcon && <Phone className={iconClass} />}
          {BUSINESS_INFO.phone}
        </a>
      </div>
    );
  }

  // Full variant
  return (
    <div 
      className={`space-y-3 ${className}`}
      itemScope 
      itemType="https://schema.org/LocalBusiness"
    >
      <meta itemProp="name" content={BUSINESS_INFO.name} />
      <meta itemProp="description" content={BUSINESS_INFO.description} />
      <meta itemProp="priceRange" content={BUSINESS_INFO.priceRange} />
      <meta itemProp="url" content={BUSINESS_INFO.website} />
      
      <div 
        className="flex items-start gap-3"
        itemProp="address" 
        itemScope 
        itemType="https://schema.org/PostalAddress"
      >
        {showIcon && <MapPin className={`${iconClass} mt-0.5`} />}
        <div>
          <p className="font-medium">Address</p>
          <p className="text-muted-foreground">
            <span itemProp="addressLocality">{BUSINESS_INFO.address.city}</span>,{" "}
            <span itemProp="addressRegion">{BUSINESS_INFO.address.state}</span>{" "}
            <span itemProp="postalCode">{BUSINESS_INFO.address.zip}</span>
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        {showIcon && <Phone className={`${iconClass} mt-0.5`} />}
        <div>
          <p className="font-medium">Phone</p>
          <a 
            href={BUSINESS_INFO.phoneTel} 
            className="text-muted-foreground hover:text-primary transition-colors"
            itemProp="telephone"
          >
            {BUSINESS_INFO.phone}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-3">
        {showIcon && <Mail className={`${iconClass} mt-0.5`} />}
        <div>
          <p className="font-medium">Email</p>
          <a 
            href={`mailto:${BUSINESS_INFO.email}`} 
            className="text-muted-foreground hover:text-primary transition-colors"
            itemProp="email"
          >
            {BUSINESS_INFO.email}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-3">
        {showIcon && <Clock className={`${iconClass} mt-0.5`} />}
        <div>
          <p className="font-medium">Hours</p>
          <p className="text-muted-foreground">{BUSINESS_INFO.hours.display}</p>
        </div>
      </div>

      <div 
        itemProp="geo" 
        itemScope 
        itemType="https://schema.org/GeoCoordinates"
        className="hidden"
      >
        <meta itemProp="latitude" content={String(BUSINESS_INFO.geo.latitude)} />
        <meta itemProp="longitude" content={String(BUSINESS_INFO.geo.longitude)} />
      </div>
    </div>
  );
}

// Simple text-only NAP for footers and small spaces
export function NAPText({ className = "" }: { className?: string }) {
  return (
    <span 
      className={className}
      itemScope 
      itemType="https://schema.org/LocalBusiness"
    >
      <span itemProp="name">{BUSINESS_INFO.name}</span> •{" "}
      <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
        <span itemProp="addressLocality">{BUSINESS_INFO.address.city}</span>,{" "}
        <span itemProp="addressRegion">{BUSINESS_INFO.address.state}</span>
      </span> •{" "}
      <a href={BUSINESS_INFO.phoneTel} itemProp="telephone" className="hover:text-primary">
        {BUSINESS_INFO.phone}
      </a>
    </span>
  );
}