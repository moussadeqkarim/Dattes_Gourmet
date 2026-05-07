"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { createClient, hasSupabaseBrowserConfig } from "@/lib/supabase/client";

type AccessStatus = "loading" | "allowed" | "denied" | "not-configured";

export function AdminGate() {
  const router = useRouter();
  const isConfigured = hasSupabaseBrowserConfig();
  const supabase = useMemo(() => (isConfigured ? createClient() : null), [isConfigured]);
  const [status, setStatus] = useState<AccessStatus>(isConfigured ? "loading" : "not-configured");

  useEffect(() => {
    if (!supabase) {
      setStatus("not-configured");
      return;
    }

    const supabaseClient = supabase;
    let isMounted = true;

    async function checkAccess() {
      const {
        data: { user },
        error: userError
      } = await supabaseClient.auth.getUser();

      if (!isMounted) {
        return;
      }

      if (userError || !user) {
        router.replace("/admin/login");
        return;
      }

      const { data: profile, error: profileError } = await supabaseClient
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (!isMounted) {
        return;
      }

      if (profileError || !profile?.is_admin) {
        setStatus("denied");
        await supabaseClient.auth.signOut();
        router.replace("/admin/login");
        return;
      }

      setStatus("allowed");
    }

    checkAccess();

    return () => {
      isMounted = false;
    };
  }, [router, supabase]);

  if (status === "allowed" && supabase) {
    return <AdminDashboard />;
  }

  return (
    <div className="mx-auto grid min-h-screen max-w-xl place-items-center px-5 text-center">
      <div className="luxury-border rounded-[2rem] bg-white p-7 shadow-luxe">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">Administration</p>
        <h1 className="mt-3 font-heading text-4xl text-chocolate">
          {status === "denied"
            ? "Accès non autorisé"
            : status === "not-configured"
              ? "Configuration requise"
              : "Chargement..."}
        </h1>
        <p className="mt-4 text-sm leading-6 text-chocolate/68">
          {status === "denied"
            ? "Ce compte n'a pas encore les droits administrateur."
            : status === "not-configured"
              ? "Ajoutez les variables Supabase dans l'hébergement pour activer le tableau de bord."
              : "Vérification de votre session administrateur."}
        </p>
      </div>
    </div>
  );
}
