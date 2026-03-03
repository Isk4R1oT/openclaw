import { Type } from "@sinclair/typebox";
import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import {
  loadData,
  saveData,
  ensureDirs,
  getToday,
  generateId,
  writeSessionLog,
  updateDailyStats,
} from "./storage.js";

function getDataDir(api: OpenClawPluginApi): string {
  const cfg = api.pluginConfig as Record<string, unknown> | undefined;
  return (cfg?.dataDir as string) || "~/.mentor";
}

function getDailyGoal(api: OpenClawPluginApi): number {
  const cfg = api.pluginConfig as Record<string, unknown> | undefined;
  return (cfg?.dailyGoalMinutes as number) || 120;
}

export function createSessionStartTool(api: OpenClawPluginApi) {
  const dataDir = getDataDir(api);
  return {
    name: "study_session_start",
    label: "Start Study Session",
    description:
      "Start a new study session. Call this at the beginning of every mentoring session to track time.",
    parameters: Type.Object({
      topics: Type.Optional(
        Type.Array(Type.String(), { description: "Initial topics for this session" }),
      ),
    }),
    async execute(_toolCallId: string, params: { topics?: string[] }) {
      ensureDirs(dataDir);
      const data = loadData(dataDir);

      // Check for active session
      const active = data.sessions.find((s) => s.status === "active");
      if (active) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Session ${active.id} is already active (started at ${active.startTime}). End it first or use study_session_status to check.`,
            },
          ],
        };
      }

      const session = {
        id: generateId(),
        date: getToday(),
        startTime: new Date().toISOString(),
        durationMinutes: 0,
        topics: params.topics || [],
        notes: "",
        status: "active" as const,
      };

      data.sessions.push(session);
      data.settings.dailyGoalMinutes = getDailyGoal(api);
      data.settings.dataDir = dataDir;
      updateDailyStats(data);
      saveData(dataDir, data);
      writeSessionLog(dataDir, session);

      const todayMinutes = data.dailyStats.find((ds) => ds.date === getToday())?.totalMinutes || 0;
      const goalMin = data.settings.dailyGoalMinutes;
      const remaining = Math.max(0, goalMin - todayMinutes);

      return {
        content: [
          {
            type: "text" as const,
            text: `Session started! ID: ${session.id}\nToday so far: ${todayMinutes} min / ${goalMin} min goal\nRemaining: ${remaining} min\nStreak: ${data.currentStreak} days (best: ${data.longestStreak})\nTotal study hours: ${data.totalHours.toFixed(1)}h`,
          },
        ],
      };
    },
  };
}

export function createSessionEndTool(api: OpenClawPluginApi) {
  const dataDir = getDataDir(api);
  return {
    name: "study_session_end",
    label: "End Study Session",
    description: "End the current study session. Logs time and topics covered.",
    parameters: Type.Object({
      notes: Type.Optional(Type.String({ description: "Session summary notes" })),
      topics: Type.Optional(
        Type.Array(Type.String(), { description: "Topics covered in session" }),
      ),
    }),
    async execute(_toolCallId: string, params: { notes?: string; topics?: string[] }) {
      const data = loadData(dataDir);
      const active = data.sessions.find((s) => s.status === "active");

      if (!active) {
        return {
          content: [{ type: "text" as const, text: "No active session to end." }],
        };
      }

      active.endTime = new Date().toISOString();
      active.status = "completed";
      active.durationMinutes = Math.round(
        (new Date(active.endTime).getTime() - new Date(active.startTime).getTime()) / 60000,
      );
      if (params.notes) active.notes = params.notes;
      if (params.topics) active.topics = [...new Set([...active.topics, ...params.topics])];

      updateDailyStats(data);
      saveData(dataDir, data);
      writeSessionLog(dataDir, active);

      const todayStats = data.dailyStats.find((ds) => ds.date === getToday());
      const goalMet =
        todayStats && todayStats.totalMinutes >= data.settings.dailyGoalMinutes
          ? "GOAL REACHED!"
          : `${data.settings.dailyGoalMinutes - (todayStats?.totalMinutes || 0)} min remaining to daily goal`;

      return {
        content: [
          {
            type: "text" as const,
            text: `Session ended!\nDuration: ${active.durationMinutes} min\nTopics: ${active.topics.join(", ")}\nToday total: ${todayStats?.totalMinutes || 0} min — ${goalMet}\nStreak: ${data.currentStreak} days`,
          },
        ],
      };
    },
  };
}

export function createSessionStatusTool(api: OpenClawPluginApi) {
  const dataDir = getDataDir(api);
  return {
    name: "study_session_status",
    label: "Study Status",
    description:
      "Get current study status: active session, today's progress, streak, and pending assignments.",
    parameters: Type.Object({}),
    async execute() {
      const data = loadData(dataDir);
      const active = data.sessions.find((s) => s.status === "active");
      const todayStats = data.dailyStats.find((ds) => ds.date === getToday());
      const pendingAssignments = data.assignments.filter(
        (a) => a.status === "pending" || a.status === "in_progress",
      );
      const overdue = pendingAssignments.filter(
        (a) => a.dueDate && a.dueDate < getToday(),
      );

      let activeInfo = "No active session.";
      if (active) {
        const elapsed = Math.round(
          (Date.now() - new Date(active.startTime).getTime()) / 60000,
        );
        activeInfo = `Active session: ${elapsed} min elapsed, topics: ${active.topics.join(", ") || "none"}`;
      }

      const todayMin = todayStats?.totalMinutes || 0;
      const goalMin = data.settings.dailyGoalMinutes;
      const pct = Math.round((todayMin / goalMin) * 100);

      // Week stats
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const weekStr = weekAgo.toISOString().split("T")[0];
      const weekStats = data.dailyStats.filter((ds) => ds.date >= weekStr);
      const weekTotal = weekStats.reduce((s, d) => s + d.totalMinutes, 0);

      return {
        content: [
          {
            type: "text" as const,
            text: `Study Status:\n${activeInfo}\n\nToday: ${todayMin}/${goalMin} min (${pct}%)\nThis week: ${(weekTotal / 60).toFixed(1)}h\nTotal: ${data.totalHours.toFixed(1)}h\nStreak: ${data.currentStreak} days (best: ${data.longestStreak})\n\nPending assignments: ${pendingAssignments.length}${overdue.length > 0 ? ` (${overdue.length} overdue!)` : ""}\nCompleted assignments: ${data.assignments.filter((a) => a.status === "graded").length}`,
          },
        ],
      };
    },
  };
}

export function createAssignmentCreateTool(api: OpenClawPluginApi) {
  const dataDir = getDataDir(api);
  return {
    name: "assignment_create",
    label: "Create Assignment",
    description: "Create a new study assignment for the student.",
    parameters: Type.Object({
      title: Type.String({ description: "Assignment title" }),
      type: Type.Union(
        [
          Type.Literal("conceptual"),
          Type.Literal("implementation"),
          Type.Literal("research"),
          Type.Literal("design"),
          Type.Literal("math"),
          Type.Literal("debug"),
        ],
        { description: "Assignment type" },
      ),
      difficulty: Type.Number({
        description: "Difficulty level 1-5",
        minimum: 1,
        maximum: 5,
      }),
      description: Type.String({ description: "Full assignment description and requirements" }),
      dueDate: Type.Optional(
        Type.String({ description: "Due date in YYYY-MM-DD format" }),
      ),
      relatedTopics: Type.Optional(
        Type.Array(Type.String(), { description: "Related topics/concepts" }),
      ),
    }),
    async execute(
      _toolCallId: string,
      params: {
        title: string;
        type: string;
        difficulty: number;
        description: string;
        dueDate?: string;
        relatedTopics?: string[];
      },
    ) {
      const data = loadData(dataDir);
      const assignment = {
        id: generateId(),
        title: params.title,
        type: params.type as Assignment["type"],
        difficulty: params.difficulty as Assignment["difficulty"],
        description: params.description,
        createdAt: new Date().toISOString(),
        dueDate: params.dueDate,
        status: "pending" as const,
        relatedTopics: params.relatedTopics || [],
      };

      data.assignments.push(assignment);
      saveData(dataDir, data);

      return {
        content: [
          {
            type: "text" as const,
            text: `Assignment created!\nID: ${assignment.id}\nTitle: ${assignment.title}\nType: ${assignment.type} | Difficulty: ${"★".repeat(assignment.difficulty)}${"☆".repeat(5 - assignment.difficulty)}\n${assignment.dueDate ? `Due: ${assignment.dueDate}` : "No deadline"}\nTopics: ${assignment.relatedTopics.join(", ") || "—"}`,
          },
        ],
      };
    },
  };
}

type Assignment = import("./types.js").Assignment;

export function createAssignmentGradeTool(api: OpenClawPluginApi) {
  const dataDir = getDataDir(api);
  return {
    name: "assignment_grade",
    label: "Grade Assignment",
    description: "Grade a submitted assignment. Provide scores for correctness, depth, and clarity.",
    parameters: Type.Object({
      assignmentId: Type.String({ description: "Assignment ID to grade" }),
      correctness: Type.Number({ description: "Correctness score 1-5", minimum: 1, maximum: 5 }),
      depth: Type.Number({ description: "Depth of understanding 1-5", minimum: 1, maximum: 5 }),
      clarity: Type.Number({ description: "Clarity of explanation 1-5", minimum: 1, maximum: 5 }),
      feedback: Type.String({ description: "Detailed feedback on the submission" }),
    }),
    async execute(
      _toolCallId: string,
      params: {
        assignmentId: string;
        correctness: number;
        depth: number;
        clarity: number;
        feedback: string;
      },
    ) {
      const data = loadData(dataDir);
      const assignment = data.assignments.find((a) => a.id === params.assignmentId);

      if (!assignment) {
        return {
          content: [{ type: "text" as const, text: `Assignment ${params.assignmentId} not found.` }],
        };
      }

      assignment.status = "graded";
      assignment.completedAt = new Date().toISOString();
      assignment.grade = {
        correctness: params.correctness,
        depth: params.depth,
        clarity: params.clarity,
        feedback: params.feedback,
      };

      updateDailyStats(data);
      saveData(dataDir, data);

      const avg = ((params.correctness + params.depth + params.clarity) / 3).toFixed(1);

      return {
        content: [
          {
            type: "text" as const,
            text: `Assignment graded!\nTitle: ${assignment.title}\nCorrectness: ${params.correctness}/5 | Depth: ${params.depth}/5 | Clarity: ${params.clarity}/5\nAverage: ${avg}/5\nFeedback: ${params.feedback}`,
          },
        ],
      };
    },
  };
}

export function createAssignmentListTool(api: OpenClawPluginApi) {
  const dataDir = getDataDir(api);
  return {
    name: "assignment_list",
    label: "List Assignments",
    description: "List assignments with optional status filter.",
    parameters: Type.Object({
      status: Type.Optional(
        Type.Union(
          [
            Type.Literal("pending"),
            Type.Literal("in_progress"),
            Type.Literal("submitted"),
            Type.Literal("graded"),
            Type.Literal("all"),
          ],
          { description: "Filter by status (default: pending)" },
        ),
      ),
      limit: Type.Optional(Type.Number({ description: "Max results (default: 10)" })),
    }),
    async execute(
      _toolCallId: string,
      params: { status?: string; limit?: number },
    ) {
      const data = loadData(dataDir);
      const status = params.status || "pending";
      const limit = params.limit || 10;

      let filtered = data.assignments;
      if (status !== "all") {
        filtered = filtered.filter((a) => a.status === status);
      }
      filtered = filtered.slice(-limit);

      if (filtered.length === 0) {
        return {
          content: [{ type: "text" as const, text: `No ${status} assignments found.` }],
        };
      }

      const lines = filtered.map((a) => {
        const grade = a.grade
          ? ` | Grade: ${((a.grade.correctness + a.grade.depth + a.grade.clarity) / 3).toFixed(1)}/5`
          : "";
        const due = a.dueDate ? ` | Due: ${a.dueDate}` : "";
        const overdue = a.dueDate && a.dueDate < getToday() && a.status !== "graded" ? " ⚠ OVERDUE" : "";
        return `- [${a.status}] ${a.title} (${a.type}, L${a.difficulty})${due}${grade}${overdue}\n  ID: ${a.id}`;
      });

      return {
        content: [
          {
            type: "text" as const,
            text: `Assignments (${status}):\n${lines.join("\n")}`,
          },
        ],
      };
    },
  };
}

export function createStudyHistoryTool(api: OpenClawPluginApi) {
  const dataDir = getDataDir(api);
  return {
    name: "study_history",
    label: "Study History",
    description: "Get study history for a date range. Shows sessions, topics, and time spent.",
    parameters: Type.Object({
      days: Type.Optional(Type.Number({ description: "Number of days back (default: 7)" })),
    }),
    async execute(_toolCallId: string, params: { days?: number }) {
      const data = loadData(dataDir);
      const days = params.days || 7;
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      const cutoffStr = cutoff.toISOString().split("T")[0];

      const recentStats = data.dailyStats
        .filter((ds) => ds.date >= cutoffStr)
        .sort((a, b) => a.date.localeCompare(b.date));

      if (recentStats.length === 0) {
        return {
          content: [{ type: "text" as const, text: `No study data in the last ${days} days.` }],
        };
      }

      const totalMin = recentStats.reduce((s, d) => s + d.totalMinutes, 0);
      const avgMin = Math.round(totalMin / days);
      const daysStudied = recentStats.filter((d) => d.totalMinutes > 0).length;
      const allTopics = [...new Set(recentStats.flatMap((d) => d.topicsCovered))];

      const dayLines = recentStats.map((d) => {
        const bar = "█".repeat(Math.round(d.totalMinutes / 10));
        const goalMark = d.totalMinutes >= data.settings.dailyGoalMinutes ? " ✓" : "";
        return `${d.date}: ${d.totalMinutes} min ${bar}${goalMark}`;
      });

      return {
        content: [
          {
            type: "text" as const,
            text: `Study History (last ${days} days):\n${dayLines.join("\n")}\n\nTotal: ${(totalMin / 60).toFixed(1)}h | Avg: ${avgMin} min/day\nDays studied: ${daysStudied}/${days}\nTopics: ${allTopics.join(", ")}`,
          },
        ],
      };
    },
  };
}
