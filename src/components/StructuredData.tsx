import { Helmet } from 'react-helmet-async';
import { BUSINESS_INFO, getSchemaAddress, getSchemaGeo } from '@/lib/business-info';

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

// Predefined structured data templates using centralized NAP
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "LimousineBusService"],
  "@id": `${BUSINESS_INFO.website}/#organization`,
  "name": BUSINESS_INFO.name,
  "alternateName": [
    "Pittsburgh Party Bus",
    "Pitt Party Bus Pittsburgh",
    "Party Buses Near Me Pittsburgh",
    "Pittsburgh Party Bus Rental",
    "Party Bus Pittsburgh PA"
  ],
  "description": BUSINESS_INFO.description,
  "url": BUSINESS_INFO.website,
  "logo": {
    "@type": "ImageObject",
    "url": `${BUSINESS_INFO.website}/logo.png`,
    "width": "200",
    "height": "60"
  },
  "image": [
    `${BUSINESS_INFO.website}/hero-party-bus.jpg`,
    `${BUSINESS_INFO.website}/fleet-showcase.jpg`,
    `${BUSINESS_INFO.website}/party-bus-interior.jpg`
  ],
  "telephone": BUSINESS_INFO.phoneRaw,
  "email": BUSINESS_INFO.email,
  "address": getSchemaAddress(),
  "geo": getSchemaGeo(),
  "hasMap": `https://www.google.com/maps/search/?api=1&query=${BUSINESS_INFO.address.city}+${BUSINESS_INFO.address.state}+${BUSINESS_INFO.address.zip}`,
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
  "priceRange": "$150-$250/hour",
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
          "price": "150",
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
          "price": "150",
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
        "urlTemplate": `${BUSINESS_INFO.website}/contact`,
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
        "urlTemplate": BUSINESS_INFO.phoneTel,
        "actionPlatform": [
          "http://schema.org/MobileWebPlatform"
        ]
      }
    }
  ],
  "sameAs": [
    BUSINESS_INFO.social.facebook,
    BUSINESS_INFO.social.instagram,
    BUSINESS_INFO.social.yelp
  ]
};

// Dedicated LocalBusiness schema export for specific pages
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BUSINESS_INFO.website}/#localbusiness`,
  "name": BUSINESS_INFO.name,
  "description": BUSINESS_INFO.description,
  "url": BUSINESS_INFO.website,
  "telephone": BUSINESS_INFO.phoneRaw,
  "email": BUSINESS_INFO.email,
  "address": getSchemaAddress(),
  "geo": getSchemaGeo(),
  "priceRange": "$150-$250/hour",
  "image": `${BUSINESS_INFO.website}/hero-party-bus.jpg`,
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "500",
    "bestRating": "5"
  },
  "sameAs": [
    BUSINESS_INFO.social.facebook,
    BUSINESS_INFO.social.instagram,
    BUSINESS_INFO.social.yelp
  ]
};

// FAQPage schema for homepage and other pages with FAQs
export const homepageFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a party bus cost in Pittsburgh?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Party bus rentals in Pittsburgh start at $150/hour for mini buses (8-12 passengers) and go up to $250/hour for large luxury buses (35-40 passengers). Most rentals have a 3-4 hour minimum. Prices vary based on vehicle size, date, and duration."
      }
    },
    {
      "@type": "Question",
      "name": "How far in advance should I book a party bus in Pittsburgh?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We recommend booking 2-4 weeks in advance for regular events. For peak times like prom season (April-June), wedding season (May-October), and New Year's Eve, book 6-8 weeks ahead. We often have same-day availability for last-minute requests."
      }
    },
    {
      "@type": "Question",
      "name": "What areas do you serve in Pittsburgh?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We serve all of Pittsburgh and surrounding areas including Downtown, Oakland, Shadyside, South Side, North Hills, South Hills, and the entire Allegheny County. We also provide service to Pittsburgh International Airport and can arrange trips throughout Western Pennsylvania."
      }
    },
    {
      "@type": "Question",
      "name": "Can we bring alcohol on the party bus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, passengers 21+ may bring their own alcoholic beverages. We provide ice, cups, and cooler space. We do not supply alcohol. Our chauffeur will check IDs and has the right to refuse service to intoxicated passengers for safety."
      }
    },
    {
      "@type": "Question",
      "name": "What's included in a party bus rental?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every rental includes a professional chauffeur, fuel and tolls, insurance coverage, premium amenities (sound system, LED lighting, climate control), ice, cups, napkins, red carpet service, and complimentary water. Larger buses include dance floors and bar setups."
      }
    }
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": BUSINESS_INFO.name,
  "url": BUSINESS_INFO.website,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BUSINESS_INFO.website}/fleet?search={search_term_string}`
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
    "item": `${BUSINESS_INFO.website}${item.url}`
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
    "name": BUSINESS_INFO.name,
    "logo": {
      "@type": "ImageObject",
      "url": `${BUSINESS_INFO.website}/logo.png`
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
    "name": BUSINESS_INFO.name,
    "telephone": BUSINESS_INFO.phoneRaw,
    "address": getSchemaAddress()
  },
  "areaServed": {
    "@type": "City",
    "name": BUSINESS_INFO.address.city
  },
  "offers": {
    "@type": "Offer",
    "price": service.price,
    "priceCurrency": "USD"
  }
});
