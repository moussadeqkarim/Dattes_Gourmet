import { CreditCard, HandCoins, ShieldCheck } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

export default function PaymentPage() {
  return (
    <main className="bg-cream px-5 pb-24 pt-32 sm:px-8">
      <AnimatedSection className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">Paiement</p>
        <h1 className="mt-4 font-heading text-5xl text-chocolate sm:text-7xl">
          Régler votre commande avec simplicité
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-chocolate/68">
          Après l’envoi de votre commande, nous confirmons les détails sur WhatsApp puis vous choisissez
          le mode de paiement qui vous convient.
        </p>
      </AnimatedSection>

      <section className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
        <article className="luxury-border rounded-[2rem] bg-white p-7 shadow-soft">
          <CreditCard className="text-gold" size={34} />
          <h2 className="mt-5 font-heading text-3xl text-chocolate">Virement bancaire (e-transfer)</h2>
          <p className="mt-4 text-sm leading-7 text-chocolate/68">
            Vous pouvez effectuer un virement depuis votre banque marocaine selon les informations
            communiquées lors de la confirmation.
          </p>
          <div className="mt-6 rounded-3xl bg-beige/70 p-5 text-sm leading-7 text-chocolate/78">
            <p>
              <strong>Nom:</strong> [Nom à remplir]
            </p>
            <p>
              <strong>Email:</strong> [Email à remplir]
            </p>
            <p>
              <strong>Référence:</strong> Votre nom + le coffret choisi
            </p>
          </div>
        </article>

        <article className="luxury-border rounded-[2rem] bg-white p-7 shadow-soft">
          <HandCoins className="text-gold" size={34} />
          <h2 className="mt-5 font-heading text-3xl text-chocolate">Paiement à la livraison</h2>
          <p className="mt-4 text-sm leading-7 text-chocolate/68">
            Réglez votre coffret en espèces au moment de la livraison. Nous vous confirmerons le total,
            l’adresse et le créneau avant l’envoi.
          </p>
          <div className="mt-6 flex items-start gap-3 rounded-3xl bg-rose/16 p-5 text-sm leading-7 text-chocolate/78">
            <ShieldCheck className="mt-1 shrink-0 text-gold" size={20} />
            <p>Chaque commande est préparée après confirmation afin de préserver la fraîcheur des dattes.</p>
          </div>
        </article>
      </section>
    </main>
  );
}
