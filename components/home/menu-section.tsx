"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { boxes, TEMP_DATE_IMAGE } from "@/lib/catalog";
import { formatMad } from "@/lib/utils";
import type { BoxOption } from "@/types/catalog";
import { OrderModal } from "./order-modal";

export function MenuSection() {
  const [selectedBox, setSelectedBox] = useState<BoxOption | null>(null);

  return (
    <section id="coffrets" className="bg-cream px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Nos Coffrets</p>
          <h2 className="mt-4 font-heading text-4xl text-chocolate sm:text-6xl">Notre Menu</h2>
          <p className="mt-5 text-base leading-8 text-chocolate/68">
            Des formats pensés pour offrir, recevoir ou savourer une parenthèse précieuse. Chaque
            datte est garnie avec soin et présentée comme une petite pièce de pâtisserie.
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-beige">
                <Image
                  src={TEMP_DATE_IMAGE}
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
                  {formatMad(box.price)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBox(box)}
                className="focus-ring mt-6 w-full rounded-full bg-date px-5 py-3 text-sm font-semibold text-cream transition hover:bg-chocolate"
              >
                Commander
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>
      <OrderModal open={selectedBox !== null} selectedBox={selectedBox} onClose={() => setSelectedBox(null)} />
    </section>
  );
}
