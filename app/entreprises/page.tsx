import Image from "next/image";
import { Boxes, Gift, Palette } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { CorporateQuoteForm } from "@/components/corporate/quote-form";

const benefits = [
  {
    icon: Gift,
    title: "Une présentation qui marque",
    description: "Des coffrets élégants pour remercier, célébrer ou accueillir avec une attention mémorable."
  },
  {
    icon: Palette,
    title: "Votre identité, avec finesse",
    description: "Logo, ruban, carte et palette peuvent être adaptés à votre marque ou à votre événement."
  },
  {
    icon: Boxes,
    title: "Des quantités maîtrisées",
    description: "Nous ajustons le format, l’assortiment et la livraison au nombre de destinataires."
  }
];

export default function CorporateGiftsPage() {
  return (
    <main className="bg-cream pt-20">
      <section className="relative min-h-[66svh] overflow-hidden">
        <Image
          src="/images/boxes/coffret-classique-24.png"
          alt="Coffret Datte Gourmet personnalisé pour entreprise"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/20" />
        <div className="relative mx-auto flex min-h-[66svh] max-w-7xl items-end px-5 pb-14 pt-24 sm:px-8 sm:pb-20">
          <div className="max-w-3xl text-cream">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Cadeaux d’entreprise</p>
            <h1 className="mt-5 text-balance font-heading text-5xl leading-tight sm:text-7xl">
              Une attention à l’image de votre marque.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-cream/80">
              Coffrets clients, cadeaux collaborateurs et attentions événementielles, préparés avec
              une présentation personnalisée et un accompagnement simple.
            </p>
          </div>
        </div>
      </section>

      <AnimatedSection className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Personnalisation</p>
            <h2 className="mt-4 font-heading text-4xl text-chocolate sm:text-6xl">
              Du coffret à la dernière finition.
            </h2>
          </div>
          <div className="mt-12 grid gap-8 border-y border-date/20 py-10 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }) => (
              <article key={title} className="px-1 md:px-5">
                <Icon size={28} className="text-date" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-5 font-heading text-2xl text-chocolate">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-chocolate/66">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <section className="bg-dark px-5 py-24 text-cream sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Demande de devis</p>
            <h2 className="mt-4 font-heading text-4xl sm:text-6xl">Parlons de votre projet.</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-cream/72">
              Indiquez-nous la quantité, la date et le niveau de personnalisation souhaité. Votre
              demande s’ouvrira dans WhatsApp pour un échange direct.
            </p>
          </div>
          <CorporateQuoteForm />
        </div>
      </section>
    </main>
  );
}
