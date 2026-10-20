import { createClient, SupabaseClient } from "@supabase/supabase-js";

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

const PLACEHOLDER_PATTERNS = ["placeholder", "your-project-id", "your-anon-key", "your_"];

function looksLikePlaceholder(value: string): boolean {
  const v = value.toLowerCase();
  return PLACEHOLDER_PATTERNS.some((p) => v.includes(p));
}

function resolveUrl(): string | undefined {
  return getEnv("VITE_SUPABASE_URL") || getEnv("SUPABASE_URL");
}

function resolveAnonKey(): string | undefined {
  return getEnv("VITE_SUPABASE_ANON_KEY") || getEnv("SUPABASE_ANON_KEY");
}

export function isSupabaseConfigured(): boolean {
  const url = resolveUrl();
  const key = resolveAnonKey();
  if (!url || !key) return false;
  if (looksLikePlaceholder(url) || looksLikePlaceholder(key)) return false;
  try {
    new URL(url);
  } catch {
    return false;
  }
  return true;
}

let browserClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured (missing or placeholder env vars).");
  }
  if (!browserClient) {
    browserClient = createClient(resolveUrl()!, resolveAnonKey()!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return browserClient;
}

export function getServerSupabaseClient(): SupabaseClient {
  const url = resolveUrl();
  const key =
    getEnv("SUPABASE_SERVICE_ROLE_KEY") || resolveAnonKey();

  if (!url || !key || looksLikePlaceholder(url) || looksLikePlaceholder(key)) {
    throw new Error("Supabase is not configured (missing or placeholder env vars).");
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}