import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { PrintOptionsValue } from "./print-options";

type OrderSummaryProps = {
  estimatedPrice: number;
  options: PrintOptionsValue;
  fileName: string;
  canSubmit: boolean;
  onSubmit: () => void;
};

export function OrderSummary({ estimatedPrice, options, fileName, canSubmit, onSubmit }: OrderSummaryProps) {
  return (
    <Card className="lg:sticky lg:top-24">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>Order summary</CardTitle>
          <Badge variant="secondary">Estimate</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-3 text-sm">
          <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Document</dt><dd className="max-w-[190px] truncate font-medium">{fileName || "Not uploaded"}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Paper</dt><dd className="font-medium">{options.paperSize}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Print</dt><dd className="font-medium">{options.printType === "bw" ? "Black & white" : "Colour"}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Sides</dt><dd className="font-medium">{options.sides === "single" ? "Single-sided" : "Double-sided"}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Copies</dt><dd className="font-medium">{options.copies}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Pages</dt><dd className="font-medium">{options.pageMode === "all" ? "All pages" : options.pageRange || "Set range"}</dd></div>
        </dl>
        <Separator className="my-5" />
        <div className="flex items-end justify-between">
          <div><p className="text-sm text-muted-foreground">Estimated total</p><p className="mt-1 text-xs text-muted-foreground">Before server calculation</p></div>
          <p className="text-2xl font-semibold">₹{estimatedPrice}</p>
        </div>
        <Button type="submit" className="mt-5 w-full" disabled={!canSubmit} onClick={onSubmit}>
          Continue to payment
        </Button>
        <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">Payment and confirmation require backend verification.</p>
      </CardContent>
    </Card>
  );
}
