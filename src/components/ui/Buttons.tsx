import Link from "next/link";
import type { ReactNode } from "react";

type Common = {
  href: string;
  children: ReactNode;
  track?: string;
  prefill?: "visit" | "donor" | "pdf";
  className?: string;
  /** Plain <a> (files, external). Default: next/link for internal routes. */
  external?: boolean;
  download?: boolean;
  ariaLabel?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 px-5 py-3 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 text-center";

const styles = {
  primary: `${base} bg-neutral-900 text-white hover:bg-neutral-700`,
  secondary: `${base} border border-neutral-900/30 text-neutral-900 bg-white/60 hover:border-neutral-900 hover:bg-white`,
  text: "inline-flex items-center gap-1 text-[15px] font-medium text-neutral-900 underline underline-offset-4 decoration-neutral-900/30 hover:decoration-neutral-900",
};

function Btn({ variant, href, children, track, prefill, className = "", external, download, ariaLabel }: Common & { variant: keyof typeof styles }) {
  const props = {
    className: `${styles[variant]} ${className}`,
    "data-track": track,
    "data-prefill": prefill,
    "aria-label": ariaLabel,
  };
  if (external || href.startsWith("#") || download) {
    return (
      <a href={href} {...props} download={download ? "" : undefined}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

export const PrimaryButton = (p: Common) => <Btn variant="primary" {...p} />;
export const SecondaryButton = (p: Common) => <Btn variant="secondary" {...p} />;
export const TextLink = (p: Common) => <Btn variant="text" {...p} />;
