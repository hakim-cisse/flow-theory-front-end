import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ar from "./locales/ar.json";

export const SUPPORTED_LANGS = ["en", "fr", "ar"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];
export const RTL_LANGS: Lang[] = ["ar"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar },
    },
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "fta-lang",
      caches: ["localStorage"],
    },
  });

// Keep <html lang> and <html dir> in sync
const applyDocLang = (lng: string) => {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lng;
  document.documentElement.dir = RTL_LANGS.includes(lng as Lang) ? "rtl" : "ltr";
};
applyDocLang(i18n.language || "en");
i18n.on("languageChanged", applyDocLang);

export default i18n;
