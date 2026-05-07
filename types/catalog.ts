export type BoxOption = {
  slug: string;
  name: string;
  displayName: string;
  pieces: number;
  price: number;
  description: string;
};

export type FlavorCategory = "classic" | "exotic";

export type Flavor = {
  name: string;
  category: FlavorCategory;
  image: string;
  modelPath?: string;
  notes?: string;
  description?: string;
};

export type PaymentMethod = "bank_transfer" | "cash_on_delivery";
