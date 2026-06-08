import Link from "next/link";
import type { ReactNode } from "react";

import { CATALOG_HUB_PILLARS } from "@/lib/catalog-hub/config";
import type { CatalogHubPillar } from "@/lib/catalog-hub/config";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type CatalogHubPageShellProps = {
  pillar: CatalogHubPillar;
  children?: ReactNode;
};

export function CatalogHubPageShell({ pillar, children }: CatalogHubPageShellProps) {
  return (
    <main className="min-w-0 flex-1 bg-background px-4 pb-14 pt-28 sm:px-8 sm:pt-32 lg:px-14 2xl:px-20">
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/#${SECTION_IDS.catalogHub}`} className="hover:text-foreground">
            Catálogo
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{pillar.title}</span>
        </nav>

        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary/85">
          {pillar.eyebrow}
        </p>
        <h1 className="font-heading mt-2 text-3xl font-medium tracking-tight sm:text-4xl">
          {pillar.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {pillar.description}
        </p>

        {children ?? (
          <ComingSoonPanel pillar={pillar} />
        )}

        <aside className="mt-12 border-t border-border/70 pt-8">
          <p className="text-sm font-medium text-foreground">También podés explorar</p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {CATALOG_HUB_PILLARS.filter((item) => item.slug !== pillar.slug).map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full border border-border/80 px-4 py-2 text-sm font-medium",
                    "text-foreground/80 transition-colors hover:border-border hover:bg-muted/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2",
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}

function ComingSoonPanel({ pillar }: { pillar: CatalogHubPillar }) {
  return (
    <div className="mt-10 rounded-3xl border border-dashed border-border/80 bg-muted/25 p-8 sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Esqueleto · {pillar.status === "live" ? "En curso" : "Próximamente"}
      </p>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
        Estamos armando el listado de {pillar.title.toLowerCase()} con fotos reales y filtros
        por destino. Por ahora podés ver las opciones dentro de cada zona en{" "}
        <Link href="/destinos" className="font-medium text-primary underline-offset-4 hover:underline">
          Destinos
        </Link>
        .
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {["Placeholder 1", "Placeholder 2", "Placeholder 3"].map((label) => (
          <div
            key={label}
            className="aspect-[4/3] rounded-2xl bg-muted/80 ring-1 ring-border/60"
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}
