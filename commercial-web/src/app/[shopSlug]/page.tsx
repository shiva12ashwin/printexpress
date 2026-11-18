import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ShopOrdering } from "@/components/shop/shop-ordering";
import { sampleShops } from "../../../../shop-website/data/shops";

type PageProps = {
  params: Promise<{ shopSlug: string }>;
};

export function generateStaticParams() {
  return Object.keys(sampleShops).map((shopSlug) => ({ shopSlug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { shopSlug } = await params;
  const shop = sampleShops[shopSlug];
  if (!shop) return { title: "Shop not found | PrintExpress" };
  return {
    title: `${shop.name} | PrintExpress`,
    description: `Upload documents and configure print orders for ${shop.name}.`,
  };
}

export default async function ShopPage({ params }: PageProps) {
  const { shopSlug } = await params;
  const shop = sampleShops[shopSlug];
  if (!shop) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar shopName={shop.name} />
      <main className="flex-1">
        <ShopOrdering shop={shop} />
      </main>
      <Footer />
    </div>
  );
}
