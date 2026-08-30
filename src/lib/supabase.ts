import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Helper to safely get environment variables across client and server
export function getEnv(key: string): string | undefined {
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key];
  }
  if (typeof import.meta !== "undefined" && import.meta.env) {
    const metaEnv = import.meta.env as Record<string, string | undefined>;
    if (metaEnv[key]) return metaEnv[key];
  }
  return undefined;
}

const supabaseUrl =
  getEnv("VITE_SUPABASE_URL") ||
  getEnv("SUPABASE_URL") ||
  "https://placeholder-project.supabase.co";

const supabaseAnonKey =
  getEnv("VITE_SUPABASE_ANON_KEY") || getEnv("SUPABASE_ANON_KEY") || "placeholder-anon-key";

// Public / Browser-safe Supabase client (only uses Anon key)
let browserClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return browserClient;
}

// Server-side Supabase client (Uses service-role key if available for privileged queries, falls back to anon key)
export function getServerSupabaseClient(): SupabaseClient {
  const serviceKey =
    getEnv("SUPABASE_SERVICE_ROLE_KEY") ||
    getEnv("VITE_SUPABASE_ANON_KEY") ||
    getEnv("SUPABASE_ANON_KEY") ||
    "placeholder-key";

  return createClient(supabaseUrl, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function isSupabaseConfigured(): boolean {
  const url = getEnv("VITE_SUPABASE_URL") || getEnv("SUPABASE_URL");
  const key = getEnv("VITE_SUPABASE_ANON_KEY") || getEnv("SUPABASE_ANON_KEY");
  return Boolean(url && key && !url.includes("placeholder-project"));
}
