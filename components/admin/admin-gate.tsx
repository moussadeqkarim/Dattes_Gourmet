"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { createClient } from "@/lib/supabase/client";

export function AdminGate() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [status, setStatus] = useState<"loading" | "allowed" | "denied">("loading");

  useEffect(() => {
    let isMounted = true;

    async function checkAccess() {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (!isMounted) {
        return;
      }

      if (userError || !user) {
        router.replace("/admin/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (!isMounted) {
        return;
      }

      if (profileError || !profile?.is_admin) {
        setStatus("denied");
        await supabase.auth.signOut();
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

  if (status === "allowed") {
    return <AdminDashboard />;
  }

  return (
    <div className="mx-auto grid min-h-screen max-w-xl place-items-center px-5 text-center">
      <div className="luxury-border rounded-[2rem] bg-white p-7 shadow-luxe">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">Administration</p>
        <h1 className="mt-3 font-heading text-4xl text-chocolate">
          {status === "denied" ? "Accès non autorisé" : "Chargement..."}
        </h1>
        <p className="mt-4 text-sm leading-6 text-chocolate/68">
          {status === "denied"
            ? "Ce compte n'a pas encore les droits administrateur."
            : "Vérification de votre session administrateur."}
        </p>
      </div>
    </div>
  );
}
