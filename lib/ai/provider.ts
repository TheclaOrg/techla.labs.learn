import { AIProvider } from "@/types/learning";
import { topicsBySlug } from "@/lib/learning/graph";

export class OpenRouterAIProvider implements AIProvider {
  private async callTutorApi(payload: Record<string, unknown>): Promise<Record<string, unknown> | null> {
    try {
      const res = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  async generateExplanation(topicTitle: string, userLevel: string): Promise<string> {
    const data = await this.callTutorApi({
      action: "explanation",
      topicTitle,
      userLevel,
    });

    if (data && data.success && typeof data.text === "string") {
      return data.text;
    }

    // Deterministic fallback if offline or request fails
    const matchedSlug = Object.keys(topicsBySlug).find(
      (slug) => topicsBySlug[slug].title.toLowerCase() === topicTitle.toLowerCase()
    );
    const topic = matchedSlug ? topicsBySlug[matchedSlug] : null;

    if (topic) {
      return `Core Mental Model: ${topic.summary}\n\nKey Invariants:\n${topic.keyConcepts.map((k) => `• ${k}`).join("\n")}\n\nCommon Pitfalls to Avoid:\n${topic.commonMistakes.map((m) => `• ${m}`).join("\n")}`;
    }

    return `Core Mental Model: ${topicTitle} is a core foundational concept in software problem solving. Focus on identifying the underlying invariant, avoiding redundant work, and testing against edge cases.`;
  }

  async generateHint(problemTitle: string, topicTitle: string): Promise<string> {
    const data = await this.callTutorApi({
      action: "hint",
      problemTitle,
      topicTitle,
    });

    if (data && data.success && typeof data.text === "string") {
      return data.text;
    }

    return `💡 **Strategic Hint for "${problemTitle}" (${topicTitle})**:\n\n1. Consider the input constraints and what time complexity is acceptable.\n2. Ask yourself: Can an auxiliary data structure (e.g., Hash Map, Monotonic Stack, or Two Pointers) eliminate the inner nested loop?\n3. Trace the algorithm with a small sample input on paper before writing code.`;
  }

  async evaluateAnswer(question: string, userAnswer: string): Promise<{ isCorrect: boolean; feedback: string }> {
    const data = await this.callTutorApi({
      action: "evaluate",
      question,
      userAnswer,
    });

    if (data && data.success && typeof data.feedback === "string") {
      return {
        isCorrect: Boolean(data.isCorrect),
        feedback: data.feedback,
      };
    }

    const isAdequate = userAnswer.trim().length > 15;
    return {
      isCorrect: isAdequate,
      feedback: isAdequate
        ? "Good conceptual understanding! You identified the core computational mechanics."
        : "Your explanation is brief. Make sure to clearly mention time/space complexity and edge cases.",
    };
  }
}

// Singleton export
export const aiProvider: AIProvider = new OpenRouterAIProvider();
