#!/usr/bin/env python3
"""MCP bridge for Yougile. Calls a single MCP tool and prints the result.

Usage:
    python3 yougile.py <tool_name> [json_arguments]

Examples:
    python3 yougile.py list_projects
    python3 yougile.py create_task '{"title":"Bug fix","project":"P","board":"B","column":"C"}'
    python3 yougile.py search_tasks '{"title":"login"}'

Requires: YOUGILE_API_KEY env var, uvx in PATH.
"""
import json
import os
import subprocess
import sys


def call_mcp_tool(tool_name: str, arguments: dict) -> str:
    env = {**os.environ}
    proc = subprocess.Popen(
        ["uvx", "--from", "git+https://github.com/Isk4R1oT/YouGlieMCP", "yougile-mcp"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env=env,
    )

    messages = []

    # 1. Initialize
    init_req = {
        "jsonrpc": "2.0",
        "method": "initialize",
        "params": {
            "protocolVersion": "2024-11-05",
            "capabilities": {},
            "clientInfo": {"name": "yougile-bridge", "version": "1.0.0"},
        },
        "id": 1,
    }
    messages.append(json.dumps(init_req))

    # 2. Initialized notification
    init_notif = {"jsonrpc": "2.0", "method": "notifications/initialized"}
    messages.append(json.dumps(init_notif))

    # 3. Call the tool
    tool_req = {
        "jsonrpc": "2.0",
        "method": "tools/call",
        "params": {"name": tool_name, "arguments": arguments},
        "id": 2,
    }
    messages.append(json.dumps(tool_req))

    stdin_data = "\n".join(messages) + "\n"

    try:
        stdout_raw, stderr_raw = proc.communicate(input=stdin_data.encode(), timeout=30)
    except subprocess.TimeoutExpired:
        proc.kill()
        return "Error: MCP server timed out after 30s"

    # Parse responses — find the one with id=2 (tool result)
    for line in stdout_raw.decode().strip().split("\n"):
        line = line.strip()
        if not line:
            continue
        try:
            resp = json.loads(line)
        except json.JSONDecodeError:
            continue

        if resp.get("id") == 2:
            if "result" in resp:
                content = resp["result"].get("content", [])
                texts = []
                for item in content:
                    if item.get("type") == "text":
                        texts.append(item["text"])
                return "\n".join(texts) if texts else json.dumps(resp["result"], ensure_ascii=False)
            elif "error" in resp:
                err = resp["error"]
                return f"Error: {err.get('message', str(err))}"

    # Fallback: return raw output
    stderr_text = stderr_raw.decode().strip()
    if stderr_text:
        return f"Error (stderr): {stderr_text}"
    return f"No response for tool '{tool_name}'. Raw stdout: {stdout_raw.decode()[:500]}"


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: yougile.py <tool_name> [json_arguments]")
        print("Example: yougile.py list_projects")
        print("Example: yougile.py search_tasks '{\"title\": \"bug\"}'")
        sys.exit(1)

    tool_name = sys.argv[1]
    arguments = json.loads(sys.argv[2]) if len(sys.argv) > 2 else {}
    result = call_mcp_tool(tool_name, arguments)
    print(result)


if __name__ == "__main__":
    main()
