"use client";

import { motion, useReducedMotion } from "framer-motion";
import { allFlavors } from "@/lib/catalog";

const marqueeItems = [...allFlavors, ...allFlavors];

export function FlavorMarquee() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden border-y border-gold/25 bg-cream py-5">
      <motion.div
        className="flex w-max items-center gap-4"
        animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{
          duration: 68,
          ease: "linear",
          repeat: Infinity
        }}
      >
        {marqueeItems.map((flavor, index) => (
          <div
            key={`${flavor.name}-${index}`}
            className="flex items-center gap-4 whitespace-nowrap px-2"
            aria-hidden={index >= allFlavors.length}
          >
            <span className="size-2 rounded-full bg-gold" />
            <span className="font-heading text-2xl text-date sm:text-3xl">{flavor.name}</span>
            <span className="text-sm italic text-chocolate/58">{flavor.notes}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
