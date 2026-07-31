import { normalizePhoneForWhatsApp } from "@/lib/utils";

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "datteGourmet@gmail.com";
export const CONTACT_INSTAGRAM_HANDLE = "@dattes_gourmet";
export const CONTACT_INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
  "https://www.instagram.com/dattes_gourmet?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
export const CONTACT_WHATSAPP_DISPLAY =
  process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "+1 (647) 512-4203";
export const CONTACT_WHATSAPP_NUMBER = normalizePhoneForWhatsApp(
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? CONTACT_WHATSAPP_DISPLAY
);
export const CONTACT_ADDRESS = "Av. Abderrahim Sekkat, Fès, Maroc";
export const CONTACT_MAPS_URL =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? "https://maps.app.goo.gl/WEepxe2sGPRVyerU7";

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
