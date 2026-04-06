# Tools — Notes for Skills

## Yougile MCP

The Yougile skill provides access to all project management operations.
Use the `exec` tool to run the bridge script:

```bash
python3 /app/workspace/scripts/yougile.py <tool_name> '<json_args>'
```

All tool names and their parameters are documented in the yougile skill (skills/yougile/SKILL.md).

The YOUGILE_API_KEY environment variable must be set.

## Environment

- Workspace: /app/workspace
- Scripts: /app/workspace/scripts/
- Yougile MCP: `uvx yougile-mcp` (available in PATH)
- Python 3: available
- uv: available
