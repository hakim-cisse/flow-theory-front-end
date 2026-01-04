import { useState } from "react";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Founders } from "@/components/Founders";
import { Services } from "@/components/Services";
import { Results } from "@/components/Results";
import { CaseStudy } from "@/components/CaseStudy";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Header } from "@/components/Header";
import { ContactDialog } from "@/components/ContactDialog";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen pt-16">
      <Header onContactClick={() => setContactOpen(true)} />
      <ThemeToggle />
      <Hero />
      <About />
      <Founders />
      <Services />
      <Results />
      <CaseStudy />
      <CTA />
      <Footer onContactClick={() => setContactOpen(true)} />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default Index;
