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

export interface WebReference {
  title: string;
  url: string;
  source: string;
  category: "DSA" | "Cybersecurity" | "General";
  description: string;
}

// Curated authoritative web grounding repository
function resolveAuthoritativeWebReferences(
  topicTitle: string,
  domain?: "dsa" | "cybersecurity"
): WebReference[] {
  const query = topicTitle.toLowerCase();
  const isCyber =
    domain === "cybersecurity" ||
    query.includes("cyber") ||
    query.includes("security") ||
    query.includes("network") ||
    query.includes("wireshark") ||
    query.includes("nmap") ||
    query.includes("linux") ||
    query.includes("windows") ||
    query.includes("active directory") ||
    query.includes("soc") ||
    query.includes("incident") ||
    query.includes("injection") ||
    query.includes("xss") ||
    query.includes("cia") ||
    query.includes("firewall") ||
    query.includes("cryptography") ||
    query.includes("cloud");

  if (isCyber) {
    const cyberRefs: WebReference[] = [
      {
        title: "PortSwigger Web Security Academy (Interactive Free Labs)",
        url: "https://portswigger.net/web-security",
        source: "PortSwigger",
        category: "Cybersecurity",
        description: "Hands-on browser-based vulnerability labs for SQLi, XSS, CSRF, and authentication bypass.",
      },
      {
        title: "OWASP Top 10 & Application Security Cheatsheets",
        url: "https://cheatsheetseries.owasp.org/",
        source: "OWASP",
        category: "Cybersecurity",
        description: "Standard architectural defensive guidelines and vulnerability mitigation playbooks.",
      },
      {
        title: "MITRE ATT&CK Matrix for Enterprise",
        url: "https://attack.mitre.org/",
        source: "MITRE",
        category: "Cybersecurity",
        description: "Globally-accessible knowledge base of adversary tactics and techniques based on real-world observations.",
      },
      {
        title: "TryHackMe Security Engineering & Blue Team Pathway",
        url: "https://tryhackme.com/",
        source: "TryHackMe",
        category: "Cybersecurity",
        description: "Guided virtual machines and interactive labs for networking, Linux internals, and SOC analysis.",
      },
      {
        title: "Linux Journey - System & Command Line Security",
        url: "https://linuxjourney.com/",
        source: "Linux Journey",
        category: "Cybersecurity",
        description: "In-depth guide to Linux system administration, permissions, processes, and kernel security.",
      },
    ];

    if (query.includes("network") || query.includes("osi") || query.includes("tcp") || query.includes("wireshark") || query.includes("packet")) {
      cyberRefs.unshift({
        title: "Wireshark Official Documentation & Sample Captures",
        url: "https://www.wireshark.org/docs/",
        source: "Wireshark Foundation",
        category: "Cybersecurity",
        description: "Comprehensive protocol analyzer guides, display filters, and pcap forensics walkthroughs.",
      });
    }

    return cyberRefs.slice(0, 4);
  }

  // DSA References
  const dsaRefs: WebReference[] = [
    {
      title: "NeetCode.io Interactive Algorithms & Pattern Roadmap",
      url: "https://neetcode.io/",
      source: "NeetCode",
      category: "DSA",
      description: "Curated problem patterns, visual animations, and optimal time/space complexity breakdowns.",
    },
    {
      title: "Take U Forward (Striver SDE Sheet & Core DSA)",
      url: "https://takeuforward.org/",
      source: "Take U Forward",
      category: "DSA",
      description: "Structured explanations of two-pointers, dynamic programming, trees, and graph algorithms.",
    },
    {
      title: "VisuAlgo - Visualising Data Structures & Algorithms",
      url: "https://visualgo.net/en",
      source: "VisuAlgo",
      category: "DSA",
      description: "Step-by-step interactive animations showing data structure state transitions.",
    },
    {
      title: "CP-Algorithms (Competitive Programming Knowledge Base)",
      url: "https://cp-algorithms.com/",
      source: "CP-Algorithms",
      category: "DSA",
      description: "Rigorous mathematical proofs, graph traversals, Fenwick trees, and string algorithms.",
    },
    {
      title: "MIT OpenCourseWare: Introduction to Algorithms (6.006)",
      url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
      source: "MIT OCW",
      category: "DSA",
      description: "Academic lectures by Prof. Erik Demaine on asymptotic growth, recurrence relations, and graph cuts.",
    },
  ];

  return dsaRefs.slice(0, 4);
}

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
          temperature: 0.35,
          max_tokens: 1200,
          plugins: [{ id: "web" }],
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
    const { action, topicTitle, userLevel = "intermediate", domain, problemTitle, question, userAnswer } = body;

    const references = resolveAuthoritativeWebReferences(topicTitle || "", domain);

    const systemPrompt =
      "You are an elite, world-class computer science and cybersecurity tutor for Techla.labs.learn equipped with web knowledge. " +
      "Explain concepts with deep technical rigor, mental models, computational invariants, time/space complexity, and practical debugging intuition. " +
      "Formatting Rules: Do NOT use markdown symbols like ###, ##, #, **, ***, or bullet asterisks. Output clean section titles followed by clear paragraphs and clean bullet points without markdown markup. Never mention your model name or backend infrastructure.";

    if (action === "explanation") {
      const referenceContext = references.map((r) => `- ${r.title} (${r.source}): ${r.description}`).join("\n");

      const userPrompt = `Provide a comprehensive, clear conceptual breakdown for the topic "${topicTitle}" (Target Level: ${userLevel}).
Ground your technical insights in standard references such as:\n${referenceContext}

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
        return NextResponse.json({
          success: true,
          text,
          references,
        });
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
        return NextResponse.json({
          success: true,
          text,
          references,
        });
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
          references,
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

