import { useState } from "react";
import { Hero } from "@/components/Hero";
import { LogoCatalog } from "@/components/LogoCatalog";
import { About } from "@/components/About";
import { WhatWeDo } from "@/components/WhatWeDo";
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
import { AmbientBackground } from "@/components/AmbientBackground";
import { ScrollProgress } from "@/components/ScrollProgress";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen pt-16 relative">
      <AmbientBackground />
      <ScrollProgress />
      <SEO
        title="AI Transformation Built on Strategy and ROI"
        description="Flow Theory AI helps businesses cut through the noise, build a clear AI roadmap, and execute only what delivers measurable business value. AI automation, consulting & custom SaaS."
        canonicalUrl="https://www.flowtheoryai.com/"
        ogTitle="Flow Theory AI - AI Transformation Built on Strategy and ROI"
        ogDescription="Flow Theory AI helps businesses cut through the noise, build a clear AI roadmap, and execute only what delivers measurable business value."
      />
      <OrganizationSchema />
      <WebsiteSchema />
      <div className="relative z-10">
        <Header onContactClick={() => setContactOpen(true)} />
        <Hero />
        <LogoCatalog />
        <About />
        <WhatWeDo />
        <CaseStudy />
        <Testimonials />
        <Founders />
        <BlogPreview />
        <CTA />
        <Footer onContactClick={() => setContactOpen(true)} />
      </div>
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default Index;
