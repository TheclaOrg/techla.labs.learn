import { LearningDomain } from "@/types/learning";

export const learningDomains: LearningDomain[] = [
  {
    id: "domain-dsa",
    slug: "dsa",
    name: "Data Structures & Algorithms",
    description: "Build problem-solving skills from core computational fundamentals to advanced algorithmic graph & dynamic programming patterns.",
    status: "available",
    iconName: "Code2",
  },
  {
    id: "domain-frontend",
    slug: "frontend",
    name: "Frontend Engineering",
    description: "Master modern web interfaces, React, Next.js, state machines, rendering patterns and high-performance frontend architecture.",
    status: "coming_soon",
    iconName: "Globe",
  },
  {
    id: "domain-backend",
    slug: "backend",
    name: "Backend Engineering",
    description: "Build resilient APIs, distributed services, message queues, caching layers, and scalable production backend architectures.",
    status: "coming_soon",
    iconName: "Server",
  },
  {
    id: "domain-databases",
    slug: "databases",
    name: "Databases & Storage",
    description: "Understand relational systems, SQL, B-tree indexes, ACID transactions, partitioning, replication and modern distributed databases.",
    status: "coming_soon",
    iconName: "Database",
  },
  {
    id: "domain-fullstack",
    slug: "fullstack",
    name: "Full-Stack Engineering",
    description: "Bridge frontend, backend, databases, cloud infrastructure, CI/CD pipelines, and end-to-end production systems.",
    status: "coming_soon",
    iconName: "Layers",
  },
  {
    id: "domain-security",
    slug: "security",
    name: "Web Security & Auth",
    description: "Master application security, OAuth2, JWTs, cryptography, session management, threat modeling and secure architecture.",
    status: "coming_soon",
    iconName: "Shield",
  },
];
