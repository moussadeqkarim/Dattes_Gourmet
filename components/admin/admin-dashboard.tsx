"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, LogOut, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { formatMad } from "@/lib/utils";
import type { Database } from "@/types/database";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type Summary = {
  totalOrders: number;
  pendingPayments: number;
  pendingFulfillment: number;
  totalRevenue: number;
};

const pageSize = 10;

export function AdminDashboard() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [orders, setOrders] = useState<Order[]>([]);
  const [summary, setSummary] = useState<Summary>({
    totalOrders: 0,
    pendingPayments: 0,
    pendingFulfillment: 0,
    totalRevenue: 0
  });
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    let query = supabase
      .from("orders")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (search.trim()) {
      query = query.ilike("customer_name", `%${search.trim()}%`);
    }

    if (date) {
      const start = new Date(`${date}T00:00:00.000`);
      const end = new Date(`${date}T23:59:59.999`);
      query = query.gte("created_at", start.toISOString()).lte("created_at", end.toISOString());
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    const { data, error: fetchError, count } = await query.range(from, to);

    if (fetchError) {
      setError("Impossible de charger les commandes.");
      setOrders([]);
      setTotalCount(0);
    } else {
      setOrders(data ?? []);
      setTotalCount(count ?? 0);
    }

    const { data: allOrders } = await supabase
      .from("orders")
      .select("total_mad,is_paid,is_fulfilled,status");

    if (allOrders) {
      setSummary({
        totalOrders: allOrders.length,
        pendingPayments: allOrders.filter((order) => !order.is_paid).length,
        pendingFulfillment: allOrders.filter((order) => !order.is_fulfilled).length,
        totalRevenue: allOrders.reduce((sum, order) => sum + (order.total_mad ?? 0), 0)
      });
    }

    setIsLoading(false);
  }, [date, page, search, supabase]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  async function toggleStatus(orderId: string, field: "is_paid" | "is_fulfilled", value: boolean) {
    const previous = orders;
    setOrders((current) => current.map((order) => (order.id === orderId ? { ...order, [field]: value } : order)));

    const { error: updateError } = await supabase
      .from("orders")
      .update({ [field]: value, updated_at: new Date().toISOString() })
      .eq("id", orderId);

    if (updateError) {
      setOrders(previous);
      setError("La mise à jour a échoué. Vérifiez vos droits d'administration.");
    } else {
      fetchOrders();
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Tableau de bord</p>
          <h1 className="mt-3 font-heading text-5xl text-chocolate">Commandes</h1>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-chocolate/10 bg-white px-5 py-3 text-sm font-semibold text-chocolate shadow-soft transition hover:border-gold"
        >
          <LogOut size={17} />
          Déconnexion
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Total commandes" value={summary.totalOrders.toString()} />
        <SummaryCard label="Paiements en attente" value={summary.pendingPayments.toString()} />
        <SummaryCard label="Préparations en attente" value={summary.pendingFulfillment.toString()} />
        <SummaryCard label="Revenu total" value={formatMad(summary.totalRevenue)} />
      </div>

      <div className="luxury-border mt-8 rounded-[2rem] bg-white p-5 shadow-luxe">
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <label className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-chocolate/40" size={18} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Rechercher par nom client"
              className="focus-ring w-full rounded-full border border-chocolate/10 bg-cream py-3 pl-11 pr-4 text-sm"
            />
          </label>
          <input
            type="date"
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              setPage(1);
            }}
            className="focus-ring rounded-full border border-chocolate/10 bg-cream px-4 py-3 text-sm"
          />
        </div>

        {error ? <p className="mt-4 rounded-2xl bg-rose/20 p-4 text-sm text-chocolate">{error}</p> : null}

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[980px] border-separate border-spacing-y-3 text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.18em] text-chocolate/52">
              <tr>
                <th className="px-4 py-2">Commande</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">WhatsApp</th>
                <th className="px-4 py-2">Coffret</th>
                <th className="px-4 py-2">Saveurs</th>
                <th className="px-4 py-2">Paiement</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Payée?</th>
                <th className="px-4 py-2">Livrée?</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={11} className="rounded-2xl bg-cream p-8 text-center text-chocolate/60">
                    Chargement des commandes...
                  </td>
                </tr>
              ) : orders.length ? (
                orders.map((order) => (
                  <tr key={order.id} className="bg-cream/80">
                    <td className="rounded-l-2xl px-4 py-4 font-mono text-xs">
                      {order.order_reference || order.id.slice(0, 8)}
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-date">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-semibold">{order.customer_name}</td>
                    <td className="px-4 py-4">{order.whatsapp}</td>
                    <td className="px-4 py-4">{order.box_name}</td>
                    <td className="max-w-[260px] px-4 py-4 text-xs leading-5 text-chocolate/68">
                      {[...order.classic_flavors, ...order.exotic_flavors].join(", ") || "Aucune sélection"}
                    </td>
                    <td className="px-4 py-4">
                      {order.payment_method === "bank_transfer" ? "Virement" : "Livraison"}
                    </td>
                    <td className="px-4 py-4 font-bold">{formatMad(order.total_mad)}</td>
                    <td className="px-4 py-4">{new Date(order.created_at).toLocaleDateString("fr-MA")}</td>
                    <td className="px-4 py-4">
                      <StatusCheckbox
                        checked={order.is_paid}
                        onChange={(checked) => toggleStatus(order.id, "is_paid", checked)}
                      />
                    </td>
                    <td className="rounded-r-2xl px-4 py-4">
                      <StatusCheckbox
                        checked={order.is_fulfilled}
                        onChange={(checked) => toggleStatus(order.id, "is_fulfilled", checked)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="rounded-2xl bg-cream p-8 text-center text-chocolate/60">
                    Aucune commande trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 text-sm text-chocolate/70">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="focus-ring rounded-full border border-chocolate/10 px-4 py-2 font-semibold disabled:opacity-40"
          >
            Précédent
          </button>
          <span>
            Page {page} sur {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            className="focus-ring rounded-full border border-chocolate/10 px-4 py-2 font-semibold disabled:opacity-40"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="luxury-border rounded-[1.5rem] bg-white p-5 shadow-soft">
      <p className="text-xs uppercase tracking-[0.18em] text-chocolate/54">{label}</p>
      <p className="mt-3 font-heading text-3xl text-chocolate">{value}</p>
    </article>
  );
}

function StatusCheckbox({
  checked,
  onChange
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`focus-ring grid size-9 place-items-center rounded-full border transition ${
        checked ? "border-gold bg-gold text-chocolate" : "border-chocolate/15 bg-white text-transparent"
      }`}
      aria-pressed={checked}
    >
      <Check size={17} />
    </button>
  );
}
