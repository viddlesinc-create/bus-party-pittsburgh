import { useEffect } from 'react';

interface StructuredDataProps {
  data: object;
}

export function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    script.id = 'structured-data';
    
    // Remove existing structured data script if present
    const existing = document.getElementById('structured-data');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [data]);

  return null;
}

// Predefined structured data templates
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Pitt Party Bus",
  "description": "Premium party bus and limousine rentals in Pittsburgh, PA. Luxury transportation for weddings, proms, corporate events, and special occasions.",
  "url": "https://pittpartybus.com",
  "telephone": "+1-412-385-3877",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Pittsburgh",
    "addressRegion": "PA",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.4406",
    "longitude": "-79.9959"
  },
  "priceRange": "$100-$175 per hour",
  "areaServed": {
    "@type": "City",
    "name": "Pittsburgh"
  },
  "serviceType": [
    "Party Bus Rental",
    "Limousine Service",
    "Wedding Transportation",
    "Corporate Transportation",
    "Prom Transportation"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Pitt Party Bus",
  "url": "https://pittpartybus.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://pittpartybus.com/fleet?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://pittpartybus.com${item.url}`
  }))
});

export const articleSchema = (article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "image": article.image,
  "datePublished": article.datePublished,
  "dateModified": article.dateModified || article.datePublished,
  "author": {
    "@type": "Organization",
    "name": article.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "Pitt Party Bus",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pittpartybus.com/logo.png"
    }
  }
});

export const serviceSchema = (service: {
  name: string;
  description: string;
  price: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": service.name,
  "description": service.description,
  "provider": {
    "@type": "LocalBusiness",
    "name": "Pitt Party Bus"
  },
  "areaServed": {
    "@type": "City",
    "name": "Pittsburgh"
  },
  "offers": {
    "@type": "Offer",
    "price": service.price,
    "priceCurrency": "USD"
  }
});
