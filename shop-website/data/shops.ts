export type ShopService = {
  name: string;
  description: string;
};

export type ShopProfile = {
  slug: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  initials: string;
  services: ShopService[];
  paperSizes: string[];
};

export const sampleShops: Record<string, ShopProfile> = {
  vanakkam: {
    slug: "vanakkam",
    name: "Vanakkam Xerox",
    address: "12 Market Road, Chennai, Tamil Nadu 600002",
    phone: "+91 98765 43210",
    email: "orders@vanakkamxerox.example",
    initials: "VX",
    services: [
      { name: "Document printing", description: "Reports, notices and office documents" },
      { name: "Photo printing", description: "Passport and standard photo sizes" },
      { name: "Scanning", description: "Document and receipt scanning" },
      { name: "Binding", description: "Spiral and soft binding" },
    ],
    paperSizes: ["A4", "A3", "A5", "Legal"],
  },
  fastprint: {
    slug: "fastprint",
    name: "Fastprint",
    address: "8 Central Bazaar, Coimbatore, Tamil Nadu 641001",
    phone: "+91 98421 55670",
    email: "hello@fastprint.example",
    initials: "FP",
    services: [
      { name: "Quick document printing", description: "Fast everyday document output" },
      { name: "Colour printing", description: "Presentations and marketing sheets" },
      { name: "Lamination", description: "A4 and certificate lamination" },
      { name: "Photo printing", description: "Glossy and matte photo output" },
    ],
    paperSizes: ["A4", "A3", "A5", "Letter"],
  },
  cityxerox: {
    slug: "cityxerox",
    name: "City Xerox",
    address: "45 College Street, Madurai, Tamil Nadu 625001",
    phone: "+91 94433 21880",
    email: "support@cityxerox.example",
    initials: "CX",
    services: [
      { name: "Academic printing", description: "Assignments and project reports" },
      { name: "Black-and-white printing", description: "High-volume document printing" },
      { name: "Colour printing", description: "Charts and presentation prints" },
      { name: "Binding", description: "Soft and hard cover binding" },
    ],
    paperSizes: ["A4", "A3", "A5", "Legal", "Executive"],
  },
};
