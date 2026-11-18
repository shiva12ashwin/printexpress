import Link from "next/link";
import { Check } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/commercial/page-header";
import { CtaBand } from "@/components/commercial/cta-band";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  { name: "Starter", price: "₹799", description: "For independent Xerox and print shops.", features: ["One shop website", "Customer document uploads", "Core print configuration", "Verified paid orders"] },
  { name: "Growth", price: "₹1,499", description: "For shops ready to increase digital orders.", features: ["Everything in Starter", "Shop-specific reporting", "Expanded print services", "Operational order workflows"], featured: true },
  { name: "Business", price: "₹2,499", description: "For busy shops with demanding counter teams.", features: ["Everything in Growth", "Priority support", "Additional configuration", "Commercial onboarding support"] },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Subscription pricing"
          title="Simple plans for growing printing shops"
          description="Choose the subscription level that matches your shop operation. Final plan inclusions and billing periods must be confirmed before checkout."
        />
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="grid items-stretch gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.name} className={plan.featured ? "border-primary/30" : undefined}>
                <CardHeader>
                  {plan.featured && <Badge className="mb-2 w-fit">Popular</Badge>}
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-semibold">{plan.price}<span className="ml-1 text-sm font-normal text-muted-foreground">/ month</span></p>
                  <div className="my-6 h-px bg-border" />
                  <ul className="grid gap-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />{feature}</li>
                    ))}
                  </ul>
                  <Button className="mt-7 w-full" variant={plan.featured ? "default" : "outline"} render={<Link href="/register" />} nativeButton={false}>Choose {plan.name}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-5 text-center text-sm text-muted-foreground">Pricing is a staging preview. Subscription checkout and Razorpay verification require backend integration.</p>
        </section>
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
