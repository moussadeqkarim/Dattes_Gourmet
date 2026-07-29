import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { flavorGroups } from "@/lib/catalog";

const productScales: Record<string, number> = {
  "selou-caramel": 0.94,
  "crunchy-gianduja": 1,
  "praline-amande-chocolate": 0.97,
  kinder: 0.98,
  "eclat-orange": 1.1,
  "rocher-snickers": 1.03,
  "arabica-cafe": 1.05,
  "lotus-speculos": 1.06,
  "coconut-bounty": 1.05,
  lemon: 1.08,
  "praline-pistache": 0.76,
  "passion-berry": 1.06,
  "pistache-supreme": 1.02,
  "corne-de-gazelle": 0.97,
  "pistache-fleurie": 0.94,
  "orient-orange": 0.84,
  "cacao-moka": 1.05,
  "praline-amande-sushi": 0.97,
  pistachio: 0.87,
  speculos: 0.87,
  caramel: 0.9,
  framboise: 0.93
};

export function FlavorsSection() {
  return (
    <AnimatedSection id="saveurs" className="bg-beige/70 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Nos saveurs</p>
            <h2 className="mt-4 font-heading text-4xl text-chocolate sm:text-6xl">
              Des recettes à découvrir une par une.
            </h2>
            <p className="mt-5 text-base leading-8 text-chocolate/68">
              Une collection gourmande de pralinés, fruits secs, notes fruitées et crèmes fondantes,
              présentée dans un esprit boutique plutôt qu&apos;un catalogue figé.
            </p>
          </div>
          <Link
            href="/saveurs"
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-date px-6 py-3 text-sm font-semibold text-cream transition hover:bg-chocolate"
          >
            Voir le carrousel
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-14 space-y-14">
          {flavorGroups.map((group) => (
            <section key={group.id} aria-labelledby={`${group.id}-flavor-title`}>
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                  {group.label}
                </p>
                <h3
                  id={`${group.id}-flavor-title`}
                  className="mt-2 font-heading text-3xl text-chocolate sm:text-4xl"
                >
                  {group.description}
                </h3>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.flavors.map((flavor) => (
                  <article
                    key={flavor.slug}
                    className="luxury-border group overflow-hidden rounded-[1.5rem] bg-cream shadow-soft transition duration-300 hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#ead6c8]">
                      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.025]">
                        <div
                          className="relative h-full w-full"
                          style={{ transform: `scale(${productScales[flavor.slug] ?? 1})` }}
                        >
                          <Image
                            src={flavor.image}
                            alt={flavor.name}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-contain mix-blend-multiply"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="font-heading text-xl leading-7 text-chocolate">{flavor.name}</p>
                      <p className="mt-2 text-sm italic text-date/75">{flavor.notes}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
