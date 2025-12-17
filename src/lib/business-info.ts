// Centralized NAP (Name, Address, Phone) for Google Business Profile consistency
// This ensures consistent business information across all pages for local SEO

export const BUSINESS_INFO = {
  name: "Pitt Party Bus",
  legalName: "Pitt Party Bus LLC",
  description: "Pittsburgh's #1 party bus rental company. Premium party buses and limousines for weddings, proms, bachelor parties, corporate events, and special occasions.",
  
  // Address
  address: {
    street: "Pittsburgh",
    city: "Pittsburgh",
    state: "PA",
    stateFullName: "Pennsylvania",
    zip: "15222",
    country: "US",
    countryFullName: "United States",
  },
  
  // Contact
  phone: "(412) 385-3877",
  phoneRaw: "+14123853877",
  phoneTel: "tel:+14123853877",
  email: "info@pittpartybus.com",
  
  // Online presence
  website: "https://pittpartybus.com",
  
  // Social media
  social: {
    facebook: "https://www.facebook.com/pittpartybus",
    instagram: "https://www.instagram.com/pittpartybus",
    twitter: "https://twitter.com/pittpartybus",
    yelp: "https://www.yelp.com/biz/pitt-party-bus-pittsburgh",
  },
  
  // Geo coordinates
  geo: {
    latitude: 40.4406,
    longitude: -79.9959,
  },
  
  // Business hours
  hours: {
    display: "24/7 Availability",
    structured: [
      { day: "Monday", open: "00:00", close: "23:59" },
      { day: "Tuesday", open: "00:00", close: "23:59" },
      { day: "Wednesday", open: "00:00", close: "23:59" },
      { day: "Thursday", open: "00:00", close: "23:59" },
      { day: "Friday", open: "00:00", close: "23:59" },
      { day: "Saturday", open: "00:00", close: "23:59" },
      { day: "Sunday", open: "00:00", close: "23:59" },
    ],
  },
  
  // Pricing
  priceRange: "$100-$175/hour",
  
  // Founded
  foundingDate: "2010",
} as const;

// Formatted address string
export const getFormattedAddress = () => {
  const { address } = BUSINESS_INFO;
  return `${address.city}, ${address.state} ${address.zip}`;
};

// Full formatted address with country
export const getFullFormattedAddress = () => {
  const { address } = BUSINESS_INFO;
  return `${address.city}, ${address.state} ${address.zip}, ${address.countryFullName}`;
};

// Schema.org PostalAddress object
export const getSchemaAddress = () => ({
  "@type": "PostalAddress",
  streetAddress: BUSINESS_INFO.address.street,
  addressLocality: BUSINESS_INFO.address.city,
  addressRegion: BUSINESS_INFO.address.state,
  postalCode: BUSINESS_INFO.address.zip,
  addressCountry: BUSINESS_INFO.address.country,
});

// Schema.org GeoCoordinates object
export const getSchemaGeo = () => ({
  "@type": "GeoCoordinates",
  latitude: BUSINESS_INFO.geo.latitude,
  longitude: BUSINESS_INFO.geo.longitude,
});
