---
name: yougile
description: Yougile project management — create, search, move, assign tasks, manage boards and comments.
metadata:
  openclaw:
    requires:
      bins: ["python3"]
---

# Yougile Skill

Use this skill to manage the team's Yougile project board.

## How to Call

Run the bridge script via `exec`:

```bash
python3 /app/workspace/scripts/yougile.py <tool_name> '<json_arguments>'
```

Examples:
```bash
python3 /app/workspace/scripts/yougile.py list_projects '{}'
python3 /app/workspace/scripts/yougile.py create_task '{"title":"Fix login bug","project":"MyProject","board":"Sprint","column":"Backlog"}'
python3 /app/workspace/scripts/yougile.py search_tasks '{"title":"login"}'
```

## Available Tools

### Discovery
- `list_projects` — List all projects and their boards. Call this first.
- `get_project_overview` — Get project structure (boards, columns, task counts). Args: `{"project": "<name>"}`
- `list_users` — List all workspace users with names, emails, online status.
- `list_stickers` — List available stickers (labels) and their states.

### Board Management
- `get_board_details` — Get all columns and tasks for a board. Args: `{"project": "<name>", "board": "<name>"}`
- `create_board` — Create a board. Args: `{"project": "<name>", "board_name": "<name>", "columns": ["col1","col2"]}`
- `setup_kanban_board` — Create board with standard Kanban columns. Args: `{"project": "<name>", "board_name": "<name>"}`

### Task CRUD
- `create_task` — Create a task. Args: `{"title": "...", "project": "...", "board": "...", "column": "..."}` Optional: `description`, `assigned` (list of names/emails), `deadline` (YYYY-MM-DD), `color` (task-yellow, task-violet, task-green, etc.)
- `get_task` — Get full task details. Args: `{"task": "PRJ-123"}` (task code or UUID)
- `update_task` — Update title/description/deadline/color. Args: `{"task": "PRJ-123", "title": "new title"}`
- `search_tasks` — Search by title, assignee, project, board, column, completion status. At least one filter required. Args: `{"title": "search term", "limit": 20}`
- `get_user_tasks` — Get all tasks assigned to a user grouped by column. Args: `{"user": "Игорь"}`

### Task Actions
- `move_task` — Move to different column/board. Args: `{"task": "PRJ-123", "column": "Done"}` Optional: `board`, `project`
- `assign_task` — Add/remove assignees. Args: `{"task": "PRJ-123", "assign": ["Тимофей"]}` or `{"task": "PRJ-123", "unassign": ["Игорь"]}`
- `complete_task` — Mark complete/reopen. Args: `{"task": "PRJ-123", "completed": true}`
- `archive_task` — Archive/restore (destructive). Args: `{"task": "PRJ-123", "archived": true}`

### Checklists
- `manage_checklist` — Add/check/uncheck/remove items. Args: `{"task": "PRJ-123", "add_items": ["item1", "item2"], "check_items": ["item1"]}`

### Comments
- `get_task_comments` — Read task comments. Args: `{"task": "PRJ-123"}`
- `add_task_comment` — Add a comment. Args: `{"task": "PRJ-123", "text": "Comment text"}`

### Stickers (Labels)
- `set_task_sticker` — Apply a sticker. Args: `{"task": "PRJ-123", "sticker": "Priority", "state": "High"}`
- `remove_task_sticker` — Remove a sticker. Args: `{"task": "PRJ-123", "sticker": "Priority"}`

## Valid Task Colors

- `task-primary` (default)
- `task-gray`
- `task-red`
- `task-pink`
- `task-yellow` (Игорь / @Ig0Ro4)
- `task-green` (Дмитрий / @dmitri_bondarenko)
- `task-turquoise`
- `task-blue`
- `task-violet` (Тимофей / @syrtim)

## Tips

- All tools accept human-readable names, NOT UUIDs
- Names are matched case-insensitive with partial matching
- Always `search_tasks` before `create_task` to avoid duplicates
- Always include task codes in chat confirmations
- Use team member colors when creating tasks for specific people
