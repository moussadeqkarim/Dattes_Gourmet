import type { BoxOption, Flavor } from "@/types/catalog";

export const BRAND_NAME = "Datte Gourmet";
export const BRAND_TAGLINE = "L'Art de la Datte";
export const WHATSAPP_HELP_TEXT = "Besoin d'aide ? Écrivez-nous sur WhatsApp";
export const TEMP_DATE_IMAGE = "/images/datte.png";
export const TEMP_HERO_DATE_IMAGE = "/images/datte-pistache.png";
export const TEMP_ROTATING_DATE_IMAGE = "/images/nobackgrounddate-clean.png";
export const DATE_MODEL_PATH = "/models/datte-pistache.glb";
export const CHOCOLATE_DATE_MODEL_PATH = "/models/datte-chocolat.glb";

export const boxes: BoxOption[] = [
  {
    slug: "piece-unique",
    name: "Single piece",
    displayName: "1 pièce",
    pieces: 1,
    price: 13,
    description: "Une bouchée précieuse pour découvrir une saveur au choix."
  },
  {
    slug: "boite-12-pieces",
    name: "Box 12 pieces",
    displayName: "Boîte de 12",
    pieces: 12,
    price: 190,
    description: "Un coffret élégant pour offrir ou composer une première dégustation."
  },
  {
    slug: "boite-18-pieces",
    name: "Box 18 pieces",
    displayName: "Boîte de 18",
    pieces: 18,
    price: 280,
    description: "Un assortiment généreux pour varier les familles et les textures."
  },
  {
    slug: "boite-21-pieces",
    name: "Box 21 pieces",
    displayName: "Boîte de 21",
    pieces: 21,
    price: 320,
    description: "Le format signature pour partager une sélection gourmande et raffinée."
  },
  {
    slug: "boite-35-pieces",
    name: "Box 35 pieces",
    displayName: "Boîte de 35",
    pieces: 35,
    price: 490,
    description: "Un grand coffret de réception, idéal pour une table élégante."
  },
  {
    slug: "boite-45-pieces",
    name: "Box 45 pieces",
    displayName: "Boîte de 45",
    pieces: 45,
    price: 650,
    description: "Le coffret prestige pour célébrer les grandes occasions."
  }
];

export const chocolateFlavors: Flavor[] = [
  {
    slug: "selou-caramel",
    name: "Selou Caramel",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: TEMP_DATE_IMAGE,
    notes: "Selou · Noix · Caramel beurre salé",
    description: "Selou croquant aux noix et caramel beurre salé, enrobée de chocolat au lait 85%."
  },
  {
    slug: "crunchy-gianduja",
    name: "Crunchy Gianduja",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: TEMP_DATE_IMAGE,
    modelPath: CHOCOLATE_DATE_MODEL_PATH,
    notes: "Gianduja · Noisette · Crunchy",
    description: "Gianduja noisette façon praliné, parsemée d'éclats crunchy et enrobée de chocolat au lait 35%."
  },
  {
    slug: "praline-amande-chocolate",
    name: "Praliné amande",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: TEMP_DATE_IMAGE,
    notes: "Amande · Chocolat au lait",
    description: "Crème pralinée aux amandes, enrobée de chocolat au lait 85%."
  },
  {
    slug: "kinder",
    name: "Kinder",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: TEMP_DATE_IMAGE,
    notes: "Crème Kinder · Amandes",
    description: "Crème Kinder parsemée d'amandes concassées, enrobée de chocolat au lait 85%."
  },
  {
    slug: "eclat-orange",
    name: "Éclat d'orange",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: TEMP_DATE_IMAGE,
    notes: "Amande · Orange · Chocolat noir",
    description: "Pâte d'amande aux zestes d'orange, enrobée de chocolat noir 90%."
  },
  {
    slug: "rocher-snickers",
    name: "Rocher Snickers",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: TEMP_DATE_IMAGE,
    notes: "Caramel · Cacahuètes · Chocolat",
    description: "Caramel fondant et cacahuètes croquantes, enrobée de chocolat au lait 85%."
  },
  {
    slug: "arabica-cafe",
    name: "Arabica café",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: TEMP_DATE_IMAGE,
    notes: "Ganache café · Chocolat noir",
    description: "Fourrée de ganache café et enrobée de chocolat noir intense."
  },
  {
    slug: "lotus-speculos",
    name: "Lotus Speculos",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: TEMP_DATE_IMAGE,
    notes: "Speculos · Chocolat blanc",
    description: "Crème spéculos et éclats de biscuit croustillants, enrobée de chocolat blanc riche."
  },
  {
    slug: "coconut-bounty",
    name: "Coconut Bounty",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: TEMP_DATE_IMAGE,
    notes: "Noix de coco · Chocolat blanc",
    description: "Coeur fondant à la noix de coco, parsemé de coco toastée et enveloppé de chocolat blanc riche."
  },
  {
    slug: "lemon",
    name: "Lemon",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: TEMP_DATE_IMAGE,
    notes: "Citron · Chocolat blanc",
    description: "Fourrée de fondant citron et enrobée de chocolat blanc riche."
  },
  {
    slug: "praline-pistache",
    name: "Praliné Pistache",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: TEMP_DATE_IMAGE,
    notes: "Pistache · Amande · Chocolat blanc",
    description: "Fourrée de pistache concassée sur une pâte d'amande pistache, enrobée de chocolat blanc riche."
  },
  {
    slug: "passion-berry",
    name: "Passion Berry",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: TEMP_DATE_IMAGE,
    notes: "Framboise · Chocolat blanc",
    description: "Fourrée de coulis à la framboise, enrobée de chocolat blanc riche."
  },
  {
    slug: "pistache-supreme",
    name: "Pistache Suprême",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: TEMP_DATE_IMAGE,
    notes: "Crème pistache · Chocolat blanc",
    description: "Crème pistache 100% pure, enrobée de chocolat blanc riche."
  }
];

export const classicFlavors: Flavor[] = [
  {
    slug: "corne-de-gazelle",
    name: "Corne de gazelle",
    category: "classic",
    categoryLabel: "Les classiques",
    image: TEMP_DATE_IMAGE,
    notes: "Amande · Fleur d'oranger",
    description: "Délicat et parfumé : pâte d'amande à la fleur d'oranger et éclats de fruits secs."
  },
  {
    slug: "pistache-fleurie",
    name: "Pistache fleurie",
    category: "classic",
    categoryLabel: "Les classiques",
    image: TEMP_DATE_IMAGE,
    notes: "Amande pistache · Touche florale",
    description: "Chic et raffiné : pâte d'amande à la pistache, éclats de pistache et touche florale."
  },
  {
    slug: "orient-orange",
    name: "Orient d'orange",
    category: "classic",
    categoryLabel: "Les classiques",
    image: TEMP_DATE_IMAGE,
    notes: "Amande · Orange confite · Noix",
    description: "Gourmand et fruité. Pâte d'amandes aux oranges, parée de noix croquantes et orange confite."
  }
];

export const sushiFlavors: Flavor[] = [
  {
    slug: "cacao-moka",
    name: "Cacao Moka",
    category: "sushi",
    categoryLabel: "Les sushi dattes",
    image: TEMP_DATE_IMAGE,
    notes: "Café · Chocolat noir · Cacao",
    description: "Crème café sublimée par une touche de chocolat noir et fine poudre de cacao."
  },
  {
    slug: "praline-amande-sushi",
    name: "Praliné amande",
    category: "sushi",
    categoryLabel: "Les sushi dattes",
    image: TEMP_DATE_IMAGE,
    notes: "Praliné amande · Chocolat",
    description: "Crème praliné amande, surmontée d'une touche de chocolat et d'amandes concassées."
  },
  {
    slug: "pistachio",
    name: "Pistachio",
    category: "sushi",
    categoryLabel: "Les sushi dattes",
    image: TEMP_DATE_IMAGE,
    notes: "Pistache · Chocolat blanc",
    description: "Crème pistache pure, décorée de chocolat blanc et d'éclats de pistache."
  },
  {
    slug: "speculos",
    name: "Speculos",
    category: "sushi",
    categoryLabel: "Les sushi dattes",
    image: TEMP_DATE_IMAGE,
    notes: "Speculos crunchy · Biscuit",
    description: "Crème spéculoos crunchy, avec une touche de biscuit spéculoos émietté."
  },
  {
    slug: "caramel",
    name: "Caramel",
    category: "sushi",
    categoryLabel: "Les sushi dattes",
    image: TEMP_DATE_IMAGE,
    notes: "Caramel · Chocolat · Feuilletine",
    description: "Crème caramel nappée de chocolat et de feuilletine croustillante."
  },
  {
    slug: "framboise",
    name: "Framboise",
    category: "sushi",
    categoryLabel: "Les sushi dattes",
    image: TEMP_DATE_IMAGE,
    notes: "Framboise · Chocolat blanc",
    description: "Crème framboise nappée de chocolat blanc et d'éclats de framboise séchée."
  }
];

export const flavorGroups = [
  {
    id: "chocolate",
    label: "Les chocolatés",
    description: "Dattes Majhoul fourrées et enrobées de chocolat.",
    flavors: chocolateFlavors
  },
  {
    id: "classic",
    label: "Les classiques",
    description: "Dattes Majhoul fourrées aux inspirations marocaines.",
    flavors: classicFlavors
  },
  {
    id: "sushi",
    label: "Les sushi dattes",
    description: "Dattes garnies façon bouchées pâtissières.",
    flavors: sushiFlavors
  }
] as const;

export const exoticFlavors: Flavor[] = [];
export const allFlavors = [...chocolateFlavors, ...classicFlavors, ...sushiFlavors];

export const paymentMethods = [
  {
    value: "bank_transfer",
    label: "Virement bancaire (e-transfer)"
  },
  {
    value: "cash_on_delivery",
    label: "Paiement à la livraison"
  }
] as const;
