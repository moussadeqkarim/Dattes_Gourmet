import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Heart, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { createWhatsAppUrl } from "@/lib/contact";

const engagementPacks = [
  {
    name: "Pack Essentiel",
    description: "Une attention raffinée pour accompagner la demande avec douceur.",
    details: ["Coffret de dattes assorties", "Finition prête à offrir", "Choix des saveurs"]
  },
  {
    name: "Pack Premium",
    description: "Une composition plus généreuse, pensée comme une véritable pièce de réception.",
    details: ["Assortiment élargi", "Présentation florale", "Palette personnalisée"]
  },
  {
    name: "Pack Signature",
    description: "Une mise en scène entièrement personnalisée pour un moment inoubliable.",
    details: ["Création sur mesure", "Fleurs et finitions prestige", "Coordination avec votre thème"]
  }
];

const occasions = [
  "Naissance",
  "Ramadan",
  "Aïd",
  "Henna Party",
  "Circoncision",
  "Anniversaire",
  "Soutenance",
  "Autres événements"
];

export default function CelebrationsPage() {
  const weddingUrl = createWhatsAppUrl(
    "Bonjour, je prépare un mariage et je souhaite imaginer une composition de dattes sur mesure."
  );

  return (
    <main className="bg-cream pt-20">
      <section className="relative min-h-[68svh] overflow-hidden">
        <Image
          src="/images/boxes/coffret-classique-28.jpeg"
          alt="Grand coffret Datte Gourmet pour une célébration"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/20" />
        <div className="relative mx-auto flex min-h-[68svh] max-w-7xl items-end px-5 pb-14 pt-24 sm:px-8 sm:pb-20">
          <div className="max-w-3xl text-cream">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Mariages & Fiançailles</p>
            <h1 className="mt-5 text-balance font-heading text-5xl leading-tight sm:text-7xl">
              Vos plus beaux moments, composés comme un cadeau.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-cream/80">
              Coffrets, compositions florales et présentations personnalisées autour de nos dattes
              gourmandes, imaginés selon votre thème et le nombre d’invités.
            </p>
          </div>
        </div>
      </section>

      <AnimatedSection className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Fiançailles</p>
            <h2 className="mt-4 font-heading text-4xl text-chocolate sm:text-6xl">
              Trois façons de signer l’instant.
            </h2>
            <p className="mt-5 text-base leading-8 text-chocolate/68">
              Chaque pack est une base créative. Les formats, fleurs, couleurs et quantités sont
              ajustés après échange avec vous.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {engagementPacks.map((pack, index) => (
              <article
                key={pack.name}
                className="luxury-border flex min-h-80 flex-col rounded-[1.5rem] bg-beige p-7 shadow-soft"
              >
                <span className="font-heading text-5xl text-gold/70">0{index + 1}</span>
                <h3 className="mt-6 font-heading text-3xl text-chocolate">{pack.name}</h3>
                <p className="mt-3 text-sm leading-7 text-chocolate/66">{pack.description}</p>
                <ul className="mt-6 grid gap-3 text-sm text-chocolate/76">
                  {pack.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-3">
                      <Check size={16} className="shrink-0 text-date" aria-hidden="true" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <a
                  href={createWhatsAppUrl(
                    `Bonjour, je souhaite recevoir un devis pour un pack de fiançailles Datte Gourmet.\nPack : ${pack.name}`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-date transition hover:text-chocolate"
                >
                  Demander un devis
                  <ArrowRight size={17} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <section className="bg-dark px-5 py-20 text-cream sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="flex items-center gap-4 text-gold">
            <Heart size={36} strokeWidth={1.5} aria-hidden="true" />
            <span className="h-px flex-1 bg-gold/35" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Mariage</p>
            <h2 className="mt-4 font-heading text-4xl sm:text-6xl">Une table qui raconte votre histoire.</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-cream/72">
              De la pièce centrale aux cadeaux invités, nous concevons une présentation cohérente
              avec votre décoration, votre palette et le rythme de votre réception.
            </p>
            <a
              href={weddingUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full border border-gold/55 px-6 py-3 text-sm font-semibold transition hover:bg-gold hover:text-chocolate"
            >
              Parler de mon mariage
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <AnimatedSection className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <Sparkles className="text-gold" size={30} aria-hidden="true" />
              <p className="mt-5 text-xs uppercase tracking-[0.28em] text-gold">Occasions spéciales</p>
              <h2 className="mt-4 font-heading text-4xl text-chocolate sm:text-5xl">
                Chaque occasion mérite son propre écrin.
              </h2>
            </div>
            <div className="grid border-t border-date/16 sm:grid-cols-2">
              {occasions.map((occasion) => (
                <div
                  key={occasion}
                  className="border-b border-date/16 py-5 font-heading text-2xl text-chocolate sm:px-5"
                >
                  {occasion}
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/contact"
            className="focus-ring mt-10 inline-flex items-center gap-2 rounded-full bg-date px-6 py-3 text-sm font-semibold text-cream transition hover:bg-chocolate"
          >
            Préparer mon événement
            <ArrowRight size={17} />
          </Link>
        </div>
      </AnimatedSection>
    </main>
  );
}
