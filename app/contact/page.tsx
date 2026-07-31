import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_HELP_TEXT } from "@/lib/catalog";
import {
  CONTACT_EMAIL,
  CONTACT_ADDRESS,
  CONTACT_INSTAGRAM_HANDLE,
  CONTACT_INSTAGRAM_URL,
  CONTACT_MAPS_URL,
  CONTACT_WHATSAPP_DISPLAY,
  createWhatsAppUrl
} from "@/lib/contact";

export default function ContactPage() {
  const whatsappUrl = createWhatsAppUrl("Bonjour, j'aimerais commander un coffret de dattes.");

  return (
    <main className="bg-cream px-5 pb-24 pt-32 sm:px-8">
      <section className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_0.9fr] md:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Contact</p>
          <h1 className="mt-4 font-heading text-5xl text-chocolate sm:text-7xl">
            Parlons de l’émotion que vous souhaitez offrir
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-chocolate/68">
            Un merci, une célébration, une surprise ou une simple envie de faire plaisir: racontez-nous
            le moment, nous vous aiderons à trouver l’attention qui lui ressemble.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring mt-9 inline-flex items-center gap-3 rounded-full bg-chocolate px-7 py-4 text-sm font-semibold text-cream transition hover:bg-date"
          >
            <MessageCircle size={19} />
            Commander via WhatsApp
          </a>
        </div>
        <div className="luxury-border rounded-[2rem] bg-white p-7 shadow-luxe">
          <p className="font-heading text-3xl text-chocolate">{WHATSAPP_HELP_TEXT}</p>
          <div className="mt-7 grid gap-5 text-sm text-chocolate/72">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-date">
              <Phone size={18} className="text-gold" /> {CONTACT_WHATSAPP_DISPLAY}
            </a>
            <a
              href={CONTACT_INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-date"
            >
              <Instagram size={18} className="text-gold" /> {CONTACT_INSTAGRAM_HANDLE}
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 hover:text-date">
              <Mail size={18} className="text-gold" /> {CONTACT_EMAIL}
            </a>
            <a
              href={CONTACT_MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-date"
            >
              <MapPin size={18} className="text-gold" /> {CONTACT_ADDRESS}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
