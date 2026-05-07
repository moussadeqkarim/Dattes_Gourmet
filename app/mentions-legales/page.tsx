import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY } from "@/lib/contact";

const sections = [
  {
    title: "Éditeur du site",
    body: `Nom de l'entreprise / entrepreneur: [Nom à remplir]. Adresse professionnelle: [Adresse à remplir]. Téléphone: ${CONTACT_WHATSAPP_DISPLAY}. Email: ${CONTACT_EMAIL}.`
  },
  {
    title: "Immatriculation",
    body: "Numéro d'immatriculation au Registre du Commerce (RC): [RC à remplir]. Numéro de TVA, le cas échéant: [TVA à remplir ou non applicable]."
  },
  {
    title: "Directeur de la publication",
    body: "Le directeur de la publication est [Nom à remplir], en qualité de responsable de l'activité."
  },
  {
    title: "Hébergement",
    body: "Le site est hébergé par Vercel Inc. pour l'application web et par Supabase Inc. pour la base de données, l'authentification et le stockage."
  },
  {
    title: "Propriété intellectuelle",
    body: "Les textes, images, recettes, compositions visuelles, logos et éléments graphiques du site sont protégés. Toute reproduction, adaptation ou diffusion sans autorisation préalable est interdite."
  },
  {
    title: "Loi applicable",
    body: "Les présentes mentions légales sont soumises à la loi marocaine. Tout litige sera traité selon les règles de compétence applicables au Maroc."
  }
];

export default function LegalNoticePage() {
  return (
    <main className="bg-cream px-5 pb-24 pt-32 sm:px-8">
      <section className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">Informations légales</p>
        <h1 className="mt-4 font-heading text-5xl text-chocolate sm:text-7xl">Mentions Légales</h1>
        <div className="mt-12 grid gap-5">
          {sections.map((section) => (
            <article key={section.title} className="luxury-border rounded-[1.5rem] bg-white p-6 shadow-soft">
              <h2 className="font-heading text-2xl text-chocolate">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-chocolate/70">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
