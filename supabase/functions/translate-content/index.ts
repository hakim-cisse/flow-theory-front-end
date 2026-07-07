// Translates arbitrary text/HTML blocks into the target language using Lovable AI.
// Input:  { targetLang: "fr" | "ar" | ..., items: { key: string, text: string, isHtml?: boolean }[] }
// Output: { translations: Record<string, string> }
//
// No auth required (public blog translations). CORS enabled.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const LANG_NAMES: Record<string, string> = {
  en: "English",
  fr: "French",
  ar: "Arabic",
  es: "Spanish",
  de: "German",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const targetLang: string = body.targetLang;
    const items: { key: string; text: string; isHtml?: boolean }[] = body.items ?? [];

    if (!targetLang || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const langName = LANG_NAMES[targetLang] ?? targetLang;

    const systemPrompt =
      `You are a professional translator. Translate every value in the given JSON object into ${langName}. ` +
      `Preserve HTML tags, attributes, URLs, code blocks, and inline formatting exactly. ` +
      `Do not translate brand names (Flow Theory AI, APT Locator). ` +
      `Return ONLY a JSON object with the same keys and translated string values. No commentary.`;

    const payload: Record<string, string> = {};
    for (const it of items) payload[it.key] = it.text;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: JSON.stringify(payload) },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      return new Response(
        JSON.stringify({ error: "AI gateway error", status: aiRes.status, detail: errText }),
        { status: aiRes.status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const aiJson = await aiRes.json();
    const content: string = aiJson?.choices?.[0]?.message?.content ?? "{}";
    let translations: Record<string, string> = {};
    try {
      translations = JSON.parse(content);
    } catch {
      translations = {};
    }

    return new Response(JSON.stringify({ translations }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
