import { Helmet } from 'react-helmet';

interface StructuredDataProps {
  data: object;
}

export function StructuredData({ data }: StructuredDataProps) {
  // Use Helmet for SSR-compatible structured data
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
}

// Predefined structured data templates
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Pitt Party Bus",
  "alternateName": "Pittsburgh Party Bus",
  "description": "Premium party bus and limousine rentals in Pittsburgh, PA. Luxury transportation for weddings, proms, corporate events, and special occasions.",
  "url": "https://pittpartybus.com",
  "logo": "https://pittpartybus.com/logo.png",
  "image": "https://pittpartybus.com/hero-party-bus.jpg",
  "telephone": "+14123853877",
  "email": "info@pittpartybus.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "",
    "addressLocality": "Pittsburgh",
    "addressRegion": "PA",
    "postalCode": "15222",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.4406",
    "longitude": "-79.9959"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "priceRange": "$100-$175",
  "areaServed": [
    {
      "@type": "City",
      "name": "Pittsburgh",
      "containedInPlace": {
        "@type": "State",
        "name": "Pennsylvania"
      }
    },
    {
      "@type": "City",
      "name": "Allegheny County"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Party Bus and Limousine Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Party Bus Rental",
          "description": "Luxury party buses for groups of 8-40 passengers"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Wedding Transportation",
          "description": "Elegant transportation for weddings and special occasions"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Corporate Event Transportation",
          "description": "Professional group transportation for corporate events"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Prom & Graduation Transportation",
          "description": "Safe, reliable transportation for students"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "500",
    "bestRating": "5",
    "worstRating": "1"
  },
  "paymentAccepted": "Cash, Credit Card, Debit Card",
  "currenciesAccepted": "USD",
  "sameAs": [
    "https://www.facebook.com/pittpartybus",
    "https://www.instagram.com/pittpartybus"
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
