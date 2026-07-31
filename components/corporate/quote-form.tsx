"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { createWhatsAppUrl } from "@/lib/contact";

export function CorporateQuoteForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const lines = [
      "Bonjour, je souhaite recevoir un devis pour des cadeaux d’entreprise Datte Gourmet.",
      `Entreprise: ${String(formData.get("company") ?? "")}`,
      `Contact: ${String(formData.get("name") ?? "")}`,
      `WhatsApp: ${String(formData.get("whatsapp") ?? "")}`,
      `Email: ${String(formData.get("email") ?? "")}`,
      `Quantité estimée: ${String(formData.get("quantity") ?? "")}`,
      `Date souhaitée: ${String(formData.get("date") ?? "Non précisée")}`,
      `Personnalisation: ${String(formData.get("customization") ?? "")}`,
      `Détails: ${String(formData.get("details") ?? "")}`
    ];

    setSubmitted(true);
    window.open(createWhatsAppUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="luxury-border rounded-[1.5rem] bg-beige p-6 shadow-luxe sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Entreprise" name="company" required />
        <Field label="Nom du contact" name="name" required />
        <Field label="WhatsApp" name="whatsapp" type="tel" required />
        <Field label="E-mail professionnel" name="email" type="email" required />
        <Field label="Quantité estimée" name="quantity" type="number" min="1" required />
        <Field label="Date souhaitée" name="date" type="date" />
      </div>

      <label className="mt-5 grid gap-2 text-sm font-semibold text-chocolate">
        Personnalisation souhaitée
        <select
          name="customization"
          className="focus-ring rounded-2xl border border-date/15 bg-white px-4 py-3 text-sm font-medium text-chocolate"
        >
          <option>Logo sur le coffret</option>
          <option>Carte ou message personnalisé</option>
          <option>Palette et ruban à vos couleurs</option>
          <option>Plusieurs éléments</option>
        </select>
      </label>

      <label className="mt-5 grid gap-2 text-sm font-semibold text-chocolate">
        Détails du projet
        <textarea
          name="details"
          rows={5}
          className="focus-ring rounded-2xl border border-date/15 bg-white px-4 py-3 text-sm text-chocolate"
          placeholder="Occasion, budget indicatif, livraison, couleurs de votre marque..."
        />
      </label>

      {submitted ? (
        <p className="mt-5 rounded-2xl bg-cream p-4 text-sm leading-6 text-chocolate">
          Votre demande est prête dans WhatsApp. Vous pouvez la compléter avant de l’envoyer.
        </p>
      ) : null}

      <button
        type="submit"
        className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-date px-6 py-4 text-sm font-semibold text-cream transition hover:bg-chocolate"
      >
        Recevoir un devis
        <ArrowUpRight size={18} />
      </button>
    </form>
  );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

function Field({ label, name, ...props }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-chocolate">
      {label}
      <input
        name={name}
        className="focus-ring rounded-2xl border border-date/15 bg-white px-4 py-3 text-sm text-chocolate"
        {...props}
      />
    </label>
  );
}
