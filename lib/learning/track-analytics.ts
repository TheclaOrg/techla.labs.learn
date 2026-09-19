import { Topic, UserTopicMastery, ProblemProgress } from "@/types/learning";
import { dsaTopics } from "@/data/dsa/topics";
import { cyberTopics } from "@/data/cybersecurity/topics";
import { dsaProblems } from "@/data/dsa/problems";
import { cyberLabs } from "@/data/cybersecurity/labs";

export interface CategoryStat {
  name: string;
  total: number;
  mastered: number;
  proficient: number;
  inProgress: number;
  percentage: number;
  status: "Mastered" | "Proficient" | "In Progress" | "Not Started";
}

export interface DifficultyStat {
  level: number;
  label: string;
  total: number;
  completed: number;
}

export interface TrackAnalytics {
  domain: "dsa" | "cybersecurity";
  title: string;
  totalNodes: number;
  totalEstimatedMinutes: number;
  totalEstimatedHours: number;
  totalProblemsCount: number;
  solvedProblemsCount: number;
  problemsPercentage: number;
  masteredCount: number;
  proficientCount: number;
  learningCount: number;
  lockedCount: number;
  availableCount: number;
  overallMasteryPercentage: number;
  categories: CategoryStat[];
  difficulties: DifficultyStat[];
  readinessScore: number;
  readinessTier: {
    name: string;
    level: number;
    color: string;
    badgeBg: string;
    description: string;
  };
  keyHighlights: string[];
}

export function computeTrackAnalytics(
  domain: "dsa" | "cybersecurity",
  masteries: Record<string, UserTopicMastery> = {},
  problemProgress: Record<string, ProblemProgress> = {}
): TrackAnalytics {
  const topics: Topic[] = domain === "cybersecurity" ? cyberTopics : dsaTopics;
  const problems = domain === "cybersecurity" ? cyberLabs : dsaProblems;
  const totalNodes = topics.length;

  let totalMinutes = 0;
  let totalMasteryPoints = 0;
  let masteredCount = 0;
  let proficientCount = 0;
  let learningCount = 0;
  let availableCount = 0;
  let lockedCount = 0;

  // Categories map
  const categoryMap: Record<string, { total: number; mastered: number; proficient: number; inProgress: number; points: number }> = {};
  
  // Difficulties map (1 to 5)
  const diffMap: Record<number, { total: number; completed: number }> = {
    1: { total: 0, completed: 0 },
    2: { total: 0, completed: 0 },
    3: { total: 0, completed: 0 },
    4: { total: 0, completed: 0 },
    5: { total: 0, completed: 0 },
  };

  topics.forEach((topic) => {
    totalMinutes += topic.estimatedMinutes || 60;
    const cat = topic.category;
    if (!categoryMap[cat]) {
      categoryMap[cat] = { total: 0, mastered: 0, proficient: 0, inProgress: 0, points: 0 };
    }
    categoryMap[cat].total++;

    const diff = topic.difficulty || 1;
    if (diffMap[diff]) {
      diffMap[diff].total++;
    }

    const m = masteries[topic.slug];
    const level = m?.masteryLevel ?? 0;
    totalMasteryPoints += level;
    categoryMap[cat].points += level;

    // Prerequisites check
    const prereqsMet = (topic.prerequisites || []).every((pSlug) => {
      const pLevel = masteries[pSlug]?.masteryLevel ?? 0;
      return pLevel >= 4;
    });

    if (level >= 5) {
      masteredCount++;
      categoryMap[cat].mastered++;
      if (diffMap[diff]) diffMap[diff].completed++;
    } else if (level >= 4) {
      proficientCount++;
      categoryMap[cat].proficient++;
      if (diffMap[diff]) diffMap[diff].completed++;
    } else if (level >= 1) {
      learningCount++;
      categoryMap[cat].inProgress++;
    } else if (prereqsMet) {
      availableCount++;
    } else {
      lockedCount++;
    }
  });

  const maxPoints = totalNodes * 5;
  const overallMasteryPercentage = maxPoints > 0 ? Math.round((totalMasteryPoints / maxPoints) * 100) : 0;

  // Practice problems progress
  const trackProblemSlugs = new Set(problems.map((p) => p.slug));
  const solvedCount = Object.values(problemProgress).filter(
    (p) => trackProblemSlugs.has(p.problemSlug) && p.status === "solved"
  ).length;
  const problemsPct = problems.length > 0 ? Math.round((solvedCount / problems.length) * 100) : 0;

  // Category array
  const categories: CategoryStat[] = Object.entries(categoryMap).map(([name, stat]) => {
    const catMaxPoints = stat.total * 5;
    const pct = catMaxPoints > 0 ? Math.round((stat.points / catMaxPoints) * 100) : 0;
    let status: CategoryStat["status"] = "Not Started";
    if (pct >= 85) status = "Mastered";
    else if (pct >= 60 || stat.proficient > 0) status = "Proficient";
    else if (pct > 0 || stat.inProgress > 0) status = "In Progress";

    return {
      name,
      total: stat.total,
      mastered: stat.mastered,
      proficient: stat.proficient,
      inProgress: stat.inProgress,
      percentage: pct,
      status,
    };
  });

  // Difficulties array
  const difficultyLabels: Record<number, string> = {
    1: "Foundational (Lvl 1)",
    2: "Beginner Core (Lvl 2)",
    3: "Intermediate (Lvl 3)",
    4: "Advanced (Lvl 4)",
    5: "Expert / Complex (Lvl 5)",
  };

  const difficulties: DifficultyStat[] = Object.entries(diffMap).map(([lvl, stat]) => ({
    level: Number(lvl),
    label: difficultyLabels[Number(lvl)] || `Level ${lvl}`,
    total: stat.total,
    completed: stat.completed,
  }));

  // Combined readiness index (0-100)
  const readinessScore = Math.min(100, Math.round(overallMasteryPercentage * 0.75 + problemsPct * 0.25));

  let readinessTier = {
    name: "Calibrating / Baseline",
    level: 1,
    color: "text-white/60",
    badgeBg: "bg-white/10 text-white/70 border-white/15",
    description: "Take the 20-mark diagnostic assessment to calibrate your prerequisite knowledge graph.",
  };

  if (readinessScore >= 85) {
    readinessTier = {
      name: domain === "dsa" ? "Interview & FAANG Ready" : "Tier-1 SOC / SecEng Ready",
      level: 5,
      color: "text-emerald-400",
      badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
      description: "Exceptional mastery of foundational, intermediate, and complex graph patterns.",
    };
  } else if (readinessScore >= 60) {
    readinessTier = {
      name: "Proficient Practitioner",
      level: 4,
      color: "text-[#ff8533]",
      badgeBg: "bg-[#ff6a00]/10 text-[#ff8533] border-[#ff6a00]/25",
      description: "Solid mental models established across primary data structures and core workflows.",
    };
  } else if (readinessScore >= 35) {
    readinessTier = {
      name: "Active Intermediate Builder",
      level: 3,
      color: "text-amber-400",
      badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/25",
      description: "Foundational concepts locked in. Unlocking downstream algorithmic & architectural branches.",
    };
  } else if (readinessScore >= 15 || learningCount > 0) {
    readinessTier = {
      name: "Foundations In Progress",
      level: 2,
      color: "text-blue-400",
      badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/25",
      description: "Actively establishing core invariants, runtime complexity, and hands-on muscle memory.",
    };
  }

  const keyHighlights =
    domain === "dsa"
      ? [
          "44 Adaptive Graph Nodes",
          "13 Computational Categories",
          `${problems.length} Curated LeetCode Patterns`,
          "20-Mark Adaptive Diagnostic",
        ]
      : [
          "36 Defensive & Offensive Nodes",
          "12 Security Engineering Domains",
          `${problems.length} Hands-on VM & CTF Labs`,
          "MITRE ATT&CK & OWASP Aligned",
        ];

  return {
    domain,
    title: domain === "dsa" ? "Data Structures & Algorithms" : "Cybersecurity Engineering",
    totalNodes,
    totalEstimatedMinutes: totalMinutes,
    totalEstimatedHours: Math.round(totalMinutes / 60),
    totalProblemsCount: problems.length,
    solvedProblemsCount: solvedCount,
    problemsPercentage: problemsPct,
    masteredCount,
    proficientCount,
    learningCount,
    lockedCount,
    availableCount,
    overallMasteryPercentage,
    categories,
    difficulties,
    readinessScore,
    readinessTier,
    keyHighlights,
  };
}
