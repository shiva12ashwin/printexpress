"use client"

import { useState } from "react";
import Link from "next/link";
import { Check, Printer } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20 px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.65fr_1fr]">
          <div className="lg:py-8">
            <span className="grid size-11 place-items-center rounded-lg bg-primary text-primary-foreground"><Printer className="size-5" aria-hidden="true" /></span>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Register your printing shop</h1>
            <p className="mt-4 max-w-md text-muted-foreground">Create the starting profile for your shop&apos;s own online printing page.</p>
            <ol className="mt-8 grid gap-4 text-sm">
              {["Account and shop information", "Subscription plan selection", "Secure Razorpay payment", "Verified activation and unique shop URL"].map((item, index) => (
                <li key={item} className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-full border border-border bg-background text-xs font-medium">{index + 1}</span>{item}</li>
              ))}
            </ol>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Shop registration</CardTitle>
              <CardDescription>Registration and subscription activation are not available until backend integration.</CardDescription>
            </CardHeader>
            <CardContent>
              {submitted && (
                <Alert className="mb-5 border-primary/20 bg-primary/5">
                  <Check className="text-primary" aria-hidden="true" />
                  <AlertTitle>Registration details validated</AlertTitle>
                  <AlertDescription>No account or payment was created. Backend registration and Razorpay checkout require integration.</AlertDescription>
                </Alert>
              )}
              <form
                className="grid gap-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2"><Label htmlFor="owner-name">Owner name *</Label><Input id="owner-name" required minLength={2} autoComplete="name" /></div>
                  <div className="grid gap-2"><Label htmlFor="shop-name">Shop name *</Label><Input id="shop-name" required minLength={2} /></div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2"><Label htmlFor="register-email">Email *</Label><Input id="register-email" type="email" required autoComplete="email" /></div>
                  <div className="grid gap-2"><Label htmlFor="register-phone">Phone *</Label><Input id="register-phone" type="tel" required pattern="[0-9+ ()-]{7,20}" autoComplete="tel" /></div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="register-plan">Subscription plan *</Label>
                  <select id="register-plan" required className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50 dark:bg-input/30">
                    <option value="">Select a plan</option>
                    <option value="starter">Starter — ₹799/month</option>
                    <option value="growth">Growth — ₹1,499/month</option>
                    <option value="business">Business — ₹2,499/month</option>
                  </select>
                </div>
                <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <input type="checkbox" required className="mt-0.5 size-4 rounded border-input accent-primary" />
                  <span>I confirm that I am authorised to register this printing shop.</span>
                </label>
                <Button type="submit" className="w-full">Continue to subscription</Button>
              </form>
              <p className="mt-5 text-center text-sm text-muted-foreground">Already registered? <Link className="font-medium text-primary hover:underline" href="/login">Log in</Link></p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
