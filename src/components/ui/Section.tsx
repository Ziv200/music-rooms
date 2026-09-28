import type { ReactNode } from "react";

export function Section({
  id,
  children,
  className = "",
  labelledBy,
  tone = "base",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
  tone?: "base" | "surface" | "dark";
}) {
  const toneClass =
    tone === "surface" ? "bg-white" : tone === "dark" ? "bg-neutral-900 text-white" : "";
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative scroll-mt-20 py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-900/10 ${toneClass} ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

/** Small label above a heading. Letter-spacing/uppercase only in LTR (no tracking on Hebrew). */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`mb-3 text-sm font-medium text-neutral-700 ltr:uppercase ltr:tracking-[0.12em] ltr:text-xs ${className}`}>
      {children}
    </p>
  );
}

export function H2({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <h2
      id={id}
      className={`font-display text-3xl sm:text-4xl font-medium text-neutral-900 mb-4 ltr:tracking-tight text-balance ${className}`}
    >
      {children}
    </h2>
  );
}

export function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-base sm:text-lg text-neutral-700 max-w-3xl leading-relaxed ${className}`}>{children}</p>;
}
