"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import { getSupabasePublicKey, getSupabaseUrl, hasSupabaseConfig } from "./config";

export const hasSupabaseBrowserConfig = hasSupabaseConfig;

export function createClient() {
  const url = getSupabaseUrl();
  const key = getSupabasePublicKey();

  if (!url || !key) {
    throw new Error("Supabase browser configuration is missing.");
  }

  return createBrowserClient<Database, "public", any>(
    url,
    key
  );
}
