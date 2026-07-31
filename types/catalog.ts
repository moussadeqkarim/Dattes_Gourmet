export type BoxOption = {
  slug: string;
  name: string;
  displayName: string;
  pieces: number;
  price: number | null;
  image: string;
  description: string;
};

export type OrderableBoxOption = BoxOption & {
  price: number;
};

export type FlavorCategory = "chocolate" | "classic" | "sushi";

export type Flavor = {
  slug: string;
  name: string;
  category: FlavorCategory;
  categoryLabel: string;
  image: string;
  modelPath?: string;
  notes?: string;
  description?: string;
};

export type PaymentMethod = "bank_transfer" | "cash_on_delivery";
