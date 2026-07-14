// Initials avatar for reviewers/testimonials — we don't have real customer
// photos, and a generic placeholder image reads as broken. Size via className
// (e.g. "w-10 h-10 text-sm").
interface InitialsAvatarProps {
  name: string;
  className?: string;
}

export function InitialsAvatar({ name, className = "" }: InitialsAvatarProps) {
  const initials =
    name
      .split(/\s+/)
      .filter((word) => /^[A-Za-z]/.test(word))
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("") || "PB";

  return (
    <div
      aria-hidden="true"
      className={`rounded-full bg-hero-gradient text-primary-foreground flex items-center justify-center font-semibold shrink-0 select-none ${className}`}
    >
      {initials}
    </div>
  );
}
