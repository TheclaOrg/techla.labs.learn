import { DiagnosticQuestion, DiagnosticResult, UserTopicMastery } from "@/types/learning";
import { dsaDiagnosticQuestions } from "@/data/dsa/questions";
import { dsaTopics } from "@/data/dsa/topics";
import { calculateMasteryFromSignals } from "@/lib/mastery/mastery-engine";
import { generatePersonalizedPath } from "@/lib/learning/personalized-path";

export function scoreDiagnosticAssessment(
  userAnswers: Record<string, number>, // questionId -> chosen answer index
  questions: DiagnosticQuestion[] = dsaDiagnosticQuestions
): DiagnosticResult {
  const totalQuestions = questions.length;
  let totalCorrect = 0;

  const categoryMap: Record<string, { total: number; correct: number }> = {};
  const topicMap: Record<string, { total: number; correct: number }> = {};

  // Analyze each question
  for (const q of questions) {
    const chosenIndex = userAnswers[q.id];
    const isCorrect = chosenIndex !== undefined && chosenIndex === q.correctAnswer;

    if (isCorrect) {
      totalCorrect++;
    }

    // Category aggregation
    if (!categoryMap[q.category]) {
      categoryMap[q.category] = { total: 0, correct: 0 };
    }
    categoryMap[q.category].total++;
    if (isCorrect) {
      categoryMap[q.category].correct++;
    }

    // Topic aggregation
    if (!topicMap[q.topicSlug]) {
      topicMap[q.topicSlug] = { total: 0, correct: 0 };
    }
    topicMap[q.topicSlug].total++;
    if (isCorrect) {
      topicMap[q.topicSlug].correct++;
    }
  }

  const categoryScores: Record<string, { total: number; correct: number; percentage: number }> = {};
  for (const [cat, data] of Object.entries(categoryMap)) {
    categoryScores[cat] = {
      total: data.total,
      correct: data.correct,
      percentage: Math.round((data.correct / (data.total || 1)) * 100),
    };
  }

  // Build topic masteries
  const topicMasteries: Record<string, UserTopicMastery> = {};
  let masteredCount = 0;
  let developingCount = 0;
  let needsAttentionCount = 0;

  for (const topic of dsaTopics) {
    const stat = topicMap[topic.slug];
    const score = stat ? Math.round((stat.correct / stat.total) * 100) : 0;
    const { level, confidence } = calculateMasteryFromSignals({
      diagnosticScore: stat ? score : 0,
      attempts: stat ? 1 : 0,
    });

    let status: UserTopicMastery["status"] = "locked";
    if (level >= 4) {
      status = "mastered";
      masteredCount++;
    } else if (level >= 2) {
      status = "learning";
      developingCount++;
    } else {
      status = "available";
      needsAttentionCount++;
    }

    topicMasteries[topic.slug] = {
      topicSlug: topic.slug,
      masteryLevel: level,
      score,
      confidence,
      attempts: stat ? 1 : 0,
      lastAssessedAt: new Date().toISOString(),
      status,
    };
  }

  // Generate personalized path using the newly calculated masteries
  const personalized = generatePersonalizedPath(topicMasteries);
  const recommendedPath = personalized.recommendedTopics.map((t) => t.slug);

  const percentage = Math.round((totalCorrect / (totalQuestions || 1)) * 100);

  return {
    totalQuestions,
    score: totalCorrect,
    percentage,
    categoryScores,
    masteredCount,
    developingCount,
    needsAttentionCount,
    topicMasteries,
    recommendedPath,
    completedAt: new Date().toISOString(),
  };
}
