import { Helmet } from 'react-helmet-async';

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
  "@type": ["LocalBusiness", "LimousineBusService"],
  "@id": "https://pittpartybus.com/#organization",
  "name": "Pitt Party Bus",
  "alternateName": ["Pittsburgh Party Bus", "Pitt Party Bus Pittsburgh"],
  "description": "Premium party bus and limousine rentals in Pittsburgh, PA. Luxury transportation for weddings, proms, corporate events, and special occasions. 24/7 availability with professional chauffeurs.",
  "url": "https://pittpartybus.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://pittpartybus.com/logo.png",
    "width": "200",
    "height": "60"
  },
  "image": [
    "https://pittpartybus.com/hero-party-bus.jpg",
    "https://pittpartybus.com/fleet-showcase.jpg",
    "https://pittpartybus.com/party-bus-interior.jpg"
  ],
  "telephone": "+1-412-385-3877",
  "email": "info@pittpartybus.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Pittsburgh",
    "addressLocality": "Pittsburgh",
    "addressRegion": "PA",
    "postalCode": "15222",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.4406,
    "longitude": -79.9959
  },
  "hasMap": "https://www.google.com/maps/search/?api=1&query=Pittsburgh+PA+15222",
  "openingHoursSpecification": [
    {
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
    }
  ],
  "priceRange": "$100-$175/hour",
  "areaServed": [
    {
      "@type": "City",
      "name": "Pittsburgh",
      "containedInPlace": {
        "@type": "State",
        "name": "Pennsylvania",
        "containedInPlace": {
          "@type": "Country",
          "name": "United States"
        }
      }
    },
    {
      "@type": "AdministrativeArea",
      "name": "Allegheny County"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Greater Pittsburgh Area"
    }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 40.4406,
      "longitude": -79.9959
    },
    "geoRadius": "50 mi"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Party Bus and Limousine Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Party Bus Rental",
          "description": "Luxury party buses for groups of 12-40 passengers with premium sound systems, LED lighting, and full bar setup",
          "url": "https://pittpartybus.com/fleet"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "100",
          "priceCurrency": "USD",
          "unitText": "HOUR"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Wedding Transportation",
          "description": "Elegant transportation for weddings including bridal party shuttles and guest transportation",
          "url": "https://pittpartybus.com/events"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Corporate Event Transportation",
          "description": "Professional group transportation for corporate events, conferences, and team outings",
          "url": "https://pittpartybus.com/events"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Prom & Graduation Transportation",
          "description": "Safe, reliable transportation for students with professional chauffeurs",
          "url": "https://pittpartybus.com/events"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Bachelor & Bachelorette Parties",
          "description": "Premium party bus experiences for unforgettable celebrations",
          "url": "https://pittpartybus.com/events"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Sporting Events & Concerts",
          "description": "Group transportation to Steelers, Penguins, Pirates games and concerts",
          "url": "https://pittpartybus.com/events"
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
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Sarah M."
      },
      "reviewBody": "Absolutely amazing service! The party bus was perfect for our wedding party and the driver was so professional."
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Mike R."
      },
      "reviewBody": "Best bachelor party ever! The bus was exactly what we needed and made the night unforgettable."
    }
  ],
  "knowsAbout": [
    "Party Bus Rental",
    "Limousine Service",
    "Wedding Transportation",
    "Prom Transportation",
    "Corporate Event Transportation",
    "Bachelor Party Transportation",
    "Pittsburgh Transportation"
  ],
  "slogan": "Pittsburgh's Premier Party Bus & Limo Service",
  "foundingDate": "2010",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 10,
    "maxValue": 25
  },
  "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Bank Transfer"],
  "currenciesAccepted": "USD",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Premium Sound System", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "LED Lighting", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Bar Setup", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "WiFi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Climate Control", "value": true }
  ],
  "sameAs": [
    "https://www.facebook.com/pittpartybus",
    "https://www.instagram.com/pittpartybus",
    "https://www.yelp.com/biz/pitt-party-bus-pittsburgh"
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
