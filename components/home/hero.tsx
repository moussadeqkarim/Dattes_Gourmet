"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/catalog";

export function Hero() {
  return (
    <section className="relative min-h-[86vh] overflow-hidden bg-date pt-20 text-cream">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(200,186,165,0.24),transparent_22rem),radial-gradient(circle_at_16%_72%,rgba(183,122,136,0.18),transparent_20rem),linear-gradient(135deg,#5A2634_0%,#3A2228_52%,#1A0B0E_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-cream to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-[calc(86vh-5rem)] max-w-7xl items-center px-5 py-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="mb-5 font-heading text-2xl italic text-gold">{BRAND_TAGLINE}</p>
          <h1 className="text-balance font-heading text-6xl leading-[0.94] text-cream sm:text-7xl lg:text-8xl">
            {BRAND_NAME}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-cream/84">
            Des dattes marocaines d’exception, garnies à la main de pralinés, fruits secs et
            douceurs fondantes pour transformer chaque coffret en cadeau précieux.
          </p>
          <Link
            href="#coffrets"
            className="focus-ring mt-9 inline-flex rounded-full bg-date px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-cream ring-1 ring-gold/35 transition hover:-translate-y-0.5 hover:bg-chocolate"
          >
            Découvrir Nos Coffrets
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
