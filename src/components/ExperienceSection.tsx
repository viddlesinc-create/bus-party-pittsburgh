import { Card, CardContent } from "@/components/ui/card";
import { Bus, Clock, MapPin, CalendarDays } from "lucide-react";
import { EXPERIENCE, DERIVED_STATS } from "@/data/experience";

interface ExperienceSectionProps {
  /** Key into EXPERIENCE — "fleet", "pricing" or "events". */
  page: keyof typeof EXPERIENCE;
  heading?: string;
  className?: string;
}

/**
 * First-party experience block for the Tier-1 service pages.
 *
 * Deliberately renders only what can be substantiated. The stat bar comes from
 * DERIVED_STATS, which is computed from the founding year, the vehicle list and
 * the service-area list already in this repo. The job count, same-day rate and
 * case study render only once the owner supplies them in src/data/experience.ts;
 * until then those blocks are omitted rather than shown with placeholder text,
 * because a customer-facing page reading "{TODO}" is worse than a shorter page.
 *
 * `npm run validate:seo` reports which fields are still outstanding, so the gaps
 * stay visible to us without being visible to customers.
 */
export function ExperienceSection({ page, heading = "Our experience", className = "" }: ExperienceSectionProps) {
  const content = EXPERIENCE[page];
  if (!content) return null;

  const stats = [
    { icon: CalendarDays, value: `${DERIVED_STATS.yearsInPittsburgh}`, label: "years serving Pittsburgh" },
    { icon: Bus, value: `${DERIVED_STATS.fleetSize}`, label: "vehicles in the fleet" },
    { icon: MapPin, value: `${DERIVED_STATS.areasServed}`, label: "communities served" },
    { icon: Clock, value: DERIVED_STATS.availability, label: "dispatch" },
    ...(content.jobCount ? [{ icon: Bus, value: content.jobCount.toLocaleString(), label: "bookings completed" }] : []),
    ...(content.sameDayRate ? [{ icon: Clock, value: `${content.sameDayRate}%`, label: "same-day requests filled" }] : []),
  ];

  return (
    <section className={`py-14 ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">{heading}</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map(({ icon: Icon, value, label }) => (
            <Card key={label}>
              <CardContent className="pt-6 text-center">
                <Icon className="h-5 w-5 text-primary mx-auto mb-2" aria-hidden="true" />
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-xs text-muted-foreground mt-1">{label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {content.caseStudy && (
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-3">{content.caseStudy.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">{content.caseStudy.summary}</p>
            <dl className="grid sm:grid-cols-3 gap-4">
              {content.caseStudy.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{f.label}</dt>
                  <dd className="text-lg font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {content.lessons?.length ? (
          <div>
            <h3 className="text-xl font-semibold mb-4">What we&rsquo;ve learned the hard way</h3>
            <ul className="space-y-4">
              {content.lessons.map((lesson) => (
                <li key={lesson} className="text-muted-foreground leading-relaxed border-l-2 border-primary/40 pl-4">
                  {lesson}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
