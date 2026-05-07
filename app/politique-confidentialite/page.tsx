import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY } from "@/lib/contact";

const sections = [
  {
    title: "Collecte des données",
    body: "Nous collectons les informations nécessaires au traitement des commandes: nom, numéro WhatsApp, compte Instagram facultatif, adresse de livraison, choix de coffret, saveurs sélectionnées, méthode de paiement et instructions particulières."
  },
  {
    title: "Utilisation des données",
    body: "Ces données servent uniquement à confirmer, préparer, livrer et suivre votre commande, ainsi qu'à répondre à vos demandes de contact."
  },
  {
    title: "Partage des données",
    body: "Les données ne sont pas vendues. Elles peuvent être partagées uniquement avec les prestataires techniques nécessaires au fonctionnement du site, notamment Vercel et Supabase."
  },
  {
    title: "Sécurité",
    body: "Nous mettons en place des mesures raisonnables pour protéger les informations transmises, notamment l'accès restreint à l'interface d'administration et les règles de sécurité de la base de données."
  },
  {
    title: "Cookies",
    body: "Le site peut utiliser des cookies techniques nécessaires à la navigation, à l'authentification de l'administration et au bon fonctionnement du service."
  },
  {
    title: "Droits de l'utilisateur",
    body: "Conformément aux principes applicables de protection des données, vous pouvez demander l'accès, la rectification ou la suppression de vos informations personnelles."
  },
  {
    title: "Contact",
    body: `Pour toute question relative à vos données, contactez-nous à ${CONTACT_EMAIL} ou par WhatsApp au ${CONTACT_WHATSAPP_DISPLAY}.`
  }
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-cream px-5 pb-24 pt-32 sm:px-8">
      <section className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">Données personnelles</p>
        <h1 className="mt-4 font-heading text-5xl text-chocolate sm:text-7xl">
          Politique de Confidentialité
        </h1>
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
