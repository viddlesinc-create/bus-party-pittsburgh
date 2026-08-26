import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQSchema } from "@/components/FAQSchema";
import type { Faq } from "@/data/faqs";

interface FAQSectionProps {
  faqs: Faq[];
  heading?: string;
  intro?: string;
  className?: string;
}

/**
 * Renders a visible FAQ block AND its FAQPage JSON-LD from one array.
 *
 * This exists because the two used to come from different places: the visible
 * accordions were written inline in each page, while the schema lived in
 * separate hard-coded objects (FleetFAQSchema, PricingFAQSchema,
 * homepageFAQSchema) whose question and answer text had drifted away from what
 * the page actually said. Google treats FAQ markup that doesn't match visible
 * content as a violation, so the only safe arrangement is a single array
 * feeding both — which is what this component enforces.
 *
 * Answer length is checked by scripts/validate-seo.mjs (100-200 words).
 */
export function FAQSection({ faqs, heading = "Frequently Asked Questions", intro, className = "" }: FAQSectionProps) {
  if (!faqs.length) return null;

  return (
    <section className={`py-14 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        {intro && <p className="text-muted-foreground mb-8">{intro}</p>}

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Same array, so the markup text is byte-identical to the copy above. */}
      <FAQSchema faqs={faqs} />
    </section>
  );
}
