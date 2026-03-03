import { Type } from "@sinclair/typebox";
import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import {
  loadCurriculum,
  saveCurriculum,
  writeKnowledgeGraphMd,
  writeConceptMd,
  writeCurriculumMd,
  writeFlashcardsMd,
  writeReadingQueueMd,
  generateId,
} from "./storage.js";
import type {
  Concept,
  Flashcard,
  ReadingItem,
  CurriculumTopic,
} from "./types.js";

function getDataDir(api: OpenClawPluginApi): string {
  const cfg = api.pluginConfig as Record<string, unknown> | undefined;
  return (cfg?.dataDir as string) || "~/.mentor";
}

// --- Knowledge Graph Tools ---

export function createConceptUpdateTool(api: OpenClawPluginApi) {
  const dataDir = getDataDir(api);
  return {
    name: "knowledge_update",
    label: "Update Knowledge Graph",
    description:
      "Add or update a concept in the knowledge graph. Call this whenever a new concept is discussed or a concept status changes.",
    parameters: Type.Object({
      name: Type.String({
        description: "Concept name (lowercase, e.g. 'attention mechanism')",
      }),
      status: Type.Optional(
        Type.Union([
          Type.Literal("not_started"),
          Type.Literal("learning"),
          Type.Literal("mastered"),
        ]),
      ),
      relatedConcepts: Type.Optional(Type.Array(Type.String())),
      prerequisites: Type.Optional(Type.Array(Type.String())),
      notes: Type.Optional(Type.String()),
      sessionId: Type.Optional(
        Type.String({ description: "Current session ID" }),
      ),
    }),
    async execute(
      _toolCallId: string,
      params: {
        name: string;
        status?: string;
        relatedConcepts?: string[];
        prerequisites?: string[];
        notes?: string;
        sessionId?: string;
      },
    ) {
      const data = loadCurriculum(dataDir);
      const kg = data.knowledgeGraph;
      const key = params.name.toLowerCase().trim();
      const existing = kg.concepts[key];

      if (existing) {
        existing.timesDiscussed++;
        existing.lastReviewed = new Date().toISOString();
        if (params.status) existing.status = params.status as Concept["status"];
        if (params.relatedConcepts) {
          existing.relatedConcepts = [
            ...new Set([
              ...existing.relatedConcepts,
              ...params.relatedConcepts,
            ]),
          ];
        }
        if (params.prerequisites) {
          existing.prerequisites = [
            ...new Set([...existing.prerequisites, ...params.prerequisites]),
          ];
        }
        if (params.notes) existing.notes = params.notes;
        if (params.sessionId) existing.sessions.push(params.sessionId);
      } else {
        kg.concepts[key] = {
          name: key,
          status: (params.status as Concept["status"]) || "learning",
          firstSeen: new Date().toISOString(),
          lastReviewed: new Date().toISOString(),
          timesDiscussed: 1,
          relatedConcepts: params.relatedConcepts || [],
          sessions: params.sessionId ? [params.sessionId] : [],
          notes: params.notes || "",
          prerequisites: params.prerequisites || [],
        };
      }

      saveCurriculum(dataDir, data);
      writeKnowledgeGraphMd(dataDir, kg);
      writeConceptMd(dataDir, kg.concepts[key]);

      const concept = kg.concepts[key];
      return {
        content: [
          {
            type: "text" as const,
            text: `Knowledge updated: "${key}"\nStatus: ${concept.status} | Discussed: ${concept.timesDiscussed}x\nRelated: ${concept.relatedConcepts.join(", ") || "—"}\nPrereqs: ${concept.prerequisites.join(", ") || "—"}`,
          },
        ],
      };
    },
  };
}

export function createConceptCheckTool(api: OpenClawPluginApi) {
  const dataDir = getDataDir(api);
  return {
    name: "knowledge_check",
    label: "Check Knowledge",
    description:
      "Check if a concept has been covered before and its current status. ALWAYS call this before explaining a concept to avoid repetition.",
    parameters: Type.Object({
      concepts: Type.Array(Type.String(), {
        description: "Concept names to check",
      }),
    }),
    async execute(_toolCallId: string, params: { concepts: string[] }) {
      const data = loadCurriculum(dataDir);
      const kg = data.knowledgeGraph;

      const results = params.concepts.map((name) => {
        const key = name.toLowerCase().trim();
        const concept = kg.concepts[key];
        if (!concept) {
          return `"${key}": NEW — not covered yet`;
        }
        return `"${key}": ${concept.status} (discussed ${concept.timesDiscussed}x, last: ${concept.lastReviewed || "never"}, related: ${concept.relatedConcepts.slice(0, 5).join(", ")})`;
      });

      return {
        content: [
          {
            type: "text" as const,
            text: `Knowledge check:\n${results.join("\n")}`,
          },
        ],
      };
    },
  };
}

export function createKnowledgeStatsTool(api: OpenClawPluginApi) {
  const dataDir = getDataDir(api);
  return {
    name: "knowledge_stats",
    label: "Knowledge Stats",
    description:
      "Get statistics about the knowledge graph: concept counts, coverage, gaps.",
    parameters: Type.Object({}),
    async execute() {
      const data = loadCurriculum(dataDir);
      const concepts = Object.values(data.knowledgeGraph.concepts);
      const mastered = concepts.filter((c) => c.status === "mastered").length;
      const learning = concepts.filter((c) => c.status === "learning").length;
      const notStarted = concepts.filter(
        (c) => c.status === "not_started",
      ).length;

      // Find most discussed
      const topDiscussed = [...concepts]
        .sort((a, b) => b.timesDiscussed - a.timesDiscussed)
        .slice(0, 5);

      // Find concepts with unmet prerequisites
      const gaps = concepts.filter((c) => {
        return c.prerequisites.some((p) => {
          const prereq = data.knowledgeGraph.concepts[p.toLowerCase()];
          return !prereq || prereq.status === "not_started";
        });
      });

      return {
        content: [
          {
            type: "text" as const,
            text: `Knowledge Graph Stats:\nTotal concepts: ${concepts.length}\nMastered: ${mastered} | Learning: ${learning} | Not started: ${notStarted}\n\nMost discussed:\n${topDiscussed.map((c) => `  - ${c.name}: ${c.timesDiscussed}x (${c.status})`).join("\n")}\n\nGaps (unmet prerequisites): ${gaps.length}\n${gaps
              .slice(0, 5)
              .map((c) => `  - ${c.name} needs: ${c.prerequisites.join(", ")}`)
              .join("\n")}`,
          },
        ],
      };
    },
  };
}

// --- Flashcard Tools ---

export function createFlashcardAddTool(api: OpenClawPluginApi) {
  const dataDir = getDataDir(api);
  return {
    name: "flashcard_add",
    label: "Add Flashcard",
    description:
      "Create a spaced-repetition flashcard. Auto-called after discussing concepts or reading papers.",
    parameters: Type.Object({
      front: Type.String({ description: "Question / prompt side" }),
      back: Type.String({ description: "Answer side" }),
      type: Type.Optional(
        Type.Union([
          Type.Literal("qa"),
          Type.Literal("cloze"),
          Type.Literal("equation"),
          Type.Literal("comparison"),
          Type.Literal("why"),
        ]),
      ),
      concept: Type.String({ description: "Related concept name" }),
    }),
    async execute(
      _toolCallId: string,
      params: { front: string; back: string; type?: string; concept: string },
    ) {
      const data = loadCurriculum(dataDir);
      const card: Flashcard = {
        id: generateId(),
        front: params.front,
        back: params.back,
        type: (params.type as Flashcard["type"]) || "qa",
        concept: params.concept.toLowerCase(),
        createdAt: new Date().toISOString(),
        nextReview: new Date().toISOString().split("T")[0], // review today
        interval: 1,
        easeFactor: 2.5,
        repetitions: 0,
      };

      data.flashcards.push(card);
      saveCurriculum(dataDir, data);
      writeFlashcardsMd(dataDir, data.flashcards);

      return {
        content: [
          {
            type: "text" as const,
            text: `Flashcard created (${card.type}): "${card.front.slice(0, 60)}..."\nConcept: ${card.concept}\nNext review: ${card.nextReview}\nSaved to: ~/.mentor/flashcards.md`,
          },
        ],
      };
    },
  };
}

export function createFlashcardReviewTool(api: OpenClawPluginApi) {
  const dataDir = getDataDir(api);
  return {
    name: "flashcard_review",
    label: "Review Flashcards",
    description: "Get flashcards due for review today (spaced repetition).",
    parameters: Type.Object({
      limit: Type.Optional(
        Type.Number({ description: "Max cards to return (default: 10)" }),
      ),
      concept: Type.Optional(Type.String({ description: "Filter by concept" })),
    }),
    async execute(
      _toolCallId: string,
      params: { limit?: number; concept?: string },
    ) {
      const data = loadCurriculum(dataDir);
      const today = new Date().toISOString().split("T")[0];
      const limit = params.limit || 10;

      let due = data.flashcards.filter((c) => c.nextReview <= today);
      if (params.concept) {
        due = due.filter((c) => c.concept === params.concept.toLowerCase());
      }
      due = due.slice(0, limit);

      if (due.length === 0) {
        const totalDue = data.flashcards.filter(
          (c) => c.nextReview <= today,
        ).length;
        return {
          content: [
            {
              type: "text" as const,
              text:
                totalDue === 0
                  ? "No flashcards due for review! Great job staying on top of reviews."
                  : `No cards match filter. Total due today: ${totalDue}`,
            },
          ],
        };
      }

      const cards = due.map(
        (c, i) =>
          `${i + 1}. [${c.type}] (${c.concept})\n   Q: ${c.front}\n   ID: ${c.id}`,
      );

      return {
        content: [
          {
            type: "text" as const,
            text: `Flashcards due for review (${due.length}/${data.flashcards.filter((c) => c.nextReview <= today).length} total):\n\n${cards.join("\n\n")}`,
          },
        ],
      };
    },
  };
}

export function createFlashcardGradeTool(api: OpenClawPluginApi) {
  const dataDir = getDataDir(api);
  return {
    name: "flashcard_grade",
    label: "Grade Flashcard",
    description:
      "Grade a flashcard review (SM-2 algorithm). 0=forgot, 3=hard, 4=good, 5=easy.",
    parameters: Type.Object({
      cardId: Type.String({ description: "Flashcard ID" }),
      grade: Type.Number({
        description:
          "Grade 0-5: 0=blackout, 1=wrong, 2=wrong but remembered, 3=hard, 4=good, 5=easy",
        minimum: 0,
        maximum: 5,
      }),
    }),
    async execute(
      _toolCallId: string,
      params: { cardId: string; grade: number },
    ) {
      const data = loadCurriculum(dataDir);
      const card = data.flashcards.find((c) => c.id === params.cardId);

      if (!card) {
        return {
          content: [
            { type: "text" as const, text: `Card ${params.cardId} not found.` },
          ],
        };
      }

      // SM-2 algorithm
      const grade = params.grade;
      card.lastGrade = grade;

      if (grade < 3) {
        // Failed — reset
        card.repetitions = 0;
        card.interval = 1;
      } else {
        card.repetitions++;
        if (card.repetitions === 1) {
          card.interval = 1;
        } else if (card.repetitions === 2) {
          card.interval = 6;
        } else {
          card.interval = Math.round(card.interval * card.easeFactor);
        }
      }

      // Update ease factor
      card.easeFactor = Math.max(
        1.3,
        card.easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)),
      );

      // Set next review
      const next = new Date();
      next.setDate(next.getDate() + card.interval);
      card.nextReview = next.toISOString().split("T")[0];

      saveCurriculum(dataDir, data);
      writeFlashcardsMd(dataDir, data.flashcards);

      return {
        content: [
          {
            type: "text" as const,
            text: `Card graded: ${grade}/5\nNext review: ${card.nextReview} (in ${card.interval} days)\nEase: ${card.easeFactor.toFixed(2)}`,
          },
        ],
      };
    },
  };
}

// --- Reading Queue Tools ---

export function createReadingAddTool(api: OpenClawPluginApi) {
  const dataDir = getDataDir(api);
  return {
    name: "reading_add",
    label: "Add to Reading Queue",
    description: "Add a paper, article, or book chapter to the reading queue.",
    parameters: Type.Object({
      title: Type.String({ description: "Title of the reading material" }),
      url: Type.Optional(Type.String({ description: "URL if available" })),
      source: Type.String({ description: "Source (arxiv, blog, book, etc.)" }),
      type: Type.Union([
        Type.Literal("paper"),
        Type.Literal("article"),
        Type.Literal("chapter"),
      ]),
      priority: Type.Optional(
        Type.Union([
          Type.Literal("high"),
          Type.Literal("medium"),
          Type.Literal("low"),
        ]),
      ),
      relatedTopics: Type.Optional(Type.Array(Type.String())),
    }),
    async execute(
      _toolCallId: string,
      params: {
        title: string;
        url?: string;
        source: string;
        type: string;
        priority?: string;
        relatedTopics?: string[];
      },
    ) {
      const data = loadCurriculum(dataDir);
      const item: ReadingItem = {
        id: generateId(),
        title: params.title,
        url: params.url,
        source: params.source,
        type: params.type as ReadingItem["type"],
        addedAt: new Date().toISOString(),
        status: "queued",
        priority: (params.priority as ReadingItem["priority"]) || "medium",
        relatedTopics: params.relatedTopics || [],
      };

      data.readingQueue.push(item);
      saveCurriculum(dataDir, data);
      writeReadingQueueMd(dataDir, data.readingQueue);

      const queued = data.readingQueue.filter(
        (r) => r.status === "queued",
      ).length;
      return {
        content: [
          {
            type: "text" as const,
            text: `Added to reading queue: "${item.title}"\nPriority: ${item.priority} | Type: ${item.type}\nQueue size: ${queued} items\nSaved to: ~/.mentor/reading-queue.md`,
          },
        ],
      };
    },
  };
}

export function createReadingListTool(api: OpenClawPluginApi) {
  const dataDir = getDataDir(api);
  return {
    name: "reading_list",
    label: "Reading Queue",
    description:
      "Show reading queue, optionally filtered by status or priority.",
    parameters: Type.Object({
      status: Type.Optional(
        Type.Union([
          Type.Literal("queued"),
          Type.Literal("reading"),
          Type.Literal("read"),
          Type.Literal("reviewed"),
          Type.Literal("all"),
        ]),
      ),
      limit: Type.Optional(Type.Number()),
    }),
    async execute(
      _toolCallId: string,
      params: { status?: string; limit?: number },
    ) {
      const data = loadCurriculum(dataDir);
      const status = params.status || "queued";
      const limit = params.limit || 10;

      let items = data.readingQueue;
      if (status !== "all") {
        items = items.filter((r) => r.status === status);
      }

      // Sort by priority then date
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      items.sort(
        (a, b) =>
          priorityOrder[a.priority] - priorityOrder[b.priority] ||
          new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
      );
      items = items.slice(0, limit);

      if (items.length === 0) {
        return {
          content: [
            {
              type: "text" as const,
              text: `No ${status} items in reading queue.`,
            },
          ],
        };
      }

      const lines = items.map(
        (r) =>
          `- [${r.priority}] ${r.title} (${r.source}, ${r.type})\n  ${r.url || "no URL"} | ID: ${r.id}`,
      );

      return {
        content: [
          {
            type: "text" as const,
            text: `Reading Queue (${status}):\n${lines.join("\n")}`,
          },
        ],
      };
    },
  };
}

// --- Curriculum Topic Tools ---

export function createTopicAddTool(api: OpenClawPluginApi) {
  const dataDir = getDataDir(api);
  return {
    name: "curriculum_topic_add",
    label: "Add Curriculum Topic",
    description:
      "Add a topic to the learning curriculum with prerequisites and resources.",
    parameters: Type.Object({
      name: Type.String({ description: "Topic name" }),
      category: Type.String({
        description:
          "Category (foundations, nlp, cv, rl, systems, production, etc.)",
      }),
      prerequisites: Type.Optional(Type.Array(Type.String())),
      concepts: Type.Optional(
        Type.Array(Type.String(), {
          description: "Concepts this topic covers",
        }),
      ),
      resources: Type.Optional(
        Type.Array(
          Type.Object({
            type: Type.Union([
              Type.Literal("paper"),
              Type.Literal("book"),
              Type.Literal("course"),
              Type.Literal("article"),
              Type.Literal("video"),
            ]),
            title: Type.String(),
            url: Type.Optional(Type.String()),
          }),
        ),
      ),
    }),
    async execute(
      _toolCallId: string,
      params: {
        name: string;
        category: string;
        prerequisites?: string[];
        concepts?: string[];
        resources?: Array<{ type: string; title: string; url?: string }>;
      },
    ) {
      const data = loadCurriculum(dataDir);
      const topic: CurriculumTopic = {
        id: generateId(),
        name: params.name,
        category: params.category,
        status: "not_started",
        prerequisites: params.prerequisites || [],
        concepts: params.concepts || [],
        resources: (params.resources || []).map((r) => ({
          type: r.type as CurriculumResource["type"],
          title: r.title,
          url: r.url,
          status: "not_started",
        })),
        notes: "",
      };

      data.topics.push(topic);

      // Also add concepts to knowledge graph
      for (const c of topic.concepts) {
        const key = c.toLowerCase().trim();
        if (!data.knowledgeGraph.concepts[key]) {
          data.knowledgeGraph.concepts[key] = {
            name: key,
            status: "not_started",
            firstSeen: new Date().toISOString(),
            timesDiscussed: 0,
            relatedConcepts: topic.concepts.filter(
              (x) => x.toLowerCase() !== key,
            ),
            sessions: [],
            notes: "",
            prerequisites: [],
          };
        }
      }

      saveCurriculum(dataDir, data);
      writeKnowledgeGraphMd(dataDir, data.knowledgeGraph);
      writeCurriculumMd(dataDir, data);

      return {
        content: [
          {
            type: "text" as const,
            text: `Topic added to curriculum: "${topic.name}"\nCategory: ${topic.category}\nPrereqs: ${topic.prerequisites.join(", ") || "none"}\nConcepts: ${topic.concepts.join(", ") || "none"}\nResources: ${topic.resources.length}\nSaved to: ~/.mentor/curriculum.md`,
          },
        ],
      };
    },
  };
}

type CurriculumResource = import("./types.js").CurriculumResource;

export function createCurriculumStatusTool(api: OpenClawPluginApi) {
  const dataDir = getDataDir(api);
  return {
    name: "curriculum_status",
    label: "Curriculum Status",
    description:
      "Get an overview of curriculum progress across all categories.",
    parameters: Type.Object({}),
    async execute() {
      const data = loadCurriculum(dataDir);
      const topics = data.topics;
      const categories = [...new Set(topics.map((t) => t.category))];

      const categoryStats = categories.map((cat) => {
        const catTopics = topics.filter((t) => t.category === cat);
        const completed = catTopics.filter(
          (t) => t.status === "completed",
        ).length;
        const inProgress = catTopics.filter(
          (t) => t.status === "in_progress",
        ).length;
        return `${cat}: ${completed}/${catTopics.length} completed, ${inProgress} in progress`;
      });

      const totalCompleted = topics.filter(
        (t) => t.status === "completed",
      ).length;
      const readQueued = data.readingQueue.filter(
        (r) => r.status === "queued",
      ).length;
      const flashcardsDue = data.flashcards.filter(
        (f) => f.nextReview <= new Date().toISOString().split("T")[0],
      ).length;

      // Find next recommended topics (prerequisites met)
      const completedNames = new Set(
        topics
          .filter((t) => t.status === "completed")
          .map((t) => t.name.toLowerCase()),
      );
      const ready = topics.filter(
        (t) =>
          t.status === "not_started" &&
          t.prerequisites.every((p) => completedNames.has(p.toLowerCase())),
      );

      return {
        content: [
          {
            type: "text" as const,
            text: `Curriculum Overview:\nTopics: ${totalCompleted}/${topics.length} completed\n\n${categoryStats.join("\n")}\n\nReading queue: ${readQueued} items\nFlashcards due: ${flashcardsDue}\n\nRecommended next topics:\n${
              ready
                .slice(0, 5)
                .map((t) => `  - ${t.name} (${t.category})`)
                .join("\n") ||
              "  None — all prerequisites met topics are started"
            }`,
          },
        ],
      };
    },
  };
}
