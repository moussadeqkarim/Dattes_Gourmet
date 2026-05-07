"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError("Connexion impossible. Vérifiez votre email et votre mot de passe.");
      setIsLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="luxury-border mx-auto grid w-full max-w-md gap-5 rounded-[2rem] bg-white p-7 shadow-luxe">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-gold">Administration</p>
        <h1 className="mt-3 font-heading text-4xl text-chocolate">Connexion</h1>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-chocolate">
        Email
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="focus-ring rounded-2xl border border-chocolate/10 bg-cream px-4 py-3 text-sm"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-chocolate">
        Mot de passe
        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="focus-ring rounded-2xl border border-chocolate/10 bg-cream px-4 py-3 text-sm"
        />
      </label>
      {error ? <p className="rounded-2xl bg-rose/20 p-4 text-sm text-chocolate">{error}</p> : null}
      <button
        type="submit"
        disabled={isLoading}
        className="focus-ring rounded-full bg-chocolate px-6 py-3 text-sm font-semibold text-cream transition hover:bg-date disabled:opacity-60"
      >
        {isLoading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
