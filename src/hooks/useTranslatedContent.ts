import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";

interface TranslateItem {
  key: string;
  text: string;
}

// In-memory cache: `${lang}::${key}::${hash}` -> translated string
const memoryCache = new Map<string, string>();

function hashString(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return h.toString(36);
}

function cacheKey(lang: string, key: string, text: string) {
  return `${lang}::${key}::${hashString(text)}`;
}

function readLocal(lang: string, key: string, text: string): string | null {
  try {
    return localStorage.getItem(`fta-tr::${cacheKey(lang, key, text)}`);
  } catch {
    return null;
  }
}

function writeLocal(lang: string, key: string, text: string, value: string) {
  try {
    localStorage.setItem(`fta-tr::${cacheKey(lang, key, text)}`, value);
  } catch {
    /* quota — ignore */
  }
}

/**
 * Translates a set of text/HTML items on-the-fly via the `translate-content`
 * edge function. Returns English original when i18n language is `en`, otherwise
 * the translated strings (cached in localStorage + memory).
 */
export function useTranslatedContent(items: TranslateItem[] | null | undefined) {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "en").slice(0, 2);
  const [translated, setTranslated] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);

  const stableKey = items
    ? items.map((i) => `${i.key}:${hashString(i.text)}`).join("|")
    : "";

  useEffect(() => {
    if (!items || items.length === 0) {
      setTranslated(null);
      return;
    }

    // English: return originals directly.
    if (lang === "en") {
      const out: Record<string, string> = {};
      for (const it of items) out[it.key] = it.text;
      setTranslated(out);
      return;
    }

    // Try cache first
    const out: Record<string, string> = {};
    const missing: TranslateItem[] = [];
    for (const it of items) {
      const memHit = memoryCache.get(cacheKey(lang, it.key, it.text));
      const localHit = memHit ?? readLocal(lang, it.key, it.text);
      if (localHit) {
        out[it.key] = localHit;
        memoryCache.set(cacheKey(lang, it.key, it.text), localHit);
      } else {
        missing.push(it);
      }
    }

    if (missing.length === 0) {
      setTranslated(out);
      return;
    }

    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("translate-content", {
          body: {
            targetLang: lang,
            items: missing.map((m) => ({ key: m.key, text: m.text, isHtml: /<[a-z][\s\S]*>/i.test(m.text) })),
          },
        });
        if (cancelled) return;
        if (error) {
          // Fall back to originals
          for (const m of missing) out[m.key] = m.text;
          setTranslated({ ...out });
          return;
        }
        const translations = (data?.translations ?? {}) as Record<string, string>;
        for (const m of missing) {
          const v = translations[m.key] ?? m.text;
          out[m.key] = v;
          memoryCache.set(cacheKey(lang, m.key, m.text), v);
          writeLocal(lang, m.key, m.text, v);
        }
        setTranslated({ ...out });
      } catch {
        if (cancelled) return;
        for (const m of missing) out[m.key] = m.text;
        setTranslated({ ...out });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, stableKey]);

  return { translated, loading, lang };
}
