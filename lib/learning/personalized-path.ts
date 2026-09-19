import { Topic, UserTopicMastery, PersonalizedPathResult } from "@/types/learning";
import { topicsBySlug, arePrerequisitesMet, getTopologicalOrder, MASTERY_THRESHOLD_PROFICIENT } from "./graph";

export function generatePersonalizedPath(
  userMasteries: Record<string, UserTopicMastery> = {},
  domain: "dsa" | "cybersecurity" = "dsa",
  threshold: number = MASTERY_THRESHOLD_PROFICIENT
): PersonalizedPathResult {
  const topoTopics = getTopologicalOrder(domain);

  const completedTopics: Topic[] = [];
  const inProgressTopics: Topic[] = [];
  const availableTopics: Topic[] = [];
  const lockedTopics: Topic[] = [];

  for (const topic of topoTopics) {
    const mastery = userMasteries[topic.slug]?.masteryLevel ?? 0;
    const { isMet } = arePrerequisitesMet(topic.slug, userMasteries, threshold);

    if (mastery >= threshold) {
      completedTopics.push(topic);
    } else if (isMet) {
      if (mastery > 0) {
        inProgressTopics.push(topic);
      } else {
        availableTopics.push(topic);
      }
    } else {
      lockedTopics.push(topic);
    }
  }

  // Recommendation ordering:
  // 1. In-progress / weak topics where prerequisites are already mastered
  // 2. Freshly available topics whose prerequisites have just been mastered
  // 3. Deeper topics
  const recommendedCandidates = [...inProgressTopics, ...availableTopics];

  // If everything is mastered, wrap to the deepest advanced topics or all completed
  const currentTopic = recommendedCandidates[0] || completedTopics[completedTopics.length - 1] || topoTopics[0];
  const recommendedTopics = recommendedCandidates.slice(0, 8);

  // Generate explicit rationale for why each topic is recommended
  const reasoning = recommendedTopics.map((topic, index) => {
    const mastery = userMasteries[topic.slug]?.masteryLevel ?? 0;
    const { metPrereqs, missingPrereqs } = arePrerequisitesMet(topic.slug, userMasteries, threshold);

    let reason = "";
    if (index === 0) {
      if (mastery > 0) {
        reason = `You are actively developing mastery in ${topic.title} (Level ${mastery}/5). Completing this will solidify your foundation.`;
      } else if (metPrereqs.length > 0) {
        const metTitles = metPrereqs.map((slug) => topicsBySlug[slug]?.title || slug).join(" and ");
        reason = `You have mastered ${metTitles}. ${topic.title} is the next step in your curriculum.`;
      } else {
        reason = `${topic.title} is a core foundational topic for your ${domain === "cybersecurity" ? "cybersecurity" : "DSA"} journey.`;
      }
    } else {
      if (metPrereqs.length > 0) {
        const metTitles = metPrereqs.map((slug) => topicsBySlug[slug]?.title || slug).join(", ");
        reason = `Builds directly upon your mastered foundations in ${metTitles}.`;
      } else {
        reason = `Essential prerequisite for upcoming advanced patterns in ${topic.category}.`;
      }
    }

    return {
      topicSlug: topic.slug,
      reason,
      prerequisitesMet: metPrereqs,
      missingPrerequisites: missingPrereqs,
    };
  });

  return {
    currentTopic,
    recommendedTopics,
    completedTopics,
    lockedTopics,
    reasoning,
  };
}
