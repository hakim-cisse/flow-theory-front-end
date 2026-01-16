import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BlogPayload {
  author_name: string;
  title: string;
  body: string;
  image_url?: string;
}

const VALID_AUTHORS = [
  "Hakim Cisse",
  "Yassine Diallo",
  "Yunus Kounkourou",
];

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Validate authorization token
    const authHeader = req.headers.get("Authorization");
    const expectedToken = Deno.env.get("BLOG_WEBHOOK_TOKEN");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("Missing or invalid Authorization header");
      return new Response(
        JSON.stringify({ error: "Unauthorized - Missing or invalid Authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const providedToken = authHeader.replace("Bearer ", "");
    if (providedToken !== expectedToken) {
      console.error("Invalid token provided");
      return new Response(
        JSON.stringify({ error: "Unauthorized - Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse and validate the request body
    const payload: BlogPayload = await req.json();
    console.log("Received blog payload:", JSON.stringify(payload, null, 2));

    // Validate required fields
    if (!payload.author_name || typeof payload.author_name !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid field: author_name" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!payload.title || typeof payload.title !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid field: title" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!payload.body || typeof payload.body !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid field: body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate author name
    if (!VALID_AUTHORS.includes(payload.author_name)) {
      return new Response(
        JSON.stringify({ 
          error: `Invalid author_name. Must be one of: ${VALID_AUTHORS.join(", ")}` 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert the blog post
    const { data, error } = await supabase
      .from("blogs")
      .insert({
        author_name: payload.author_name,
        title: payload.title,
        body: payload.body,
        image_url: payload.image_url || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error inserting blog:", error);
      return new Response(
        JSON.stringify({ error: "Failed to create blog post", details: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Blog post created successfully:", data.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Blog post created successfully",
        blog: data 
      }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Unexpected error:", errorMessage);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
