import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DeleteBlogPayload {
  title: string;
}

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
    const payload: DeleteBlogPayload = await req.json();
    console.log("Received delete blog payload:", JSON.stringify(payload, null, 2));

    // Validate required fields
    if (!payload.title || typeof payload.title !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid field: title" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Delete the blog post by title
    const { data, error } = await supabase
      .from("blogs")
      .delete()
      .eq("title", payload.title)
      .select();

    if (error) {
      console.error("Error deleting blog:", error);
      return new Response(
        JSON.stringify({ error: "Failed to delete blog post", details: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!data || data.length === 0) {
      console.log("No blog post found with title:", payload.title);
      return new Response(
        JSON.stringify({ error: "Blog post not found", title: payload.title }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Blog post deleted successfully:", data[0].id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Blog post deleted successfully",
        deleted_blog: data[0]
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
