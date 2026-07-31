"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { boxes, prestigeCollection } from "@/lib/catalog";
import { createWhatsAppUrl } from "@/lib/contact";
import { formatMad } from "@/lib/utils";
import type { OrderableBoxOption } from "@/types/catalog";
import { OrderModal } from "./order-modal";

export function MenuSection() {
  const [selectedBox, setSelectedBox] = useState<OrderableBoxOption | null>(null);
  const prestigeWhatsAppUrl = createWhatsAppUrl(
    "Bonjour, je souhaite recevoir un devis pour un coffret de la Collection Prestige."
  );

  return (
    <section id="coffrets" className="bg-cream px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Coffrets cadeaux</p>
          <h2 className="mt-4 font-heading text-4xl text-chocolate sm:text-6xl">Collection Classique</h2>
          <p className="mt-5 text-base leading-8 text-chocolate/68">
            Trois formats pensés pour offrir, recevoir ou partager. Les compositions présentées sont
            des aperçus: chaque assortiment est finalisé avec vous selon les saveurs disponibles.
          </p>
        </div>

        <motion.div
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08 }
            }
          }}
        >
          {boxes.map((box) => (
            <motion.article
              key={box.slug}
              variants={{
                hidden: { opacity: 0, y: 28 },
                show: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.35 }}
              className="luxury-border group rounded-[1.75rem] bg-beige p-5 shadow-soft"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-cream">
                <Image
                  src={box.image}
                  alt={box.displayName}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-heading text-2xl text-chocolate">{box.displayName}</h3>
                  <p className="mt-3 text-sm leading-6 text-chocolate/62">{box.description}</p>
                </div>
                <p className="whitespace-nowrap rounded-full bg-cream px-4 py-2 text-sm font-bold text-date">
                  {box.price === null ? "Sur devis" : formatMad(box.price)}
                </p>
              </div>
              {box.price === null ? (
                <a
                  href={createWhatsAppUrl(
                    `Bonjour, je souhaite connaître le prix et les disponibilités du ${box.displayName}.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-date px-5 py-3 text-sm font-semibold text-cream transition hover:bg-chocolate"
                >
                  <MessageCircle size={17} />
                  Demander un devis
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setSelectedBox(box as OrderableBoxOption)}
                  className="focus-ring mt-6 w-full rounded-full bg-date px-5 py-3 text-sm font-semibold text-cream transition hover:bg-chocolate"
                >
                  Commander
                </button>
              )}
            </motion.article>
          ))}
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
          className="luxury-border mt-8 grid overflow-hidden rounded-[1.75rem] bg-dark text-cream shadow-luxe lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="relative min-h-80 lg:min-h-[440px]">
            <Image
              src={prestigeCollection.image}
              alt="Aperçu de la Collection Prestige"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-dark/45" />
          </div>
          <div className="flex flex-col justify-center px-7 py-10 sm:px-10 lg:px-12">
            <Sparkles className="text-gold" size={28} aria-hidden="true" />
            <p className="mt-5 text-xs uppercase tracking-[0.28em] text-gold">Sur mesure</p>
            <h3 className="mt-3 font-heading text-4xl sm:text-5xl">{prestigeCollection.name}</h3>
            <p className="mt-5 text-sm leading-7 text-cream/72">{prestigeCollection.description}</p>
            <a
              href={prestigeWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-gold/55 px-6 py-3 text-sm font-semibold text-cream transition hover:bg-gold hover:text-chocolate"
            >
              Imaginer mon coffret
              <ArrowRight size={17} />
            </a>
          </div>
        </motion.article>
      </div>
      <OrderModal open={selectedBox !== null} selectedBox={selectedBox} onClose={() => setSelectedBox(null)} />
    </section>
  );
}
