# MindMap Journey - System Architecture & Product Requirements

## 1. Product Requirement Document (PRD)

### Concept: Academic Mental Wellness Digital Twin
MindMap Journey is designed for students preparing for high-stakes Indian exams (NEET, JEE, UPSC, CAT, CUET, GATE). Instead of a generic dashboard, it maintains a server-side **Academic Mental Wellness Digital Twin** that continuously updates a student's virtual status (stress level, focus depth, burnout risk, sleep efficiency, study consistency) from journaling and behavior.

### Target Personas & Key Roles
1. **Student**: Interacts with the AI companion, journals via voice or text, tracks their mood/focus, views their digital twin, accesses tailored mindfulness, and reviews their study milestones.
2. **Parent**: Views high-level wellness indicators (burnout risk, sleep quality, aggregate trends) and receives warning alerts when critical thresholds are breached without seeing confidential journaling text.
3. **Counselor**: Views aggregated exam-group emotional trends and clinical burnout warnings. Never sees private journaling logs.
4. **Admin**: Runs system-wide diagnostics, audit logs, and monitors LLM quality scoring parameters.

---

## 2. User Journey Mapping

```
[Onboarding] ──> [Google OAuth] ──> [Role & Exam Select] ──> [Baseline Wellness Assessment] ──> [Dashboard (Mission Control)]
                                                                                                          │
                                                                                                          ├───> Voice/Text Journaling
                                                                                                          │     └───> AI Cognitive Distortion Detection
                                                                                                          │     └───> Emotional Knowledge Graph Updates
                                                                                                          │
                                                                                                          ├───> Burnout Risk Evaluation Engine
                                                                                                          │
                                                                                                          ├───> Panic & Night Recovery Interventions
                                                                                                          │
                                                                                                          └───> Parent / Counselor Aggregated View Hub
```

---

## 3. UX Wireframe & Layout Design

The layout consists of a premium **Slate Dark Theme** featuring:
- **Top Bar**: User context, Mode Switcher (Panic, Night Anxiety, Low Motivation, Normal), and Role Switcher (Student, Parent, Counselor, Admin) to explore all user journeys easily.
- **Left Panel (The Digital Twin Core)**: Holographic representation of the student's current states (Stress, Energy, Confidence, Burnout Risk, and Recovery Rate).
- **Center Canvas**: Modular "Mission Control" widgets:
  1. **AI Journaling & Voice Input**: Guided by empathetic prompts (e.g., "What happened today?").
  2. **Interactive Cognitive Distortion Analyzer**: Explains biases gently.
  3. **Aesthetic Emotional Knowledge Graph**: Visualizes triggers like `Mock Tests ──> Stress`.
  4. **Adaptive Mindfulness Player**: Real-time breathing exercises matched with triggers.
  5. **Confidence Memory Bank**: Completed tasks, accomplishments, and study progress.
  6. **Empathetic AI Companion Chat**: Context-aware chat showing instant evaluation scores.
  7. **Parent & Counselor Portals**: Showing role-restricted aggregated wellness reports.

---

## 4. Database Schema (Logical Design)

We will implement a clean, lightweight JSON-file-based persistent database engine (`/db.json`) on the backend with appropriate schemas.

### Tables (Entities)
1. **Users**: `id`, `name`, `email`, `role`, `selectedExam`, `createdAt`
2. **DigitalTwins**: `userId`, `stressLevel` (0-100), `confidenceLevel` (0-100), `burnoutRisk` (0-100), `sleepQuality` (0-100), `studyConsistency` (0-100), `focusDepth` (0-100), `lastUpdated`
3. **Journals**: `id`, `userId`, `text`, `emotion`, `trigger`, `severity`, `confidence`, `burnoutSignal`, `distortions` (List), `createdAt`
4. **KnowledgeGraphs**: `userId`, `sourceNode`, `targetNode`, `weight`, `relationType`
5. **AchievementBank**: `id`, `userId`, `title`, `category`, `createdAt`
6. **AiEvaluations**: `id`, `prompt`, `response`, `empathyScore`, `safetyScore`, `toxicityScore`, `relevanceScore`, `personalizationScore`, `createdAt`
7. **AuditLogs**: `id`, `userId`, `action`, `timestamp`, `piiRedacted` (boolean)

---

## 5. API Contracts & Endpoint Design

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Sets up new user + profile | No |
| `POST` | `/api/auth/login` | Simulates session & signs tokens | No |
| `GET`  | `/api/users/me` | Retrieves current user role and Twin state | Yes |
| `POST` | `/api/twin/baseline` | Sets up the baseline wellness twin profile | Yes |
| `POST` | `/api/journal/analyze` | Processes new journal entry via Gemini 2.5 | Yes |
| `GET`  | `/api/journal/history` | Fetches student's journaling history | Yes |
| `GET`  | `/api/twin/graph` | Obtains emotional knowledge graph links | Yes |
| `POST` | `/api/twin/achievement` | Adds milestone to Confidence Bank | Yes |
| `POST` | `/api/chat/companion` | Empathetic chat with internal evaluator check | Yes |
| `GET`  | `/api/reports/reflection`| Narrative weekly report generated via AI | Yes |
| `GET`  | `/api/parent/wellness` | Restricted parent metrics (no raw journals) | Yes |
| `GET`  | `/api/counselor/trends`| Uncensored aggregated clinical safety trends | Yes |

---

## 6. AI Architecture
Utilizing the **Gemini 3.5 Flash** model (`gemini-3.5-flash`) for structural prompt-based evaluations, response streams, and JSON formatting. 
1. **Journal Structurer**: Takes `"What happened today?"` journal inputs and executes JSON schema formatting to extract `{ emotion, trigger, severity, distortions, burnoutSignal }`.
2. **Adaptive Intervention Engine**: Formulates breathing scripts for targeted triggers.
3. **Empathetic Companion Chat**: Restricts diagnostic responses, focusing purely on safe, non-judgmental stress mitigation.
4. **AI Evaluation Layer**: In-flight server-side post-assessment scoring prompts assessing empathy and safety scores on every response before storage.

---

## 7. Security Architecture
- **Role-Based Access Control (RBAC)**: Verified token headers enforce boundaries.
- **PII Redaction**: Raw text journals are scrubbed of phone numbers, emails, and names before being processed.
- **Consent Flags**: A simulated workflow ensures Parents cannot view stats without Student approval.
- **Audit Logs**: Every role-restricted request is stamped into `/api/audit-logs`.

---

## 8. Observability & Monitoring
- **Metrics Tracked**: API Latency, LLM Token Usage, Cost per User, Response Relevancy, Safety Scores, and Toxicity rates.
- **Mock OpenTelemetry Console**: Outputs performance metrics onto an admin dashboard, serving as a live system observability logger.
