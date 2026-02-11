import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.flowtheoryai.com";
const SITE_NAME = "Flow Theory AI";
const LOGO_URL = "https://www.flowtheoryai.com/assets/flow-theory-logo-BZZLGdSM.png";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  publishedTime: string;
  modifiedTime?: string;
  authorName: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

// Organization Schema - for the entire site
export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    description: "Flow Theory AI helps small and growing companies evolve from manual operations to intelligent, automated ecosystems.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: "https://cal.com/flow-theory-ai/alignment-call",
    },
    sameAs: [
      "https://www.linkedin.com/company/107525980",
      "https://x.com/flowtheoryai",
      "https://www.instagram.com/flowtheoryai/",
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Website Schema - for search functionality
export const WebsiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Article Schema - for blog posts
export const ArticleSchema = ({
  title,
  description,
  url,
  imageUrl,
  publishedTime,
  modifiedTime,
  authorName,
}: ArticleSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: url,
    image: imageUrl || LOGO_URL,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Breadcrumb Schema - for navigation
export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Blog Listing Schema - for blog index page
export const BlogListingSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    description: "Insights, strategies, and case studies from the Flow Theory AI team.",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
