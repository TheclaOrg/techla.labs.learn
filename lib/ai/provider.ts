import { AIProvider } from "@/types/learning";
import { topicsBySlug } from "@/lib/learning/graph";

export class DeterministicAIProvider implements AIProvider {
  async generateExplanation(topicTitle: string, userLevel: string): Promise<string> {
    const matchedSlug = Object.keys(topicsBySlug).find(
      (slug) => topicsBySlug[slug].title.toLowerCase() === topicTitle.toLowerCase()
    );
    const topic = matchedSlug ? topicsBySlug[matchedSlug] : null;

    if (topic) {
      return `### Conceptual Breakdown: ${topic.title}\n\n**Core Mental Model:** ${topic.summary}\n\n**Key Invariants:**\n${topic.keyConcepts.map((k) => `- **${k}**`).join("\n")}\n\n**Common Pitfalls to Avoid:**\n${topic.commonMistakes.map((m) => `- ${m}`).join("\n")}\n\n*Tailored for ${userLevel} learner trajectory.*`;
    }

    return `### Understanding ${topicTitle}\n\n${topicTitle} is a foundational concept in algorithmic design. Focus on identifying the underlying invariant, reducing redundant operations, and testing against extreme edge cases (e.g. empty inputs, single elements, duplicates).`;
  }

  async generateHint(problemTitle: string, topicTitle: string): Promise<string> {
    return `💡 **Strategic Hint for "${problemTitle}" (${topicTitle})**:\n\n1. Consider the input constraints and what time complexity is acceptable.\n2. Ask yourself: Can an auxiliary data structure (e.g., Hash Map, Monotonic Stack, or Two Pointers) eliminate the inner nested loop?\n3. Trace the algorithm with a small sample input on paper before writing code.`;
  }

  async evaluateAnswer(question: string, userAnswer: string): Promise<{ isCorrect: boolean; feedback: string }> {
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
export const aiProvider: AIProvider = new DeterministicAIProvider();
