import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/commercial/page-header";
import { CtaBand } from "@/components/commercial/cta-band";
import { Button } from "@/components/ui/button";

const faqs = [
  ["What is PrintExpress?", "PrintExpress is a SaaS platform that gives Xerox and printing shops a branded online customer portal for document printing orders."],
  ["Do shops get a unique website?", "Yes. Registered shops receive a unique URL slug, for example printexpress.in/vanakkam."],
  ["Do customers need to create an account?", "The intended customer experience allows customers to submit an order directly without a shop account."],
  ["What documents can customers upload?", "The supported formats are PDF, JPG, JPEG and PNG, subject to server-enforced type and size limits."],
  ["How are print prices calculated?", "The backend calculates prices using the shop's verified configuration and validated customer selections."],
  ["Can customers change their shop or price?", "No. The shop is verified server-side and prices and payment amounts cannot be accepted directly from the browser."],
  ["How does payment verification work?", "Razorpay payments will use signed webhook verification and server-side payment confirmation before a subscription or order is activated."],
  ["Does PrintExpress print the documents?", "Native printing belongs to the future Windows desktop application. The initial website securely prepares verified paid orders for that application."],
  ["Are documents public?", "No. Supabase private storage and short-lived, authorised document access protect uploaded files."],
  ["Is the Windows application included now?", "No. The Windows EXE is a separate development phase after the web and backend architecture is stable."],
];

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Frequently asked questions"
          title="Answers for shop owners"
          description="Understand the customer workflow, payment safety, document storage and implementation scope."
          actions={<Button variant="outline" render={<Link href="/contact" />} nativeButton={false}>Ask a question</Button>}
        />
        <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="divide-y divide-border border-y border-border">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="cursor-pointer list-none pr-8 font-medium marker:hidden">{question}<span className="float-right text-xl leading-5 text-muted-foreground transition-transform group-open:rotate-45" aria-hidden="true">+</span></summary>
                <p className="mt-3 pr-8 text-sm leading-7 text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
