import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="es">
      <body className="flex min-h-dvh w-full flex-col overflow-x-clip antialiased">
        <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-28 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary/85">
            Error 404
          </p>
          <h1 className="font-heading mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
            No encontramos esta página
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Puede que el enlace esté desactualizado. Probá desde el inicio.
          </p>
          <Link
            href="/"
            className="mt-8 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Ir al inicio
          </Link>
        </main>
      </body>
    </html>
  );
}
