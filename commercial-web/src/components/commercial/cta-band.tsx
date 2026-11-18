import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="rounded-xl border border-primary/20 bg-primary/[0.035] px-6 py-10 sm:px-10 sm:py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Ready to move online?</p>
            <h2 className="mt-2 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
              Give every customer an easier way to submit print orders.
            </h2>
          </div>
          <Button size="lg" render={<Link href="/register" />} nativeButton={false}>
            Register your shop
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
