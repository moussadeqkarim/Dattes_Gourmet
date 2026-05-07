import { MessageCircle } from "lucide-react";
import { WHATSAPP_HELP_TEXT } from "@/lib/catalog";
import { createWhatsAppUrl } from "@/lib/contact";

export function WhatsAppButton() {
  const message = "Bonjour, je souhaite commander un coffret de dattes.";

  return (
    <a
      href={createWhatsAppUrl(message)}
      target="_blank"
      rel="noreferrer"
      className="focus-ring fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-date px-4 py-3 text-sm font-semibold text-cream shadow-luxe ring-1 ring-gold/25 transition hover:-translate-y-0.5 hover:bg-chocolate"
      aria-label="Commander via WhatsApp"
    >
      <MessageCircle size={19} />
      <span className="hidden sm:inline">{WHATSAPP_HELP_TEXT}</span>
      <span className="sm:hidden">WhatsApp</span>
    </a>
  );
}
