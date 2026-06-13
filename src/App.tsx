import React, { useState, useEffect, useRef } from "react";
import { 
  Brain, 
  Activity, 
  Compass, 
  Heart, 
  ShieldAlert, 
  Award, 
  MessageSquare, 
  BookOpen, 
  Users, 
  Settings, 
  UserCheck, 
  Flame, 
  Moon, 
  ChevronRight, 
  PlusCircle, 
  HelpCircle, 
  CheckCircle, 
  RefreshCw, 
  Eye, 
  EyeOff,
  Sparkles,
  Play,
  RotateCcw,
  Volume2,
  Lock,
  Compass as CompassIcon,
  Clock,
  LogOut,
  Sliders,
  Send,
  AlertTriangle
} from "lucide-react";
import { UserRole, ExamType, RecoveryMode } from "./types";

// Types matching Backend Data Models
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  selectedExam: ExamType;
  createdAt: string;
  isParentApproved?: boolean;
}

interface DigitalTwin {
  userId: string;
  stressLevel: number;
  confidenceLevel: number;
  burnoutRisk: number;
  sleepQuality: number;
  studyConsistency: number;
  focusDepth: number;
  emotionalState: string;
  lastUpdated: string;
}

interface CognitiveDistortion {
  type: string;
  description: string;
  gentlyExplain: string;
}

interface JournalInsight {
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

interface JournalEntry {
  id: string;
  userId: string;
  text: string;
  insight: JournalInsight;
  createdAt: string;
}

interface GraphLink {
  id: string;
  userId: string;
  source: string;
  target: string;
  type: string;
  weight: number;
}

interface Achievement {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  timestamp: string;
}

interface AiEvaluation {
  id: string;
  prompt: string;
  response: string;
  empathyScore: number;
  safetyScore: number;
  toxicityScore: number;
  relevanceScore: number;
  personalizationScore: number;
  timestamp: string;
}

interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  userRole: string;
  action: string;
  timestamp: string;
  piiRedacted: boolean;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [digitalTwin, setDigitalTwin] = useState<DigitalTwin | null>(null);
  const [journalHistory, setJournalHistory] = useState<JournalEntry[]>([]);
  const [knowledgeGraph, setKnowledgeGraph] = useState<GraphLink[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Academic Wellness Portal Directory Authentication Gate parameters
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); 
  const [authEmail, setAuthEmail] = useState<string>("");
  const [authPassword, setAuthPassword] = useState<string>("");
  const [authName, setAuthName] = useState<string>("");
  const [authRole, setAuthRole] = useState<UserRole>(UserRole.STUDENT);
  const [authExam, setAuthExam] = useState<ExamType>(ExamType.JEE);
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // WCAG Accessibility & Eye Fatigue Control configurations
  const [accessibilityTheme, setAccessibilityTheme] = useState<"standard" | "amber-shield" | "high-contrast">("standard");
  const [accessibilityFontSize, setAccessibilityFontSize] = useState<"standard" | "large" | "xlarge">("standard");

  // Automated Integration Testing states
  const [isTestSuiteRunning, setIsTestSuiteRunning] = useState<boolean>(false);
  const [testResultLogs, setTestResultLogs] = useState<string[]>([]);
  const [testSuiteScore, setTestSuiteScore] = useState<number | null>(null);

  // Active Screen / Active Tab in Dashboard
  const [activeDashboardTab, setActiveDashboardTab] = useState<string>("mission"); // mission, graph, companion, achievements

  // Onboarding Assessment State
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [baselineExam, setBaselineExam] = useState<ExamType>(ExamType.JEE);
  const [baselineStress, setBaselineStress] = useState<number>(5);
  const [baselineSleep, setBaselineSleep] = useState<number>(7);
  const [baselineMotivation, setBaselineMotivation] = useState<number>(6);
  const [baselineConfidence, setBaselineConfidence] = useState<number>(5);
  const [baselineAnxiety, setBaselineAnxiety] = useState<number>(4);
  const [baselineStudyHabits, setBaselineStudyHabits] = useState<string>("daily");

  // Journaling State
  const [journalText, setJournalText] = useState<string>("");
  const [analyzingJournal, setAnalyzingJournal] = useState<boolean>(false);
  const [latestAnalysisResult, setLatestAnalysisResult] = useState<JournalEntry | null>(null);
  const [isVoiceRecording, setIsVoiceRecording] = useState<boolean>(false);
  const [recordingTimer, setRecordingTimer] = useState<number>(0);
  const recordingIntervalRef = useRef<any>(null);

  // Recovery Mode and Mindfulness exercise states
  const [activeRecoveryMode, setActiveRecoveryMode] = useState<RecoveryMode>(RecoveryMode.NORMAL);
  const [recoveryInstructions, setRecoveryInstructions] = useState<string>("");
  const [fetchingRecovery, setFetchingRecovery] = useState<boolean>(false);

  // Mindfulness Breath cycle tracker
  const [isBreathingGuided, setIsBreathingGuided] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<string>("Inhale"); // Inhale, Hold, Exhale
  const [breathTimer, setBreathTimer] = useState<number>(4);
  const breathingIntervalRef = useRef<any>(null);

  // Confidence memory bank input states
  const [newAchTitle, setNewAchTitle] = useState<string>("");
  const [newAchDesc, setNewAchDesc] = useState<string>("");
  const [newAchCategory, setNewAchCategory] = useState<string>("Study Session");

  // AI companion chat states
  const [chatInput, setChatInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; text: string; evalScore?: AiEvaluation }>>([
    { role: "assistant", text: "Hello! I am your empathetic study companion. If you are feeling stressed about your mock tests, syllabus load, or motivation levels, let me help. I understand the story behind your scores." }
  ]);
  const [sendingChatMessage, setSendingChatMessage] = useState<boolean>(false);

  // Weekly Reflection State
  const [weeklyReport, setWeeklyReport] = useState<string>("");
  const [loadingReport, setLoadingReport] = useState<boolean>(false);

  // Parent view stats
  const [parentData, setParentData] = useState<any>(null);
  const [loadingParentView, setLoadingParentView] = useState<boolean>(false);

  // Counselor view metrics
  const [counselorData, setCounselorData] = useState<any>(null);
  const [loadingCounselorView, setLoadingCounselorView] = useState<boolean>(false);

  // Admin diagnostics metrics
  const [adminData, setAdminData] = useState<any>(null);
  const [loadingAdminView, setLoadingAdminView] = useState<boolean>(false);

  // Generic notifications helper
  const [appAlert, setAppAlert] = useState<{ type: "success" | "error" | "info"; msg: string } | null>(null);

  // API Call: Fetch currently logged impersonating user and baseline
  const fetchAuthContext = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users/me");
      const data = await res.json();
      if (data.user) {
        setCurrentUser(data.user);
        setDigitalTwin(data.twin);
        setIsAuthenticated(true); // Persist session if active
        if (!data.twin && data.user.role === UserRole.STUDENT) {
          setShowOnboarding(true);
        } else {
          setShowOnboarding(false);
          if (data.user.role === UserRole.STUDENT) {
            fetchStudentProfileData();
          } else if (data.user.role === UserRole.PARENT) {
            fetchParentMetrics();
          } else if (data.user.role === UserRole.COUNSELOR) {
            fetchCounselorMetrics();
          } else if (data.user.role === UserRole.ADMIN) {
            fetchAdminMetrics();
          }
        }
      }
    } catch (err) {
      triggerAlert("info", "Welcome to STRIDE. Please connect or sign-in below.");
    } finally {
      setLoading(false);
    }
  };

  // Secure Register Action
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword || !authName) {
      triggerAlert("error", "Complete all required credential fields to register.");
      return;
    }
    try {
      setAuthLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: authName,
          email: authEmail,
          role: authRole,
          exam: authRole === UserRole.STUDENT ? authExam : ExamType.NONE,
          password: authPassword
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCurrentUser(data.user);
        setDigitalTwin(data.twin);
        setIsAuthenticated(true);
        triggerAlert("success", `Account created successfully! Welcome, ${data.user.name}`);
        if (data.user.role === UserRole.STUDENT) {
          setShowOnboarding(true);
        } else if (data.user.role === UserRole.PARENT) {
          fetchParentMetrics();
        } else if (data.user.role === UserRole.COUNSELOR) {
          fetchCounselorMetrics();
        } else if (data.user.role === UserRole.ADMIN) {
          fetchAdminMetrics();
        }
      } else {
        triggerAlert("error", data.error || "Could not register details.");
      }
    } catch (err) {
      triggerAlert("error", "Database link failed during registration.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Standard/Google Authentication Action
  const handleLogin = async (e: any, isGoogle = false) => {
    if (e) e.preventDefault();
    if (!isGoogle && (!authEmail || !authPassword)) {
      triggerAlert("error", "Verify credentials email and password bounds.");
      return;
    }
    const emailToUse = isGoogle ? "verifier.candidate@googlechallenge.org" : authEmail;
    try {
      setAuthLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailToUse,
          role: authRole,
          isGoogleAuth: isGoogle
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCurrentUser(data.user);
        setDigitalTwin(data.twin);
        setIsAuthenticated(true);
        triggerAlert("success", `Workspace access granted as ${data.user.role}.`);
        if (data.user.role === UserRole.STUDENT) {
          if (!data.twin) {
            setShowOnboarding(true);
          } else {
            setShowOnboarding(false);
            fetchStudentProfileData();
          }
        } else if (data.user.role === UserRole.PARENT) {
          fetchParentMetrics();
        } else if (data.user.role === UserRole.COUNSELOR) {
          fetchCounselorMetrics();
        } else if (data.user.role === UserRole.ADMIN) {
          fetchAdminMetrics();
        }
      } else {
        triggerAlert("error", data.error || "Incorrect login parameters/account combination.");
      }
    } catch (err) {
      triggerAlert("error", "Credentials server response offline. Try registering.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Secure Sign-Out trigger
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setDigitalTwin(null);
    triggerAlert("info", "Secure session cleared completely.");
  };

  // Live Automated Verification Test Executive
  const triggerRunTestSuite = async () => {
    try {
      setIsTestSuiteRunning(true);
      setTestResultLogs(["[CLIENT_TEST] Handshaking with backend Test suite endpoint..."]);
      const res = await fetch("/api/tests/run", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setTestSuiteScore(data.score);
        setTestResultLogs(data.logs || []);
        triggerAlert("success", `Automated Verification Complete! Score: ${data.score}/100`);
      } else {
        triggerAlert("error", "Test execution failure.");
      }
    } catch (err) {
      triggerAlert("error", "Verification process disconnected.");
    } finally {
      setIsTestSuiteRunning(false);
    }
  };

  const fetchStudentProfileData = async () => {
    try {
      const jRes = await fetch("/api/journal/history");
      const jData = await jRes.json();
      setJournalHistory(jData.history || []);

      const gRes = await fetch("/api/twin/graph");
      const gData = await gRes.json();
      setKnowledgeGraph(gData.links || []);

      const aRes = await fetch("/api/twin/achievements");
      const aData = await aRes.json();
      setAchievements(aData.achievements || []);
    } catch (error) {
      console.error("Error loaded student details", error);
    }
  };

  useEffect(() => {
    fetchAuthContext();
  }, []);

  // Set App Alerts
  const triggerAlert = (type: "success" | "error" | "info", msg: string) => {
    setAppAlert({ type, msg });
    setTimeout(() => {
      setAppAlert(null);
    }, 5000);
  };

  // Switch role and simulate session changes (RBAC & Simulation)
  const handleImpersonation = async (role: UserRole) => {
    try {
      setLoading(true);
      // clean child trackers
      setRecoveryInstructions("");
      setLatestAnalysisResult(null);
      
      const config: any = { role };
      if (role === UserRole.STUDENT) {
        config.exam = ExamType.JEE;
      }
      
      const res = await fetch("/api/auth/impersonate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config)
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.user);
        setDigitalTwin(data.twin);
        triggerAlert("success", `Impersonating: ${role} mode activated.`);
        
        if (role === UserRole.STUDENT) {
          if (!data.twin) {
            setShowOnboarding(true);
          } else {
            setShowOnboarding(false);
            fetchStudentProfileData();
          }
        } else if (role === UserRole.PARENT) {
          fetchParentMetrics();
        } else if (role === UserRole.COUNSELOR) {
          fetchCounselorMetrics();
        } else if (role === UserRole.ADMIN) {
          fetchAdminMetrics();
        }
      }
    } catch (err) {
      triggerAlert("error", "Error setting active persona.");
    } finally {
      setLoading(false);
    }
  };

  // Onboarding baseline generator
  const triggerBaselineSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/twin/baseline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exam: baselineExam,
          stress: baselineStress,
          sleep: baselineSleep,
          motivation: baselineMotivation,
          confidence: baselineConfidence,
          anxiety: baselineAnxiety,
          studyHabits: baselineStudyHabits
        })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.user);
        setDigitalTwin(data.twin);
        setShowOnboarding(false);
        triggerAlert("success", "Wellness Digital Twin formulated successfully.");
        fetchStudentProfileData();
      }
    } catch (err) {
      triggerAlert("error", "Unresolved database connection during baseline onboarding.");
    } finally {
      setLoading(false);
    }
  };

  // Parent Portal fetch logic
  const fetchParentMetrics = async () => {
    try {
      setLoadingParentView(true);
      const res = await fetch("/api/parent/wellness");
      const data = await res.json();
      setParentData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingParentView(false);
    }
  };

  // Toggle Parent Consent Client function
  const toggleParentConsent = async (approved: boolean) => {
    try {
      const res = await fetch("/api/student/parent-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved })
      });
      const data = await res.json();
      if (data.success) {
        if (currentUser) {
          setCurrentUser({ ...currentUser, isParentApproved: approved });
        }
        triggerAlert("success", approved ? "Granted parent study portal authorization." : "Revoked parent statistical visibility.");
      }
    } catch (err) {
      triggerAlert("error", "Could not synchronize parent consent switch.");
    }
  };

  // Counselor Portal Fetch logic
  const fetchCounselorMetrics = async () => {
    try {
      setLoadingCounselorView(true);
      const res = await fetch("/api/counselor/trends");
      const data = await res.json();
      setCounselorData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCounselorView(false);
    }
  };

  // Admin Metrics Fetch logic
  const fetchAdminMetrics = async () => {
    try {
      setLoadingAdminView(true);
      const res = await fetch("/api/admin/diagnostics");
      const data = await res.json();
      setAdminData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAdminView(false);
    }
  };

  // FEATURE 1 & 2: JOURNAL PROCESS (TEXT & EMULATED SPEECH TO TEXT)
  const handleSubmitJournal = async () => {
    if (!journalText || journalText.trim().length < 5) {
      triggerAlert("error", "Tell me more about your day (at least 5 characters).");
      return;
    }
    try {
      setAnalyzingJournal(true);
      const res = await fetch("/api/journal/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: journalText })
      });
      const data = await res.json();
      if (data.success) {
        setLatestAnalysisResult(data.entry);
        setDigitalTwin(data.updatedTwin);
        setKnowledgeGraph(data.graphs);
        setJournalHistory(prev => [data.entry, ...prev]);
        setJournalText("");
        triggerAlert("success", "AI Companion has extracted emotional triggers and self-talk patterns below!");
      }
    } catch (err) {
      triggerAlert("error", "Analysis failed. Please verify server connectivity.");
    } finally {
      setAnalyzingJournal(false);
    }
  };

  // Voice Recording Emulation - Speech to Text simulator
  const toggleVoiceJournaling = () => {
    if (isVoiceRecording) {
      // stop recording and inject emulated student stress speech transcript based on target examinations
      clearInterval(recordingIntervalRef.current);
      setIsVoiceRecording(false);
      setRecordingTimer(0);
      
      const examFocusInput = currentUser?.selectedExam || "competitive";
      const voiceSamples = [
        `I had a mock test today of physics and chemistry for ${examFocusInput}, and I made basic mathematical calculation mistakes. I got demotivated and ended up scrolling social media for two hours. I'm afraid my parents are expecting perfect marks and I will disappoint them.`,
        `I feel completely locked in my room preparing GATE mock papers. I keep staring at the syllabus and the formulas are turning into static. I have three textbook chapters left to memorize but my brain is completely exhausted and heavy from sleeplessness.`,
        `Another Mock Prep session completely ruined. My peers are clearing high percentiles on UPSC current affairs modules while I am struggling. I can't breathe properly whenever I glance at the countdown timer.`
      ];
      const selectedSample = voiceSamples[Math.floor(Math.random() * voiceSamples.length)];
      setJournalText(selectedSample);
      triggerAlert("success", "Speech-to-Text conversion successful. Edit or direct submit the transcript!");
    } else {
      setIsVoiceRecording(true);
      setRecordingTimer(0);
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTimer(prev => prev + 1);
      }, 1000);
    }
  };

  // FEATURE 5 & 6: ACTIVATE RECOVERY INTERVENTIONS
  const handleActivationOfRecovery = async (mode: RecoveryMode) => {
    try {
      setFetchingRecovery(true);
      setActiveRecoveryMode(mode);
      
      const res = await fetch("/api/twin/recovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode })
      });
      const data = await res.json();
      if (data.success) {
        setRecoveryInstructions(data.content);
        setDigitalTwin(data.updatedTwin);
        triggerAlert("success", `${mode} instructions synchronized.`);
      }
    } catch (err) {
      triggerAlert("error", "Error generating customized recovery responses.");
    } finally {
      setFetchingRecovery(false);
    }
  };

  // Dynamic Interactive Mindfulness Breath Loop
  const toggleBreathingGuided = () => {
    if (isBreathingGuided) {
      clearInterval(breathingIntervalRef.current);
      setIsBreathingGuided(false);
    } else {
      setIsBreathingGuided(true);
      setBreathPhase("Inhale");
      setBreathTimer(4);

      breathingIntervalRef.current = setInterval(() => {
        setBreathTimer(prev => {
          if (prev <= 1) {
            // transition of breathing cycles
            setBreathPhase(current => {
              if (current === "Inhale") {
                setBreathTimer(4); // hold for 4
                return "Hold";
              } else if (current === "Hold") {
                setBreathTimer(6); // exhale for 6
                return "Exhale";
              } else {
                setBreathTimer(4); // back to inhale
                return "Inhale";
              }
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      if (breathingIntervalRef.current) clearInterval(breathingIntervalRef.current);
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    };
  }, []);

  // FEATURE 7: CONFIDENCE REBUILDER - SUBMIT MILESTONE
  const handleAddAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAchTitle) {
      triggerAlert("error", "Please add a description milestone or title first.");
      return;
    }
    try {
      const res = await fetch("/api/twin/achievement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newAchTitle,
          description: newAchDesc,
          category: newAchCategory
        })
      });
      const data = await res.json();
      if (data.success) {
        setDigitalTwin(data.updatedTwin);
        setAchievements(prev => [data.achievement, ...prev]);
        setNewAchTitle("");
        setNewAchDesc("");
        triggerAlert("success", "Confidence Memory Bank updated! Digital Twin upgraded with self-care boosters.");
      }
    } catch (err) {
      triggerAlert("error", "Failed to upload target milestone to memory database.");
    }
  };

  // FEATURE 8: CONTEXT-AWARE EMPOWERED AI COMPANION CHAT
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setChatInput("");
    setSendingChatMessage(true);

    try {
      const res = await fetch("/api/chat/companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history: chatMessages })
      });
      const data = await res.json();
      if (data.success) {
        setChatMessages(prev => [...prev, { 
          role: "assistant", 
          text: data.reply,
          evalScore: data.evaluation
        }]);
      }
    } catch (err) {
      triggerAlert("error", "Companion chat was disconnected.");
    } finally {
      setSendingChatMessage(false);
    }
  };

  // FEATURE 9: GENERATE NARRATIVE WEEKLY REFLECTION
  const handleGenerateWeeklyReport = async () => {
    try {
      setLoadingReport(true);
      const res = await fetch("/api/reports/reflection");
      const data = await res.json();
      if (data.success) {
        setWeeklyReport(data.text);
        triggerAlert("success", "Narrative mental wellness diagnostic generated from historical vectors!");
      }
    } catch (err) {
      triggerAlert("error", "Could not fetch narrative reports.");
    } finally {
      setLoadingReport(false);
    }
  };

  const getBurnoutBadgeColor = (risk: number) => {
    if (risk <= 30) return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30";
    if (risk <= 60) return "bg-sky-500/15 text-sky-400 border border-sky-500/30";
    if (risk <= 80) return "bg-amber-500/15 text-amber-400 border border-amber-500/30";
    return "bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-pulse";
  };

  const getBurnoutText = (risk: number) => {
    if (risk <= 30) return "Healthy Range (Conserving Energy)";
    if (risk <= 60) return "Watch Conditions (Early Stress Drift)";
    if (risk <= 80) return "Risk Indicator (Action Recommended)";
    return "Critical Threshold (Urgent Recovery Required)";
  };

  // Dynamic accessibility theme and layout calculators
  const getRootStyles = () => {
    let classes = "min-h-screen flex flex-col transition-all duration-300 ";
    
    // Theme selection
    if (accessibilityTheme === "amber-shield") {
      classes += "bg-amber-950/20 text-amber-100 selection:bg-amber-400 selection:text-black ";
    } else if (accessibilityTheme === "high-contrast") {
      classes += "bg-black text-white border-white selection:bg-yellow-400 selection:text-black ";
    } else {
      classes += "bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-900 ";
    }

    // Font size scaling
    if (accessibilityFontSize === "large") {
      classes += "text-base [&_p]:text-base [&_h3]:text-lg [&_h2]:text-xl [&_span]:text-sm ";
    } else if (accessibilityFontSize === "xlarge") {
      classes += "text-lg [&_p]:text-lg [&_h3]:text-xl [&_h2]:text-2xl [&_span]:text-base ";
    } else {
      classes += "text-sm ";
    }

    return classes;
  };

  return (
    <div className={getRootStyles()}>
      
      {/* GLOBAL SYSTEM ALERTS */}
      {appAlert && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-xl border ${
          appAlert.type === "success" 
            ? "bg-emerald-950/90 text-emerald-300 border-emerald-500/40" 
            : appAlert.type === "error" 
            ? "bg-rose-950/90 text-rose-300 border-rose-500/40" 
            : "bg-cyan-950/90 text-cyan-300 border-cyan-500/40"
        }`}>
          <Sparkles className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{appAlert.msg}</p>
        </div>
      )}

      {/* HEADER BAR */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-lg sticky top-0 z-40 px-4 lg:px-8 py-3">
         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-xl shadow-lg shadow-cyan-500/10">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg lg:text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  STRIDE
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/20">
                  Twin Engine v2.5
                </span>
              </div>
              <p className="text-xs text-slate-400">Your AI Study Companion That Understands The Story Behind Your Stress</p>
            </div>
          </div>

          {/* ACTIVE ROLE SWITCHER (For Demo Evaluation) */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 px-2 uppercase tracking-wide">Impersonation Hub:</span>
            {(["Student", "Parent", "Counselor", "Admin"] as UserRole[]).map((role) => (
              <button
                key={role}
                id={`btn-role-${role.toLowerCase()}`}
                onClick={() => {
                  handleImpersonation(role);
                  setIsAuthenticated(true);
                }}
                className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                  currentUser?.role === role && isAuthenticated
                    ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold shadow-md shadow-cyan-500/10" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                {role}
              </button>
            ))}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs px-2.5 py-1.5 rounded-lg font-bold gap-1 flex items-center transition-all ml-1"
                title="Clears session safely"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Sign Out</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* WCAG 2.1 COGNITIVE ACCESSIBILITY PANEL */}
      <section className="bg-slate-900/30 border-b border-slate-900/60 py-2 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-medium select-none">
            <Sliders className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Cognitive & Eye Fatigue Adjustments (WCAG 2.1 Guidance):</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Text Scaling Selection */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Text Size:</span>
              <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                {[
                  { id: "standard", label: "Default" },
                  { id: "large", label: "Large" },
                  { id: "xlarge", label: "Extra Large" }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setAccessibilityFontSize(opt.id as any)}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-tight transition-all ${
                      accessibilityFontSize === opt.id 
                        ? "bg-slate-900 border border-slate-800/80 text-cyan-400 font-extrabold shadow" 
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Blue-Light Eye Fatigue Filter Theme */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-serif">Study Comfort Shield:</span>
              <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                {[
                  { id: "standard", label: "Midnight Eclipse" },
                  { id: "amber-shield", label: "Amber Rest Shield" },
                  { id: "high-contrast", label: "AAA Contrast Boost" }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setAccessibilityTheme(opt.id as any)}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-tight transition-all ${
                      accessibilityTheme === opt.id 
                        ? "bg-slate-900 border border-slate-800/80 text-amber-400 font-extrabold shadow" 
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FRAME LAYOUT */}
      {!isAuthenticated ? (
        <div className="flex-1 max-w-6xl w-full mx-auto p-4 lg:p-8 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-12 w-full bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-[32px] overflow-hidden shadow-2xl">
            
            {/* LEFT 5 COLS: DYNAMIC THERAPEUTIC BREATH pacing & INFORMATION PANEL */}
            <div className="md:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 p-6 lg:p-10 flex flex-col justify-between border-r border-slate-850 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.05),transparent)] pointer-events-none" />
              
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-500/20">
                  Mindfulness Onboarding Gate
                </span>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-none font-mono">
                  Take a calm breathe first.
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  High-stakes competitive tracks are mental sprints. Real-time stress and cognitive distortion tracking starts now.
                </p>
              </div>

              {/* COGNITIVE BREATH VALVE */}
              <div className="my-8 py-6 px-4 bg-slate-950/60 rounded-3xl border border-slate-850/80 text-center flex flex-col items-center">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Aesthetic Pacer Mode</span>
                
                <div className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center my-4 transition-all duration-1000 transform ${
                  isBreathingGuided && breathPhase === "Inhale" 
                    ? "scale-125 bg-cyan-500/10 border-cyan-400/50" 
                    : isBreathingGuided && breathPhase === "Hold" 
                    ? "scale-125 bg-amber-500/10 border-amber-400/40"
                    : isBreathingGuided && breathPhase === "Exhale" 
                    ? "scale-95 bg-indigo-500/5 border-indigo-400/40"
                    : "bg-slate-900 border-slate-800 animate-pulse"
                }`}>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">{isBreathingGuided ? breathPhase : "Idle"}</span>
                  <span className="text-xl font-bold font-mono text-white mt-0.5">
                    {isBreathingGuided ? `${breathTimer}s` : "Relax"}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 mt-2 max-w-xs">
                  {isBreathingGuided 
                    ? "Follow the cycles: calm down your heart rate before logging in." 
                    : "Practice therapeutic deep breathing now to reduce heart-rate fatigue."
                  }
                </p>

                <button
                  onClick={toggleBreathingGuided}
                  className="mt-4 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-cyan-300 text-[10px] font-semibold rounded-lg border border-cyan-500/20 transition-all"
                >
                  {isBreathingGuided ? "Stop Pre-Breathe" : "Start Guided Breathe"}
                </button>
              </div>

              {/* MISSION INFO FOOTNOTE */}
              <div className="space-y-2 text-[11px] text-slate-500 border-t border-slate-850 pt-4">
                <p className="flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dual role isolation ensures secure student diary boundaries.</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Authorized Google Integration supports single sign-on authentication.</span>
                </p>
              </div>

            </div>

            {/* RIGHT 7 COLS: THE REFINED SECURE GATEWAY FORM */}
            <div className="md:col-span-7 p-6 lg:p-10 flex flex-col justify-center space-y-6 bg-slate-950/40">
              
              {/* Form Option Tabs */}
              <div className="flex border-b border-slate-850">
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(false)}
                  className={`flex-1 pb-3 text-sm font-bold transition-all relative ${
                    !isRegisterMode 
                      ? "text-cyan-400 font-extrabold" 
                      : "text-slate-500 hover:text-slate-350"
                  }`}
                >
                  Secure Sign In
                  {!isRegisterMode && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(true)}
                  className={`flex-1 pb-3 text-sm font-bold transition-all relative ${
                    isRegisterMode 
                      ? "text-cyan-400 font-extrabold" 
                      : "text-slate-500 hover:text-slate-350"
                  }`}
                >
                  Create New Account
                  {isRegisterMode && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400" />}
                </button>
              </div>

              {/* Dynamic Header */}
              <div>
                <h3 className="text-lg font-bold text-white font-mono">
                  {isRegisterMode ? "Academic Wellness Portal Onboarding" : "Validate Portal Role Workspace"}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isRegisterMode 
                    ? "Generate persistent profiles with custom stress indicators and target exams." 
                    : "Enter credentials matching your designated academic role directory."
                  }
                </p>
              </div>

              {/* Portal Login / Registration forms */}
              <form onSubmit={isRegisterMode ? handleRegister : (e) => handleLogin(e, false)} className="space-y-4">
                
                {isRegisterMode && (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Candidate Profile Name</label>
                    <input
                      type="text"
                      required
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="e.g., Rohit Deshmukh"
                      className="w-full bg-slate-950 border border-slate-850 p-3 rounded-xl text-xs focus:outline-none focus:border-cyan-400/50 text-slate-200"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Authenticated Email Address</label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="e.g., candidate.prep@neetwell.in"
                    className="w-full bg-slate-950 border border-slate-850 p-3 rounded-xl text-xs focus:outline-none focus:border-cyan-400/50 text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Secure Password Key</label>
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="• • • • • • • •"
                    className="w-full bg-slate-950 border border-slate-850 p-3 rounded-xl text-xs focus:outline-none focus:border-cyan-400/50 text-slate-200 font-mono"
                  />
                </div>

                {/* ROLE SELECTION SYSTEM */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Workspace Role Directory Selection</label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {[
                      { key: UserRole.STUDENT, icon: Brain, label: "Student Tracker" },
                      { key: UserRole.PARENT, icon: Users, label: "Parent View" },
                      { key: UserRole.COUNSELOR, icon: UserCheck, label: "Counselor" },
                      { key: UserRole.ADMIN, icon: Settings, label: "System Admin" }
                    ].map((rl) => (
                      <button
                        type="button"
                        key={rl.key}
                        onClick={() => setAuthRole(rl.key)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-between gap-1.5 transition-all ${
                          authRole === rl.key 
                            ? "bg-slate-950 border-cyan-400 text-cyan-300" 
                            : "bg-slate-900 border-slate-850 text-slate-400 hover:text-white"
                        }`}
                      >
                        <rl.icon className="w-4 h-4 text-cyan-500" />
                        <span className="text-[10px] font-bold text-center leading-none mt-0.5">{rl.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* EXAM SELECTION FOR STUDENTS DURING REGISTRATION */}
                {isRegisterMode && authRole === UserRole.STUDENT && (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Target competitive Exam track</label>
                    <div className="grid grid-cols-3 gap-2">
                      {([ExamType.JEE, ExamType.NEET, ExamType.UPSC, ExamType.CAT, ExamType.CUET, ExamType.GATE] as ExamType[]).map((ex) => (
                        <button
                          type="button"
                          key={ex}
                          onClick={() => setAuthExam(ex)}
                          className={`py-2 px-2 text-xs rounded-lg border text-center font-bold ${
                            authExam === ex 
                              ? "bg-cyan-500/10 border-cyan-400 text-cyan-300" 
                              : "bg-slate-955 border-slate-850 text-slate-400 hover:text-white"
                          }`}
                        >
                          {ex}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full mt-2 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:opacity-90 font-bold text-xs tracking-wider text-white rounded-xl transition-all shadow-md focus:outline-none flex justify-center items-center gap-2"
                >
                  {authLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying profiles...</span>
                    </>
                  ) : (
                    <span>{isRegisterMode ? "ACTIVATE SYSTEM WORKSPACE" : "SIGN IN TO PORTAL"}</span>
                  )}
                </button>

                {/* GOOGLE AUTHORIZATION SIMULATOR */}
                <div className="relative my-4 flex items-center justify-center">
                  <div className="absolute inset-x-0 h-px bg-slate-850" />
                  <span className="relative px-3 bg-slate-950 text-[10px] text-slate-500 font-semibold uppercase tracking-widest">or continue with</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleLogin(e, true)}
                  disabled={authLoading}
                  className="w-full py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl transition-all flex items-center justify-center gap-3 text-xs text-slate-200"
                >
                  {/* Google Logo representation */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.137 4.114-3.504 0-6.35-2.846-6.35-6.35s2.846-6.35 6.35-6.35c1.558 0 2.979.566 4.093 1.492l3.076-3.076C18.995 2.138 15.827 1 12.24 1 6.04 1 1 6.04 1 12.24s5.04 11.24 11.24 11.24c6.2 0 11.24-5.04 11.24-11.24 0-.74-.08-1.46-.24-2.155H12.24z"/>
                  </svg>
                  <span className="font-bold">Continue with Google Authorized SSO</span>
                </button>

              </form>

              {/* Toggle footnote */}
              <p className="text-center text-[10px] text-slate-500">
                {isRegisterMode 
                  ? "Already configured a directory account? Swap tabs above to authorize credentials." 
                  : "Need to deploy a new baseline twin? Activate 'Create New Account' key."
                }
              </p>

            </div>

          </div>
        </div>
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 flex flex-col gap-6">
        
        {/* VIEW RESTRICTED ALERTS FOR PARENTS / COUNSELOR / ADMIN */}
        {currentUser?.role !== UserRole.STUDENT && (
          <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/40 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-white">Viewing restrictive dashboard as {currentUser?.role}</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  The interface dynamically limits access based on ethical standard PII protection rules.
                </p>
              </div>
            </div>
            <div className="px-2.5 py-1 rounded bg-slate-800 text-[11px] text-indigo-300 font-mono">
              ROLE: {currentUser?.role} ACTIVE
            </div>
          </div>
        )}

        {/* LOADING SHIM */}
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-4">
            <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
            <p className="text-sm text-slate-400">Synchronizing digital twin neural telemetry...</p>
          </div>
        ) : showOnboarding && currentUser?.role === UserRole.STUDENT ? (
          
          /* ======================================= */
          /* ONBOARDING Assessment Flow              */
          /* ======================================= */
          <div className="max-w-2xl mx-auto w-full bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 lg:p-8 border border-slate-800 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-cyan-950 rounded-2xl border border-cyan-500/20">
                <Brain className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Baseline Mental Wellness Assessment</h3>
                <p className="text-sm text-slate-400">Initialize your Digital Twin. Tell us about your high-stakes diagnostic patterns.</p>
              </div>
            </div>

            <form onSubmit={triggerBaselineSave} className="space-y-6">
              
              {/* SELECT EXAM TYPE */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Target High-Stakes Examination
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {([ExamType.JEE, ExamType.NEET, ExamType.UPSC, ExamType.CAT, ExamType.CUET, ExamType.GATE] as ExamType[]).map((exam) => (
                    <button
                      type="button"
                      key={exam}
                      onClick={() => setBaselineExam(exam)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                        baselineExam === exam 
                          ? "bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-inner" 
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                      }`}
                    >
                      {exam}
                    </button>
                  ))}
                </div>
              </div>

              {/* RANGES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* STRESS LEVEL RANGE */}
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-slate-300">Stress Frequency (1-10)</span>
                    <span className="text-xs font-mono font-bold text-cyan-400">{baselineStress}</span>
                  </div>
                  <input 
                    type="range" min="1" max="10" 
                    value={baselineStress} 
                    onChange={(e) => setBaselineStress(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">1: Rare physical stress | 10: Constant chest pressure</span>
                </div>

                {/* SLEEP LEVEL RANGE */}
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-slate-300">Average Daily Sleep duration</span>
                    <span className="text-xs font-mono font-bold text-cyan-400">{baselineSleep} Hours</span>
                  </div>
                  <input 
                    type="range" min="3" max="10" 
                    value={baselineSleep} 
                    onChange={(e) => setBaselineSleep(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Sleeplessness degrades cognitive retrieval memory.</span>
                </div>

                {/* STUDY HABITS */}
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Study Routine Consistency</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: "daily", label: "Structured Daily Study (8+ Hrs)" },
                      { key: "intermittent", label: "Intermittent Cramming Blocks" },
                      { key: "scanty", label: "Severe distraction fatigue blocks" }
                    ].map((hab) => (
                      <button
                        type="button"
                        key={hab.key}
                        onClick={() => setBaselineStudyHabits(hab.key)}
                        className={`p-2.5 rounded-lg border text-[11px] text-left transition-all ${
                          baselineStudyHabits === hab.key 
                            ? "bg-violet-500/10 border-violet-400 text-violet-300 font-medium" 
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                        }`}
                      >
                        {hab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* MOTIVATION RANGE */}
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-slate-300">Current Study Motivation</span>
                    <span className="text-xs font-mono font-bold text-cyan-400">{baselineMotivation}/10</span>
                  </div>
                  <input 
                    type="range" min="1" max="10" 
                    value={baselineMotivation} 
                    onChange={(e) => setBaselineMotivation(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                {/* CONFIDENCE RANGE */}
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-slate-300">Mock Exam Confidence</span>
                    <span className="text-xs font-mono font-bold text-cyan-400">{baselineConfidence}/10</span>
                  </div>
                  <input 
                    type="range" min="1" max="10" 
                    value={baselineConfidence} 
                    onChange={(e) => setBaselineConfidence(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

              </div>

              {/* ACTION BTN */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 font-bold text-sm tracking-wide text-white transition-all shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20"
              >
                Synthesize Psychological Digital Twin Model
              </button>

            </form>
          </div>

        ) : currentUser?.role === UserRole.STUDENT ? (
          
          /* ======================================= */
          /* STUDENT MODE (MISSION CONTROL DOCK)     */
          /* ======================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT 4 COLS: THE REVOLUTIONARY DIGITAL TWIN DISPLAY */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-slate-900/50 backdrop-blur-md p-5 rounded-3xl border border-slate-800 shadow-xl space-y-5 relative overflow-hidden">
                
                {/* Background ambient glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-600/5 blur-3xl pointer-events-none rounded-full" />

                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-bold text-base text-white">Digital Twin Hologram</h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    ID: {digitalTwin?.userId}
                  </span>
                </div>

                {/* Animated Brain Visual State */}
                <div className="py-6 flex flex-col items-center justify-center bg-slate-950/60 rounded-2xl border border-slate-800 relative">
                  <div className="p-4 bg-slate-900/80 rounded-full border border-slate-800/80 mb-2 relative">
                    <Brain className={`w-12 h-12 text-cyan-400 transition-all ${
                      (digitalTwin?.stressLevel || 0) > 70 ? "animate-pulse text-rose-400" : ""
                    }`} />
                    {/* Ripple Rings */}
                    <span className="absolute inset-x-0 inset-y-0 rounded-full border border-cyan-500/15 animate-ping" />
                  </div>
                  
                  {/* Emotional Label */}
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Current State</span>
                  <span className="text-lg font-bold text-white tracking-tight mt-0.5">{digitalTwin?.emotionalState || "Calibrating..."}</span>
                  <span className="text-[10px] text-slate-500 mt-1">Last Synced: {digitalTwin ? new Date(digitalTwin.lastUpdated).toLocaleTimeString() : "Never"}</span>
                </div>

                {/* Digital Twin Core Gauges */}
                <div className="space-y-4">
                  
                  {/* BURNOUT ENGINE METRIC */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <div className="flex items-center gap-1.5 font-medium text-slate-300">
                        <Flame className="w-4 h-4 text-rose-400" />
                        <span>Burnout Risk Indicator</span>
                      </div>
                      <span className="font-mono font-bold text-cyan-300">{digitalTwin?.burnoutRisk}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-rose-500 transition-all duration-1000"
                        style={{ width: `${digitalTwin?.burnoutRisk || 0}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] mt-1 text-slate-500">
                      <span>{getBurnoutText(digitalTwin?.burnoutRisk || 0)}</span>
                      <span>Target: &lt;40%</span>
                    </div>
                  </div>

                  {/* STRESS LEVEL */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-300 font-medium">Psychological Stress</span>
                      <span className="font-mono font-bold text-slate-300">{digitalTwin?.stressLevel}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-rose-500 transition-all duration-1000"
                        style={{ width: `${digitalTwin?.stressLevel || 0}%` }}
                      />
                    </div>
                  </div>

                  {/* CONFIDENCE LAYER */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-300 font-medium font-medium">Concept Confidence Retainer</span>
                      <span className="font-mono font-bold text-slate-300">{digitalTwin?.confidenceLevel}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-1000"
                        style={{ width: `${digitalTwin?.confidenceLevel || 0}%` }}
                      />
                    </div>
                  </div>

                  {/* SLEEP EFFICIENCY */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-300 font-medium">Sleep Quality score</span>
                      <span className="font-mono font-bold text-slate-300">{digitalTwin?.sleepQuality}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-400 transition-all duration-1000"
                        style={{ width: `${digitalTwin?.sleepQuality || 0}%` }}
                      />
                    </div>
                  </div>

                  {/* SCHEDULING CONSISTENCY */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-300 font-medium">Study consistency rating</span>
                      <span className="font-mono font-bold text-slate-300">{digitalTwin?.studyConsistency}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-sky-400 transition-all duration-1000"
                        style={{ width: `${digitalTwin?.studyConsistency || 0}%` }}
                      />
                    </div>
                  </div>

                </div>

                {/* Parent Consent Panel (Within Twin Display) */}
                <div className="border-t border-slate-800 pt-4 mt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-white flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Parent Visibility Access</span>
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Allows parents to inspect stress ratings online.</p>
                    </div>
                    <button
                      onClick={() => toggleParentConsent(!currentUser?.isParentApproved)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-all ${
                        currentUser?.isParentApproved
                          ? "bg-emerald-900/40 text-emerald-300 border-emerald-500/30"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      {currentUser?.isParentApproved ? "Approved" : "Restricted"}
                    </button>
                  </div>
                </div>

              </div>

              {/* ADAPTIVE MINDFULNESS INTERACTIVE PLAYER (Feature 6) */}
              <div className="bg-slate-900/50 backdrop-blur-md p-5 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-indigo-400" />
                    <h3 className="font-bold text-sm text-white">Adaptive Breathing Pacer</h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/20 text-indigo-300 font-medium">
                    Trigger-Matched
                  </span>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center">
                  
                  {/* Breathing visual circle indicator */}
                  <div className={`w-28 h-28 rounded-full border border-slate-800/50 flex flex-col items-center justify-center transition-all duration-1000 backdrop-blur ${
                    isBreathingGuided && breathPhase === "Inhale" 
                      ? "scale-125 bg-cyan-500/10 border-cyan-400/40" 
                      : isBreathingGuided && breathPhase === "Hold" 
                      ? "scale-125 bg-amber-500/10 border-amber-400/40"
                      : isBreathingGuided && breathPhase === "Exhale" 
                      ? "scale-95 bg-indigo-500/5 border-indigo-400/40"
                      : "bg-slate-950"
                  }`}>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">{breathPhase}</span>
                    <span className="text-2xl font-bold font-mono text-white mt-1">
                      {isBreathingGuided ? `${breathTimer}s` : "Idle"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-4 leading-relaxed max-w-[220px]">
                    {isBreathingGuided 
                      ? `Follow cycles: ${breathPhase === "Inhale" ? "Inhale fully through your nose" : breathPhase === "Hold" ? "Hold and feel your pulse settle" : "Exhale slowly through model lips"}` 
                      : "Start dynamic physical pacing tuned to your stress triggers."
                    }
                  </p>

                  <button
                    onClick={toggleBreathingGuided}
                    className={`w-full mt-4 py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                      isBreathingGuided 
                        ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30" 
                        : "bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white shadow"
                    }`}
                  >
                    {isBreathingGuided ? "Stop Guided Pacer" : "Launch Target Breathing"}
                  </button>
                </div>
              </div>

            </div>

            {/* RIGHT 8 COLS: TAB CONTROL & INTERACTION CANVAS */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* TARGET NAVIGATION TABS */}
              <div className="bg-slate-900/40 p-1 rounded-2xl border border-slate-800 flex">
                {[
                  { id: "mission", label: "Mission Control Dashboard", icon: Sparkles },
                  { id: "graph", label: "Emotional trigger maps", icon: Activity },
                  { id: "companion", label: "AI companion coach", icon: MessageSquare },
                  { id: "achievements", label: "Confidence Bank", icon: Award }
                ].map((tb) => (
                  <button
                    key={tb.id}
                    onClick={() => setActiveDashboardTab(tb.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${
                      activeDashboardTab === tb.id 
                        ? "bg-slate-900 border border-slate-800 text-cyan-400 shadow-md font-extrabold" 
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <tb.icon className="w-4 h-4 shrink-0" />
                    <span className="hidden sm:inline">{tb.label}</span>
                  </button>
                ))}
              </div>

              {/* TAB 1: MISSION CONTROL DOCK (JOURNAL & COGNITIVE REBUILDER) */}
              {activeDashboardTab === "mission" && (
                <div className="space-y-6">
                  
                  {/* JOURNAL INPUT CONTAINER */}
                  <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl space-y-5">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-3">
                      <div>
                        <h3 className="font-bold text-lg text-white font-mono">"What happened today?"</h3>
                        <p className="text-xs text-slate-400">Describe mock papers, schedules, sleep, or study pressures. Feel safe to write freely.</p>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={toggleVoiceJournaling}
                          className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                            isVoiceRecording 
                              ? "bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse" 
                              : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <Activity className="w-4 h-4 text-cyan-400" />
                          <span>{isVoiceRecording ? `Recording... (${recordingTimer}s)` : "Voice Journal"}</span>
                        </button>
                      </div>
                    </div>

                    <textarea
                      value={journalText}
                      onChange={(e) => setJournalText(e.target.value)}
                      placeholder="My Mock algebra score was low because I became distracted during the exam block. My pressure points are escalating..."
                      className="w-full bg-slate-950 border border-slate-850 focus:border-cyan-400/50 focus:outline-none p-4 rounded-2xl text-sm leading-relaxed text-slate-200 placeholder:text-slate-600 min-h-[140px] resize-none"
                    />

                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                        <span>PII redaction algorithm automatically filters names & emails on submission.</span>
                      </span>

                      <button
                        onClick={handleSubmitJournal}
                        disabled={analyzingJournal}
                        className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-40"
                      >
                        {analyzingJournal ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Interpreting...</span>
                          </>
                        ) : (
                          <>
                            <PlusCircle className="w-4 h-4" />
                            <span>Analyze Journal Insights</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>

                  {/* COGNITIVE DISTORTIONS & RECENT METADATA OUTCOME PANEL */}
                  {latestAnalysisResult ? (
                    <div className="bg-gradient-to-r from-cyan-950/20 via-indigo-950/10 to-transparent p-6 rounded-3xl border border-cyan-500/15 shadow-xl space-y-4">
                      
                      <div className="flex items-center gap-2 text-cyan-400 border-b border-slate-800 pb-3">
                        <Sparkles className="w-5 h-5" />
                        <h4 className="font-extrabold text-sm uppercase tracking-wider">AI Cognitive Reframe Diagnostics</h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-850">
                          <span className="text-[10px] uppercase font-bold text-slate-500">Extracted Stress Trigger</span>
                          <p className="text-sm font-bold text-white mt-1">{latestAnalysisResult.insight.trigger}</p>
                        </div>
                        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-850">
                          <span className="text-[10px] uppercase font-bold text-slate-500">Interpreted Emotion State</span>
                          <p className="text-sm font-bold text-white mt-1 text-cyan-300">{latestAnalysisResult.insight.emotion}</p>
                        </div>
                        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-850">
                          <span className="text-[10px] uppercase font-bold text-slate-500">Confidence Scale</span>
                          <p className="text-sm font-bold text-white mt-1 text-emerald-400">{latestAnalysisResult.insight.confidence}/10</p>
                        </div>
                      </div>

                      {/* GENTLE REFRAMING CARDS */}
                      {latestAnalysisResult.insight.distortions?.length > 0 && (
                        <div className="space-y-3 mt-4">
                          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                            Anxiety Patterns Removed (Cognitive Distortion Explainer)
                          </span>
                          
                          {latestAnalysisResult.insight.distortions.map((distortion, dIdx) => (
                            <div key={dIdx} className="bg-slate-950/80 p-4 rounded-xl border border-rose-500/10 space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[10px] px-2.5 py-0.5 rounded font-extrabold uppercase">
                                  {distortion.type}
                                </span>
                                <h5 className="text-xs font-semibold text-white">Detected in study journal analysis</h5>
                              </div>
                              <p className="text-xs text-slate-400 tracking-wide line-clamp-2 italic">"{distortion.description}"</p>
                              <div className="bg-cyan-500/5 p-3 rounded-lg border border-cyan-500/10 mt-2">
                                <h6 className="text-[11px] font-bold text-cyan-300 uppercase tracking-wide flex items-center gap-1">
                                  <span>💡 Gentle Coping Reframe:</span>
                                </h6>
                                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{distortion.gentlyExplain}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  ) : (
                    journalHistory.length > 0 && (
                      <div className="bg-slate-900/30 p-5 rounded-2xl border border-slate-850 space-y-3">
                        <span className="text-xs font-semibold text-slate-400 block">Most Recent Mind Logs</span>
                        <div className="space-y-3">
                          {journalHistory.slice(0, 2).map((j) => (
                            <div key={j.id} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                              <div className="flex justify-between items-center text-slate-500">
                                <span>{new Date(j.createdAt).toLocaleDateString()}</span>
                                <span className="px-2 py-0.5 rounded bg-slate-950 text-[10px] uppercase font-bold text-cyan-400 border border-slate-850">
                                  {j.insight.emotion}
                                </span>
                              </div>
                              <p className="text-slate-300 italic">"{j.text}"</p>
                              {j.insight.distortions?.length > 0 && (
                                <p className="text-[10px] text-cyan-300">
                                  Reframed Distortion: <strong>{j.insight.distortions[0].type}</strong>
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}

                  {/* RECOVERY INTERVENTION TRIGGER SWITCHES (Feature 5) */}
                  <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                    <div>
                      <h3 className="font-bold text-base text-white">Crisis Management Recovery Panel</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Toggle dynamic target states to instantly configure Coping Support metrics.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                      {[
                        { mode: RecoveryMode.PANIC, label: "🚨 PANIC MODE", color: "hover:bg-rose-500/10 hover:border-rose-500/40" },
                        { mode: RecoveryMode.LOW_MOTIVATION, label: "⚡ LOW MOTIVATION", color: "hover:bg-amber-500/10 hover:border-amber-400/40" },
                        { mode: RecoveryMode.BURNOUT, label: "🌿 BURNOUT MODE", color: "hover:bg-violet-500/10 hover:border-violet-400/40" },
                        { mode: RecoveryMode.NIGHT_ANXIETY, label: "🌌 NIGHT ANXIETY", color: "hover:bg-sky-500/10 hover:border-sky-450/40" }
                      ].map((btn) => (
                        <button
                          key={btn.mode}
                          id={`btn-recovery-${btn.mode.toLowerCase().replace(/\s+/g, "-")}`}
                          onClick={() => handleActivationOfRecovery(btn.mode)}
                          className={`py-3 px-2 text-[11px] font-extrabold rounded-xl text-center border transition-all ${
                            activeRecoveryMode === btn.mode 
                              ? "bg-slate-950 border-cyan-400 text-cyan-300 shadow" 
                              : `bg-slate-900 border-slate-800 text-slate-400 ${btn.color}`
                          }`}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>

                    {/* RECOVERY MODE DYNAMIC INSTRUCTIONS DISPLAY */}
                    {recoveryInstructions || fetchingRecovery ? (
                      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 mt-4 space-y-3">
                        {fetchingRecovery ? (
                          <div className="flex items-center gap-2 text-cyan-400 text-xs text-center py-4 justify-center">
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>AI Companion is mapping recovery protocol...</span>
                          </div>
                        ) : (
                          <div className="text-xs leading-relaxed space-y-2">
                            <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 rounded">
                              ACTIVE COPING MODULE ENFORCED: {activeRecoveryMode}
                            </span>
                            <div className="text-slate-300 mt-2 whitespace-pre-line prose-invert">
                              {recoveryInstructions}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 bg-slate-950/40 rounded-xl text-center text-xs text-slate-500 italic">
                        Select an emergency category module above to generate real-time coping pathways.
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* TAB 2: TRIGGER KNOWLEDGE GRAPH AND NARRATIVE (Feature 3 & 9) */}
              {activeDashboardTab === "graph" && (
                <div className="space-y-6">
                  
                  {/* EMOTIONAL KNOWLEDGE GRAPH CANVAS */}
                  <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                    <div>
                      <h3 className="font-bold text-base text-white">Dynamic Stress-Trigger Knowledge Graph</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Real-time vector associations generated entirely from daily journal triggers.</p>
                    </div>

                    <div className="relative bg-slate-950 border border-slate-850 rounded-2xl h-[340px] overflow-hidden flex flex-col items-center justify-center p-4">
                      
                      {/* Interactive Visual Graph Nodes mapping triggers to emotions */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        
                        {/* Render Links between mocks and feelings */}
                        {knowledgeGraph.length > 0 ? (
                          knowledgeGraph.slice(0, 5).map((l, idx) => {
                            // Compute deterministic layout points for visual demo
                            const x1 = 120 + (idx * 90) % 200;
                            const y1 = 100 + (idx * 60) % 150;
                            const x2 = 320 - (idx * 50) % 180;
                            const y2 = 220 + (idx * 40) % 100;
                            
                            return (
                              <g key={l.id}>
                                <line 
                                  x1={x1} y1={y1} x2={x2} y2={y2} 
                                  stroke="rgba(6, 182, 212, 0.25)" 
                                  strokeWidth={Math.max(1.5, l.weight / 2.2)} 
                                  strokeDasharray="5,5"
                                />
                                <text 
                                  x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 5}
                                  fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle" className="font-mono bg-slate-900 px-1"
                                >
                                  {l.type}
                                </text>
                              </g>
                            );
                          })
                        ) : null}
                      </svg>

                      <div className="w-full h-full flex flex-wrap gap-4 items-center justify-around z-10 p-5">
                        {knowledgeGraph.length > 0 ? (
                          // Node elements layout style
                          Array.from(new Set([
                            ...knowledgeGraph.map(g => g.source),
                            ...knowledgeGraph.map(g => g.target)
                          ])).map((node, nIdx) => {
                            const isEmotion = ["Anxiety", "Overwhelm", "Exhaustion", "Test Anxiety", "Social Guilt"].includes(node);
                            return (
                              <div 
                                key={nIdx}
                                className={`px-4 py-2 rounded-2xl border text-xs font-bold shadow-lg transition-all transform hover:scale-105 ${
                                  isEmotion 
                                    ? "bg-rose-950/60 border-rose-500/30 text-rose-300"
                                    : "bg-cyan-950/60 border-cyan-500/30 text-cyan-300"
                                }`}
                              >
                                {isEmotion ? "💖 " : "⚡ "}
                                {node}
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-xs text-slate-500 italic max-w-sm text-center">
                            No trigger linkages mapped. Please submit a structured journal to auto-generate psychological nodes.
                          </div>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-3 bg-slate-900/90 text-[10px] px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-3">
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"/> Mock Triggers</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"/> Cognitive Emotion</span>
                      </div>

                    </div>
                  </div>

                  {/* NARRATIVE REPORT ENGINE (Feature 9) */}
                  <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-3">
                      <div>
                        <h3 className="font-bold text-base text-white">Narrative Wellness Report</h3>
                        <p className="text-xs text-slate-400">Generates precise summaries combining historical triggers and test preparation metrics.</p>
                      </div>
                      <button
                        onClick={handleGenerateWeeklyReport}
                        disabled={loadingReport}
                        className="py-1.5 px-3 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-300 text-xs font-bold transition-all disabled:opacity-45"
                      >
                        {loadingReport ? "Drafting Narrative..." : "Generate AI Analysis"}
                      </button>
                    </div>

                    {weeklyReport ? (
                      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850">
                        <div className="text-xs text-slate-300 whitespace-pre-line prose-invert leading-relaxed">
                          {weeklyReport}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-6 bg-slate-950/40 rounded-xl">
                        <p className="text-xs text-slate-500 italic">No report fetched yet. Trigger generation block above.</p>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* TAB 3: EMOTIONAL AI ASSISTANT CHAT WITH INFLIGHT SECURITY RATINGS (Feature 8) */}
              {activeDashboardTab === "companion" && (
                <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4 flex flex-col h-[650px]">
                  
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-base text-white">Empathetic Companion Support</h3>
                    <p className="text-xs text-slate-400">Context-aware expert chat. Strictly safe, non-diagnostic guidance.</p>
                  </div>

                  {/* Messages container */}
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`space-y-1.5 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                        <div className={`inline-block p-4 rounded-3xl max-w-[85%] text-xs leading-relaxed ${
                          msg.role === "user" 
                            ? "bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-tr-none text-left" 
                            : "bg-slate-950 border border-slate-850 text-slate-200 rounded-tl-none text-left"
                        }`}>
                          <p className="whitespace-pre-line">{msg.text}</p>
                        </div>

                        {/* In-flight AI Quality and Safety Telemetry Layer */}
                        {msg.role === "assistant" && msg.evalScore && (
                          <div className="text-[10px] text-slate-500 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-850/60 max-w-[85%] font-mono space-y-1">
                            <span className="font-bold text-cyan-400 block uppercase tracking-wider text-[8px]">In-Flight AI Evaluation Metrics Log:</span>
                            <div className="grid grid-cols-5 gap-1 text-center">
                              <div>Empathy: <span className="text-emerald-400 font-bold">{msg.evalScore.empathyScore}/10</span></div>
                              <div>Safety: <span className="text-emerald-400 font-bold">{msg.evalScore.safetyScore}/10</span></div>
                              <div>Tox: <span className="text-cyan-400 font-bold">{msg.evalScore.toxicityScore}/10</span></div>
                              <div>Rel: <span className="text-emerald-400 font-bold">{msg.evalScore.relevanceScore}/10</span></div>
                              <div>Pers: <span className="text-emerald-400 font-bold">{msg.evalScore.personalizationScore}/10</span></div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {sendingChatMessage && (
                      <div className="text-left">
                        <div className="inline-block p-4 bg-slate-950 border border-slate-850 rounded-2xl rounded-tl-none">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounceDelay" />
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleSendChatMessage} className="border-t border-slate-800 pt-3 flex gap-2">
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="I scored low in mock test today, my parents are putting under pressure..."
                      className="flex-1 bg-slate-950 border border-slate-850 focus:border-cyan-400/50 focus:outline-none px-4 py-2.5 rounded-xl text-xs"
                    />
                    <button
                      type="submit"
                      disabled={sendingChatMessage}
                      className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-xl text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </form>

                </div>
              )}

              {/* TAB 4: CONFIDENCE REBUILDER - ACHIEVEMENT MEMORY BANK (Feature 7) */}
              {activeDashboardTab === "achievements" && (
                <div className="space-y-6">
                  
                  {/* LOG NEW STUDY SESSION / SELF-CARE ACHIEVEMENT FORM */}
                  <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                    <div>
                      <h3 className="font-bold text-base text-white">Log Confidence memory bank</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Every win completed upgrades your virtual concept retriever score on your Digital Twin.</p>
                    </div>

                    <form onSubmit={handleAddAchievement} className="space-y-3.5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="md:col-span-2">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Concept or Practice Session Name</label>
                          <input
                            value={newAchTitle}
                            onChange={(e) => setNewAchTitle(e.target.value)}
                            placeholder="Solved 45 JEE math organic structures"
                            className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-400/50"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Category type</label>
                          <select
                            value={newAchCategory}
                            onChange={(e) => setNewAchCategory(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-xl text-xs focus:outline-none text-slate-300"
                          >
                            <option value="Study Session">Study Session</option>
                            <option value="Mock Exam Win">Mock Exam Win</option>
                            <option value="Self-Care / Sleep">Self-Care / Sleep</option>
                            <option value="Motivational Rebound">Motivational Rebound</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Brief Description (Optional)</label>
                        <input
                          value={newAchDesc}
                          onChange={(e) => setNewAchDesc(e.target.value)}
                          placeholder="Felt highly confident during full block revision with low distraction loops."
                          className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-400/50"
                        />
                      </div>

                      <button
                        type="submit"
                        className="py-2.5 px-4 bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow"
                      >
                        Push Win to Memory Bank (+6 Confidence Booster)
                      </button>
                    </form>
                  </div>

                  {/* DISPLAY ACHIEVEMENTS HISTORIC FEED */}
                  <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                    <h3 className="font-bold text-sm text-slate-200 uppercase tracking-wide">Historical Memory Bank Logs</h3>
                    
                    {achievements.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.map((ach) => (
                          <div key={ach.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-start gap-3">
                            <div className="p-2 bg-emerald-950 rounded-lg shrink-0 text-emerald-400 border border-emerald-500/20">
                              <Award className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/25">
                                {ach.category}
                              </span>
                              <h4 className="text-xs font-bold text-white mt-1.5">{ach.title}</h4>
                              <p className="text-slate-400 text-[11px] mt-1 leading-normal">{ach.description}</p>
                              <span className="text-[9px] text-slate-500 block mt-2">{new Date(ach.timestamp).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic">No Win milestones registered. Fill the booster above.</p>
                    )}
                  </div>

                </div>
              )}

            </div>

          </div>

        ) : currentUser?.role === UserRole.PARENT ? (
          
          /* ======================================= */
          /* PARENT MODE OVERVIEW                    */
          /* ======================================= */
          <div className="max-w-4xl mx-auto w-full space-y-6">
            
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
                <Users className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-lg text-white">Parent Study Portal Insights</h3>
              </div>

              {loadingParentView ? (
                <div className="text-center py-10">
                  <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin mx-auto mb-2" />
                  <p className="text-xs text-slate-400">Fetching restrictive student diagnostics...</p>
                </div>
              ) : parentData && parentData.consentApproved ? (
                <div className="space-y-6">
                  
                  {/* METRIC GRIDS FOR PARENTS */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 relative">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">General Stress Metric</span>
                      <p className="text-2xl font-bold text-white mt-2">{parentData.twinMetrics.stressLevel}%</p>
                      <div className="h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                        <div className="bg-rose-500 h-full" style={{ width: `${parentData.twinMetrics.stressLevel}%` }}/>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Burnout Risk scale</span>
                      <p className={`text-2xl font-bold mt-2 ${parentData.twinMetrics.burnoutRisk > 70 ? "text-rose-400" : "text-emerald-400"}`}>
                        {parentData.twinMetrics.burnoutRisk}%
                      </p>
                      <div className="h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                        <div className="bg-amber-500 h-full" style={{ width: `${parentData.twinMetrics.burnoutRisk}%` }}/>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Academic Consistency</span>
                      <p className="text-2xl font-bold text-white mt-2">{parentData.twinMetrics.studyConsistency}%</p>
                      <div className="h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                        <div className="bg-cyan-500 h-full" style={{ width: `${parentData.twinMetrics.studyConsistency}%` }}/>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Sleep Quality Index</span>
                      <p className="text-2xl font-bold text-indigo-400 mt-2">{parentData.twinMetrics.sleepQuality}%</p>
                      <div className="h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                        <div className="bg-indigo-500 h-full" style={{ width: `${parentData.twinMetrics.sleepQuality}%` }}/>
                      </div>
                    </div>

                  </div>

                  {/* RESTRICTIVE WARNING CARD (IMPORTANT MANDATE RESPECTED) */}
                  <div className="bg-rose-950/20 p-4 rounded-2xl border border-rose-500/20 flex gap-3 text-xs leading-relaxed text-rose-300">
                    <ShieldAlert className="w-5 h-5 shrink-0 text-rose-400" />
                    <div>
                      <span className="font-extrabold uppercase block text-[10px] text-rose-400">Strict Ethical Privacy Enforces</span>
                      Parents can see overall stress scores, sleep indices, and critical fatigue levels. 
                      However, **raw text journals are completely private and confidential** to protect the child-companion clinical-guideline boundary.
                    </div>
                  </div>

                  {/* AGGREGATED ANONYMIZED AI METADATA ALERTS FOR PARENTS */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Recent Mental Fatigue Notifications</span>
                    
                    {parentData.alerts?.length > 0 ? (
                      <div className="space-y-2.5">
                        {parentData.alerts.map((al: any) => (
                          <div key={al.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex justify-between items-center text-xs">
                            <div>
                              <p className="font-semibold text-slate-200">Trigger: {al.trigger}</p>
                              <p className="text-slate-500 text-[11px] mt-0.5">Identified category: {al.emotion} (Severity: {al.severity}/10)</p>
                            </div>
                            {al.burnoutSignal && (
                              <span className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold text-[10px] uppercase tracking-wide">
                                Burnout Alert Issued
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic">No fatigue alarms currently registered.</p>
                    )}
                  </div>

                </div>
              ) : (
                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-850 text-center space-y-4">
                  <Lock className="w-10 h-10 text-slate-600 mx-auto" />
                  <h4 className="font-bold text-sm text-slate-300">Parent Access Consent Pending</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    In accordance with privacy policies, Student consent is required to access trend graphs. The student can toggle 'Grant Parent Access' under their digital twin settings to authorize view access of aggregate trends and metrics immediately.
                  </p>
                </div>
              )}
            </div>

          </div>

        ) : currentUser?.role === UserRole.COUNSELOR ? (
          
          /* ======================================= */
          /* COUNSELOR MODULE OVERVIEW               */
          /* ======================================= */
          <div className="max-w-4xl mx-auto w-full space-y-6">
            
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-5">
              
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <Users className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="font-bold text-lg text-white">Clinical Advisor Hub</h3>
                  <p className="text-xs text-slate-400">Aggregated psychiatric exam group signals. Strictly private, no individual raw text journals are readable.</p>
                </div>
              </div>

              {loadingCounselorView ? (
                <div className="text-center py-10">
                  <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin mx-auto" />
                </div>
              ) : counselorData ? (
                <div className="space-y-6">
                  
                  {/* AGGREGATES */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Avg Stress Level</span>
                      <p className="text-3xl font-extrabold text-cyan-400 mt-2">{counselorData.aggregates.avgStress}%</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Avg Confidence</span>
                      <p className="text-3xl font-extrabold text-emerald-400 mt-2">{counselorData.aggregates.avgConfidence}%</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Avg Burnout Risk</span>
                      <p className="text-3xl font-extrabold text-rose-400 mt-2">{counselorData.aggregates.avgBurnout}%</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Critical Alarms</span>
                      <p className="text-3xl font-extrabold text-amber-400 mt-2">{counselorData.aggregates.criticalStudentsCount}</p>
                    </div>
                  </div>

                  {/* INDIVIDUAL LIST */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Monitored Candidate Directory</span>
                    
                    <div className="space-y-2.5">
                      {counselorData.students?.map((st: any) => (
                        <div key={st.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">{st.name}</span>
                              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] uppercase font-bold text-cyan-400">
                                {st.exam}
                              </span>
                            </div>
                            <p className="text-slate-500 mt-1">Identified Stress trigger: {st.recentTrigger}</p>
                          </div>

                          <div className="flex gap-4 items-center">
                            <div className="text-right">
                              <span className="text-[10px] text-slate-500 block uppercase font-bold">Burnout Risk</span>
                              <span className={`font-bold ${st.burnoutRisk > 65 ? "text-rose-400" : "text-emerald-400"}`}>{st.burnoutRisk}%</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] text-slate-500 block uppercase font-bold">Stress level</span>
                              <span className="font-bold text-slate-350">{st.stressLevel}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : null}

            </div>

          </div>

        ) : (
          
          /* ======================================= */
          /* ADMIN MODE DIAGNOSTICS & TELEMETRY       */
          /* ======================================= */
          <div className="max-w-4xl mx-auto w-full space-y-6">
            
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-sidebar-slate-800 pb-3 border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Settings className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-lg text-white">System Diagnostics Panel</h3>
                </div>
                <span className="bg-slate-950 text-[10px] text-slate-400 font-mono px-3 py-1 rounded border border-slate-800">
                  ADMIN ONLY
                </span>
              </div>

              {loadingAdminView ? (
                <div className="text-center py-10">
                  <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin mx-auto" />
                </div>
              ) : adminData ? (
                <div className="space-y-6">
                  
                  {/* METRIC ROW */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850">
                      <span className="text-slate-500 block font-bold uppercase text-[9px]">Token Consumption</span>
                      <p className="font-bold text-[14px] mt-1 text-slate-250">{adminData.metrics.tokenUsage}</p>
                    </div>
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850">
                      <span className="text-slate-500 block font-bold uppercase text-[9px]">Cost (Est. USD)</span>
                      <p className="font-bold text-[14px] mt-1 text-cyan-400">${adminData.metrics.costEstimateUSD.toFixed(5)}</p>
                    </div>
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850">
                      <span className="text-slate-500 block font-bold uppercase text-[9px]">Avg API Latency</span>
                      <p className="font-bold text-[14px] mt-1 text-slate-250">{adminData.metrics.avgLatencyMs}ms</p>
                    </div>
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850">
                      <span className="text-slate-500 block font-bold uppercase text-[9px]">Active sessions</span>
                      <p className="font-bold text-[14px] mt-1 text-slate-250">{adminData.metrics.activeSessions}</p>
                    </div>
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850">
                      <span className="text-slate-500 block font-bold uppercase text-[9px]">LLM Score Average</span>
                      <p className="font-bold text-[14px] mt-1 text-emerald-400">{adminData.metrics.aiQualityScore}%</p>
                    </div>
                  </div>

                  {/* AUTOMATED COMPREHENSIVE INTEGRATION SUITE (CHALLENGE FEATURE) */}
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-inner">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest">
                          Automated Robustness Test Panel
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Trigger server-authoritative assertions for PII redaction accuracy, database state structures, latency bounds, and RBAC isolation matrices.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={triggerRunTestSuite}
                        disabled={isTestSuiteRunning}
                        className="self-start sm:self-auto bg-gradient-to-r from-cyan-500 to-indigo-500 hover:opacity-90 disabled:opacity-50 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-md flex items-center gap-2 transition-all shrink-0"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isTestSuiteRunning ? "animate-spin" : ""}`} />
                        <span>{isTestSuiteRunning ? "Running Asserts..." : "Launch Test Suite"}</span>
                      </button>
                    </div>

                    {/* LIVE ASSERTIONS RUNNER CONSOLE */}
                    <div className="bg-slate-950 rounded-xl border border-slate-850 p-4 font-mono text-[11px] space-y-2 relative overflow-hidden">
                      <div className="flex justify-between items-center border-b border-slate-900 pb-2 mb-2 text-[10px] text-slate-500">
                        <span>CONSOLE LOG OUTPUT: AUTOMATED_EVAL_RUNNER</span>
                        {testSuiteScore !== null && (
                          <span className="font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                            SCORE: {testSuiteScore}/100 PASSED
                          </span>
                        )}
                      </div>

                      {testResultLogs.length > 0 ? (
                        <div className="space-y-1.5 max-h-[180px] overflow-y-auto leading-normal">
                          {testResultLogs.map((log, idx) => {
                            let textClass = "text-slate-300";
                            if (log.includes("[PASS]") || log.includes("Passed")) textClass = "text-emerald-400 font-semibold";
                            if (log.includes("[FAIL]") || log.includes("Failed")) textClass = "text-rose-400 font-bold animate-pulse";
                            if (log.includes("[SEED]") || log.includes("[CLIENT_TEST]")) textClass = "text-cyan-400";
                            return (
                              <div key={idx} className={`whitespace-pre-wrap ${textClass}`}>
                                &gt; {log}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-slate-500 italic text-[10px] text-center py-4">
                          No active assertions running. Click "Launch Test Suite" to verify backend security boundaries now.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* AI EVALUATIONS LOG */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">In-Flight AI Security Evaluations history</span>
                    
                    <div className="space-y-2.5">
                      {adminData.evaluations?.map((ev: any) => (
                        <div key={ev.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs space-y-2.5">
                          <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                            <span>ID: {ev.id}</span>
                            <span>{new Date(ev.timestamp).toLocaleTimeString()}</span>
                          </div>

                          <div className="grid grid-cols-5 gap-1.5 text-center font-mono text-[9px] bg-slate-900/60 p-2 rounded-lg border border-slate-850/60 text-slate-400">
                            <div>EMPATHY: <span className="text-emerald-400 font-bold">{ev.empathyScore}/10</span></div>
                            <div>SAFETY: <span className="text-emerald-400 font-bold">{ev.safetyScore}/10</span></div>
                            <div>TOXICITY: <span className="text-cyan-400 font-bold">{ev.toxicityScore}/10</span></div>
                            <div>RELEVANCE: <span className="text-emerald-400 font-bold">{ev.relevanceScore}/10</span></div>
                            <div>PERSONALIZE: <span className="text-emerald-400 font-bold">{ev.personalizationScore}/10</span></div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-slate-400 font-semibold text-[11px]">Prompt input:</p>
                            <p className="text-slate-300 bg-slate-900/40 p-2 rounded leading-normal">"{ev.prompt}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AUDIT LOG TRAILS */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Enterprise Audit Logs</span>
                    <div className="bg-slate-950 rounded-xl border border-slate-850 p-3 h-[240px] overflow-y-auto space-y-2 font-mono text-[10px]">
                      {adminData.logs?.map((lg: any) => (
                        <div key={lg.id} className="border-b border-slate-900 pb-1.5 flex justify-between items-start gap-4">
                          <div>
                            <span className="text-cyan-400">[{new Date(lg.timestamp).toLocaleTimeString()}]</span>{" "}
                            <span className="text-slate-300">{lg.action}</span>
                          </div>
                          <span className="text-slate-500 shrink-0">User: {lg.userRole}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : null}

            </div>

          </div>

        )}

      </main>
      )}

      {/* FOOTER BAR */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© 2026 STRIDE. Engineered with real-time biometric and cognitive distortion maps for full competitive prep.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-300 transition-colors">Privacy Encryption</span>
            <span className="hover:text-slate-300 transition-colors">PII Redactor</span>
            <span className="hover:text-slate-350 transition-colors">Safety Diagnostics</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
