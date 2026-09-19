import { Topic, UserTopicMastery } from "@/types/learning";
import { dsaTopics } from "@/data/dsa/topics";
import { cyberTopics } from "@/data/cybersecurity/topics";

export const MASTERY_THRESHOLD_PROFICIENT = 4; // Unlocks downstream topics
export const MASTERY_THRESHOLD_LEARNING = 2; // Considered developing

export function getTopicsForDomain(domain: "dsa" | "cybersecurity" = "dsa"): Topic[] {
  return domain === "cybersecurity" ? cyberTopics : dsaTopics;
}

export const allTopics: Topic[] = [...dsaTopics, ...cyberTopics];

// Fast lookup map by slug across all domains
export const topicsBySlug: Record<string, Topic> = allTopics.reduce((acc, topic) => {
  acc[topic.slug] = topic;
  return acc;
}, {} as Record<string, Topic>);

// Graph adjacency: topic -> array of topics that depend on this topic
export function buildForwardGraph(domain: "dsa" | "cybersecurity" = "dsa"): Record<string, string[]> {
  const topics = getTopicsForDomain(domain);
  const forward: Record<string, string[]> = {};
  topics.forEach((t) => {
    forward[t.slug] = [];
  });
  topics.forEach((t) => {
    t.prerequisites.forEach((prereq) => {
      if (forward[prereq]) {
        forward[prereq].push(t.slug);
      }
    });
  });
  return forward;
}

// Check if all prerequisites for a topic are satisfied (mastery >= threshold)
export function arePrerequisitesMet(
  topicSlug: string,
  userMasteries: Record<string, UserTopicMastery>,
  threshold: number = MASTERY_THRESHOLD_PROFICIENT
): { isMet: boolean; missingPrereqs: string[]; metPrereqs: string[] } {
  const topic = topicsBySlug[topicSlug];
  if (!topic || topic.prerequisites.length === 0) {
    return { isMet: true, missingPrereqs: [], metPrereqs: [] };
  }

  const missingPrereqs: string[] = [];
  const metPrereqs: string[] = [];

  for (const prereqSlug of topic.prerequisites) {
    const mastery = userMasteries[prereqSlug]?.masteryLevel ?? 0;
    if (mastery >= threshold) {
      metPrereqs.push(prereqSlug);
    } else {
      missingPrereqs.push(prereqSlug);
    }
  }

  return {
    isMet: missingPrereqs.length === 0,
    missingPrereqs,
    metPrereqs,
  };
}

// Find the deepest unmet prerequisite recursively for a locked topic
export function findDeepestUnmetPrerequisite(
  topicSlug: string,
  userMasteries: Record<string, UserTopicMastery>,
  threshold: number = MASTERY_THRESHOLD_PROFICIENT,
  visited = new Set<string>()
): string | null {
  if (visited.has(topicSlug)) return null;
  visited.add(topicSlug);

  const topic = topicsBySlug[topicSlug];
  if (!topic) return null;

  for (const prereqSlug of topic.prerequisites) {
    const prereqMastery = userMasteries[prereqSlug]?.masteryLevel ?? 0;
    if (prereqMastery < threshold) {
      const deeper = findDeepestUnmetPrerequisite(prereqSlug, userMasteries, threshold, visited);
      return deeper || prereqSlug;
    }
  }

  return null;
}

// Topological sort of topics for a given domain
export function getTopologicalOrder(domain: "dsa" | "cybersecurity" = "dsa"): Topic[] {
  const topics = getTopicsForDomain(domain);
  const inDegree: Record<string, number> = {};
  const forward = buildForwardGraph(domain);

  topics.forEach((t) => {
    inDegree[t.slug] = t.prerequisites.length;
  });

  const queue: string[] = [];
  topics.forEach((t) => {
    if (inDegree[t.slug] === 0) {
      queue.push(t.slug);
    }
  });

  const ordered: Topic[] = [];
  while (queue.length > 0) {
    const curr = queue.shift()!;
    if (topicsBySlug[curr]) {
      ordered.push(topicsBySlug[curr]);
    }
    for (const next of forward[curr] || []) {
      inDegree[next]--;
      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  // Safety fallback if any cyclical dependencies exist (preserve all remaining topics)
  if (ordered.length < topics.length) {
    const orderedSlugs = new Set(ordered.map((t) => t.slug));
    for (const t of topics) {
      if (!orderedSlugs.has(t.slug)) {
        ordered.push(t);
      }
    }
  }

  return ordered;
}
