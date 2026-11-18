"use client"

import { useMemo, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import type { ShopProfile } from "../../../../shop-website/data/shops";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DocumentUpload } from "./document-upload";
import { PrintOptions, type PrintOptionsValue } from "./print-options";
import { OrderSummary } from "./order-summary";
import { OrderConfirmation } from "./order-confirmation";

type ShopOrderingProps = {
  shop: ShopProfile;
};

export function ShopOrdering({ shop }: ShopOrderingProps) {
  const [file, setFile] = useState<File | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [options, setOptions] = useState<PrintOptionsValue>({
    paperSize: shop.paperSizes[0] ?? "A4",
    printType: "bw",
    sides: "single",
    copies: 1,
    pageMode: "all",
    pageRange: "",
  });

  const estimatedPrice = useMemo(() => {
    const paperPrices: Record<string, number> = { A5: 2, A4: 3, Letter: 3, Legal: 5, Executive: 4, A3: 8 };
    const paper = paperPrices[options.paperSize] ?? 3;
    const print = options.printType === "colour" ? paper * 3 : paper;
    const sides = options.sides === "double" ? 0.85 : 1;
    return Math.max(1, Math.round(print * sides * options.copies));
  }, [options]);

  const canSubmit = Boolean(
    file &&
    customerName.trim().length >= 2 &&
    customerPhone.trim().length >= 7 &&
    (options.pageMode === "all" || options.pageRange.trim().length > 0)
  );

  function reset() {
    setSubmitted(false);
    setFile(null);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
  }

  if (submitted) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-16">
        <OrderConfirmation shopName={shop.name} onReset={reset} />
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 sm:px-8 sm:py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-primary text-lg font-semibold text-primary-foreground" aria-label={`${shop.name} logo`}>{shop.initials}</div>
            <div>
              <Badge variant="secondary" className="mb-2">Staging shop profile</Badge>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{shop.name}</h1>
            </div>
          </div>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <p className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" /><span>{shop.address}</span></p>
            <p className="flex items-center gap-2"><Phone className="size-4 shrink-0" aria-hidden="true" />{shop.phone}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Printing services</CardTitle>
                <CardDescription>Available services at this shop.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                {shop.services.map((service) => (
                  <div key={service.name} className="rounded-lg border border-border p-3">
                    <p className="text-sm font-medium">{service.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{service.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="grid gap-8 p-5 sm:p-6">
                <DocumentUpload onFileChange={setFile} />
                <div className="h-px bg-border" />
                <PrintOptions value={options} paperSizes={shop.paperSizes} onChange={setOptions} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Your contact details</CardTitle>
                <CardDescription>Used only for this print order in the connected backend.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="customer-name">Full name *</Label>
                  <Input id="customer-name" value={customerName} onChange={(event) => setCustomerName(event.target.value)} required autoComplete="name" placeholder="Enter your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="customer-phone">Phone number *</Label>
                  <Input id="customer-phone" type="tel" value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} required pattern="[0-9+ ()-]{7,20}" autoComplete="tel" placeholder="+91 98765 43210" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="customer-email">Email (optional)</Label>
                  <div className="relative"><Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" aria-hidden="true" /><Input id="customer-email" type="email" value={customerEmail} onChange={(event) => setCustomerEmail(event.target.value)} autoComplete="email" className="pl-9" placeholder="you@example.com" /></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <OrderSummary
            estimatedPrice={estimatedPrice}
            options={options}
            fileName={file?.name ?? ""}
            canSubmit={canSubmit}
            onSubmit={() => setSubmitted(true)}
          />
        </div>
      </section>
    </>
  );
}
