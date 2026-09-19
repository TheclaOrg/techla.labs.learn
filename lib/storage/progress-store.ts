import { UserTopicMastery, DiagnosticResult, ProblemProgress, MasteryLevel } from "@/types/learning";
import { dsaTopics } from "@/data/dsa/topics";
import { calculateMasteryFromSignals } from "@/lib/mastery/mastery-engine";

const STORAGE_KEYS = {
  MASTERIES: "techla_masteries_v1",
  DIAGNOSTIC: "techla_diagnostic_v1",
  PROBLEMS: "techla_problems_v1",
  STREAK: "techla_streak_v1",
  ACTIVE_TOPIC: "techla_active_topic_v1",
};

// Seed default initial masteries for immediate interactive exploration
export function getDefaultMasteries(): Record<string, UserTopicMastery> {
  const masteries: Record<string, UserTopicMastery> = {};
  
  // Seed initial mastered foundations
  const initialMastered = ["programming-fundamentals", "big-o-notation", "arrays", "hash-tables", "frequency-counting"];
  const initialLearning = ["two-pointers", "singly-linked-lists", "binary-search", "stack"];

  for (const topic of dsaTopics) {
    let level: MasteryLevel = 0;
    let score = 0;
    let status: UserTopicMastery["status"] = "locked";

    if (initialMastered.includes(topic.slug)) {
      level = 5;
      score = 95;
      status = "mastered";
    } else if (initialLearning.includes(topic.slug)) {
      level = 3;
      score = 65;
      status = "learning";
    } else if (topic.prerequisites.length === 0) {
      level = 0;
      score = 0;
      status = "available";
    }

    masteries[topic.slug] = {
      topicSlug: topic.slug,
      masteryLevel: level,
      score,
      confidence: level > 0 ? 0.8 : 0.2,
      attempts: level > 0 ? 2 : 0,
      lastAssessedAt: new Date().toISOString(),
      status,
    };
  }

  return masteries;
}

export function loadStoredMasteries(): Record<string, UserTopicMastery> {
  if (typeof window === "undefined") return getDefaultMasteries();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MASTERIES);
    if (!raw) {
      const defaults = getDefaultMasteries();
      saveStoredMasteries(defaults);
      return defaults;
    }
    return JSON.parse(raw);
  } catch {
    return getDefaultMasteries();
  }
}

export function saveStoredMasteries(masteries: Record<string, UserTopicMastery>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.MASTERIES, JSON.stringify(masteries));
  } catch (e) {
    console.error("Failed to save masteries to local storage", e);
  }
}

export function updateTopicMastery(
  topicSlug: string,
  updates: {
    diagnosticScore?: number;
    checkInScore?: number;
    problemSolved?: boolean;
    forcedLevel?: MasteryLevel;
  }
): Record<string, UserTopicMastery> {
  const masteries = loadStoredMasteries();
  const current = masteries[topicSlug] || {
    topicSlug,
    masteryLevel: 0,
    score: 0,
    confidence: 0.2,
    attempts: 0,
    lastAssessedAt: new Date().toISOString(),
    status: "available",
  };

  const problemProgress = loadProblemProgress();
  const solvedCount = Object.values(problemProgress).filter((p) => p.status === "solved").length;

  let newLevel: MasteryLevel = current.masteryLevel;
  let newScore = current.score;
  let newConfidence = current.confidence;

  if (updates.forcedLevel !== undefined) {
    newLevel = updates.forcedLevel;
    newScore = newLevel * 20;
  } else {
    const calculated = calculateMasteryFromSignals({
      diagnosticScore: updates.diagnosticScore,
      checkInScore: updates.checkInScore,
      problemsSolvedCount: updates.problemSolved ? Math.max(1, solvedCount) : solvedCount,
      previousMastery: current.masteryLevel,
      attempts: current.attempts + 1,
    });
    newLevel = calculated.level;
    newScore = calculated.score;
    newConfidence = calculated.confidence;
  }

  masteries[topicSlug] = {
    topicSlug,
    masteryLevel: newLevel,
    score: newScore,
    confidence: newConfidence,
    attempts: current.attempts + 1,
    lastAssessedAt: new Date().toISOString(),
    status: newLevel >= 4 ? "mastered" : newLevel >= 2 ? "learning" : "available",
  };

  saveStoredMasteries(masteries);
  return masteries;
}

export function loadDiagnosticResult(): DiagnosticResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DIAGNOSTIC);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveDiagnosticResult(result: DiagnosticResult): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.DIAGNOSTIC, JSON.stringify(result));
    saveStoredMasteries(result.topicMasteries);
  } catch (e) {
    console.error("Failed to save diagnostic result", e);
  }
}

export function loadProblemProgress(): Record<string, ProblemProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROBLEMS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveProblemStatus(
  problemSlug: string,
  status: "not_started" | "attempted" | "solved"
): Record<string, ProblemProgress> {
  const current = loadProblemProgress();
  const entry = current[problemSlug] || {
    problemSlug,
    status: "not_started",
    attempts: 0,
  };

  current[problemSlug] = {
    problemSlug,
    status,
    attempts: entry.attempts + 1,
    solvedAt: status === "solved" ? new Date().toISOString() : entry.solvedAt,
  };

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(current));
    } catch (e) {
      console.error("Failed to save problem progress", e);
    }
  }

  return current;
}
