import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Team", href: "#founders" },
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
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
          Get Started
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};
