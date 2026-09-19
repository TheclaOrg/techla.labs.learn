export type LearningDomain = {
  id: string;
  slug: "dsa" | "cybersecurity";
  name: string;
  description: string;
  status: "available";
  iconName?: string;
  totalTopics: number;
  highlight: string;
};

export type DSACategory =
  | "Foundations"
  | "Arrays & Strings"
  | "Linked Lists"
  | "Stacks & Queues"
  | "Hashing"
  | "Trees"
  | "Graphs"
  | "Sorting"
  | "Searching"
  | "Greedy"
  | "Dynamic Programming"
  | "Backtracking"
  | "Advanced";

export type CyberCategory =
  | "IT Fundamentals"
  | "Networking"
  | "Linux"
  | "Windows"
  | "Security Fundamentals"
  | "Web Security"
  | "Security Tools"
  | "Blue Team & SOC"
  | "Red Team & Offensive"
  | "Cloud Security"
  | "Security Engineering"
  | "Specializations";

export type Category = DSACategory | CyberCategory;

export type MasteryLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface Topic {
  id: string;
  domain?: "dsa" | "cybersecurity";
  slug: string;
  title: string;
  category: Category;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5; // 1 = Beginner, 5 = Advanced
  estimatedMinutes: number;
  prerequisites: string[]; // slug array of prerequisites
  masteryCriteria: string;
  summary: string;
  keyConcepts: string[];
  commonMistakes: string[];
  codeExample?: {
    language: string;
    code: string;
    explanation: string;
  };
}

export interface LearningResource {
  id: string;
  domain?: "dsa" | "cybersecurity";
  topicSlug: string;
  title: string;
  url: string;
  provider: "YouTube" | "Documentation" | "Article" | "Interactive" | "Course" | "PortSwigger" | "TryHackMe" | "OWASP" | "Harvard CS50" | "MIT OCW" | "Linux Journey";
  type: "video" | "article" | "documentation" | "interactive" | "course";
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  isFree: boolean;
  author?: string;
  duration?: string;
}

export interface PracticeProblem {
  id: string;
  domain?: "dsa" | "cybersecurity";
  topicSlug: string;
  title: string;
  slug: string;
  platform: "LeetCode" | "TryHackMe" | "PortSwigger" | "OverTheWire" | "CyberDefenders" | "HackTheBox" | "PicoCTF" | "CryptoHack" | "OWASP";
  url: string;
  difficulty: "Easy" | "Medium" | "Hard";
  acceptanceRate?: string;
  summary?: string;
  videoSolutionUrl?: string;
  videoSolutionAuthor?: string;
  editorialUrl?: string;
}

export interface DiagnosticQuestion {
  id: string;
  domain?: "dsa" | "cybersecurity";
  topicSlug: string;
  category: Category;
  difficulty: "beginner" | "intermediate" | "advanced";
  type: "multiple_choice" | "code" | "concept" | "problem_strategy";
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number; // 0-indexed index of options
  explanation: string;
}

export interface UserTopicMastery {
  domain?: "dsa" | "cybersecurity";
  topicSlug: string;
  masteryLevel: MasteryLevel; // 0 to 5
  score: number; // 0 to 100
  confidence: number; // 0 to 1
  attempts: number;
  lastAssessedAt: string;
  status: "locked" | "available" | "learning" | "practicing" | "mastered";
}

export interface DiagnosticResult {
  domain?: "dsa" | "cybersecurity";
  totalQuestions: number;
  score: number;
  percentage: number;
  categoryScores: Record<string, { total: number; correct: number; percentage: number }>;
  masteredCount: number;
  developingCount: number;
  needsAttentionCount: number;
  topicMasteries: Record<string, UserTopicMastery>;
  recommendedPath: string[]; // topic slugs
  completedAt: string;
}

export interface ProblemProgress {
  problemSlug: string;
  status: "not_started" | "attempted" | "solved";
  solvedAt?: string;
  attempts: number;
}

export interface PersonalizedPathResult {
  currentTopic: Topic;
  recommendedTopics: Topic[];
  completedTopics: Topic[];
  lockedTopics: Topic[];
  reasoning: {
    topicSlug: string;
    reason: string;
    prerequisitesMet: string[];
    missingPrerequisites: string[];
  }[];
}

export interface AIProvider {
  generateExplanation(topicTitle: string, userLevel: string): Promise<string>;
  generateHint(problemTitle: string, topicTitle: string): Promise<string>;
  evaluateAnswer(question: string, userAnswer: string): Promise<{ isCorrect: boolean; feedback: string }>;
}
