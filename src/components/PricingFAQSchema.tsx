import { StructuredData } from './StructuredData';

// FAQ Schema specifically for Pricing page cost-related questions
export const pricingFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much is a party bus for 5 hours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A party bus for 5 hours in Pittsburgh costs $750-$1,250 depending on the vehicle size. Mini party buses (8-12 passengers) are $150/hour = $750. Mid-size buses (20-25 passengers) are $200/hour = $1,000. Large luxury buses (35-40 passengers) are $250/hour = $1,250. All prices include the professional chauffeur, fuel, and amenities."
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to rent a party bus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Party bus rental in Pittsburgh starts at $150/hour for mini buses with a 3-hour minimum ($450 total). Mid-size party buses start at $200/hour with a 4-hour minimum ($800 total). Prices include professional chauffeur, fuel, ice, cups, red carpet service, and all premium amenities like sound systems and LED lighting."
      }
    },
    {
      "@type": "Question",
      "name": "What is the average party bus cost per hour?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The average party bus rental in Pittsburgh is $175-200 per hour. This gets you a mid-size bus with 14-24 passenger capacity, premium sound system, LED lighting, bar setup, and professional chauffeur. Weekends and peak seasons (prom, weddings) may have slightly higher rates."
      }
    },
    {
      "@type": "Question",
      "name": "How much to tip a party bus driver?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The standard tip for a party bus driver is 18-20% of the total rental cost, similar to restaurant service. For exceptional service, 20-25% is appropriate. For example, on a $800 rental, a $144-$160 tip is customary. Tips can be given in cash directly to the driver at the end of your rental."
      }
    },
    {
      "@type": "Question",
      "name": "Are there hidden fees with party bus rentals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "At Pitt Party Bus, we have no hidden fees. Your quoted price includes the chauffeur, fuel, tolls, insurance, and all amenities. Optional add-ons include decorations ($25-50), extra stops beyond 3 ($15/stop), and airport fees ($25). Gratuity (18-20%) is suggested but not required."
      }
    },
    {
      "@type": "Question", 
      "name": "What's the minimum rental time for a party bus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Minimum rental times vary by vehicle size. Mini party buses (8-15 passengers) have a 3-hour minimum. Larger party buses (20+ passengers) have a 4-hour minimum. This ensures enough time for pickup, your event, and safe return. Longer rentals get better per-hour rates."
      }
    }
  ]
};

export function PricingFAQSchema() {
  return <StructuredData data={pricingFAQSchema} />;
}
