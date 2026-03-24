const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const EXTERNAL_BLOG_API = "https://taetntekartazcxgrawh.supabase.co/functions/v1/get-posts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const url = new URL(req.url);
    const target = new URL(EXTERNAL_BLOG_API);

    // Forward supported query params
    const id = url.searchParams.get("id");
    const limit = url.searchParams.get("limit");
    const offset = url.searchParams.get("offset");

    if (id) target.searchParams.set("id", id);
    if (limit) target.searchParams.set("limit", limit);
    if (offset) target.searchParams.set("offset", offset);

    const upstreamResponse = await fetch(target.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const responseText = await upstreamResponse.text();

    return new Response(responseText, {
      status: upstreamResponse.status,
      headers: {
        ...corsHeaders,
        "Content-Type": upstreamResponse.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: "Failed to fetch blogs", details: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
