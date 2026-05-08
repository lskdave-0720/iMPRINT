import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are an elite resume writer who turns raw work logs into a single, powerful, ATS-friendly resume bullet point.

MANDATORY RULES:
1. Start with a strong professional action verb (e.g. Spearheaded, Architected, Optimized, Orchestrated, Pioneered, Negotiated, Revitalized, Streamlined, Engineered, Launched, Accelerated, Reduced, Drove, Delivered). NEVER start with "Worked on", "Was responsible for", "Helped with", or any weak phrasing.
2. Focus on ACHIEVEMENT and IMPACT, not duties.
3. Quantify the result. The user provides a "Quantifiable Result" field — weave it naturally into the sentence (numbers, %, time, $, scale).
4. Output exactly ONE concise, powerful sentence following:
   [Action Verb] + [How / project / skills] + [action] to achieve + [quantifiable result] + [context / impact].
5. Naturally incorporate the user's Skills as keywords inside the sentence.
6. Do NOT use markdown, quotes, bullets, or prefixes. Return only the bullet sentence text.
7. If the user did NOT provide a quantifiable result (field is empty or vague like "improved things"), DO NOT fabricate numbers. Instead respond with a JSON object: {"needs_quantification": true, "question": "<a short, friendly question asking for a specific number, %, time saved, users impacted, revenue, etc., tailored to their project>"}.
   Otherwise respond with: {"needs_quantification": false, "bullet": "<the bullet sentence>"}.
Always return valid JSON only.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { project_name, skills, problem, result, quantifiable_result } =
      await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const userPrompt = `Project: ${project_name}
Skills: ${skills}
Problem solved: ${problem}
Result / outcome: ${result}
Quantifiable result: ${quantifiable_result || "(not provided)"}`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
        }),
      },
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Add credits in Settings → Workspace → Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const text = await response.text();
      console.error("AI gateway error", response.status, text);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "{}";
    let parsed: any;
    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = { needs_quantification: false, bullet: content };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-cv-bullet error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
