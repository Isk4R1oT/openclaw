export type ConceptStatus = "not_started" | "learning" | "mastered";

export interface Concept {
  name: string;
  status: ConceptStatus;
  firstSeen: string; // ISO date
  lastReviewed?: string;
  timesDiscussed: number;
  relatedConcepts: string[];
  sessions: string[]; // session IDs where discussed
  notes: string;
  prerequisites: string[];
}

export interface KnowledgeGraph {
  concepts: Record<string, Concept>;
  lastUpdated: string;
}

export interface CurriculumTopic {
  id: string;
  name: string;
  category: string;
  status: "not_started" | "in_progress" | "completed";
  prerequisites: string[];
  concepts: string[];
  resources: CurriculumResource[];
  startedAt?: string;
  completedAt?: string;
  notes: string;
}

export interface CurriculumResource {
  type: "paper" | "book" | "course" | "article" | "video";
  title: string;
  url?: string;
  status: "not_started" | "in_progress" | "completed";
  rating?: number;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  type: "qa" | "cloze" | "equation" | "comparison" | "why";
  concept: string;
  createdAt: string;
  nextReview: string;
  interval: number; // days
  easeFactor: number;
  repetitions: number;
  lastGrade?: number; // 0-5
}

export interface ReadingItem {
  id: string;
  title: string;
  url?: string;
  source: string;
  type: "paper" | "article" | "chapter";
  addedAt: string;
  status: "queued" | "reading" | "read" | "reviewed";
  priority: "high" | "medium" | "low";
  relatedTopics: string[];
  summary?: string;
}

export interface CurriculumData {
  topics: CurriculumTopic[];
  knowledgeGraph: KnowledgeGraph;
  flashcards: Flashcard[];
  readingQueue: ReadingItem[];
}
