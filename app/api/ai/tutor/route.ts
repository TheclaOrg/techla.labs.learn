import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// High performance free programming & reasoning models on OpenRouter (cascading failover)
const FREE_PROGRAMMING_MODELS = [
  "deepseek/deepseek-v4-flash-0731:free",
  "cohere/north-mini-code:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "qwen/qwen3.8-27b:free",
  "google/gemma-4-31b-it:free",
  "z-ai/glm-5.2:free",
];

async function callOpenRouterWithFallback(
  systemPrompt: string,
  userPrompt: string
): Promise<string | null> {
  for (const model of FREE_PROGRAMMING_MODELS) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "https://techla.labs",
          "X-Title": process.env.OPENROUTER_SITE_NAME || "Techla Labs Learn",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.4,
          max_tokens: 1200,
        }),
      });

      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content && typeof content === "string" && content.trim().length > 0) {
        return content.trim();
      }
    } catch {
      // Continue to next fallback model
      continue;
    }
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, topicTitle, userLevel = "intermediate", problemTitle, question, userAnswer } = body;

    const systemPrompt =
      "You are an elite, world-class computer science and cybersecurity tutor for Techla.labs.learn. " +
      "Explain concepts with deep technical rigor, mental models, computational invariants, time/space complexity, and practical debugging intuition. " +
      "Formatting Rules: Do NOT use markdown symbols like ###, ##, #, **, ***, or bullet asterisks. Output clean section titles followed by clear paragraphs and clean bullet points without markdown markup. Never mention your model name or backend infrastructure.";

    if (action === "explanation") {
      const userPrompt = `Provide a comprehensive, clear conceptual breakdown for the topic "${topicTitle}" (Target Level: ${userLevel}).
Structure the response into these exact clean sections:
Core Mental Model: (State the fundamental intuition and purpose in 2 clear sentences)
Key Invariants: (List the 3-5 core rules or structures, one per line)
System Mechanics: (Explain step-by-step how it works)
Time & Space Complexity: (Explain exact complexities or security implications)
Common Pitfalls to Avoid: (List 3 critical bugs or misconceptions, one per line)
Practical Rule of Thumb: (When to apply this in interviews or production)

Do not include any asterisks (**) or hashes (###). Keep the text clean, direct, and readable.`;

      const text = await callOpenRouterWithFallback(systemPrompt, userPrompt);
      if (text) {
        return NextResponse.json({ success: true, text });
      }
    } else if (action === "hint") {
      const userPrompt = `Give a strategic, non-spoiler hint for the problem "${problemTitle}" in the topic "${topicTitle}".
Provide:
1. A guiding question to rethink the approach.
2. An invariant observation about data structures or constraints.
3. Next step without giving full solution code.
Do not use asterisks or hashes in your formatting.`;

      const text = await callOpenRouterWithFallback(systemPrompt, userPrompt);
      if (text) {
        return NextResponse.json({ success: true, text });
      }
    } else if (action === "evaluate") {
      const userPrompt = `A student answered the question: "${question}".
Student's Answer: "${userAnswer}".
Evaluate their technical understanding cleanly without markdown hashes or asterisks. State whether they grasped the fundamental concept, correct any misconceptions, and provide concise constructive feedback.`;

      const text = await callOpenRouterWithFallback(systemPrompt, userPrompt);
      if (text) {
        return NextResponse.json({
          success: true,
          isCorrect: true,
          feedback: text,
        });
      }
    }

    return NextResponse.json(
      { success: false, error: "Unable to complete AI request at this time." },
      { status: 503 }
    );
  } catch (error) {
    console.error("AI Tutor API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal AI processing error" },
      { status: 500 }
    );
  }
}
