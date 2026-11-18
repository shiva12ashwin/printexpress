"use client"

import { useState } from "react";
import { Check, Printer } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function DesignSystemPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-8 max-w-2xl">
          <Badge variant="secondary" className="mb-4">Foundation preview</Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">PrintExpress interface system</h1>
          <p className="mt-3 text-muted-foreground">A restrained, operational SaaS language built for shop owners and customers.</p>
        </div>

        {saved && (
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <Check className="text-primary" aria-hidden="true" />
            <AlertTitle>Settings saved</AlertTitle>
            <AlertDescription>The reusable form state was handled successfully.</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <Card>
            <CardHeader>
              <CardTitle>Shop profile</CardTitle>
              <CardDescription>Core details shown on the customer printing page.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSaved(true);
                }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="shop-name">Shop name</Label>
                  <Input id="shop-name" defaultValue="Vanakkam Xerox" aria-describedby="shop-name-help" />
                  <p id="shop-name-help" className="text-xs text-muted-foreground">Visible to customers on your shop page.</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-number">Contact number</Label>
                  <Input id="contact-number" type="tel" defaultValue="+91 98765 43210" />
                </div>
                <Separator />
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <Dialog>
                    <DialogTrigger render={<Button variant="outline" />} nativeButton={true}>Preview</DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Customer page preview</DialogTitle>
                        <DialogDescription>Customers can start an order from this shop profile.</DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                        <span className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                          <Printer className="size-5" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="font-medium">Vanakkam Xerox</p>
                          <p className="text-sm text-muted-foreground">Printing services</p>
                        </div>
                      </div>
                      <DialogFooter showCloseButton />
                    </DialogContent>
                  </Dialog>
                  <Button type="submit">Save changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="grid content-start gap-4">
            <Card size="sm">
              <CardHeader>
                <CardTitle>Colour</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-4 gap-2" aria-label="PrintExpress colour palette">
                <span className="h-14 rounded-lg bg-primary" title="Primary" />
                <span className="h-14 rounded-lg bg-secondary" title="Secondary" />
                <span className="h-14 rounded-lg border border-border bg-card" title="Surface" />
                <span className="h-14 rounded-lg bg-foreground" title="Ink" />
              </CardContent>
            </Card>
            <Card size="sm">
              <CardHeader>
                <CardTitle>States</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge>Active</Badge>
                <Badge variant="secondary">Draft</Badge>
                <Badge variant="outline">Review</Badge>
                <Badge variant="destructive">Failed</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
