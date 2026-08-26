// Centralized NAP (Name, Address, Phone) for Google Business Profile consistency
// This ensures consistent business information across all pages for local SEO

export const BUSINESS_INFO = {
  name: "Pitt Party Bus",
  legalName: "Pitt Party Bus LLC",
  description: "Pittsburgh's #1 party bus rental company. Premium party buses and limousines for weddings, proms, bachelor parties, corporate events, and special occasions.",
  
  // Address
  // NOTE: no street address is published. `streetAddress` used to be set to
  // "Pittsburgh", which duplicated addressLocality and made every PostalAddress
  // in our schema malformed. Emitting no streetAddress is valid; a wrong one is
  // not. If the owner decides to publish a street address, set `street` here and
  // getSchemaAddress() will start emitting it automatically.
  address: {
    street: "",
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
  
  // Pricing — SINGLE SOURCE OF TRUTH.
  // Previously the site told five different price stories: this constant said
  // $100-$175, organizationSchema said $150-$250, the pricing loader said
  // $100-$200, the /pricing H1 said "from $115" while the paragraph under it
  // said $150, and Testimonials said "$$". Everything now reads from here.
  // Range is taken from the visible per-vehicle rates on /pricing ($150 mini →
  // $250 large), which is the figure the FAQs, homepage and pricing copy agree on.
  // OWNER TO CONFIRM these are the current rates.
  priceRange: "$150-$250/hour",
  priceMin: 150,
  priceMax: 250,

  // Founded — used by the footer, /about and LocalBusiness.foundingDate.
  // OWNER TO CONFIRM: this year was already asserted in the repo's schema before
  // this change; it has not been independently verified.
  foundingDate: "2010",
  foundingYear: "2010",

  // Content author for blog bylines and Person schema.
  // `confirmed: false` means no real named author has been supplied yet, so the
  // byline falls back to the business as publisher and BlogPosting.author stays
  // an Organization. Do NOT invent a person here — set name/slug/credential and
  // flip `confirmed` to true only once the owner supplies a real author.
  author: {
    confirmed: false,
    name: "",
    slug: "",
    credential: "",
  },
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

// Schema.org PostalAddress object.
// streetAddress is omitted entirely when we have none — an absent field is valid,
// a field containing the city name is not.
export const getSchemaAddress = () => ({
  "@type": "PostalAddress",
  ...(BUSINESS_INFO.address.street ? { streetAddress: BUSINESS_INFO.address.street } : {}),
  addressLocality: BUSINESS_INFO.address.city,
  addressRegion: BUSINESS_INFO.address.state,
  postalCode: BUSINESS_INFO.address.zip,
  addressCountry: BUSINESS_INFO.address.country,
});

// Every profile we actually link from the footer, for schema `sameAs`.
// Twitter/X was linked in the footer but missing from sameAs.
export const getSameAs = () => [
  BUSINESS_INFO.social.facebook,
  BUSINESS_INFO.social.instagram,
  BUSINESS_INFO.social.twitter,
  BUSINESS_INFO.social.yelp,
];

// Brand assets that genuinely exist in public/. The schema used to point at
// /logo.png, /hero-party-bus.jpg, /fleet-showcase.jpg and /party-bus-interior.jpg,
// none of which are served at the site root — every logo and image URL 404'd.
export const BRAND_ASSETS = {
  logo: { url: "/favicon.png", width: 1024, height: 1024 },
  image: { url: "/og-image.jpg", width: 1200, height: 630 },
} as const;

export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${BUSINESS_INFO.website}${path}`;

// Schema.org GeoCoordinates object
export const getSchemaGeo = () => ({
  "@type": "GeoCoordinates",
  latitude: BUSINESS_INFO.geo.latitude,
  longitude: BUSINESS_INFO.geo.longitude,
});
