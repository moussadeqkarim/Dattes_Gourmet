import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { FlavorMarquee } from "@/components/home/flavor-marquee";
import { FlavorsSection } from "@/components/home/flavors-section";
import { Hero } from "@/components/home/hero";
import { MenuSection } from "@/components/home/menu-section";
import { SignatureScrollStory } from "@/components/home/signature-scroll-story";
import { SignatureVideo } from "@/components/home/signature-video";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FlavorMarquee />
      <AnimatedSection className="bg-cream px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <SignatureVideo />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Fait main au Maroc</p>
            <h2 className="mt-4 font-heading text-4xl leading-tight text-chocolate sm:text-6xl">
              Une gourmandise précieuse, entre tradition et pâtisserie fine.
            </h2>
            <p className="mt-6 text-base leading-8 text-chocolate/68">
              Nos coffrets célèbrent la datte comme un bijou de table: une chair moelleuse, des
              garnitures généreuses, des finitions délicates et une présentation pensée pour offrir.
            </p>
            <Link
              href="/saveurs"
              className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full border border-date px-6 py-3 text-sm font-semibold text-date transition hover:bg-date hover:text-cream"
            >
              Explorer nos saveurs
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </AnimatedSection>
      <SignatureScrollStory />
      <MenuSection />
      <FlavorsSection />
    </main>
  );
}
