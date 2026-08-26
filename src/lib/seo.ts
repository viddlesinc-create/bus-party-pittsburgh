/**
 * Single source of truth for every route's <title> and meta description.
 *
 * These used to live inline in each page component, with a second, different
 * copy in the route loaders (src/loaders/*). The loader copies never reached
 * production — window.__SSR_DATA__ is empty in every prerendered file — so the
 * two silently disagreed. Both now read from here.
 *
 * Rules enforced by scripts/validate-seo.mjs, which fails the build:
 *   - title 50-60 characters, as rendered (see the note on the brand suffix)
 *   - description 140-160 characters
 *   - both unique across all routes
 *
 * Note on the brand suffix: MetaTags appends " | Pitt Party Bus" only when a
 * title contains no "|". Every title here contains one, so what you read here
 * is exactly what ships — no invisible 17 characters.
 */
export interface PageSeo {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    title: "Pittsburgh Party Bus Rental | Limos & Buses $150/hr",
    description:
      "Party bus and limo rental in Pittsburgh for 2 to 30 passengers. Weddings, proms and bachelor parties from $150/hour. Call (412) 385-3877 for a free quote.",
  },
  "/fleet": {
    title: "Party Bus Fleet Pittsburgh | 12 to 30 Passenger Buses",
    description:
      "See every party bus, limo and shuttle in our Pittsburgh fleet, with photos, passenger capacities and hourly rates. Book the right vehicle for your group today.",
  },
  "/events": {
    title: "Event Transportation Pittsburgh | Weddings & Proms",
    description:
      "Party bus and limo transportation for Pittsburgh weddings, proms, concerts, corporate events and game days. Professional chauffeurs. Get a free quote today.",
  },
  "/pricing": {
    title: "Party Bus Prices Pittsburgh | $150-$250 Hourly Rates",
    description:
      "What a party bus really costs in Pittsburgh: hourly rates by vehicle size, rental minimums and add-on fees, with no hidden charges. Get a free instant estimate.",
  },
  "/locations": {
    title: "Party Bus Service Areas | Pittsburgh & Allegheny Co",
    description:
      "Pitt Party Bus serves Pittsburgh and Allegheny County, from Downtown and Oakland to the North and South Hills. Find your neighborhood and book a bus today.",
  },
  "/locations/north-hills": {
    title: "Party Bus Rental North Hills | Cranberry & Wexford",
    description:
      "Party bus and limo rental across Pittsburgh's North Hills, including Cranberry, Wexford, McCandless and Allison Park. Call (412) 385-3877 for a free quote.",
  },
  "/locations/south-hills": {
    title: "Party Bus Rental South Hills Pittsburgh | Mt Lebanon",
    description:
      "Party bus and limo rental across Pittsburgh's South Hills, including Mt Lebanon, Upper St Clair, Peters Township and Bethel Park. Book your free quote today.",
  },
  "/locations/downtown": {
    title: "Party Bus Rental Downtown Pittsburgh | Strip District",
    description:
      "Party bus and limo rental in Downtown Pittsburgh, the Strip District, North Shore and Station Square. Skip the parking. Call (412) 385-3877 for a free quote.",
  },
  "/locations/south-side": {
    title: "Party Bus Rental South Side Pittsburgh | Carson St",
    description:
      "Party bus and limo rental for Pittsburgh's South Side, Carson Street, Station Square and Mt Washington. One driver, every stop. Get your free quote today.",
  },
  "/locations/oakland": {
    title: "Party Bus Rental Oakland Pittsburgh | Pitt, CMU Area",
    description:
      "Party bus and limo rental in Oakland, Pittsburgh, serving Pitt, CMU, Shadyside and Squirrel Hill. Graduations and formals. Call (412) 385-3877 for a quote.",
  },
  "/contact": {
    title: "Contact Pitt Party Bus Pittsburgh | Free Quote Today",
    description:
      "Contact Pitt Party Bus for a free party bus or limo quote in Pittsburgh. Call (412) 385-3877 or send us your date, group size and stops. Available 24 hours.",
  },
  "/faqs": {
    title: "Party Bus FAQs Pittsburgh | Booking, Rates & Rules",
    description:
      "Answers to the questions Pittsburgh renters ask most: what a party bus costs, how far ahead to book, alcohol rules and what is included. Get a free quote today.",
  },
  "/blog": {
    title: "Party Bus Blog Pittsburgh | Tips, Guides & Event Ideas",
    description:
      "Pittsburgh party bus guides on pricing, safety, weddings, proms and the best local events to book a bus for. Read up, then call us for a free quote today.",
  },
  "/about": {
    title: "About Pitt Party Bus | Pittsburgh Party Bus Company",
    description:
      "Pitt Party Bus is a party bus and limo rental company in Pittsburgh, PA. Meet the company, our 13-vehicle fleet and our service area. Call for a free quote.",
  },
  "/testimonials": {
    title: "Pitt Party Bus Reviews | Pittsburgh Customer Stories",
    description:
      "Read what Pittsburgh customers say about their weddings, proms, bachelor parties and corporate events with Pitt Party Bus. Get a free quote for your own date.",
  },
  "/privacy": {
    title: "Privacy Policy | Pitt Party Bus Pittsburgh Rentals",
    description:
      "How Pitt Party Bus collects, uses and protects your personal information when you request a quote or book party bus and limo rentals in Pittsburgh, PA.",
  },
  "/terms": {
    title: "Terms of Service | Pitt Party Bus Pittsburgh Rentals",
    description:
      "The rental terms, booking policies and passenger conditions that apply to every party bus and limousine reservation with Pitt Party Bus in Pittsburgh, PA.",
  },
  "/404": {
    title: "Page Not Found | Pitt Party Bus Pittsburgh Rentals",
    description:
      "This page does not exist. Head back to the homepage, browse the Pittsburgh party bus fleet, or call (412) 385-3877 and we will help you find what you need.",
  },

  // --- Blog posts ---
  "/blog/party-bus-pricing-guide": {
    title: "Party Bus Cost Pittsburgh | Complete Hourly Price Guide",
    description:
      "What a party bus costs in Pittsburgh, broken down by vehicle size, hours and extras, with real example totals and the fees to watch for. Get a free quote today.",
  },
  "/blog/top-events-pittsburgh": {
    title: "Top 10 Pittsburgh Events to Book a Party Bus Rental For",
    description:
      "The ten Pittsburgh events worth booking a party bus for, from Steelers game days to concerts and wine tours, and how to plan each one. Get a free quote today.",
  },
  "/blog/party-bus-vs-limo": {
    title: "Party Bus vs Limo Pittsburgh | Which One Should You Book",
    description:
      "Party bus or limousine for your Pittsburgh event? Compare capacity, cost per person, amenities and best use, then book the one that fits. Free quotes available.",
  },
  "/blog/bachelor-bachelorette-ideas": {
    title: "Bachelorette Party Bus Ideas Pittsburgh | Route Guide",
    description:
      "Bachelor and bachelorette party bus ideas for Pittsburgh, with route suggestions across the South Side, Strip District and Lawrenceville. Get a free quote.",
  },
  "/blog/wedding-transportation": {
    title: "Wedding Transportation Pittsburgh | Planning Guide",
    description:
      "How to plan wedding transportation in Pittsburgh: guest shuttles, bridal party timing, how many vehicles you need and what it costs. Get a free quote today.",
  },
  "/blog/corporate-event-transportation": {
    title: "Corporate Event Transport Pittsburgh | Group Travel",
    description:
      "Group transportation for Pittsburgh corporate events, conferences, retreats and holiday parties, plus how to budget it. Call (412) 385-3877 for a free quote.",
  },
  "/blog/concert-party-bus": {
    title: "Concert Party Bus Pittsburgh | Venues, Rates & Tips",
    description:
      "Taking a party bus to a Pittsburgh concert: venue drop-off points, timing, parking you avoid and what it costs per person. Get a free quote for your show date.",
  },
  "/blog/prom-transportation-safety": {
    title: "Prom Party Bus Pittsburgh | Safety Guide for Parents",
    description:
      "What Pittsburgh parents should ask before booking prom transportation: chauffeur screening, alcohol policy, chaperones and cost sharing. Get a free quote today.",
  },
  "/blog/party-bus-safety-tips": {
    title: "Party Bus Safety Tips | A Pittsburgh Rider's Checklist",
    description:
      "Practical party bus safety tips for Pittsburgh riders and organizers, covering capacity, alcohol rules, boarding and what a good operator does. Free quotes.",
  },
  "/blog/accurate-party-bus-estimate": {
    title: "Party Bus Estimate Online | How to Get an Accurate Quote",
    description:
      "How to get a party bus estimate in Pittsburgh that matches your final bill: the details to give, the fees to ask about and the red flags. Get a free quote.",
  },
  "/blog/party-buses-near-me": {
    title: "Party Buses Near Me Pittsburgh | Find Local Rentals",
    description:
      "Searching for party buses near you in Pittsburgh? How to compare local operators on fleet, insurance and price, and what to book. Call for a free quote today.",
  },
};

/** Look up a route's SEO, tolerating a trailing slash. */
export function getPageSeo(pathname: string): PageSeo | undefined {
  const path = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";
  return PAGE_SEO[path];
}
