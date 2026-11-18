"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export type PrintOptionsValue = {
  paperSize: string;
  printType: "bw" | "colour";
  sides: "single" | "double";
  copies: number;
  pageMode: "all" | "range";
  pageRange: string;
};

type PrintOptionsProps = {
  value: PrintOptionsValue;
  paperSizes: string[];
  onChange: (value: PrintOptionsValue) => void;
};

export function PrintOptions({ value, paperSizes, onChange }: PrintOptionsProps) {
  function update<K extends keyof PrintOptionsValue>(key: K, next: PrintOptionsValue[K]) {
    onChange({ ...value, [key]: next });
  }

  return (
    <section aria-labelledby="options-heading">
      <div className="mb-4">
        <p id="options-heading" className="font-semibold">2. Printing options</p>
        <p className="mt-1 text-sm text-muted-foreground">Choose how the document should be printed.</p>
      </div>

      <div className="grid gap-5">
        <fieldset className="grid gap-2">
          <legend><Label>Paper size</Label></legend>
          <select
            value={value.paperSize}
            onChange={(event) => update("paperSize", event.target.value)}
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
          >
            {paperSizes.map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
        </fieldset>

        <fieldset className="grid gap-2">
          <legend><Label>Print style</Label></legend>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["bw", "Black & white"],
              ["colour", "Colour"],
            ].map(([key, label]) => (
              <label key={key} className={`flex min-h-11 cursor-pointer items-center justify-center rounded-lg border px-3 text-sm font-medium ${value.printType === key ? "border-primary bg-primary/5 text-primary" : "border-border"}`}>
                <input type="radio" name="print-type" value={key} checked={value.printType === key} onChange={() => update("printType", key as "bw" | "colour")} className="sr-only" />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="grid gap-2">
          <legend><Label>Sides</Label></legend>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["single", "Single-sided"],
              ["double", "Double-sided"],
            ].map(([key, label]) => (
              <label key={key} className={`flex min-h-11 cursor-pointer items-center justify-center rounded-lg border px-3 text-sm font-medium ${value.sides === key ? "border-primary bg-primary/5 text-primary" : "border-border"}`}>
                <input type="radio" name="sides" value={key} checked={value.sides === key} onChange={() => update("sides", key as "single" | "double")} className="sr-only" />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-2">
          <Label htmlFor="copies">Number of copies</Label>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => update("copies", Math.max(1, value.copies - 1))} className="grid size-10 place-items-center rounded-lg border border-border text-lg" aria-label="Decrease copies">−</button>
            <Input id="copies" type="number" min={1} max={100} value={value.copies} onChange={(event) => update("copies", Math.max(1, Math.min(100, Number(event.target.value) || 1)))} className="h-10 text-center" />
            <button type="button" onClick={() => update("copies", Math.min(100, value.copies + 1))} className="grid size-10 place-items-center rounded-lg border border-border text-lg" aria-label="Increase copies">+</button>
          </div>
        </div>

        <fieldset className="grid gap-2">
          <legend><Label>Pages</Label></legend>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["all", "All pages"],
              ["range", "Custom range"],
            ].map(([key, label]) => (
              <label key={key} className={`flex min-h-11 cursor-pointer items-center justify-center rounded-lg border px-3 text-sm font-medium ${value.pageMode === key ? "border-primary bg-primary/5 text-primary" : "border-border"}`}>
                <input type="radio" name="pages" value={key} checked={value.pageMode === key} onChange={() => update("pageMode", key as "all" | "range")} className="sr-only" />
                {label}
              </label>
            ))}
          </div>
          {value.pageMode === "range" && (
            <div className="mt-1 grid gap-2">
              <Label htmlFor="page-range">Page range</Label>
              <Input id="page-range" value={value.pageRange} onChange={(event) => update("pageRange", event.target.value)} placeholder="Example: 1-5, 8" />
            </div>
          )}
        </fieldset>
      </div>
    </section>
  );
}
