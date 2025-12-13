import { LoaderFunction } from '@/lib/loader';

// Generic page SSR data structure
export interface PageData {
  meta: {
    title: string;
    description: string;
    canonical: string;
  };
}

// Events page data
export interface EventsData extends PageData {
  eventTypes: string[];
}

export const eventsLoader: LoaderFunction<EventsData> = async () => {
  return {
    meta: {
      title: "Party Bus Events & Occasions | Pittsburgh Party Bus",
      description: "Book a party bus for weddings, proms, bachelor/bachelorette parties, corporate events, concerts, and more in Pittsburgh. Perfect transportation for any celebration.",
      canonical: "/events"
    },
    eventTypes: [
      'Weddings',
      'Proms & Graduations',
      'Bachelor & Bachelorette Parties',
      'Corporate Events',
      'Concerts & Sporting Events',
      'Birthday Parties',
      'Wine Tours',
      'Night Out',
    ],
  };
};

// Locations page data
export interface LocationsData extends PageData {
  serviceAreas: string[];
}

export const locationsLoader: LoaderFunction<LocationsData> = async () => {
  return {
    meta: {
      title: "Service Areas & Locations | Pittsburgh Party Bus",
      description: "Pittsburgh Party Bus serves the entire Pittsburgh metro area including Downtown, North Hills, South Hills, and surrounding counties. View our complete service area.",
      canonical: "/locations"
    },
    serviceAreas: [
      'Downtown Pittsburgh',
      'North Hills',
      'South Hills',
      'East End',
      'West End',
      'Allegheny County',
      'Washington County',
      'Westmoreland County',
      'Butler County',
    ],
  };
};

// Pricing page data
export interface PricingData extends PageData {
  priceRanges: {
    vehicleType: string;
    minPrice: number;
    maxPrice: number;
  }[];
}

export const pricingLoader: LoaderFunction<PricingData> = async () => {
  return {
    meta: {
      title: "Party Bus Pricing & Rates | Pittsburgh Party Bus",
      description: "Transparent party bus rental pricing in Pittsburgh. Hourly rates from $100-$200/hour. Get instant quotes for limousines, party buses, and shuttle services.",
      canonical: "/pricing"
    },
    priceRanges: [
      { vehicleType: 'Party Bus (22-30 passengers)', minPrice: 150, maxPrice: 200 },
      { vehicleType: 'Mini Party Bus (12-14 passengers)', minPrice: 125, maxPrice: 150 },
      { vehicleType: 'Limousine (6-14 passengers)', minPrice: 100, maxPrice: 150 },
      { vehicleType: 'Shuttle Bus (14-23 passengers)', minPrice: 100, maxPrice: 125 },
      { vehicleType: 'Private Car (3-6 passengers)', minPrice: 75, maxPrice: 100 },
    ],
  };
};

// Contact page data
export interface ContactData extends PageData {
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
}

export const contactLoader: LoaderFunction<ContactData> = async () => {
  return {
    meta: {
      title: "Contact Us - Get a Free Quote | Pittsburgh Party Bus",
      description: "Contact Pittsburgh Party Bus for free quotes and reservations. Call (412) 385-3877 or fill out our online form. Available 24/7 for your transportation needs.",
      canonical: "/contact"
    },
    contactInfo: {
      phone: '(412) 385-3877',
      email: 'info@pittpartybus.com',
      address: 'Pittsburgh, PA',
    },
  };
};

// FAQs page data
export interface FAQsData extends PageData {
  faqCount: number;
  categories: string[];
}

export const faqsLoader: LoaderFunction<FAQsData> = async () => {
  return {
    meta: {
      title: "Frequently Asked Questions | Pittsburgh Party Bus",
      description: "Find answers to common questions about party bus rentals in Pittsburgh. Learn about pricing, booking, vehicle amenities, policies, and more.",
      canonical: "/faqs"
    },
    faqCount: 20,
    categories: [
      'Booking & Reservations',
      'Pricing & Payment',
      'Vehicle Amenities',
      'Policies & Safety',
      'Service Areas',
    ],
  };
};

// Testimonials page data
export interface TestimonialsData extends PageData {
  averageRating: number;
  totalReviews: number;
}

export const testimonialsLoader: LoaderFunction<TestimonialsData> = async () => {
  return {
    meta: {
      title: "Customer Reviews & Testimonials | Pittsburgh Party Bus",
      description: "Read reviews from satisfied customers who chose Pittsburgh Party Bus for their celebrations. 5-star rated party bus and limousine service.",
      canonical: "/testimonials"
    },
    averageRating: 4.9,
    totalReviews: 150,
  };
};

// Privacy page data
export const privacyLoader: LoaderFunction<PageData> = async () => {
  return {
    meta: {
      title: "Privacy Policy | Pittsburgh Party Bus",
      description: "Pittsburgh Party Bus privacy policy. Learn how we collect, use, and protect your personal information when you use our services.",
      canonical: "/privacy"
    },
  };
};

// Terms page data
export const termsLoader: LoaderFunction<PageData> = async () => {
  return {
    meta: {
      title: "Terms of Service | Pittsburgh Party Bus",
      description: "Pittsburgh Party Bus terms of service. Read our rental agreement, cancellation policy, and service terms before booking.",
      canonical: "/terms"
    },
  };
};
