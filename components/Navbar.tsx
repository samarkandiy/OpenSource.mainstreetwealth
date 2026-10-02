"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { HubLockup } from "./Logo";

type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

const NAV: NavItem[] = [
  { href: "/directory", label: "Directory" },
  { href: "/docs", label: "Docs" },
  { href: "/about", label: "About" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/community", label: "Community" },
  { href: "https://di.mainstreetwealth.ai/", label: "DealIntel", external: true },
  { href: "https://mainstreetwealth.ai/contact", label: "Contact", external: true },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // Close menu on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-white/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center gap-4">
        <Link href="/" className="no-underline">
          <HubLockup />
        </Link>
        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center gap-0.5 md:flex"
        >
          {NAV.map((item) => {
            const active =
              !item.external &&
              (pathname === item.href ||
                pathname?.startsWith(item.href + "/"));
            const commonClass = `inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-sm font-medium no-underline transition ${
              active
                ? "bg-surface-muted text-ink"
                : "text-ink/70 hover:bg-surface-muted hover:text-ink"
            }`;
            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={commonClass}
                >
                  {item.label}
                  <ExternalIcon className="h-3 w-3 text-ink/40" />
                </a>
              );
            }
            return (
              <Link key={item.href} href={item.href} className={commonClass}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/github" className="btn-secondary">
            <GithubIcon className="h-4 w-4" />
            GitHub
          </Link>
          <a
            href="https://mainstreetwealth.ai/valuation"
            className="btn-brand"
            target="_blank"
            rel="noreferrer"
          >
            Free valuation
          </a>
        </div>
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink md:hidden"
        >
          <MenuIcon open={open} />
        </button>
      </div>
      {/* Mobile menu */}
      <div
        className={`${open ? "block" : "hidden"} border-t border-line/60 bg-white md:hidden`}
      >
        <div className="container-page flex flex-col gap-1 py-3">
          {NAV.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-ink/80 no-underline hover:bg-surface-muted"
              >
                <span>{item.label}</span>
                <ExternalIcon className="h-3 w-3 text-ink/40" />
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 no-underline hover:bg-surface-muted"
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/github"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 no-underline hover:bg-surface-muted"
          >
            GitHub
          </Link>
          <a
            href="https://mainstreetwealth.ai/valuation"
            className="btn-brand mt-2 w-full"
            target="_blank"
            rel="noreferrer"
          >
            Free valuation
          </a>
        </div>
      </div>
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <>
          <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 4h4v4" />
      <path d="M16 4l-7 7" />
      <path d="M14 11v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4" />
    </svg>
  );
}
