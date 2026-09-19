import { MasteryLevel, UserTopicMastery } from "@/types/learning";
import { dsaTopics } from "@/data/dsa/topics";

export function calculateMasteryFromSignals(params: {
  diagnosticScore?: number; // 0 to 100
  problemsSolvedCount?: number;
  checkInScore?: number; // 0 to 100
  previousMastery?: MasteryLevel;
  attempts?: number;
}): { level: MasteryLevel; score: number; confidence: number } {
  const {
    diagnosticScore,
    problemsSolvedCount = 0,
    checkInScore,
    previousMastery = 0,
    attempts = 1,
  } = params;

  let computedScore = 0;
  let signalsCount = 0;

  if (diagnosticScore !== undefined) {
    computedScore += diagnosticScore;
    signalsCount++;
  }

  if (checkInScore !== undefined) {
    computedScore += checkInScore;
    signalsCount++;
  }

  // Bonus for solving practice problems on LeetCode
  if (problemsSolvedCount > 0) {
    const practiceBonus = Math.min(100, problemsSolvedCount * 35);
    computedScore += practiceBonus;
    signalsCount++;
  }

  const finalScore = signalsCount > 0 ? Math.round(computedScore / signalsCount) : 0;

  // Level determination:
  let level: MasteryLevel = 0;

  if (finalScore >= 90 || (problemsSolvedCount >= 2 && finalScore >= 80)) {
    level = 5; // Mastered
  } else if (finalScore >= 75 || problemsSolvedCount >= 1) {
    level = 4; // Proficient (unlocks downstream)
  } else if (finalScore >= 55) {
    level = 3; // Practicing
  } else if (finalScore >= 30) {
    level = 2; // Learning
  } else if (finalScore > 0 || attempts > 0) {
    level = 1; // Introduced
  }

  // Mastery should not regress easily unless re-tested poorly
  if (previousMastery > level && finalScore > 40) {
    level = previousMastery;
  }

  const confidence = Math.min(1, 0.4 + attempts * 0.2 + (problemsSolvedCount > 0 ? 0.3 : 0));

  return {
    level,
    score: finalScore,
    confidence: Number(confidence.toFixed(2)),
  };
}

export function computeOverallMasteryPercentage(
  masteries: Record<string, UserTopicMastery> = {}
): {
  percentage: number;
  masteredCount: number;
  proficientCount: number;
  learningCount: number;
  totalTopics: number;
} {
  const totalTopics = dsaTopics.length;
  if (totalTopics === 0) {
    return { percentage: 0, masteredCount: 0, proficientCount: 0, learningCount: 0, totalTopics: 0 };
  }

  let totalPoints = 0;
  let masteredCount = 0;
  let proficientCount = 0;
  let learningCount = 0;

  for (const topic of dsaTopics) {
    const mastery = masteries[topic.slug]?.masteryLevel ?? 0;
    totalPoints += mastery; // max 5 points per topic
    if (mastery >= 5) {
      masteredCount++;
    } else if (mastery >= 4) {
      proficientCount++;
    } else if (mastery >= 1) {
      learningCount++;
    }
  }

  const maxPoints = totalTopics * 5;
  const percentage = Math.round((totalPoints / maxPoints) * 100);

  return {
    percentage,
    masteredCount,
    proficientCount,
    learningCount,
    totalTopics,
  };
}
