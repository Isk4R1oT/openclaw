import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import { emptyPluginConfigSchema } from "openclaw/plugin-sdk";
import {
  createConceptUpdateTool,
  createConceptCheckTool,
  createKnowledgeStatsTool,
  createFlashcardAddTool,
  createFlashcardReviewTool,
  createFlashcardGradeTool,
  createReadingAddTool,
  createReadingListTool,
  createTopicAddTool,
  createCurriculumStatusTool,
} from "./src/tools.js";

const curriculumPlugin = {
  id: "curriculum",
  name: "Curriculum Manager",
  description:
    "Manages the AI mentor curriculum: knowledge graph, spaced repetition flashcards, reading queue, and curriculum topics.",
  configSchema: emptyPluginConfigSchema(),

  register(api: OpenClawPluginApi) {
    // Knowledge Graph tools
    api.registerTool(createConceptUpdateTool(api), { name: "knowledge_update" });
    api.registerTool(createConceptCheckTool(api), { name: "knowledge_check" });
    api.registerTool(createKnowledgeStatsTool(api), { name: "knowledge_stats" });

    // Flashcard tools
    api.registerTool(createFlashcardAddTool(api), { name: "flashcard_add" });
    api.registerTool(createFlashcardReviewTool(api), { name: "flashcard_review" });
    api.registerTool(createFlashcardGradeTool(api), { name: "flashcard_grade" });

    // Reading queue tools
    api.registerTool(createReadingAddTool(api), { name: "reading_add" });
    api.registerTool(createReadingListTool(api), { name: "reading_list" });

    // Curriculum topics tools
    api.registerTool(createTopicAddTool(api), { name: "curriculum_topic_add" });
    api.registerTool(createCurriculumStatusTool(api), { name: "curriculum_status" });

    api.logger.info("[curriculum] Plugin registered with 10 tools");
  },
};

export default curriculumPlugin;
