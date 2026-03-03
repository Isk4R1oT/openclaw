import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import type { CurriculumData, KnowledgeGraph } from "./types.js";

function resolve(dataDir: string): string {
  return dataDir.replace("~", homedir());
}

function getPath(dataDir: string): string {
  return join(resolve(dataDir), "curriculum-data.json");
}

function defaultData(): CurriculumData {
  return {
    topics: [],
    knowledgeGraph: { concepts: {}, lastUpdated: new Date().toISOString() },
    flashcards: [],
    readingQueue: [],
  };
}

export function loadCurriculum(dataDir: string): CurriculumData {
  const path = getPath(dataDir);
  if (!existsSync(path)) return defaultData();
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as CurriculumData;
  } catch {
    return defaultData();
  }
}

export function saveCurriculum(dataDir: string, data: CurriculumData): void {
  const path = getPath(dataDir);
  const dir = dirname(path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  data.knowledgeGraph.lastUpdated = new Date().toISOString();
  writeFileSync(path, JSON.stringify(data, null, 2), "utf-8");
}

export function writeKnowledgeGraphMd(dataDir: string, kg: KnowledgeGraph): void {
  const resolved = resolve(dataDir);
  const path = join(resolved, "knowledge-graph.md");
  const dir = dirname(path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const concepts = Object.values(kg.concepts);
  const mastered = concepts.filter((c) => c.status === "mastered");
  const learning = concepts.filter((c) => c.status === "learning");
  const notStarted = concepts.filter((c) => c.status === "not_started");

  const lines = [
    "# Knowledge Graph",
    `Updated: ${kg.lastUpdated}`,
    `Total concepts: ${concepts.length} | Mastered: ${mastered.length} | Learning: ${learning.length} | Not started: ${notStarted.length}`,
    "",
    "## Mastered",
    ...mastered.map((c) => `- **${c.name}** (discussed ${c.timesDiscussed}x, related: ${c.relatedConcepts.join(", ")})`),
    "",
    "## Learning",
    ...learning.map((c) => `- **${c.name}** (discussed ${c.timesDiscussed}x, last: ${c.lastReviewed || "—"})`),
    "",
    "## Not Started",
    ...notStarted.map((c) => `- ${c.name} (prereqs: ${c.prerequisites.join(", ") || "none"})`),
  ];

  writeFileSync(path, lines.join("\n"), "utf-8");
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
