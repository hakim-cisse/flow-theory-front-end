import { useState } from "react";
import { Hero } from "@/components/Hero";
import { LogoCatalog } from "@/components/LogoCatalog";
import { About } from "@/components/About";
import { Stratum } from "@/components/Stratum";
import { AIProductDevelopment } from "@/components/AIProductDevelopment";
import { Founders } from "@/components/Founders";
import { CaseStudy } from "@/components/CaseStudy";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ContactDialog } from "@/components/ContactDialog";
import { SEO } from "@/components/SEO";
import { OrganizationSchema, WebsiteSchema } from "@/components/StructuredData";
import { BlogPreview } from "@/components/BlogPreview";
import { useScrollReveal, staggerStyle } from "@/hooks/useScrollReveal";

const ProofIntro = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="pt-24 sm:pt-32 pb-0 relative">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <span className="text-mono text-primary/70 block mb-6" style={staggerStyle(0, isVisible)}>
            Proof
          </span>
          <h2 className="text-heading" style={staggerStyle(1, isVisible)}>
            Outcomes, not<br />
            <span className="text-gradient">slide decks.</span>
          </h2>
          <div className="accent-bar mt-6" style={staggerStyle(2, isVisible)} />
          <p className="text-subheading text-muted-foreground leading-relaxed mt-8" style={staggerStyle(3, isVisible)}>
            Hours given back, dollars saved, deals closed faster. Here's what's happened
            inside the businesses we've worked with — in their numbers and their words.
          </p>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen pt-16">
      <SEO
        title="AI Transformation Built on Strategy and ROI"
        description="Flow Theory AI helps businesses cut through the noise, build a clear AI roadmap, and execute only what delivers measurable business value. AI automation, consulting & custom SaaS."
        canonicalUrl="https://www.flowtheoryai.com/"
        ogTitle="Flow Theory AI - AI Transformation Built on Strategy and ROI"
        ogDescription="Flow Theory AI helps businesses cut through the noise, build a clear AI roadmap, and execute only what delivers measurable business value."
      />
      <OrganizationSchema />
      <WebsiteSchema />
      <Header onContactClick={() => setContactOpen(true)} />
      <Hero />
      <LogoCatalog />
      <About />
      <Stratum />
      <AIProductDevelopment />
      <ProofIntro />
      <CaseStudy />
      <Testimonials />
      <Founders />
      <BlogPreview />
      <CTA />
      <Footer onContactClick={() => setContactOpen(true)} />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default Index;
