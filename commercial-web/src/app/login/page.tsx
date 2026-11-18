"use client"

import { useState } from "react";
import Link from "next/link";
import { Printer } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center bg-muted/20 px-5 py-12 sm:px-8 sm:py-16">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader>
            <span className="mb-3 grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground"><Printer className="size-5" aria-hidden="true" /></span>
            <CardTitle className="text-2xl">Log in to PrintExpress</CardTitle>
            <CardDescription>Use your shop owner or platform account.</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted && (
              <Alert className="mb-5 border-primary/20 bg-primary/5">
                <AlertTitle>Login validation passed</AlertTitle>
                <AlertDescription>Authentication requires the Supabase and backend integration planned for a later phase.</AlertDescription>
              </Alert>
            )}
            <form
              className="grid gap-5"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid gap-2"><Label htmlFor="login-email">Email</Label><Input id="login-email" type="email" required autoComplete="email" /></div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between"><Label htmlFor="login-password">Password</Label><span className="text-xs text-muted-foreground">Minimum 8 characters</span></div>
                <Input id="login-password" type="password" required minLength={8} autoComplete="current-password" />
              </div>
              <Button type="submit" className="w-full">Continue</Button>
            </form>
            <p className="mt-5 text-center text-sm text-muted-foreground">New shop? <Link className="font-medium text-primary hover:underline" href="/register">Register here</Link></p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
