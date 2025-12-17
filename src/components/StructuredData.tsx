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
  "alternateName": [
    "Pittsburgh Party Bus",
    "Pitt Party Bus Pittsburgh",
    "Party Buses Near Me Pittsburgh",
    "Pittsburgh Party Bus Rental",
    "Party Bus Pittsburgh PA"
  ],
  "description": "Pittsburgh's #1 party bus rental company. Premium party buses and limousines for weddings, proms, bachelor parties, corporate events, and special occasions. Serving all Pittsburgh neighborhoods including Downtown, North Hills, South Hills, and surrounding areas. 24/7 availability with professional chauffeurs.",
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
    { "@type": "AdministrativeArea", "name": "Allegheny County" },
    { "@type": "AdministrativeArea", "name": "Greater Pittsburgh Area" },
    // North Hills
    { "@type": "City", "name": "Cranberry Township" },
    { "@type": "City", "name": "Wexford" },
    { "@type": "City", "name": "Pine Township" },
    { "@type": "City", "name": "McCandless" },
    { "@type": "City", "name": "Ross Township" },
    { "@type": "City", "name": "Allison Park" },
    // South Hills
    { "@type": "City", "name": "Mt. Lebanon" },
    { "@type": "City", "name": "Upper St. Clair" },
    { "@type": "City", "name": "Peters Township" },
    { "@type": "City", "name": "McMurray" },
    { "@type": "City", "name": "Bethel Park" },
    { "@type": "City", "name": "Canonsburg" },
    // East
    { "@type": "City", "name": "Monroeville" },
    { "@type": "City", "name": "Murrysville" },
    { "@type": "City", "name": "Irwin" },
    { "@type": "City", "name": "Greensburg" },
    // West
    { "@type": "City", "name": "Moon Township" },
    { "@type": "City", "name": "Robinson Township" },
    { "@type": "City", "name": "Sewickley" },
    // Neighborhoods
    { "@type": "Place", "name": "Downtown Pittsburgh" },
    { "@type": "Place", "name": "Oakland" },
    { "@type": "Place", "name": "Shadyside" },
    { "@type": "Place", "name": "Squirrel Hill" },
    { "@type": "Place", "name": "South Side" },
    { "@type": "Place", "name": "Strip District" },
    { "@type": "Place", "name": "Lawrenceville" },
    { "@type": "Place", "name": "North Shore" }
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
  "makesOffer": [
    {
      "@type": "Offer",
      "name": "Party Bus Rental Near Me",
      "description": "Local party bus rentals in Pittsburgh and surrounding areas",
      "areaServed": { "@type": "City", "name": "Pittsburgh" }
    },
    {
      "@type": "Offer",
      "name": "Wedding Party Bus",
      "description": "Luxury wedding transportation in Pittsburgh"
    },
    {
      "@type": "Offer",
      "name": "Prom Party Bus",
      "description": "Safe prom transportation for Pittsburgh area students"
    },
    {
      "@type": "Offer",
      "name": "Bachelor Party Bus",
      "description": "Bachelor and bachelorette party buses in Pittsburgh"
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
          "name": "Small Party Bus Rental",
          "description": "Mini party buses for 8-14 passengers, perfect for small groups",
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
        "name": "Jennifer L."
      },
      "reviewBody": "We searched for party buses near me and found Pitt Party Bus. They were amazing for our prom group!"
    }
  ],
  "knowsAbout": [
    "Party Bus Rental",
    "Party Buses Near Me",
    "Limousine Service",
    "Wedding Transportation",
    "Prom Transportation",
    "Corporate Event Transportation",
    "Bachelor Party Transportation",
    "Bachelorette Party Transportation",
    "Pittsburgh Transportation",
    "Group Transportation Pittsburgh",
    "Luxury Bus Rental",
    "Party Bus Pricing",
    "Event Transportation"
  ],
  "keywords": "party buses near me, party bus pittsburgh, party bus rental pittsburgh, pittsburgh party bus, party buses near me pittsburgh, limo service pittsburgh, wedding transportation pittsburgh, prom party bus pittsburgh, bachelor party bus pittsburgh",
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
    { "@type": "LocationFeatureSpecification", "name": "Climate Control", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Professional Chauffeur", "value": true }
  ],
  "potentialAction": [
    {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://pittpartybus.com/contact",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "name": "Party Bus Reservation"
      }
    },
    {
      "@type": "CommunicateAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "tel:+14123853877",
        "actionPlatform": [
          "http://schema.org/MobileWebPlatform"
        ]
      }
    }
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
