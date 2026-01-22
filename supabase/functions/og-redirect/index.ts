import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SITE_URL = "https://www.flowtheoryai.com";
const API_BASE_URL = "https://taetntekartazcxgrawh.supabase.co/functions/v1/get-posts";
const DEFAULT_OG_IMAGE = "https://lh3.googleusercontent.com/d/1gObthFq6tfJDZLDv4KjJ65UxB2pBN8Qn";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Extract the post ID from the slug (format: uuid-title-slug)
function extractIdFromSlug(slug: string): string | null {
  if (!slug) return null;
  
  const uuidRegex = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;
  const match = slug.match(uuidRegex);
  
  if (match) {
    return match[1];
  }
  
  // If it starts with a short ID, try to extract it
  const parts = slug.split("-");
  if (parts.length >= 1 && parts[0].length >= 8) {
    return parts[0];
  }
  
  return null;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

serve(async (req) => {
  // Handle CORS preflight
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

    const postId = extractIdFromSlug(slug);
    
    if (!postId) {
      return new Response(JSON.stringify({ error: "Invalid slug format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch the blog post
    const response = await fetch(`${API_BASE_URL}?id=${postId}`);
    
    if (!response.ok) {
      // Return default OG tags for Flow Theory AI
      const defaultHtml = generateHtml({
        title: "Flow Theory AI Blog",
        description: "Insights, strategies, and case studies from the Flow Theory AI team.",
        image: DEFAULT_OG_IMAGE,
        url: `${SITE_URL}/blog`,
        type: "website",
      });
      
      return new Response(defaultHtml, {
        headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
      });
    }

    const post = await response.json();
    
    const title = post.title || "Flow Theory AI Blog";
    const description = post.excerpt || `Read ${post.title} on the Flow Theory AI blog.`;
    const image = post.cover_image_url || DEFAULT_OG_IMAGE;
    const canonicalUrl = `${SITE_URL}/blog/${slug}`;
    const authorName = post.author?.display_name || "Flow Theory AI";
    const publishedTime = post.published_at;

    const html = generateHtml({
      title,
      description,
      image,
      url: canonicalUrl,
      type: "article",
      authorName,
      publishedTime,
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
  
  <!-- Primary Meta Tags -->
  <title>${fullTitle}</title>
  <meta name="title" content="${fullTitle}" />
  <meta name="description" content="${safeDescription}" />
  
  <!-- Canonical URL -->
  <link rel="canonical" href="${url}" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="${type}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${safeDescription}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:site_name" content="Flow Theory AI" />
  ${articleMeta}
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${url}" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeDescription}" />
  <meta name="twitter:image" content="${image}" />
  
  <!-- Redirect to actual page -->
  <meta http-equiv="refresh" content="0;url=${url}" />
  <script>window.location.href = "${url}";</script>
</head>
<body>
  <p>Redirecting to <a href="${url}">${safeTitle}</a>...</p>
</body>
</html>`;
}
