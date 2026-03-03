import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import { emptyPluginConfigSchema } from "openclaw/plugin-sdk";
import {
  createSessionStartTool,
  createSessionEndTool,
  createSessionStatusTool,
  createAssignmentCreateTool,
  createAssignmentGradeTool,
  createAssignmentListTool,
  createStudyHistoryTool,
} from "./src/tools.js";
import { ensureDirs } from "./src/storage.js";

const studyTrackerPlugin = {
  id: "study-tracker",
  name: "Study Tracker",
  description:
    "Tracks study sessions, manages assignments, and monitors learning progress for the AI mentor system.",
  configSchema: emptyPluginConfigSchema(),

  register(api: OpenClawPluginApi) {
    const cfg = api.pluginConfig as Record<string, unknown> | undefined;
    const dataDir = (cfg?.dataDir as string) || "~/.mentor";

    // Ensure data directories exist
    ensureDirs(dataDir);

    // Register all study tracking tools
    api.registerTool(createSessionStartTool(api), { name: "study_session_start" });
    api.registerTool(createSessionEndTool(api), { name: "study_session_end" });
    api.registerTool(createSessionStatusTool(api), { name: "study_session_status" });
    api.registerTool(createAssignmentCreateTool(api), { name: "assignment_create" });
    api.registerTool(createAssignmentGradeTool(api), { name: "assignment_grade" });
    api.registerTool(createAssignmentListTool(api), { name: "assignment_list" });
    api.registerTool(createStudyHistoryTool(api), { name: "study_history" });

    // Hook: remind about session tracking at conversation start
    api.on("session:start", async () => {
      api.logger.info("[study-tracker] Session started, reminder to use study_session_start");
    });

    api.logger.info("[study-tracker] Plugin registered with 7 tools");
  },
};

export default studyTrackerPlugin;
