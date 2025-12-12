import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import logo from "@/assets/flow-theory-logo.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Team", href: "#founders" },
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl px-4 md:px-6 py-2 flex items-center justify-between shadow-lg">
        <img
          src={logo}
          alt="Flow Theory AI"
          className="h-10 md:h-12 w-auto cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent/50"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => scrollToSection("#cta")}
            className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            Book an intro
            <ArrowRight className="w-4 h-4" />
          </Button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:bg-accent/50 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl px-4 py-4 shadow-lg">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent/50 text-left"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent/50"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="w-4 h-4" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4" />
                    Dark Mode
                  </>
                )}
              </button>
            )}

            <Button
              onClick={() => scrollToSection("#cta")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              size="sm"
            >
              Book an intro
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
