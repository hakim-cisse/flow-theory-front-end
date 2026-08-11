import { SiteLayout } from "@/components/SiteLayout";
import { SEO } from "@/components/SEO";
import { About } from "@/components/About";
import { Founders } from "@/components/Founders";
import { CaseStudy } from "@/components/CaseStudy";
import { Testimonials } from "@/components/Testimonials";
import { CTABanner } from "@/components/CTABanner";

const AboutPage = () => (
  <SiteLayout>
    <SEO
      title="About Flow Theory AI, Founders and Client Results"
      description="Meet the founders behind Flow Theory AI and see the case studies and client results behind our AI transformation work."
      canonicalUrl="https://www.flowtheoryai.com/about"
    />
    <div className="pt-10">
      <About />
      <Founders />
      <CaseStudy />
      <Testimonials />
      <CTABanner />
    </div>
  </SiteLayout>
);

export default AboutPage;
