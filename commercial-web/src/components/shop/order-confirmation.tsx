"use client"

import { CheckCircle2, Clock3, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type OrderConfirmationProps = {
  shopName: string;
  onReset: () => void;
};

export function OrderConfirmation({ shopName, onReset }: OrderConfirmationProps) {
  return (
    <Card>
      <CardHeader>
        <Badge variant="secondary" className="mb-3 w-fit">Demo order state</Badge>
        <span className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary"><Printer className="size-6" aria-hidden="true" /></span>
        <CardTitle className="mt-2 text-2xl">Order details ready</CardTitle>
        <p className="text-sm text-muted-foreground">This is not a confirmed or paid order. Payment verification and real order creation are pending backend integration.</p>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Shop</p>
          <p className="mt-1 font-medium">{shopName}</p>
        </div>

        <ol className="mt-6 grid gap-4" aria-label="Order tracking states">
          {[
            ["Order setup complete", "Demo details were validated in the browser", CheckCircle2],
            ["Payment awaiting verification", "Razorpay webhook verification is not connected", Clock3],
            ["Ready for shop printer", "Available only after verified payment", Printer],
          ].map(([title, description, Icon], index) => (
            <li key={title as string} className="flex gap-3">
              <span className={`grid size-8 shrink-0 place-items-center rounded-full ${index === 0 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                {(() => { const StateIcon = Icon as typeof CheckCircle2; return <StateIcon className="size-4" aria-hidden="true" />; })()}
              </span>
              <div><p className="text-sm font-medium">{title as string}</p><p className="mt-0.5 text-xs text-muted-foreground">{description as string}</p></div>
            </li>
          ))}
        </ol>
        <Button variant="outline" className="mt-6 w-full" onClick={onReset}>Create another order</Button>
      </CardContent>
    </Card>
  );
}
