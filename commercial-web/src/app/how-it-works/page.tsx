import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/commercial/page-header";
import { CtaBand } from "@/components/commercial/cta-band";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Building2, CreditCard, Printer, QrCode, Upload, Settings2 } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="How it works"
          title="From shop registration to verified print order"
          description="PrintExpress keeps the shop owner workflow and customer printing workflow clear, accountable and separate."
          actions={<Button render={<Link href="/register" />} nativeButton={false}>Set up a shop</Button>}
        />

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <Badge variant="outline">Shop owners</Badge>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              [Building2, "Create an account", "Register the owner and enter verified shop contact details."],
              [Settings2, "Choose a plan", "Select the subscription that fits the shop's expected operation."],
              [CreditCard, "Complete subscription payment", "Razorpay verifies the payment before the account is activated."],
              [Printer, "Start receiving orders", "Configure services and share the shop URL or QR code."],
            ].map(([Icon, title, description], index) => {
              const StepIcon = Icon as typeof Building2;
              return (
                <Card key={title as string}>
                  <CardHeader>
                    <div className="flex items-center justify-between"><StepIcon className="size-5 text-primary" aria-hidden="true" /><span className="text-xs font-medium text-muted-foreground">0{index + 1}</span></div>
                    <CardTitle>{title as string}</CardTitle>
                    <CardDescription>{description as string}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="border-y border-border bg-muted/20">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
            <Badge variant="outline">Customers</Badge>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                [QrCode, "Open the correct shop", "Scan a printed QR code or open the verified shop slug."],
                [Upload, "Upload and configure", "Add a document, select paper and printing preferences, then review the total."],
                [CreditCard, "Pay and track", "Complete Razorpay payment and receive an order status after webhook verification."],
              ].map(([Icon, title, description]) => {
                const StepIcon = Icon as typeof QrCode;
                return (
                  <Card key={title as string}>
                    <CardHeader>
                      <StepIcon className="size-5 text-primary" aria-hidden="true" />
                      <CardTitle>{title as string}</CardTitle>
                      <CardDescription>{description as string}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <Card>
            <CardContent className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
              <div><CardTitle>Backend verification is part of the workflow</CardTitle><p className="mt-2 text-sm text-muted-foreground">Subscription activation and paid customer orders will be triggered only after server-side verification.</p></div>
              <Button variant="outline" render={<Link href="/features" />} nativeButton={false}>Explore features <ArrowRight data-icon="inline-end" aria-hidden="true" /></Button>
            </CardContent>
          </Card>
        </section>
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
