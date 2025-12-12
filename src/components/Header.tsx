import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/flow-theory-logo.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Team", href: "#founders" },
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
];

export const Header = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl px-6 py-2 flex items-center justify-between shadow-lg">
        <img
          src={logo}
          alt="Flow Theory AI"
          className="h-12 w-auto cursor-pointer"
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

        <Button
          onClick={() => scrollToSection("#cta")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          Book an intro
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};
