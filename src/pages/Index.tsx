import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Founders } from "@/components/Founders";
import { Results } from "@/components/Results";
import { CaseStudy } from "@/components/CaseStudy";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ThemeToggle />
      <Hero />
      <About />
      <Founders />
      <Results />
      <CaseStudy />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
