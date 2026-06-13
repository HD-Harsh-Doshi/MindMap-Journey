# STRIDE - Academic Mental Wellness Digital Twin

Tagline: *"Every Day Forward"*

---

## 🚀 Concept Overview
Students preparing for critical competitive examinations (e.g., **JEE, NEET, UPSC, CAT, CUET, GATE**) suffer severe academic pressure, sleep degradation, social comparison, and fear of failure. **STRIDE** tackles this issue not with static charts or generic questionnaires, but through a persistent **Academic Mental Wellness Digital Twin**.

The Digital Twin continuously maintains stress levels, confidence retainers, burnout alarms, sleep efficiency, and focus depth updated dynamically in response to deep daily journaling.

---

## 🎨 Creative Aesthetic Pairing
The system utilizes a custom **Cosmic Slate Dark Theme** designed for eye relaxation under low-light nighttime study cramps:
- **Display Headings**: Styled with premium variable tracking and high-contrast gradients.
- **Dynamic Hologram**: Glow indicator showing emotional stress labels and interactive physical breathing guides.
- **Modular Dashboard Columns**: Centering focused journaling tools, cognitive distortion reframers, and live in-flight AI safety logs.

---

## ⚙️ Core Technical Implementation Details

### 1. Unified Modular Front-end (`/src/App.tsx`)
- **Baseline Wellness Assessment Flow**: Onboarding form to dynamically generate baseline stress levels and competitive exam parameters.
- **AI Journal Intelligence**: Captures text or recorded speech, sanitizing PII dynamically prior to downstream processing.
- **Cognitive Distortion Detector**: Identifies catastrophizing, overgeneralization, and imposter markers with gentle reframing feedback.
- **Adaptive Guided Breathing Pacer**: Real-time breathing pacing circles adjusting with trigger states.
- **Trigger-Emotion Knowledge Graph**: Interactive SVG canvas plotting triggers (e.g. "Mock Tests") directly to emotive responses (e.g. "Anxiety").
- **Confidence Memory Bank**: Practice logs adding booster points directly to virtual twin confidence values.
- **Empathetic Companion Chat**: Interactive LLM support helper.
- **In-Flight AI Quality Logs**: Reveals actual Toxicity, Safety, and Empathy evaluations live on each AI message.

### 2. Multi-Role RBAC Express Server (`/server.ts`)
- **Student Persona**: Controls direct logs, visual maps, memory boards, and gives Parent consent.
- **Parent Persona**: Restricted view showing aggregate trends or burnout warnings while **withholding raw confidential journals** to protect the child.
- **Counselor Persona**: Monitored aggregate indices for group warning diagnostics.
- **Admin Persona**: Accesses core token usage stats, latencies, custom prompt catalogs, and live audit trails.

---

## ⚙️ Quick Start Guild

### Setup & Run locally
1. Install base dependencies:
   ```bash
   npm install
   ```
2. Configure `.env.example` values (e.g., Google `GEMINI_API_KEY` for real-time model synthesis).
3. Run Development backend:
   ```bash
   npm run dev
   ```
4. Build production static folders:
   ```bash
   npm run build
   ```
5. Production Server Launch:
   ```bash
   npm start
   ```

---

## 🔒 Security & PII Redactor
STRIDE automatically intercepts journal scripts to inspect and redact standard Indian telephone numbers, international emails, and names, ensuring private local-host diagnostic storage. Full enterprise audit logs are appended to the administrative panel on every role action.
