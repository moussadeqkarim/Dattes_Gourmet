import type { BoxOption, Flavor, OrderableBoxOption } from "@/types/catalog";

export const BRAND_NAME = "Datte Gourmet";
export const BRAND_TAGLINE = "L'Art de la Datte";
export const WHATSAPP_HELP_TEXT = "Besoin d'aide ? Écrivez-nous sur WhatsApp";
export const TEMP_DATE_IMAGE = "/images/datte.png";
export const TEMP_HERO_DATE_IMAGE = "/images/datte-pistache.png";
export const TEMP_ROTATING_DATE_IMAGE = "/images/nobackgrounddate-clean.png";
export const DATE_MODEL_PATH = "/models/datte-pistache.glb";
export const CHOCOLATE_DATE_MODEL_PATH = "/models/datte-chocolat.glb";

const flavorImagePath = (slug: string) => `/images/flavors/${slug}.png`;
const flavorModelPath = (slug: string) => `/models/flavors/${slug}.glb`;

export const boxes: BoxOption[] = [
  {
    slug: "coffret-classique-12",
    name: "Coffret Classique 12 pieces",
    displayName: "Coffret 12 pièces",
    pieces: 12,
    price: 190,
    image: "/images/boxes/coffret-classique-12.png",
    description: "Douze attentions délicates pour dire merci, féliciter ou simplement faire plaisir."
  },
  {
    slug: "coffret-classique-24",
    name: "Coffret Classique 24 pieces",
    displayName: "Coffret 24 pièces",
    pieces: 24,
    price: null,
    image: "/images/boxes/coffret-classique-24.png",
    description: "Une invitation généreuse à se retrouver, goûter, échanger et créer un moment que l’on retient."
  },
  {
    slug: "coffret-classique-28",
    name: "Coffret Classique 28 pieces",
    displayName: "Coffret 28 pièces",
    pieces: 28,
    price: null,
    image: "/images/boxes/coffret-classique-28.jpeg",
    description: "Une composition qui habille la table et transforme les grandes retrouvailles en souvenir précieux."
  }
];

export const orderableBoxes = boxes.filter(
  (box): box is OrderableBoxOption => box.price !== null
);

export const prestigeCollection = {
  name: "Collection Prestige",
  image: "/images/boxes/coffret-classique-28.jpeg",
  description:
    "Pour les instants que l’on ne célèbre qu’une fois: une création pensée autour de votre histoire, de vos couleurs et de l’émotion que vous souhaitez offrir."
};

export const chocolateFlavors: Flavor[] = [
  {
    slug: "selou-caramel",
    name: "Selou Caramel",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: flavorImagePath("selou-caramel"),
    modelPath: flavorModelPath("selou-caramel"),
    notes: "Selou · Noix · Caramel beurre salé",
    description: "Selou croquant aux noix et caramel beurre salé, enrobée de chocolat au lait 85%."
  },
  {
    slug: "crunchy-gianduja",
    name: "Crunchy Gianduja",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: flavorImagePath("crunchy-gianduja"),
    modelPath: flavorModelPath("crunchy-gianduja"),
    notes: "Gianduja · Noisette · Crunchy",
    description: "Gianduja noisette façon praliné, parsemée d'éclats crunchy et enrobée de chocolat au lait 35%."
  },
  {
    slug: "praline-amande-chocolate",
    name: "Praliné amande",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: flavorImagePath("praline-amande-chocolate"),
    modelPath: flavorModelPath("praline-amande-chocolate"),
    notes: "Amande · Chocolat au lait",
    description: "Crème pralinée aux amandes, enrobée de chocolat au lait 85%."
  },
  {
    slug: "kinder",
    name: "Kinder",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: flavorImagePath("kinder"),
    modelPath: flavorModelPath("kinder"),
    notes: "Crème Kinder · Amandes",
    description: "Crème Kinder parsemée d'amandes concassées, enrobée de chocolat au lait 85%."
  },
  {
    slug: "eclat-orange",
    name: "Éclat d'orange",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: flavorImagePath("eclat-orange"),
    modelPath: flavorModelPath("eclat-orange"),
    notes: "Amande · Orange · Chocolat noir",
    description: "Pâte d'amande aux zestes d'orange, enrobée de chocolat noir 90%."
  },
  {
    slug: "rocher-snickers",
    name: "Rocher Snickers",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: flavorImagePath("rocher-snickers"),
    modelPath: flavorModelPath("rocher-snickers"),
    notes: "Caramel · Cacahuètes · Chocolat",
    description: "Caramel fondant et cacahuètes croquantes, enrobée de chocolat au lait 85%."
  },
  {
    slug: "arabica-cafe",
    name: "Arabica café",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: flavorImagePath("arabica-cafe"),
    modelPath: flavorModelPath("arabica-cafe"),
    notes: "Ganache café · Chocolat noir",
    description: "Fourrée de ganache café et enrobée de chocolat noir intense."
  },
  {
    slug: "lotus-speculos",
    name: "Lotus Speculos",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: flavorImagePath("lotus-speculos"),
    modelPath: flavorModelPath("lotus-speculos"),
    notes: "Speculos · Chocolat blanc",
    description: "Crème spéculos et éclats de biscuit croustillants, enrobée de chocolat blanc riche."
  },
  {
    slug: "coconut-bounty",
    name: "Coconut Bounty",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: flavorImagePath("coconut-bounty"),
    modelPath: flavorModelPath("coconut-bounty"),
    notes: "Noix de coco · Chocolat blanc",
    description: "Coeur fondant à la noix de coco, parsemé de coco toastée et enveloppé de chocolat blanc riche."
  },
  {
    slug: "lemon",
    name: "Lemon",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: flavorImagePath("lemon"),
    modelPath: flavorModelPath("lemon"),
    notes: "Citron · Chocolat blanc",
    description: "Fourrée de fondant citron et enrobée de chocolat blanc riche."
  },
  {
    slug: "praline-pistache",
    name: "Praliné Pistache",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: TEMP_ROTATING_DATE_IMAGE,
    modelPath: DATE_MODEL_PATH,
    notes: "Pistache · Amande · Chocolat blanc",
    description: "Fourrée de pistache concassée sur une pâte d'amande pistache, enrobée de chocolat blanc riche."
  },
  {
    slug: "passion-berry",
    name: "Passion Berry",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: flavorImagePath("passion-berry"),
    modelPath: flavorModelPath("passion-berry"),
    notes: "Framboise · Chocolat blanc",
    description: "Fourrée de coulis à la framboise, enrobée de chocolat blanc riche."
  },
  {
    slug: "pistache-supreme",
    name: "Pistache Suprême",
    category: "chocolate",
    categoryLabel: "Les chocolatés",
    image: flavorImagePath("pistache-supreme"),
    modelPath: flavorModelPath("pistache-supreme"),
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
    image: flavorImagePath("corne-de-gazelle"),
    modelPath: flavorModelPath("corne-de-gazelle"),
    notes: "Amande · Fleur d'oranger",
    description: "Délicat et parfumé : pâte d'amande à la fleur d'oranger et éclats de fruits secs."
  },
  {
    slug: "pistache-fleurie",
    name: "Pistache fleurie",
    category: "classic",
    categoryLabel: "Les classiques",
    image: flavorImagePath("pistache-fleurie"),
    modelPath: flavorModelPath("pistache-fleurie"),
    notes: "Amande pistache · Touche florale",
    description: "Chic et raffiné : pâte d'amande à la pistache, éclats de pistache et touche florale."
  },
  {
    slug: "orient-orange",
    name: "Orient d'orange",
    category: "classic",
    categoryLabel: "Les classiques",
    image: flavorImagePath("orient-orange"),
    modelPath: flavorModelPath("orient-orange"),
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
    image: flavorImagePath("cacao-moka"),
    modelPath: flavorModelPath("cacao-moka"),
    notes: "Café · Chocolat noir · Cacao",
    description: "Crème café sublimée par une touche de chocolat noir et fine poudre de cacao."
  },
  {
    slug: "praline-amande-sushi",
    name: "Praliné amande",
    category: "sushi",
    categoryLabel: "Les sushi dattes",
    image: flavorImagePath("praline-amande-sushi"),
    modelPath: flavorModelPath("praline-amande-sushi"),
    notes: "Praliné amande · Chocolat",
    description: "Crème praliné amande, surmontée d'une touche de chocolat et d'amandes concassées."
  },
  {
    slug: "pistachio",
    name: "Pistachio",
    category: "sushi",
    categoryLabel: "Les sushi dattes",
    image: flavorImagePath("pistachio"),
    modelPath: flavorModelPath("pistachio"),
    notes: "Pistache · Chocolat blanc",
    description: "Crème pistache pure, décorée de chocolat blanc et d'éclats de pistache."
  },
  {
    slug: "speculos",
    name: "Speculos",
    category: "sushi",
    categoryLabel: "Les sushi dattes",
    image: flavorImagePath("speculos"),
    modelPath: flavorModelPath("speculos"),
    notes: "Speculos crunchy · Biscuit",
    description: "Crème spéculoos crunchy, avec une touche de biscuit spéculoos émietté."
  },
  {
    slug: "caramel",
    name: "Caramel",
    category: "sushi",
    categoryLabel: "Les sushi dattes",
    image: flavorImagePath("caramel"),
    modelPath: flavorModelPath("caramel"),
    notes: "Caramel · Chocolat · Feuilletine",
    description: "Crème caramel nappée de chocolat et de feuilletine croustillante."
  },
  {
    slug: "framboise",
    name: "Framboise",
    category: "sushi",
    categoryLabel: "Les sushi dattes",
    image: flavorImagePath("framboise"),
    modelPath: flavorModelPath("framboise"),
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
