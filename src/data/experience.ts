import { BUSINESS_INFO } from "@/lib/business-info";

/**
 * Owner-supplied experience facts for the "Our experience" sections on the
 * Tier-1 service pages.
 *
 * NOTHING HERE MAY BE GUESSED. Job counts, same-day rates and case-study
 * numbers are claims a customer can hold us to, and a wrong one is worse than
 * a missing one. Every field below is optional: a block that has no data does
 * not render in production, and `npm run validate:seo` reports what is still
 * outstanding so it does not get quietly forgotten.
 *
 * To fill one in: add the value, and delete the corresponding TODO comment.
 */
export interface CaseStudy {
  /** Short label, e.g. "South Hills wedding, 120 guests". */
  title: string;
  /** What the group needed and what we ran. Two or three sentences. */
  summary: string;
  /** Concrete figures: group size, hours, vehicles, cost range. */
  facts: { label: string; value: string }[];
}

export interface ExperienceContent {
  /** Verified count of this kind of job in Pittsburgh. Leave undefined if unknown. */
  jobCount?: number;
  /** Share of bookings we fill same-day, as a percentage. Leave undefined if unknown. */
  sameDayRate?: number;
  /** One case study with real numbers. */
  caseStudy?: CaseStudy;
  /** Short first-person lessons. Each should be specific enough to be useful. */
  lessons?: string[];
}

// TODO(owner): supply jobCount, sameDayRate and a case study for each page.
// Until then these render only the derived stats below, which are verifiable
// from the repo, and omit the narrative blocks entirely.
export const EXPERIENCE: Record<string, ExperienceContent> = {
  fleet: {
    lessons: [
      "Groups almost always underestimate coat space. A bus booked exactly to capacity in January feels full before anyone sits down, which is why we push people up one size for winter dates.",
      "The vehicle that photographs best is not always the one that works best. An SUV limo looks better on a wedding arrival; a mini bus is easier to get in and out of across five stops.",
    ],
  },
  pricing: {
    lessons: [
      "The quotes that go wrong are the ones missing a detail at booking. Stops, timing and headcount are what move the number, so we would rather ask three more questions up front than revise a price later.",
      "Booking the minimum to save money usually costs more. Groups that book three hours and extend to five pay the same hourly rate, but they spend the evening watching the clock.",
    ],
  },
  events: {
    lessons: [
      "Wedding photos run long. Every time. We now quote weddings with a buffer built in rather than to the schedule on paper, because the alternative is a stressed couple negotiating an extension in a car park.",
      "For game days the hard part is leaving, not arriving. We plan pickups slightly away from the stadium perimeter, which usually saves more time than the extra walking costs.",
    ],
  },
};

/**
 * Stats we can state because they are verifiable from this repo, not estimated:
 * the founding year in BUSINESS_INFO, the vehicle list rendered on /fleet, and
 * the areaServed list in organizationSchema.
 */
export const DERIVED_STATS = {
  yearsInPittsburgh: new Date().getUTCFullYear() - Number(BUSINESS_INFO.foundingYear),
  fleetSize: 13,
  areasServed: 30,
  availability: BUSINESS_INFO.hours.display,
};
