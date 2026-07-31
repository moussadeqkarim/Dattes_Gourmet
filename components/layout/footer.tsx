import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { BRAND_NAME, BRAND_TAGLINE, WHATSAPP_HELP_TEXT } from "@/lib/catalog";
import {
  CONTACT_EMAIL,
  CONTACT_ADDRESS,
  CONTACT_INSTAGRAM_HANDLE,
  CONTACT_INSTAGRAM_URL,
  CONTACT_MAPS_URL,
  CONTACT_WHATSAPP_DISPLAY,
  createWhatsAppUrl
} from "@/lib/contact";

export function Footer() {
  const whatsappUrl = createWhatsAppUrl("Bonjour, je souhaite commander un coffret de dattes.");

  return (
    <footer className="bg-dark text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-gold/25 bg-date shadow-soft">
            <Image
              src="/images/logodg.jpg"
              alt={`${BRAND_NAME} logo`}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <p className="mt-5 font-heading text-3xl">{BRAND_NAME}</p>
          <p className="mt-2 font-heading text-xl italic text-gold/90">{BRAND_TAGLINE}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-cream/74">
            Coffrets de dattes artisanales, garnies à la main au Maroc avec des parfums gourmands,
            des fruits secs nobles et une finition soignée.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex text-sm text-gold transition hover:text-cream"
          >
            {WHATSAPP_HELP_TEXT}
          </a>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Navigation</p>
          <div className="mt-5 grid gap-3 text-sm text-cream/78">
            <Link href="/#coffrets" className="hover:text-gold">
              Nos coffrets
            </Link>
            <Link href="/saveurs" className="hover:text-gold">
              Nos saveurs
            </Link>
            <Link href="/celebrations" className="hover:text-gold">
              Mariages & occasions
            </Link>
            <Link href="/entreprises" className="hover:text-gold">
              Cadeaux d’entreprise
            </Link>
            <Link href="/paiement" className="hover:text-gold">
              Paiement
            </Link>
            <Link href="/mentions-legales" className="hover:text-gold">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-gold">
              Politique de confidentialité
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Contact</p>
          <div className="mt-5 grid gap-4 text-sm text-cream/78">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gold">
              <Phone size={16} /> WhatsApp: {CONTACT_WHATSAPP_DISPLAY}
            </a>
            <a
              href={CONTACT_INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-gold"
            >
              <Instagram size={16} /> {CONTACT_INSTAGRAM_HANDLE}
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 hover:text-gold">
              <Mail size={16} /> {CONTACT_EMAIL}
            </a>
            <a
              href={CONTACT_MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-gold"
            >
              <MapPin size={16} /> {CONTACT_ADDRESS}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10 px-5 py-5 text-center text-xs text-cream/58">
        © {new Date().getFullYear()} {BRAND_NAME}. Tous droits réservés.
      </div>
    </footer>
  );
}
