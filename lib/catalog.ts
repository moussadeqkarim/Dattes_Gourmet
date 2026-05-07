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
    slug: "box-6-pieces",
    name: "Box 6 pieces",
    displayName: "Box 6 pièces",
    pieces: 6,
    price: 90,
    description: "Une première attention raffinée, idéale pour découvrir nos créations."
  },
  {
    slug: "box-8-pieces",
    name: "Box 8 pieces",
    displayName: "Box 8 pièces",
    pieces: 8,
    price: 120,
    description: "Un petit coffret précieux pour partager un moment doux et élégant."
  },
  {
    slug: "box-12-pieces",
    name: "Box 12 pieces",
    displayName: "Box 12 pièces",
    pieces: 12,
    price: 190,
    description: "La sélection signature pour varier les textures et les parfums."
  },
  {
    slug: "box-16-pieces",
    name: "Box 16 pieces",
    displayName: "Box 16 pièces",
    pieces: 16,
    price: 230,
    description: "Un format généreux pour les réunions de famille et les beaux cadeaux."
  },
  {
    slug: "box-18-pieces",
    name: "Box 18 pieces",
    displayName: "Box 18 pièces",
    pieces: 18,
    price: 270,
    description: "Un assortiment luxueux pour les amateurs de dattes gourmandes."
  },
  {
    slug: "box-25-pieces",
    name: "Box 25 pieces",
    displayName: "Box 25 pièces",
    pieces: 25,
    price: 350,
    description: "Un coffret de fête, pensé pour recevoir avec chaleur et distinction."
  },
  {
    slug: "box-30-pieces",
    name: "Box 30 pieces",
    displayName: "Box 30 pièces",
    pieces: 30,
    price: 430,
    description: "Une grande dégustation pour explorer toute la richesse du menu."
  },
  {
    slug: "box-35-pieces",
    name: "Box 35 pieces",
    displayName: "Box 35 pièces",
    pieces: 35,
    price: 480,
    description: "Un coffret d'exception pour les grandes occasions et les cadeaux premium."
  },
  {
    slug: "box-55-pieces-2kg",
    name: "Box 55 pieces (2kg)",
    displayName: "Box 55 pièces (2kg)",
    pieces: 55,
    price: 750,
    description: "Le coffret prestige, une abondance élégante pour une table mémorable."
  }
];

export const classicFlavors: Flavor[] = [
  {
    name: "Praliné Amande",
    category: "classic",
    image: TEMP_DATE_IMAGE,
    notes: "Amande · Chocolat au lait",
    description: "Une ganache douce et fondante, relevée par le croquant délicat de l'amande torréfiée."
  },
  {
    name: "Pâte d'amande à la fleur d'oranger",
    category: "classic",
    image: TEMP_DATE_IMAGE,
    notes: "Amande · Fleur d'oranger",
    description: "Une recette parfumée et raffinée, inspirée des douceurs marocaines les plus délicates."
  },
  {
    name: "Praliné Noisette",
    category: "classic",
    image: TEMP_DATE_IMAGE,
    notes: "Noisette · Praliné",
    description: "Un coeur soyeux aux noisettes, généreux en bouche et subtilement caramélisé."
  },
  {
    name: "Praliné Gianduja",
    category: "classic",
    image: TEMP_DATE_IMAGE,
    modelPath: CHOCOLATE_DATE_MODEL_PATH,
    notes: "Gianduja · Chocolat noir",
    description: "Une alliance intense entre chocolat profond et praliné velouté pour une datte très gourmande."
  },
  {
    name: "Noix",
    category: "classic",
    image: TEMP_DATE_IMAGE,
    notes: "Noix · Miel léger",
    description: "Une saveur élégante et authentique, avec une noix croquante qui souligne la douceur de la datte."
  },
  {
    name: "Pistache",
    category: "classic",
    image: TEMP_DATE_IMAGE,
    notes: "Pistache · Crème fine",
    description: "Une crème de pistache noble, ronde et parfumée, pour une bouchée très précieuse."
  },
  {
    name: "Acajou",
    category: "classic",
    image: TEMP_DATE_IMAGE,
    notes: "Noix de cajou · Praliné",
    description: "Une garniture onctueuse à la noix de cajou, douce, beurrée et parfaitement équilibrée."
  },
  {
    name: "Nougatine Amande",
    category: "classic",
    image: TEMP_DATE_IMAGE,
    notes: "Amande · Nougatine",
    description: "Une touche croustillante et dorée qui apporte du relief à la tendresse naturelle de la datte."
  },
  {
    name: "Noix de coco façon Bounty",
    category: "classic",
    image: TEMP_DATE_IMAGE,
    notes: "Coco · Chocolat",
    description: "Une douceur coco généreuse, enveloppante et régressive, travaillée dans un esprit premium."
  },
  {
    name: "Cacahuète façon Snickers",
    category: "classic",
    image: TEMP_DATE_IMAGE,
    notes: "Cacahuète · Caramel",
    description: "Un contraste gourmand entre cacahuète, caramel et datte moelleuse, sans lourdeur."
  },
  {
    name: "Crunchy speculos",
    category: "classic",
    image: TEMP_DATE_IMAGE,
    notes: "Speculos · Épices douces",
    description: "Une bouchée croustillante aux notes biscuitées, chaleureuse et parfaitement addictive."
  },
  {
    name: "Selou au caramel beurre salé",
    category: "classic",
    image: TEMP_DATE_IMAGE,
    notes: "Selou · Caramel salé",
    description: "Un hommage marocain au selou, adouci par un caramel beurre salé fin et fondant."
  }
];

export const exoticFlavors: Flavor[] = [
  {
    name: "Pâte à la Framboise",
    category: "exotic",
    image: TEMP_DATE_IMAGE,
    notes: "Framboise · Acidulé",
    description: "Une pâte fruitée vive et élégante, pensée pour réveiller la richesse de la datte."
  },
  {
    name: "Pâte à la Mangue",
    category: "exotic",
    image: TEMP_DATE_IMAGE,
    notes: "Mangue · Soleil",
    description: "Une note tropicale ronde et parfumée, tout en douceur, comme un rayon de soleil."
  },
  {
    name: "Crème citron",
    category: "exotic",
    image: TEMP_DATE_IMAGE,
    notes: "Citron · Crème légère",
    description: "Une crème citronnée fraîche et soyeuse, idéale pour une fin de dégustation lumineuse."
  }
];

export const allFlavors = [...classicFlavors, ...exoticFlavors];

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
