import { Helmet } from 'react-helmet-async';
import {
  BUSINESS_INFO,
  getSchemaAddress,
  getSchemaGeo,
  getSameAs,
  BRAND_ASSETS,
  absoluteUrl,
} from '@/lib/business-info';

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
  // Both of these must point at files that actually exist in public/. They
  // previously pointed at /logo.png, /hero-party-bus.jpg, /fleet-showcase.jpg and
  // /party-bus-interior.jpg — none of which are served at the site root, so every
  // logo and image URL in our schema returned a 404.
  "logo": {
    "@type": "ImageObject",
    "url": absoluteUrl(BRAND_ASSETS.logo.url),
    "width": BRAND_ASSETS.logo.width,
    "height": BRAND_ASSETS.logo.height
  },
  "image": [absoluteUrl(BRAND_ASSETS.image.url)],
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
  "priceRange": BUSINESS_INFO.priceRange,
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
          "description": "Luxury party buses for groups of 12-30 passengers with premium sound systems, LED lighting, and full bar setup",
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
  // NO aggregateRating / review HERE — deliberately.
  //
  // This block used to hard-code a 5.0 rating over 500 reviews plus three
  // Review objects with invented authors. The business has no Google Business
  // Profile and no verifiable review source, so none of it could be
  // substantiated. Review markup a business writes about itself violates
  // Google's structured-data policies and risks a manual action.
  //
  // Do not re-add aggregateRating or review until reviews come from a real,
  // verifiable source, and then generate them from that source — never inline.
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
  "sameAs": getSameAs()
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
  "priceRange": BUSINESS_INFO.priceRange,
  "image": absoluteUrl(BRAND_ASSETS.image.url),
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  // No aggregateRating — see the note in organizationSchema above.
  "sameAs": getSameAs()
};

// homepageFAQSchema was removed. It declared five questions that appeared
// nowhere on the homepage, which Google's FAQ guidance prohibits. Homepage FAQ
// content now lives in src/data/faqs.ts and is rendered by <FAQSection>, which
// emits the markup from the same array it renders.

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
  url?: string;
}) => ({
  "@context": "https://schema.org",
  // BlogPosting rather than the bare Article this used to emit — it is the more
  // specific type for these posts and is what Google's article guidance expects.
  "@type": "BlogPosting",
  "headline": article.title,
  "description": article.description,
  "image": article.image,
  "datePublished": article.datePublished,
  "dateModified": article.dateModified || article.datePublished,
  // mainEntityOfPage was missing entirely, so nothing tied the markup to the URL.
  ...(article.url ? { "mainEntityOfPage": { "@type": "WebPage", "@id": article.url } } : {}),
  ...(article.url ? { "url": article.url } : {}),
  // author stays an Organization until a real named person is supplied via
  // BUSINESS_INFO.author (see the note there). A Person entry with an invented
  // name would be worse than an honest Organization byline.
  "author": BUSINESS_INFO.author.confirmed
    ? {
        "@type": "Person",
        "name": BUSINESS_INFO.author.name,
        "url": `${BUSINESS_INFO.website}/authors/${BUSINESS_INFO.author.slug}`,
        ...(BUSINESS_INFO.author.credential
          ? { "jobTitle": BUSINESS_INFO.author.credential }
          : {}),
      }
    : {
        "@type": "Organization",
        "name": article.author,
        "url": BUSINESS_INFO.website,
      },
  "publisher": {
    "@type": "Organization",
    "name": BUSINESS_INFO.name,
    "url": BUSINESS_INFO.website,
    "logo": {
      "@type": "ImageObject",
      "url": absoluteUrl(BRAND_ASSETS.logo.url),
      "width": BRAND_ASSETS.logo.width,
      "height": BRAND_ASSETS.logo.height
    }
  },
  "isPartOf": {
    "@type": "Blog",
    "@id": `${BUSINESS_INFO.website}/blog`,
    "name": `${BUSINESS_INFO.name} Blog`
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
