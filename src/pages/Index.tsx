import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhatWeDo } from "@/components/WhatWeDo";
import { Services } from "@/components/Services";
import { Stratum } from "@/components/Stratum";
import { Founders } from "@/components/Founders";
import { CaseStudy } from "@/components/CaseStudy";
import { Testimonials } from "@/components/Testimonials";
import { SEO } from "@/components/SEO";
import { OrganizationSchema, WebsiteSchema } from "@/components/StructuredData";
import { BlogPreview } from "@/components/BlogPreview";
import { SiteLayout } from "@/components/SiteLayout";

const Index = () => (
  <SiteLayout>
    <SEO
      title="AI Transformation Built on Strategy and ROI"
      description="Flow Theory AI helps businesses cut through the noise, build a clear AI roadmap, and execute only what delivers measurable business value. AI automation, consulting & custom SaaS."
      canonicalUrl="https://www.flowtheoryai.com/"
      ogTitle="Flow Theory AI - AI Transformation Built on Strategy and ROI"
      ogDescription="Flow Theory AI helps businesses cut through the noise, build a clear AI roadmap, and execute only what delivers measurable business value."
    />
    <OrganizationSchema />
    <WebsiteSchema />
    <Hero />
    <About />
    <Services />
    <Founders />
    <WhatWeDo />
    <Stratum />
    <CaseStudy />
    <Testimonials />
    <BlogPreview />
  </SiteLayout>
);

export default Index;
