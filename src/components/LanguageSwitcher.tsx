import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SUPPORTED_LANGS } from "@/i18n/config";

const LABELS: Record<string, string> = {
  en: "EN",
  fr: "FR",
  ar: "ع",
};

const FULL_LABELS: Record<string, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || "en").slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-1.5 px-2 py-2 text-mono text-foreground/70 hover:text-foreground transition-colors focus:outline-none"
        aria-label={t("lang.label")}
        title={t("lang.label")}
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs uppercase tracking-wide">{LABELS[current] ?? current.toUpperCase()}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-none min-w-[9rem]">
        {SUPPORTED_LANGS.map((lng) => (
          <DropdownMenuItem
            key={lng}
            onClick={() => i18n.changeLanguage(lng)}
            className={`text-mono cursor-pointer rounded-none ${current === lng ? "text-primary" : ""}`}
          >
            {FULL_LABELS[lng]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
