import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SITE_URL = "https://www.flowtheoryai.com";
const API_BASE_URL = "https://taetntekartazcxgrawh.supabase.co/functions/v1/get-posts";
const DEFAULT_OG_IMAGE = "https://www.flowtheoryai.com/og-image.jpg";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const UUID_REGEX = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;

function extractEmbeddedId(slug: string): string | null {
  if (!slug) return null;
  const match = slug.match(UUID_REGEX);
  return match ? match[1] : null;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 80);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface ApiPost {
  id: string;
  title: string;
  excerpt?: string | null;
  cover_image_url?: string | null;
  published_at?: string;
  author?: { display_name?: string | null } | null;
}

async function resolvePostId(slug: string): Promise<string | null> {
  const embedded = extractEmbeddedId(slug);
  if (embedded) return embedded;

  // Slug-only URL: look it up in the post list
  try {
    const res = await fetch(`${API_BASE_URL}?limit=200&offset=0`);
    if (!res.ok) return null;
    const data = (await res.json()) as { posts?: ApiPost[] };
    const match = data.posts?.find((p) => generateSlug(p.title) === slug);
    return match?.id ?? null;
  } catch (_e) {
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (!slug) {
      return new Response(JSON.stringify({ error: "Missing slug parameter" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const postId = await resolvePostId(slug);

    if (!postId) {
      const fallback = generateHtml({
        title: "Flow Theory AI Blog",
        description: "Insights, strategies, and case studies from the Flow Theory AI team.",
        image: DEFAULT_OG_IMAGE,
        url: `${SITE_URL}/blog`,
        type: "website",
      });
      return new Response(fallback, {
        headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
      });
    }

    const response = await fetch(`${API_BASE_URL}?id=${postId}`);
    if (!response.ok) {
      const fallback = generateHtml({
        title: "Flow Theory AI Blog",
        description: "Insights, strategies, and case studies from the Flow Theory AI team.",
        image: DEFAULT_OG_IMAGE,
        url: `${SITE_URL}/blog`,
        type: "website",
      });
      return new Response(fallback, {
        headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
      });
    }

    const post = (await response.json()) as ApiPost;
    const cleanSlug = generateSlug(post.title);
    const canonicalUrl = `${SITE_URL}/blog/${cleanSlug}`;

    const html = generateHtml({
      title: post.title || "Flow Theory AI Blog",
      description: post.excerpt || `Read ${post.title} on the Flow Theory AI blog.`,
      image: post.cover_image_url || DEFAULT_OG_IMAGE,
      url: canonicalUrl,
      type: "article",
      authorName: post.author?.display_name || "Flow Theory AI",
      publishedTime: post.published_at,
    });

    return new Response(html, {
      headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (error) {
    console.error("Error generating OG page:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

interface OgParams {
  title: string;
  description: string;
  image: string;
  url: string;
  type: "website" | "article";
  authorName?: string;
  publishedTime?: string;
}

function generateHtml(params: OgParams): string {
  const { title, description, image, url, type, authorName, publishedTime } = params;

  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const fullTitle = `${safeTitle} | Flow Theory AI`;

  let articleMeta = "";
  if (type === "article") {
    if (publishedTime) {
      articleMeta += `<meta property="article:published_time" content="${publishedTime}" />`;
    }
    if (authorName) {
      articleMeta += `<meta property="article:author" content="${escapeHtml(authorName)}" />`;
    }
    articleMeta += `<meta property="article:section" content="AI & Business" />`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${fullTitle}</title>
  <meta name="title" content="${fullTitle}" />
  <meta name="description" content="${safeDescription}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="${type}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${safeDescription}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:site_name" content="Flow Theory AI" />
  ${articleMeta}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${url}" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeDescription}" />
  <meta name="twitter:image" content="${image}" />
</head>
<body>
  <h1>${safeTitle}</h1>
  <p>${safeDescription}</p>
  <p><a href="${url}">Read the full article</a></p>
</body>
</html>`;
}
