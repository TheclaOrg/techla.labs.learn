# Techla.labs.learn

> **AI-Powered Personalized Software Engineering Learning Platform**  
> Built around one core question: *“What should I learn next, and why?”*

---

## 🚀 Overview

**Techla.labs.learn** is not another static course catalog or video playlist. Instead of forcing every learner through a linear syllabus, it evaluates what you already know, identifies critical missing prerequisites using a **directed knowledge graph**, and generates an individualized learning roadmap backed by curated free resources, LeetCode problems, and comprehension check-ins.

### 🌟 Core Highlights

- **Deterministic Prerequisite Graph**: 44 interconnected Data Structures & Algorithms (DSA) nodes spanning Foundations, Linear Structures, Trees, Graphs, Greedy, Dynamic Programming, Backtracking, and Advanced algorithmic paradigms.
- **50+ Question Interactive Diagnostic**: Tests conceptual depth, code analysis, and algorithmic strategy. Computes per-topic mastery rather than a crude overall score.
- **Evidence-Based Mastery Engine**: Mastery (Levels 0–5) is earned through diagnostic performance, practice problem completion, and comprehension assessments—never merely from opening a page.
- **Explainable Recommendations**: Every suggested next step includes a human-readable explanation of *why* it unlocked and what downstream concepts it enables.
- **Curated Free Resources & Real Problems**: 35+ free videos/articles (MIT OCW, NeetCode, VisuAlgo) and 36+ verified LeetCode problems with interactive status tracking.
- **Strict Brand Design System**: High-end minimalist technical dark theme (#050505, #0B0B0B) with electric orange accents (#FF6A00, #FF8533).
- **Supabase Backend**: Complete PostgreSQL schema migrations with Row Level Security (RLS) and auth.

---

## 🛠️ Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Database & Auth**: Supabase (PostgreSQL + RLS + Magic Link Authentication)

---

## ⚡ Quickstart

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/techlalabs/techla.labs.learn.git
cd techla.labs.learn
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials (optional for local/guest exploration):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Setup (Supabase)

### Apply Schema Migrations & Seed Data

1. In your Supabase Dashboard, open the **SQL Editor**.
2. Run the contents of `supabase/migrations/20260919000000_init_schema.sql` to create all 11 tables and RLS security policies.
3. Run `supabase/seed.sql` to populate the initial learning domains, 44 topics, prerequisites, diagnostic questions, resources, and practice problems.

---

## 🧠 Personalization & Mastery Engine

```text
Assess (50+ Question Diagnostic)
              ↓
Topic Mastery Map (Levels 0 to 5)
              ↓
Prerequisite Graph Traversal
              ↓
Personalized Path (Current Node + Ordered Next Nodes)
              ↓
Learn → Curated Free Resources → LeetCode Practice → Check-in Assessment
              ↓
Mastery Recalculation → Unlock Dependent Topics
```

### Mastery Levels

| Level | Name | Meaning |
|---|---|---|
| **0** | **Unknown** | No prior evidence of concept knowledge |
| **1** | **Introduced** | Concept seen / initial review |
| **2** | **Learning** | Studied concept, partial diagnostic score (≥ 30%) |
| **3** | **Practicing** | Solved practice problem or scored ≥ 55% |
| **4** | **Proficient** | Solid foundation (≥ 75% score or solved problems). **Unlocks dependent topics**. |
| **5** | **Mastered** | Verified understanding across assessments and medium/hard problems |

---

## 🗺️ Project Structure

```text
techla.labs.learn/
├── app/
│   ├── layout.tsx                # Global layout with Navbar & Footer
│   ├── page.tsx                  # Hero-first landing page with product preview
│   ├── globals.css               # Design system & dark theme tokens
│   ├── learn/
│   │   ├── page.tsx              # Domain selector (DSA, Frontend, Backend, etc.)
│   │   └── dsa/
│   │       ├── page.tsx          # DSA path overview, knowledge graph, curriculum
│   │       ├── diagnostic/
│   │       │   └── page.tsx      # 50+ question interactive diagnostic engine
│   │       └── [topic]/
│   │           └── page.tsx      # Deep topic page (Learn, Resources, Practice, Check-in)
│   ├── dashboard/
│   │   └── page.tsx              # Personalized user learning dashboard
│   └── auth/
│       ├── page.tsx              # Magic link & demo authentication
│       └── callback/route.ts     # Supabase auth session exchange
├── components/
│   ├── navigation/               # Navbar & Footer
│   ├── ui/                       # Badge, ProgressBar, MasteryBadge
│   ├── learning/                 # KnowledgeGraph, TopicCard, ProblemCard, ResourceCard, Modal
│   └── dashboard/                # DashboardStat, KnowledgeMap, ContinueCard, RecommendationCard
├── data/
│   └── dsa/                      # 44 Topics, 50+ Questions, 35+ Resources, 36 Problems, Domains
├── lib/
│   ├── learning/                 # Prerequisite graph solver & personalized path engine
│   ├── mastery/                  # Multi-signal mastery score & level calculator
│   ├── diagnostic/               # Assessment scoring & per-topic mastery aggregator
│   ├── storage/                  # Browser localStorage manager with Supabase sync
│   ├── ai/                       # AI provider abstraction with offline deterministic fallback
│   └── supabase/                 # SSR & Browser Supabase clients
├── supabase/
│   ├── migrations/               # PostgreSQL schema & RLS policies
│   └── seed.sql                  # Seed data
└── types/
    └── learning.ts               # Complete TypeScript domain models
```

---

## 🧪 Production Verification

To verify that linting and production build compile with zero TypeScript errors:

```bash
npm run lint
npm run build
```

---

## 🔮 Future Roadmap

- [ ] **AI Tutor & Interactive Chat**: Context-aware tutoring tailored to user gaps.
- [ ] **Target Date Mode**: Adjust graph velocity for "Interview in 8 Weeks" or "Semester Prep".
- [ ] **Additional Domains**: Expand tracks into Frontend Engineering, Backend Distributed Systems, and Web Security.
