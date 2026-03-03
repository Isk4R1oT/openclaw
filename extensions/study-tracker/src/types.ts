export interface StudySession {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // ISO
  endTime?: string; // ISO
  durationMinutes: number;
  topics: string[];
  notes: string;
  status: "active" | "paused" | "completed";
}

export interface Assignment {
  id: string;
  title: string;
  type: "conceptual" | "implementation" | "research" | "design" | "math" | "debug";
  difficulty: 1 | 2 | 3 | 4 | 5;
  description: string;
  createdAt: string;
  dueDate?: string;
  completedAt?: string;
  status: "pending" | "in_progress" | "submitted" | "graded";
  grade?: {
    correctness: number; // 1-5
    depth: number; // 1-5
    clarity: number; // 1-5
    feedback: string;
  };
  submission?: string;
  relatedTopics: string[];
}

export interface DailyStats {
  date: string;
  totalMinutes: number;
  sessionsCount: number;
  topicsCovered: string[];
  assignmentsCompleted: number;
  streakDay: number;
}

export interface StudyTrackerData {
  sessions: StudySession[];
  assignments: Assignment[];
  dailyStats: DailyStats[];
  currentStreak: number;
  longestStreak: number;
  totalHours: number;
  settings: {
    dailyGoalMinutes: number;
    dataDir: string;
  };
}
