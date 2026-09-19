import { LearningDomain } from "@/types/learning";

export const learningDomains: LearningDomain[] = [
  {
    id: "domain-dsa",
    slug: "dsa",
    name: "Data Structures & Algorithms",
    description: "Build problem-solving intuition from computational complexity and core structures to advanced graph theory and dynamic programming.",
    status: "available",
    iconName: "Code2",
    totalTopics: 44,
    highlight: "Prerequisite Directed Graph + 20-Mark Diagnostic",
  },
  {
    id: "domain-cybersecurity",
    slug: "cybersecurity",
    name: "Cybersecurity Engineering",
    description: "Master offensive & defensive security across networking, Linux/Windows internals, web vulnerabilities (OWASP), SOC log analysis, and incident response.",
    status: "available",
    iconName: "Shield",
    totalTopics: 36,
    highlight: "Hands-on Labs (TryHackMe, PortSwigger) + 20-Mark Diagnostic",
  },
];
