import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import type { StudyTrackerData, StudySession, Assignment, DailyStats } from "./types.js";

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

export function updateDailyStats(data: StudyTrackerData): void {
  const today = getToday();
  const todaySessions = data.sessions.filter((s) => s.date === today);
  const totalMinutes = todaySessions.reduce((sum, s) => sum + s.durationMinutes, 0);
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
      (ds) => ds.date === yesterdayStr && ds.totalMinutes >= data.settings.dailyGoalMinutes,
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
  data.totalHours = data.sessions.reduce((sum, s) => sum + s.durationMinutes, 0) / 60;
  if (totalMinutes >= data.settings.dailyGoalMinutes) {
    data.currentStreak = existing.streakDay;
    if (data.currentStreak > data.longestStreak) {
      data.longestStreak = data.currentStreak;
    }
  }
}
