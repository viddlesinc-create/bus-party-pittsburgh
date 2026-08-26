import { useLocation } from "react-router-dom";
import { CalendarClock } from "lucide-react";
import { LAST_UPDATED, BUILD_DATE } from "@/lib/last-updated.generated";

/**
 * Resolves the last-modified date for a route as an ISO yyyy-mm-dd string.
 *
 * The same value backs both the visible "Last updated:" line and `dateModified`
 * in the page's JSON-LD, so a page can never show one date and claim another.
 * Safe to call during SSR — it reads a generated constant, not the filesystem.
 */
export function getLastUpdated(pathname: string): string {
  const path = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";
  return LAST_UPDATED[path] ?? BUILD_DATE;
}

/** ISO date -> "August 26, 2026", without pulling in a date library. */
export function formatLastUpdated(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  // Construct in UTC so the rendered date matches the ISO string in every
  // timezone — `new Date("2026-08-26")` parses as UTC midnight and would render
  // as the 25th anywhere west of Greenwich.
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

interface LastUpdatedProps {
  /** Override the route lookup (blog posts pass their own front-matter date). */
  date?: string;
  className?: string;
}

export function LastUpdated({ date, className = "" }: LastUpdatedProps) {
  const { pathname } = useLocation();
  const iso = date ?? getLastUpdated(pathname);

  return (
    <p className={`flex items-center gap-2 text-sm text-muted-foreground mb-6 ${className}`}>
      <CalendarClock className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
      <span>
        Last updated: <time dateTime={iso}>{formatLastUpdated(iso)}</time>
      </span>
    </p>
  );
}
