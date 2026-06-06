import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
  return createSupabaseClient(url, key);
}

export function createMobileClient(supabaseUrl: string, supabaseAnonKey: string) {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}

export type SupabaseClient = ReturnType<typeof createBrowserClient>;
