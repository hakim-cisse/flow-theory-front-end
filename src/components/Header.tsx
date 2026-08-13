import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import logoSrc from "@/assets/flow-theory-logo.png";

interface HeaderProps {
  onContactClick: () => void;
}

export const Header = ({ onContactClick }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const { t } = useTranslation();

  const navLinks = [
    {
      label: t("nav.services"),
      href: "/services",
      isRoute: true,
      children: [
        { label: t("svc.hub.cards.transformation.label"), href: "/services/ai-transformation" },
        { label: t("svc.hub.cards.engineering.label"), href: "/services/ai-engineering" },
      ],
    },
    { label: t("nav.about"), href: "/about", isRoute: true },
    { label: t("nav.blog"), href: "/blog", isRoute: true },
    { label: t("nav.contact"), href: "/contact", isRoute: true },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (link: { href: string; isRoute?: boolean }) => {
    if (link.isRoute) {
      navigate(link.href);
    } else {
      navigate({ pathname: "/", hash: link.href });
    }

    setIsOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className={`transition-all duration-300 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-foreground/15'
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="container mx-auto px-6 md:px-20 lg:px-28 max-w-[1600px]">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-2 text-mono text-foreground hover:text-primary transition-colors"
              aria-label="Flow Theory AI — home"
            >
              <img
                src={logoSrc}
                alt=""
                className="h-11 md:h-12 w-auto object-contain"
              />
              <span>FLOW THEORY <span className="text-primary">AI</span></span>
            </button>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <div key={link.href} className="relative group py-2">
                  <button
                    onClick={() => handleNavClick(link)}
                    className={`text-mono transition-colors story-link ${
                      location.pathname.startsWith(link.href) && link.href !== "/" ? "text-primary" : "text-foreground/65 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </button>
                  {link.children && (
                    <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="min-w-[240px] border border-border/40 bg-background/95 backdrop-blur-xl">
                        {link.children.map((child) => (
                          <button
                            key={child.href}
                            onClick={() => { navigate(child.href); setIsOpen(false); }}
                            className={`block w-full text-left px-5 py-3 text-mono text-xs transition-colors hover:bg-primary/[0.06] ${
                              location.pathname === child.href ? "text-primary" : "text-foreground/70 hover:text-foreground"
                            }`}
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-1 md:gap-2">
              <LanguageSwitcher />
              <button
                onClick={toggle}
                className="p-2 text-foreground/70 hover:text-foreground transition-colors"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <Button
                onClick={() => navigate("/contact")}
                className="hidden md:inline-flex gap-2 text-mono rounded-none px-5"
                size="sm"
              >
                {t("nav.bookIntro")}
                <ArrowRight className="w-3 h-3" />
              </Button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-foreground"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/30">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="flex flex-col">
                <button
                  onClick={() => handleNavClick(link)}
                  className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  {link.label}
                </button>
                {link.children?.map((child) => (
                  <button
                    key={child.href}
                    onClick={() => { navigate(child.href); setIsOpen(false); }}
                    className="pl-8 pr-4 py-2 text-xs text-mono text-muted-foreground/80 hover:text-foreground transition-colors text-left"
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
