import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Founders } from "@/components/Founders";
import { Services } from "@/components/Services";
import { Results } from "@/components/Results";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Founders />
      <Services />
      <Results />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
