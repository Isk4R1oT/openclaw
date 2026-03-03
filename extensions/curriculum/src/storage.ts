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

export function writeKnowledgeGraphMd(
  dataDir: string,
  kg: KnowledgeGraph,
): void {
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
    ...mastered.map(
      (c) =>
        `- **${c.name}** (discussed ${c.timesDiscussed}x, related: ${c.relatedConcepts.join(", ")})`,
    ),
    "",
    "## Learning",
    ...learning.map(
      (c) =>
        `- **${c.name}** (discussed ${c.timesDiscussed}x, last: ${c.lastReviewed || "—"})`,
    ),
    "",
    "## Not Started",
    ...notStarted.map(
      (c) => `- ${c.name} (prereqs: ${c.prerequisites.join(", ") || "none"})`,
    ),
  ];

  writeFileSync(path, lines.join("\n"), "utf-8");
}

export function writeConceptMd(
  dataDir: string,
  concept: import("./types.js").Concept,
): void {
  const resolved = resolve(dataDir);
  const dir = join(resolved, "concepts");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const safeName = concept.name
    .replace(/[^a-z0-9а-яё -]/gi, "")
    .replace(/\s+/g, "-");
  const path = join(dir, `${safeName}.md`);

  const content = `# ${concept.name}
Status: **${concept.status}**
First seen: ${concept.firstSeen}
Last reviewed: ${concept.lastReviewed || "—"}
Times discussed: ${concept.timesDiscussed}

## Related Concepts
${concept.relatedConcepts.map((c) => `- [[${c}]]`).join("\n") || "none"}

## Prerequisites
${concept.prerequisites.map((p) => `- [[${p}]]`).join("\n") || "none"}

## Sessions
${concept.sessions.map((s) => `- Session: ${s}`).join("\n") || "none yet"}

## Notes
${concept.notes || "No notes yet."}
`;

  writeFileSync(path, content, "utf-8");
}

export function writeCurriculumMd(
  dataDir: string,
  data: import("./types.js").CurriculumData,
): void {
  const resolved = resolve(dataDir);
  const path = join(resolved, "curriculum.md");

  const topics = data.topics;
  const categories = [...new Set(topics.map((t) => t.category))];

  const sections = categories.map((cat) => {
    const catTopics = topics.filter((t) => t.category === cat);
    const lines = catTopics.map((t) => {
      const status =
        t.status === "completed"
          ? "[x]"
          : t.status === "in_progress"
            ? "[-]"
            : "[ ]";
      const resources =
        t.resources.length > 0
          ? ` (${t.resources.filter((r) => r.status === "completed").length}/${t.resources.length} resources)`
          : "";
      return `- ${status} **${t.name}**${resources}\n  Concepts: ${t.concepts.join(", ") || "—"}`;
    });
    const completed = catTopics.filter((t) => t.status === "completed").length;
    return `## ${cat} (${completed}/${catTopics.length})\n${lines.join("\n")}`;
  });

  const content = `# Learning Curriculum
Updated: ${new Date().toISOString()}
Total topics: ${topics.length} | Completed: ${topics.filter((t) => t.status === "completed").length} | In progress: ${topics.filter((t) => t.status === "in_progress").length}

${sections.join("\n\n")}
`;

  writeFileSync(path, content, "utf-8");
}

export function writeFlashcardsMd(
  dataDir: string,
  flashcards: import("./types.js").Flashcard[],
): void {
  const resolved = resolve(dataDir);
  const path = join(resolved, "flashcards.md");
  const today = new Date().toISOString().split("T")[0];

  const due = flashcards.filter((f) => f.nextReview <= today);
  const concepts = [...new Set(flashcards.map((f) => f.concept))];

  const conceptStats = concepts.map((c) => {
    const cards = flashcards.filter((f) => f.concept === c);
    const dueCount = cards.filter((f) => f.nextReview <= today).length;
    const avgEase = (
      cards.reduce((s, f) => s + f.easeFactor, 0) / cards.length
    ).toFixed(2);
    return `| ${c} | ${cards.length} | ${dueCount} | ${avgEase} |`;
  });

  const content = `# Flashcards
Updated: ${new Date().toISOString()}
Total cards: ${flashcards.length} | Due today: ${due.length}

## By Concept
| Concept | Cards | Due | Avg Ease |
|---------|-------|-----|----------|
${conceptStats.join("\n")}

## Due Today
${
  due
    .slice(0, 20)
    .map(
      (f, i) =>
        `${i + 1}. [${f.type}] **${f.concept}**: ${f.front.slice(0, 80)}...`,
    )
    .join("\n") || "No cards due!"
}
`;

  writeFileSync(path, content, "utf-8");
}

export function writeReadingQueueMd(
  dataDir: string,
  queue: import("./types.js").ReadingItem[],
): void {
  const resolved = resolve(dataDir);
  const path = join(resolved, "reading-queue.md");

  const queued = queue.filter((r) => r.status === "queued");
  const reading = queue.filter((r) => r.status === "reading");
  const read = queue.filter(
    (r) => r.status === "read" || r.status === "reviewed",
  );

  const formatItem = (r: import("./types.js").ReadingItem) => {
    const url = r.url ? ` [link](${r.url})` : "";
    return `- **${r.title}** (${r.source}, ${r.type})${url}\n  Priority: ${r.priority} | Topics: ${r.relatedTopics.join(", ") || "—"}`;
  };

  const content = `# Reading Queue
Updated: ${new Date().toISOString()}
Total: ${queue.length} | Queued: ${queued.length} | Reading: ${reading.length} | Completed: ${read.length}

## Currently Reading
${reading.map(formatItem).join("\n") || "Nothing in progress"}

## Queue (by priority)
${
  queued
    .sort((a, b) => {
      const o = { high: 0, medium: 1, low: 2 };
      return o[a.priority] - o[b.priority];
    })
    .map(formatItem)
    .join("\n") || "Empty queue"
}

## Completed
${read.slice(-10).map(formatItem).join("\n") || "None yet"}
`;

  writeFileSync(path, content, "utf-8");
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
