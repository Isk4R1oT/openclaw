import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import type {
  StudyTrackerData,
  StudySession,
  Assignment,
  DailyStats,
} from "./types.js";

function resolveDataDir(dataDir: string): string {
  return dataDir.replace("~", homedir());
}

function getDataPath(dataDir: string): string {
  const resolved = resolveDataDir(dataDir);
  return join(resolved, "tracker-data.json");
}

function defaultData(dataDir: string): StudyTrackerData {
  return {
    sessions: [],
    assignments: [],
    dailyStats: [],
    currentStreak: 0,
    longestStreak: 0,
    totalHours: 0,
    settings: {
      dailyGoalMinutes: 120,
      dataDir,
    },
  };
}

export function loadData(dataDir: string): StudyTrackerData {
  const path = getDataPath(dataDir);
  if (!existsSync(path)) {
    return defaultData(dataDir);
  }
  try {
    const raw = readFileSync(path, "utf-8");
    return JSON.parse(raw) as StudyTrackerData;
  } catch {
    return defaultData(dataDir);
  }
}

export function saveData(dataDir: string, data: StudyTrackerData): void {
  const path = getDataPath(dataDir);
  const dir = dirname(path);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(path, JSON.stringify(data, null, 2), "utf-8");
}

export function ensureDirs(dataDir: string): void {
  const resolved = resolveDataDir(dataDir);
  const dirs = [
    resolved,
    join(resolved, "sessions"),
    join(resolved, "assignments"),
    join(resolved, "papers"),
    join(resolved, "reviews"),
    join(resolved, "reviews/weekly"),
    join(resolved, "reviews/monthly"),
    join(resolved, "experiments"),
    join(resolved, "lit-reviews"),
  ];
  for (const d of dirs) {
    if (!existsSync(d)) {
      mkdirSync(d, { recursive: true });
    }
  }
}

export function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function writeSessionLog(dataDir: string, session: StudySession): void {
  const resolved = resolveDataDir(dataDir);
  const logPath = join(resolved, "sessions", `${session.date}.md`);
  const entry = `\n## Session ${session.id} (${new Date(session.startTime).toLocaleTimeString()} - ${session.endTime ? new Date(session.endTime).toLocaleTimeString() : "ongoing"})\n- Duration: ${session.durationMinutes} min\n- Topics: ${session.topics.join(", ") || "none yet"}\n- Notes: ${session.notes || "—"}\n`;

  const dir = dirname(logPath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  let content = "";
  if (existsSync(logPath)) {
    content = readFileSync(logPath, "utf-8");
  } else {
    content = `# Study Session Log — ${session.date}\n`;
  }
  content += entry;
  writeFileSync(logPath, content, "utf-8");
}

export function writeAssignmentMd(
  dataDir: string,
  assignment: Assignment,
): void {
  const resolved = resolveDataDir(dataDir);
  const dir = join(resolved, "assignments");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const gradePart = assignment.grade
    ? `\n## Grade\n- Correctness: ${assignment.grade.correctness}/5\n- Depth: ${assignment.grade.depth}/5\n- Clarity: ${assignment.grade.clarity}/5\n- Average: ${((assignment.grade.correctness + assignment.grade.depth + assignment.grade.clarity) / 3).toFixed(1)}/5\n\n### Feedback\n${assignment.grade.feedback}\n`
    : "";

  const submissionPart = assignment.submission
    ? `\n## Submission\n${assignment.submission}\n`
    : "";

  const content = `# Assignment: ${assignment.title}
- ID: ${assignment.id}
- Type: ${assignment.type}
- Difficulty: ${"★".repeat(assignment.difficulty)}${"☆".repeat(5 - assignment.difficulty)}
- Status: ${assignment.status}
- Created: ${assignment.createdAt}
- Due: ${assignment.dueDate || "no deadline"}
- Completed: ${assignment.completedAt || "—"}
- Topics: ${assignment.relatedTopics.join(", ") || "none"}

## Description
${assignment.description}
${submissionPart}${gradePart}`;

  writeFileSync(join(dir, `${assignment.id}.md`), content, "utf-8");
}

export function writeStatsMd(dataDir: string, data: StudyTrackerData): void {
  const resolved = resolveDataDir(dataDir);
  const path = join(resolved, "stats.md");

  const graded = data.assignments.filter((a) => a.status === "graded");
  const avgGrade =
    graded.length > 0
      ? (
          graded.reduce((s, a) => {
            const g = a.grade!;
            return s + (g.correctness + g.depth + g.clarity) / 3;
          }, 0) / graded.length
        ).toFixed(1)
      : "—";

  // Weekly breakdown
  const last7 = data.dailyStats.slice(-7);
  const weekLines = last7.map((d) => {
    const bar = "█".repeat(Math.round(d.totalMinutes / 10));
    return `| ${d.date} | ${d.totalMinutes} min | ${d.sessionsCount} | ${d.topicsCovered.join(", ") || "—"} | ${bar} |`;
  });

  const content = `# Study Statistics
Updated: ${new Date().toISOString()}

## Overview
- Total study time: **${data.totalHours.toFixed(1)} hours**
- Total sessions: **${data.sessions.length}**
- Current streak: **${data.currentStreak} days**
- Longest streak: **${data.longestStreak} days**
- Daily goal: ${data.settings.dailyGoalMinutes} min

## Assignments
- Total: ${data.assignments.length}
- Pending: ${data.assignments.filter((a) => a.status === "pending").length}
- In Progress: ${data.assignments.filter((a) => a.status === "in_progress").length}
- Graded: ${graded.length}
- Average grade: ${avgGrade}/5

## Last 7 Days
| Date | Time | Sessions | Topics | Progress |
|------|------|----------|--------|----------|
${weekLines.join("\n")}

## All Topics Covered
${
  [...new Set(data.sessions.flatMap((s) => s.topics))]
    .sort()
    .map((t) => `- ${t}`)
    .join("\n") || "none yet"
}
`;

  writeFileSync(path, content, "utf-8");
}

export function updateDailyStats(data: StudyTrackerData): void {
  const today = getToday();
  const todaySessions = data.sessions.filter((s) => s.date === today);
  const totalMinutes = todaySessions.reduce(
    (sum, s) => sum + s.durationMinutes,
    0,
  );
  const topics = [...new Set(todaySessions.flatMap((s) => s.topics))];
  const completedToday = data.assignments.filter(
    (a) => a.completedAt && a.completedAt.startsWith(today),
  ).length;

  let existing = data.dailyStats.find((ds) => ds.date === today);
  if (!existing) {
    // Calculate streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    const hadYesterday = data.dailyStats.some(
      (ds) =>
        ds.date === yesterdayStr &&
        ds.totalMinutes >= data.settings.dailyGoalMinutes,
    );
    const streakDay = hadYesterday ? data.currentStreak + 1 : 1;

    existing = {
      date: today,
      totalMinutes: 0,
      sessionsCount: 0,
      topicsCovered: [],
      assignmentsCompleted: 0,
      streakDay,
    };
    data.dailyStats.push(existing);
  }

  existing.totalMinutes = totalMinutes;
  existing.sessionsCount = todaySessions.length;
  existing.topicsCovered = topics;
  existing.assignmentsCompleted = completedToday;

  // Update global stats
  data.totalHours =
    data.sessions.reduce((sum, s) => sum + s.durationMinutes, 0) / 60;
  if (totalMinutes >= data.settings.dailyGoalMinutes) {
    data.currentStreak = existing.streakDay;
    if (data.currentStreak > data.longestStreak) {
      data.longestStreak = data.currentStreak;
    }
  }
}
