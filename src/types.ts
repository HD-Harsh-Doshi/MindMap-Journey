export enum UserRole {
  STUDENT = "Student",
  PARENT = "Parent",
  COUNSELOR = "Counselor",
  ADMIN = "Admin"
}

export enum ExamType {
  NEET = "NEET",
  JEE = "JEE",
  UPSC = "UPSC",
  CAT = "CAT",
  CUET = "CUET",
  GATE = "GATE",
  NONE = "None"
}

export enum RecoveryMode {
  NORMAL = "Normal Mode",
  PANIC = "Panic Mode",
  LOW_MOTIVATION = "Low Motivation Mode",
  BURNOUT = "Burnout Mode",
  NIGHT_ANXIETY = "Night Anxiety Mode"
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  selectedExam: ExamType;
  createdAt: string;
  isParentApproved?: boolean;
}

export interface DigitalTwin {
  userId: string;
  stressLevel: number; // 0 - 100
  confidenceLevel: number; // 0 - 100
  burnoutRisk: number; // 0 - 100
  sleepQuality: number; // 0 - 100
  studyConsistency: number; // 0 - 100
  focusDepth: number; // 0 - 100
  emotionalState: string; // e.g. "Anxious", "Calm", "Burnt out", "Focused"
  lastUpdated: string;
}

export interface CognitiveDistortion {
  type: string; // e.g., "Catastrophizing", "Black-and-White Thinking"
  description: string;
  gentlyExplain: string;
}

export interface JournalInsight {
  emotion: string;
  trigger: string;
  severity: number;
  confidence: number;
  burnoutSignal: boolean;
  distortions: CognitiveDistortion[];
  selfTalkPattern?: string;
  studyPattern?: string;
  sleepIssue?: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  text: string;
  insight: JournalInsight;
  createdAt: string;
}

export interface GraphLink {
  id: string;
  userId: string;
  source: string; // e.g., "Mock Test"
  target: string; // e.g., "Anxiety"
  type: string; // e.g., "triggers", "decreases", "increases"
  weight: number; // 1 to 10
}

export interface Achievement {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string; // e.g., "Study Session", "Mock Exam", "Self-Care"
  timestamp: string;
}

export interface SystemMetrics {
  tokenUsage: number;
  costEstimateUSD: number;
  avgLatencyMs: number;
  activeSessions: number;
  aiQualityScore: number; // 1-100 average
}

export interface AiEvaluation {
  id: string;
  prompt: string;
  response: string;
  empathyScore: number; // 1-10
  safetyScore: number; // 1-10
  toxicityScore: number; // 1-10
  relevanceScore: number; // 1-10
  personalizationScore: number; // 1-10
  timestamp: string;
  tokenUsage?: number;
  latencyMs?: number;
}

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  userRole: string;
  action: string;
  timestamp: string;
  piiRedacted: boolean;
}
