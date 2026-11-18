import Link from "next/link";
import {
  ArrowRight,
  BadgeIndianRupee,
  FileText,
  LockKeyhole,
  MonitorCog,
  Printer,
  ScanLine,
  ShieldCheck,
  Store,
  UploadCloud,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CtaBand } from "@/components/commercial/cta-band";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_0.82fr]">
          <div>
            <Badge variant="secondary" className="mb-5">Built for local print businesses</Badge>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
              Turn every Xerox shop into an online printing store.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              PrintExpress gives customers one simple place to upload documents, choose print settings and pay. Shops receive verified, paid orders ready for print.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" render={<Link href="/register" />} nativeButton={false}>
                Register your shop
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
              <Button size="lg" variant="outline" render={<Link href="/how-it-works" />} nativeButton={false}>
                See how it works
              </Button>
            </div>
          </div>

          <Card className="border-primary/15 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-lg bg-primary text-primary-foreground">
                    <Printer className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <CardTitle>Vanakkam Xerox</CardTitle>
                    <CardDescription>printexpress.in/vanakkam</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">Online</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-md bg-secondary"><UploadCloud className="size-4" aria-hidden="true" /></span>
                  <div><p className="text-sm font-medium">Project-report.pdf</p><p className="text-xs text-muted-foreground">24 pages · 1.8 MB</p></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-muted p-3"><p className="text-muted-foreground">Print</p><p className="mt-1 font-medium">B&amp;W, double-sided</p></div>
                <div className="rounded-lg bg-muted p-3"><p className="text-muted-foreground">Copies</p><p className="mt-1 font-medium">2 copies</p></div>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">Estimated total</span>
                <span className="text-xl font-semibold">₹96</span>
              </div>
              <Button className="w-full" disabled>Pay securely — preview</Button>
            </CardContent>
          </Card>
        </section>

        <section className="border-y border-border bg-muted/20">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-primary">One platform, complete order flow</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Everything a printing shop needs to accept orders online</h2>
            </div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                [Store, "Shop-specific website", "Get a dedicated storefront at printexpress.in/your-shop."],
                [UploadCloud, "Secure documents", "Customers upload PDF, JPG, JPEG and PNG files to private storage."],
                [BadgeIndianRupee, "Controlled pricing", "Configure paper sizes and print options with server-calculated totals."],
                [ScanLine, "QR-to-order", "Turn your counter QR code into a direct route to your shop."],
                [MonitorCog, "Desktop-ready orders", "Paid and verified orders are organised for the future Windows EXE."],
                [LockKeyhole, "Payment-safe workflow", "Razorpay webhooks verify payment before an order becomes active."],
              ].map(([Icon, title, description]) => (
                <Card key={title as string}>
                  <CardHeader>
                    <span className="grid size-10 place-items-center rounded-lg bg-secondary"><Icon className="size-5 text-primary" aria-hidden="true" /></span>
                    <CardTitle>{title as string}</CardTitle>
                    <CardDescription>{description as string}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1fr]">
            <div>
              <Badge variant="outline">Three simple steps</Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">From QR code to verified print order</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["01", "Customer opens the shop", "They scan a QR code or visit your unique PrintExpress URL."],
                ["02", "Print options are selected", "Documents, paper size, sides, colour and copies are configured."],
                ["03", "Payment is verified", "The backend verifies payment and marks the order ready for the shop."],
              ].map(([step, title, description]) => (
                <div key={step} className="border-t border-border pt-5">
                  <span className="text-sm font-medium text-primary">{step}</span>
                  <h3 className="mt-3 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-primary">Security by design</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Customer documents stay private</h2>
              <p className="mt-4 text-muted-foreground">Shop and platform records remain separated, with server-verified ownership and private document storage.</p>
            </div>
            <div className="grid gap-3">
              {[
                [ShieldCheck, "Verified payment state", "Frontend payment success is never enough to activate an order."],
                [LockKeyhole, "Shop-wise isolation", "Every operational record belongs to an authenticated shop context."],
                [FileText, "Signed document access", "Private files use short-lived URLs and authorised retrieval."],
              ].map(([Icon, title, description]) => (
                <div key={title as string} className="flex gap-3 rounded-lg border border-border p-4">
                  <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <div><p className="font-medium">{title as string}</p><p className="mt-1 text-sm text-muted-foreground">{description as string}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div><Badge variant="outline">Subscription plans</Badge><h2 className="mt-4 text-3xl font-semibold tracking-tight">A plan for every stage of your shop</h2></div>
            <Button variant="outline" render={<Link href="/pricing" />} nativeButton={false}>View detailed pricing</Button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Starter", "For a single shop", "₹799", "One shop website"],
              ["Growth", "For expanding locations", "₹1,499", "Advanced reporting"],
              ["Business", "For multi-counter shops", "₹2,499", "Priority support"],
            ].map(([name, audience, price, feature]) => (
              <Card key={name}>
                <CardHeader><Badge variant="secondary" className="w-fit">{audience}</Badge><CardTitle>{name}</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-semibold">{price}<span className="text-sm font-normal text-muted-foreground"> / month</span></p><p className="mt-4 text-sm text-muted-foreground">{feature}</p></CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-muted/20">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
            <div className="grid gap-8 md:grid-cols-[0.7fr_1fr]">
              <div><p className="text-sm font-medium text-primary">Common questions</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Clear answers before you begin</h2></div>
              <div className="divide-y divide-border">
                {[
                  ["Do customers need an account?", "No. Customers open the shop URL or scan the QR code and begin an order directly."],
                  ["Is payment verified securely?", "Customer and subscription payments are verified on the backend before activation."],
                  ["Can I configure my own prices?", "Yes. Printing prices and supported services are intended to be shop-specific."],
                ].map(([question, answer]) => (
                  <details key={question} className="group py-4">
                    <summary className="cursor-pointer list-none font-medium marker:hidden">{question}<span className="float-right text-muted-foreground group-open:rotate-45">+</span></summary>
                    <p className="mt-3 pr-8 text-sm leading-6 text-muted-foreground">{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
