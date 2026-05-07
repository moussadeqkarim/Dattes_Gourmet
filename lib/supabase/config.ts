export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

export function getSupabasePublicKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function hasSupabaseConfig() {
  const url = getSupabaseUrl();
  const key = getSupabasePublicKey();

  return Boolean(url && key && !url.includes("your-project-ref") && !key.includes("your-supabase"));
}
