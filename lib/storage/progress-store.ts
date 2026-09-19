import { UserTopicMastery, DiagnosticResult, ProblemProgress, MasteryLevel } from "@/types/learning";
import { dsaTopics } from "@/data/dsa/topics";
import { cyberTopics } from "@/data/cybersecurity/topics";
import { calculateMasteryFromSignals } from "@/lib/mastery/mastery-engine";

const STORAGE_KEYS = {
  MASTERIES_DSA: "techla_masteries_dsa",
  MASTERIES_CYBER: "techla_masteries_cybersecurity",
  DIAGNOSTIC_DSA: "techla_diagnostic_dsa",
  DIAGNOSTIC_CYBER: "techla_diagnostic_cybersecurity",
  PROBLEMS: "techla_problems_v1",
  STREAK: "techla_streak_v1",
  ACTIVE_DOMAIN: "techla_active_domain_v1",
  LEGACY_MASTERIES: "techla_masteries_v1",
  LEGACY_DIAGNOSTIC: "techla_diagnostic_v1",
};

export function getDefaultMasteries(domain: "dsa" | "cybersecurity" = "dsa"): Record<string, UserTopicMastery> {
  const masteries: Record<string, UserTopicMastery> = {};
  const topics = domain === "cybersecurity" ? cyberTopics : dsaTopics;

  const initialMastered =
    domain === "cybersecurity"
      ? ["computer-hardware-architecture", "operating-systems-internals", "osi-and-tcpip-models"]
      : ["programming-fundamentals", "big-o-notation", "arrays", "hash-tables", "frequency-counting"];

  const initialLearning =
    domain === "cybersecurity"
      ? ["linux-cli-fundamentals", "transport-layer-protocols", "core-network-protocols"]
      : ["two-pointers", "singly-linked-lists", "binary-search", "stack"];

  for (const topic of topics) {
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
      domain,
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

export function getMasteriesKey(domain: "dsa" | "cybersecurity"): string {
  return domain === "cybersecurity" ? STORAGE_KEYS.MASTERIES_CYBER : STORAGE_KEYS.MASTERIES_DSA;
}

export function getDiagnosticKey(domain: "dsa" | "cybersecurity"): string {
  return domain === "cybersecurity" ? STORAGE_KEYS.DIAGNOSTIC_CYBER : STORAGE_KEYS.DIAGNOSTIC_DSA;
}

export function loadStoredMasteries(domain: "dsa" | "cybersecurity" = "dsa"): Record<string, UserTopicMastery> {
  if (typeof window === "undefined") return getDefaultMasteries(domain);
  try {
    const key = getMasteriesKey(domain);
    let raw = localStorage.getItem(key);
    
    // Check legacy key fallback for dsa
    if (!raw && domain === "dsa") {
      raw = localStorage.getItem(STORAGE_KEYS.LEGACY_MASTERIES);
    }

    if (!raw) {
      const defaults = getDefaultMasteries(domain);
      saveStoredMasteries(defaults, domain);
      return defaults;
    }
    return JSON.parse(raw);
  } catch {
    return getDefaultMasteries(domain);
  }
}

export function saveStoredMasteries(
  masteries: Record<string, UserTopicMastery>,
  domain: "dsa" | "cybersecurity" = "dsa"
): void {
  if (typeof window === "undefined") return;
  try {
    const key = getMasteriesKey(domain);
    localStorage.setItem(key, JSON.stringify(masteries));
    if (domain === "dsa") {
      localStorage.setItem(STORAGE_KEYS.LEGACY_MASTERIES, JSON.stringify(masteries));
    }
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
  },
  domain: "dsa" | "cybersecurity" = "dsa"
): Record<string, UserTopicMastery> {
  const masteries = loadStoredMasteries(domain);
  const current = masteries[topicSlug] || {
    domain,
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
    domain,
    topicSlug,
    masteryLevel: newLevel,
    score: newScore,
    confidence: newConfidence,
    attempts: current.attempts + 1,
    lastAssessedAt: new Date().toISOString(),
    status: newLevel >= 4 ? "mastered" : newLevel >= 2 ? "learning" : "available",
  };

  saveStoredMasteries(masteries, domain);
  return masteries;
}

export function loadDiagnosticResult(domain: "dsa" | "cybersecurity" = "dsa"): DiagnosticResult | null {
  if (typeof window === "undefined") return null;
  try {
    const key = getDiagnosticKey(domain);
    let raw = localStorage.getItem(key);
    if (!raw && domain === "dsa") {
      raw = localStorage.getItem(STORAGE_KEYS.LEGACY_DIAGNOSTIC);
    }
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveDiagnosticResult(
  result: DiagnosticResult,
  domain: "dsa" | "cybersecurity" = "dsa"
): void {
  if (typeof window === "undefined") return;
  try {
    const key = getDiagnosticKey(domain);
    localStorage.setItem(key, JSON.stringify(result));
    if (domain === "dsa") {
      localStorage.setItem(STORAGE_KEYS.LEGACY_DIAGNOSTIC, JSON.stringify(result));
    }
    saveStoredMasteries(result.topicMasteries, domain);
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

export function exportUserLearningData(): string {
  if (typeof window === "undefined") return "{}";
  const data = {
    version: "1.0",
    exportedAt: new Date().toISOString(),
    dsaMasteries: loadStoredMasteries("dsa"),
    cyberMasteries: loadStoredMasteries("cybersecurity"),
    dsaDiagnostic: loadDiagnosticResult("dsa"),
    cyberDiagnostic: loadDiagnosticResult("cybersecurity"),
    problems: loadProblemProgress(),
  };
  return JSON.stringify(data, null, 2);
}

export function importUserLearningData(jsonString: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.dsaMasteries) saveStoredMasteries(parsed.dsaMasteries, "dsa");
    if (parsed.cyberMasteries) saveStoredMasteries(parsed.cyberMasteries, "cybersecurity");
    if (parsed.dsaDiagnostic) saveDiagnosticResult(parsed.dsaDiagnostic, "dsa");
    if (parsed.cyberDiagnostic) saveDiagnosticResult(parsed.cyberDiagnostic, "cybersecurity");
    if (parsed.problems) {
      localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(parsed.problems));
    }
    return true;
  } catch (e) {
    console.error("Failed to import user learning data", e);
    return false;
  }
}
