import Link from "next/link";
import { Printer } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Link href="/" className="flex items-center gap-2.5 font-semibold">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Printer className="size-4" aria-hidden="true" />
            </span>
            PrintExpress
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Digital printing orders, subscriptions and shop operations in one secure platform.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground" aria-label="Footer">
          <Link className="hover:text-foreground" href="/features">Features</Link>
          <Link className="hover:text-foreground" href="/how-it-works">How it works</Link>
          <Link className="hover:text-foreground" href="/pricing">Pricing</Link>
          <Link className="hover:text-foreground" href="/contact">Contact</Link>
          <Link className="hover:text-foreground" href="/faq">FAQ</Link>
        </nav>
      </div>
    </footer>
  );
}
