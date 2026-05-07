"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { boxes, classicFlavors, exoticFlavors, paymentMethods } from "@/lib/catalog";
import { createWhatsAppUrl } from "@/lib/contact";
import { createClient } from "@/lib/supabase/client";
import { cn, formatMad } from "@/lib/utils";
import type { BoxOption, PaymentMethod } from "@/types/catalog";

type OrderModalProps = {
  open: boolean;
  selectedBox: BoxOption | null;
  onClose: () => void;
};

type OrderResult = {
  summary: string;
  whatsappUrl: string;
  savedToAdmin: boolean;
  orderReference: string;
};

function hasSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  return Boolean(url && key && !url.includes("your-project-ref") && !key.includes("your-supabase"));
}

async function withTimeout<T>(promise: PromiseLike<T>, timeoutMs = 12000) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Request timed out")), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

function createOrderReference() {
  const numericPart = (Date.now() % 1000000).toString().padStart(6, "0");
  return `DG-${numericPart}`;
}

export function OrderModal({ open, selectedBox, onClose }: OrderModalProps) {
  const [boxSlug, setBoxSlug] = useState(selectedBox?.slug ?? boxes[0].slug);
  const [classicSelected, setClassicSelected] = useState<string[]>([]);
  const [exoticSelected, setExoticSelected] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank_transfer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OrderResult | null>(null);
  const submitRunRef = useRef(0);

  const activeBox = useMemo(
    () => boxes.find((box) => box.slug === boxSlug) ?? boxes[0],
    [boxSlug]
  );

  useEffect(() => {
    if (selectedBox) {
      setBoxSlug(selectedBox.slug);
    }
  }, [selectedBox]);

  useEffect(() => {
    if (!open) {
      submitRunRef.current += 1;
      setIsSubmitting(false);
      setError(null);
      setResult(null);
    }
  }, [open]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitRun = submitRunRef.current + 1;
    submitRunRef.current = submitRun;
    setError(null);
    setResult(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const customerName = String(formData.get("customer_name") ?? "").trim();
    const whatsapp = String(formData.get("whatsapp") ?? "").trim();
    const instagramHandle = String(formData.get("instagram_handle") ?? "").trim();
    const deliveryAddress = String(formData.get("delivery_address") ?? "").trim();
    const specialInstructions = String(formData.get("special_instructions") ?? "").trim();
    const orderReference = createOrderReference();

    if (customerName.length < 2 || whatsapp.length < 6 || deliveryAddress.length < 2) {
      setError("Veuillez remplir votre nom, votre WhatsApp et votre ville ou adresse de livraison.");
      setIsSubmitting(false);
      return;
    }

    const summaryLines = [
      "Bonjour, je confirme ma commande:",
      `Référence commande: ${orderReference}`,
      `Nom: ${customerName}`,
      `WhatsApp: ${whatsapp}`,
      instagramHandle ? `Instagram: ${instagramHandle}` : "",
      `Adresse: ${deliveryAddress}`,
      `Coffret: ${activeBox.displayName} - ${formatMad(activeBox.price)}`,
      classicSelected.length ? `Saveurs classiques: ${classicSelected.join(", ")}` : "",
      exoticSelected.length ? `Saveurs exotiques: ${exoticSelected.join(", ")}` : "",
      `Paiement: ${paymentMethods.find((method) => method.value === paymentMethod)?.label}`,
      specialInstructions ? `Instructions: ${specialInstructions}` : ""
    ].filter(Boolean);

    const summary = summaryLines.join("\n");
    const whatsappUrl = createWhatsAppUrl(summary);
    const payload = {
      customer_name: customerName,
      whatsapp,
      instagram_handle: instagramHandle || null,
      delivery_address: deliveryAddress,
      box_name: activeBox.displayName,
      box_price_mad: activeBox.price,
      classic_flavors: classicSelected,
      exotic_flavors: exoticSelected,
      payment_method: paymentMethod,
      special_instructions: specialInstructions || null,
      total_mad: activeBox.price,
      currency: "MAD",
      status: "new",
      order_reference: orderReference,
      whatsapp_message: summary
    };

    try {
      if (!hasSupabaseConfig()) {
        throw new Error("Supabase is not configured");
      }

      const supabase = createClient();
      const insertPromise = supabase.from("orders").insert(payload).then((response) => response);
      const { error: insertError } = await withTimeout(insertPromise);

      if (insertError) {
        throw insertError;
      }

      if (submitRunRef.current !== submitRun) {
        return;
      }

      setResult({
        summary,
        whatsappUrl,
        savedToAdmin: true,
        orderReference
      });
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (saveError) {
      console.error("Order save failed", saveError);

      if (submitRunRef.current !== submitRun) {
        return;
      }

      setError(
        "La commande n'a pas pu être enregistrée automatiquement pour le moment. Envoyez-la sur WhatsApp avec le récapitulatif ci-dessous."
      );
      setResult({
        summary,
        whatsappUrl,
        savedToAdmin: false,
        orderReference
      });
    } finally {
      if (submitRunRef.current === submitRun) {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-chocolate/58 px-4 py-4 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ y: 42, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 42, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] bg-cream p-5 shadow-luxe sm:rounded-[2rem] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.26em] text-gold">Commande privée</p>
                <h2 className="mt-2 font-heading text-3xl text-chocolate sm:text-4xl">
                  Composer votre coffret
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="focus-ring rounded-full border border-chocolate/10 bg-white p-3 text-chocolate transition hover:border-gold hover:text-gold"
                aria-label="Fermer le formulaire"
              >
                <X size={20} />
              </button>
            </div>

            {result ? (
              <div className="mt-8 rounded-3xl bg-white p-6 shadow-soft">
                <h3 className="font-heading text-2xl">
                  {result.savedToAdmin
                    ? "Merci, votre commande a été envoyée."
                    : "Votre commande est prête à envoyer sur WhatsApp."}
                </h3>
                <p className="mt-3 inline-flex rounded-full bg-beige px-4 py-2 font-mono text-xs font-semibold text-date">
                  Référence commande: {result.orderReference}
                </p>
                <p className="mt-3 text-sm leading-7 text-chocolate/70">
                  {result.savedToAdmin
                    ? "Vous pouvez aussi confirmer votre commande sur WhatsApp avec le récapitulatif ci-dessous."
                    : "L'enregistrement automatique n'a pas abouti. Le récapitulatif est prêt pour WhatsApp."}
                </p>
                {error ? <p className="mt-4 rounded-2xl bg-rose/20 p-4 text-sm text-chocolate">{error}</p> : null}
                <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-beige/60 p-4 text-sm leading-6 text-chocolate/78">
                  {result.summary}
                </pre>
                <a
                  href={result.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring mt-5 inline-flex rounded-full bg-chocolate px-6 py-3 text-sm font-semibold text-cream transition hover:bg-date"
                >
                  Ouvrir WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Nom complet" name="customer_name" required />
                  <Field label="Numéro WhatsApp" name="whatsapp" required inputMode="tel" />
                  <Field label="Compte Instagram" name="instagram_handle" placeholder="@votre_compte" />
                  <Field label="Ville / Adresse de livraison" name="delivery_address" required />
                </div>

                <label className="grid gap-2 text-sm font-semibold text-chocolate">
                  Sélection du coffret
                  <select
                    value={boxSlug}
                    onChange={(event) => setBoxSlug(event.target.value)}
                    className="focus-ring rounded-2xl border border-chocolate/10 bg-white px-4 py-3 text-sm font-medium text-chocolate"
                  >
                    {boxes.map((box) => (
                      <option value={box.slug} key={box.slug}>
                        {box.displayName} - {formatMad(box.price)}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="grid gap-5 md:grid-cols-2">
                  <MultiSelect
                    label="Saveurs classiques"
                    options={classicFlavors.map((flavor) => flavor.name)}
                    selected={classicSelected}
                    onChange={setClassicSelected}
                  />
                  <MultiSelect
                    label="Saveurs exotiques"
                    options={exoticFlavors.map((flavor) => flavor.name)}
                    selected={exoticSelected}
                    onChange={setExoticSelected}
                  />
                </div>

                <fieldset className="rounded-3xl border border-chocolate/10 bg-white p-4">
                  <legend className="px-2 text-sm font-semibold text-chocolate">Méthode de paiement</legend>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.value}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition",
                          paymentMethod === method.value
                            ? "border-gold bg-beige/70"
                            : "border-chocolate/10 hover:border-gold/70"
                        )}
                      >
                        <input
                          type="radio"
                          name="payment_method"
                          value={method.value}
                          checked={paymentMethod === method.value}
                          onChange={() => setPaymentMethod(method.value)}
                          className="accent-gold"
                        />
                        {method.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="grid gap-2 text-sm font-semibold text-chocolate">
                  Instructions spéciales
                  <textarea
                    name="special_instructions"
                    rows={4}
                    className="focus-ring rounded-2xl border border-chocolate/10 bg-white px-4 py-3 text-sm text-chocolate"
                    placeholder="Allergies, préférences de saveurs, créneau de livraison..."
                  />
                </label>

                {error ? <p className="rounded-2xl bg-rose/20 p-4 text-sm text-chocolate">{error}</p> : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="focus-ring rounded-full bg-chocolate px-7 py-4 text-sm font-semibold text-cream transition hover:bg-date disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer la Commande"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
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
        className="focus-ring rounded-2xl border border-chocolate/10 bg-white px-4 py-3 text-sm text-chocolate"
        {...props}
      />
    </label>
  );
}

type MultiSelectProps = {
  label: string;
  options: string[];
  selected: string[];
  onChange: (value: string[]) => void;
};

function MultiSelect({ label, options, selected, onChange }: MultiSelectProps) {
  function toggleOption(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
      return;
    }

    onChange([...selected, option]);
  }

  return (
    <fieldset className="rounded-3xl border border-chocolate/10 bg-white p-4">
      <legend className="px-2 text-sm font-semibold text-chocolate">{label}</legend>
      <div className="mt-2 grid max-h-56 gap-2 overflow-y-auto pr-1">
        {options.map((option) => (
          <label
            key={option}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-2xl border px-3 py-2 text-sm transition",
              selected.includes(option)
                ? "border-gold bg-beige/70 text-chocolate"
                : "border-chocolate/10 text-chocolate/78 hover:border-gold/70"
            )}
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => toggleOption(option)}
              className="size-4 rounded border-chocolate/20 accent-gold"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
