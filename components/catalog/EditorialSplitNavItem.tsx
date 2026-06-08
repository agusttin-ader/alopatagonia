import { cn } from "@/lib/utils";

type EditorialSplitNavItemProps = {
  title: string;
  subtitle: string;
  meta: string;
  isActive: boolean;
  onClick: () => void;
};

export function EditorialSplitNavItem({
  title,
  subtitle,
  meta,
  isActive,
  onClick,
}: EditorialSplitNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "group relative w-full py-3.5 pl-4 text-left transition min-h-11",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4",
        isActive &&
          "before:absolute before:left-0 before:top-1/2 before:h-5 before:w-px before:-translate-y-1/2 before:bg-foreground/55",
      )}
    >
      <span
        className={cn(
          "font-heading block text-[1.0625rem] leading-tight tracking-tight transition-colors duration-300 min-[1920px]:text-lg",
          isActive
            ? "text-foreground"
            : "text-foreground/38 group-hover:text-foreground/68",
        )}
      >
        {title}
      </span>
      <span
        className={cn(
          "mt-1 block text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300",
          isActive
            ? "text-muted-foreground"
            : "text-muted-foreground/50 group-hover:text-muted-foreground/75",
        )}
      >
        {subtitle}
      </span>
      <span
        className={cn(
          "mt-1.5 block text-xs tabular-nums transition-colors duration-300",
          isActive
            ? "text-muted-foreground/90"
            : "text-muted-foreground/42 group-hover:text-muted-foreground/65",
        )}
      >
        {meta}
      </span>
    </button>
  );
}
