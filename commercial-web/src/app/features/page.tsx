import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/commercial/page-header";
import { CtaBand } from "@/components/commercial/cta-band";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CloudUpload, FileCheck2, Globe2, LockKeyhole, MonitorCog, ReceiptIndianRupee, Settings2, Store } from "lucide-react";

const features = [
  [Globe2, "Dedicated shop storefront", "Publish a branded customer page at printexpress.in/your-shop using a verified URL slug."],
  [CloudUpload, "Private document upload", "Accept PDF, JPG, JPEG and PNG documents through authenticated and size-limited uploads."],
  [Settings2, "Flexible print settings", "Configure paper size, single or double-sided, colour or B&W and available print services."],
  [ReceiptIndianRupee, "Server-calculated pricing", "Keep shop prices authoritative and calculate totals from validated print selections."],
  [FileCheck2, "Verified order lifecycle", "Move customer orders from submitted to paid and ready using signed payment confirmations."],
  [MonitorCog, "Windows EXE compatibility", "Organise verified paid orders for secure retrieval by the future shop desktop application."],
  [LockKeyhole, "Cross-shop isolation", "Apply shop identity and authorization on every order, document and configuration request."],
  [Store, "Subscription control", "Manage shop activation, subscription expiry and license entitlement from the Admin Database."],
];

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Platform features"
          title="One workflow for shops and their customers"
          description="PrintExpress combines a customer storefront, private document handling, controlled pricing and verified order status in a focused SaaS platform."
          actions={<><Button render={<Link href="/register" />} nativeButton={false}>Register shop</Button><Button variant="outline" render={<Link href="/how-it-works" />} nativeButton={false}>How it works</Button></>}
        />
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(([Icon, title, description]) => {
              const FeatureIcon = Icon as typeof Globe2;
              return (
                <Card key={title as string}>
                  <CardHeader>
                    <span className="grid size-10 place-items-center rounded-lg bg-secondary"><FeatureIcon className="size-5 text-primary" aria-hidden="true" /></span>
                    <CardTitle>{title as string}</CardTitle>
                    <CardDescription>{description as string}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
