const AVATAR_TONES = [
  "bg-brand-forest/14 text-brand-forest",
  "bg-accent/18 text-brand-forest",
  "bg-primary/12 text-primary",
  "bg-secondary text-secondary-foreground",
] as const;

export function parseTestimonialName(full: string): {
  displayName: string;
  location?: string;
} {
  const comma = full.lastIndexOf(", ");
  if (comma === -1) return { displayName: full };
  return {
    displayName: full.slice(0, comma),
    location: full.slice(comma + 2),
  };
}

export function getTestimonialInitials(name: string): string {
  const { displayName } = parseTestimonialName(name);
  const parts = displayName
    .split(/\s+/)
    .map((part) => part.replace(/\./g, ""))
    .filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase();
  }

  return displayName.slice(0, 2).toUpperCase();
}

export function getTestimonialAvatarTone(name: string): (typeof AVATAR_TONES)[number] {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash + name.charCodeAt(i) * (i + 1)) % AVATAR_TONES.length;
  }
  return AVATAR_TONES[hash]!;
}

export function getAverageTestimonialRating(
  testimonials: { rating?: number }[],
): number {
  if (testimonials.length === 0) return 5;
  const sum = testimonials.reduce((acc, item) => acc + (item.rating ?? 5), 0);
  return Math.round((sum / testimonials.length) * 10) / 10;
}
