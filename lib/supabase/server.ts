import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";
import { getSupabasePublicKey, getSupabaseUrl } from "./config";

type CookieToSet = {
  name: string;
  value: string;
  options?: Parameters<ReturnType<typeof cookies>["set"]>[2];
};

export function createClient() {
  const cookieStore = cookies();
  const url = getSupabaseUrl();
  const key = getSupabasePublicKey();

  if (!url || !key) {
    throw new Error("Supabase server configuration is missing.");
  }

  return createServerClient<Database, "public", any>(
    url,
    key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components cannot set cookies; route handlers and actions can.
          }
        }
      }
    }
  );
}
