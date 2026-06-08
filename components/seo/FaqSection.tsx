import type { SeoFaqItem } from "@/lib/seo-destinations";

type FaqSectionProps = {
  items: SeoFaqItem[];
  title?: string;
  className?: string;
};

export function FaqSection({
  items,
  title = "Preguntas frecuentes",
  className,
}: FaqSectionProps) {
  if (items.length === 0) return null;

  return (
    <section
      className={className}
      aria-labelledby="faq-section-heading"
    >
      <h2
        id="faq-section-heading"
        className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        {title}
      </h2>
      <dl className="mt-6 space-y-6">
        {items.map((item) => (
          <div
            key={item.question}
            className="rounded-2xl border border-border/70 bg-card/40 px-5 py-5 sm:px-6"
          >
            <dt className="font-heading text-lg font-medium leading-snug text-foreground">
              {item.question}
            </dt>
            <dd className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
