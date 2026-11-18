import Link from "next/link";
import { Menu, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type NavbarProps = {
  shopName?: string;
};

export function Navbar({ shopName }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Primary">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Printer className="size-4.5" aria-hidden="true" />
          </span>
          <span>{shopName ?? "PrintExpress"}</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" render={<Link href="/features" />} nativeButton={false}>Features</Button>
          <Button variant="ghost" render={<Link href="/how-it-works" />} nativeButton={false}>How it works</Button>
          <Button variant="ghost" render={<Link href="/pricing" />} nativeButton={false}>Pricing</Button>
          <Button variant="outline" render={<Link href="/login" />} nativeButton={false}>Log in</Button>
          <Button render={<Link href="/register" />} nativeButton={false}>Start printing</Button>
        </div>
        <Dialog>
          <DialogTrigger
            render={<Button variant="ghost" size="icon" aria-label="Open navigation menu" />}
          >
            <Menu aria-hidden="true" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Navigation</DialogTitle>
            </DialogHeader>
            <nav className="grid gap-2" aria-label="Mobile navigation">
              <Button variant="ghost" render={<Link href="/features" />} nativeButton={false}>Features</Button>
              <Button variant="ghost" render={<Link href="/how-it-works" />} nativeButton={false}>How it works</Button>
              <Button variant="ghost" render={<Link href="/pricing" />} nativeButton={false}>Pricing</Button>
              <Button variant="ghost" render={<Link href="/faq" />} nativeButton={false}>FAQ</Button>
              <Button variant="ghost" render={<Link href="/contact" />} nativeButton={false}>Contact</Button>
              <Button variant="outline" render={<Link href="/login" />} nativeButton={false}>Log in</Button>
              <Button render={<Link href="/register" />} nativeButton={false}>Register your shop</Button>
            </nav>
          </DialogContent>
        </Dialog>
      </nav>
    </header>
  );
}
