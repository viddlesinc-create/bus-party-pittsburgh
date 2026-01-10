import { StructuredData } from './StructuredData';

// FAQ Schema specifically for Fleet page passenger-count questions
export const fleetFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How many passengers fit in a party bus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Party buses in Pittsburgh accommodate 8-40 passengers depending on the vehicle. Our mini party buses fit 8-14 passengers, mid-size buses hold 20-26 passengers, and large party buses accommodate 28-40 guests. Each vehicle has comfortable seating with ample space for moving around."
      }
    },
    {
      "@type": "Question",
      "name": "What size party bus do I need for 10 people?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For 10 people, we recommend our 12 Passenger Mini Party Bus. This gives everyone comfortable seating with room to spare for bags, coolers, and dancing. Starting at $100/hour with a 3-hour minimum, it's our most affordable option for small groups."
      }
    },
    {
      "@type": "Question",
      "name": "What size party bus do I need for 15 people?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For 15 people, our 14 Passenger Ford Mini Party Bus or 22 Passenger Party Bus works best. The mini bus is perfect if you want a cozy experience, while the 22-passenger bus provides extra room for moving around and a more party-like atmosphere."
      }
    },
    {
      "@type": "Question",
      "name": "What size party bus do I need for 20 people?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For 20 people, our 22 or 24 Passenger Party Buses are ideal. These mid-size buses offer premium sound systems, LED lighting, bar setups, and plenty of room to dance. Pricing starts at $150/hour with a 4-hour minimum."
      }
    },
    {
      "@type": "Question",
      "name": "What is the largest party bus available in Pittsburgh?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our largest party bus accommodates 30-40 passengers. It features premium leather seating, state-of-the-art sound system, full bar with ice, LED light shows, dance floor area, flat screen TVs, and climate control. Perfect for large weddings, corporate events, and big celebrations."
      }
    }
  ]
};

export function FleetFAQSchema() {
  return <StructuredData data={fleetFAQSchema} />;
}
