"use client"

import { useState } from "react";
import Link from "next/link";
import { Check, Mail, MessageSquare, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/commercial/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Contact"
          title="Talk with the PrintExpress team"
          description="Ask about shop registration, subscription fit or onboarding. This staging form does not send data until the contact backend is connected."
        />
        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.7fr_1fr]">
          <div className="grid content-start gap-4">
            <Card size="sm">
              <CardHeader>
                <Mail className="size-5 text-primary" aria-hidden="true" />
                <CardTitle>Email</CardTitle>
                <CardDescription>Support is being prepared for production setup.</CardDescription>
              </CardHeader>
            </Card>
            <Card size="sm">
              <CardHeader>
                <Phone className="size-5 text-primary" aria-hidden="true" />
                <CardTitle>Shop onboarding</CardTitle>
                <CardDescription>Use the form to describe your shop and print operation.</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send an enquiry</CardTitle>
              <CardDescription>Required fields are marked with an asterisk.</CardDescription>
            </CardHeader>
            <CardContent>
              {submitted && (
                <Alert className="mb-6 border-primary/20 bg-primary/5">
                  <Check className="text-primary" aria-hidden="true" />
                  <AlertTitle>Form validated</AlertTitle>
                  <AlertDescription>Backend delivery is pending integration. Your details were not sent.</AlertDescription>
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
                  <div className="grid gap-2"><Label htmlFor="contact-name">Name *</Label><Input id="contact-name" name="name" required minLength={2} autoComplete="name" /></div>
                  <div className="grid gap-2"><Label htmlFor="contact-email">Email *</Label><Input id="contact-email" name="email" type="email" required autoComplete="email" /></div>
                </div>
                <div className="grid gap-2"><Label htmlFor="contact-phone">Phone</Label><Input id="contact-phone" name="phone" type="tel" autoComplete="tel" pattern="[0-9+ ()-]{7,20}" /></div>
                <div className="grid gap-2"><Label htmlFor="contact-message">Message *</Label><Textarea id="contact-message" name="message" required minLength={20} rows={5} className="min-h-32" /></div>
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <Button variant="outline" render={<Link href="/" />} nativeButton={false}>Cancel</Button>
                  <Button type="submit"><MessageSquare data-icon="inline-start" aria-hidden="true" />Submit enquiry</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
