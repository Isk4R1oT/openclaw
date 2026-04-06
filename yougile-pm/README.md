# Yougile PM Bot

AI project manager for Telegram groups powered by [OpenClaw](https://github.com/openclaw/openclaw) + [Yougile MCP](https://github.com/Isk4R1oT/YouGlieMCP).

The bot monitors group conversations, automatically creates/updates tasks in Yougile, and responds as a PM assistant when mentioned.

## How It Works

- **Silent monitoring**: Reads all group messages, detects actionable items (new tasks, status updates, assignments), and updates Yougile automatically
- **Mention response**: When @mentioned, acts as a full PM assistant with access to all Yougile data
- **Team-aware**: Knows team members, their roles, and preferred task colors

## Quick Start

### Prerequisites

- Docker + Docker Compose
- Telegram bot token (from [@BotFather](https://t.me/BotFather))
- Anthropic API key (from [console.anthropic.com](https://console.anthropic.com))
- Yougile API key

### Setup

```bash
cd yougile-pm

# 1. Create .env
cp .env.example .env
# Edit .env with your keys

# 2. IMPORTANT: In @BotFather → Bot Settings → Group Privacy → DISABLE
#    Then remove and re-add the bot to your group.

# 3. Start
docker compose up -d --build

# 4. View logs
docker compose logs -f
```

### Getting the Yougile API Key

If you have `uv` installed locally:

```bash
uvx yougile-mcp setup
```

This will prompt for your Yougile login/password and create an API key.

## Team Configuration

Edit `workspace/AGENTS.md` to update the team directory:

| Telegram | Yougile Name | Role | Task Color |
|----------|-------------|------|------------|
| @Ig0Ro4 | Игорь Афонин | AI Backend Dev | Yellow |
| @syrtim | Тимофей | Frontend Dev | Violet |
| @dmitri_bondarenko | Дмитрий Бондаренко | SEO/Founder | Green |

## Bot Behavior

### Silent Mode (no mention)

The bot silently watches for:
- "нужно сделать X" → creates task
- "баг: X" → creates bug task
- "X готово" → marks task as done
- "взял X" → assigns to speaker

Confirms with one line: `✅ Создал PRJ-47: Bug (Backlog)`

### Assistant Mode (@mention)

Full PM responses with real Yougile data:
- "@bot какой статус проекта?" → project overview
- "@bot что на мне?" → your open tasks
- "@bot создай задачу X" → creates task with full details

## Architecture

```
Telegram Group
     │
     ▼
OpenClaw (grammY + Claude Sonnet)
     │
     ▼
Yougile MCP Server (FastMCP)
     │
     ▼
Yougile API (ru.yougile.com/api-v2)
```

## Files

```
yougile-pm/
├── docker-compose.yml    — Docker deployment
├── Dockerfile            — Build image
├── openclaw.json         — Bot configuration
├── .env.example          — Environment vars template
├── setup.sh              — One-command setup
└── workspace/
    ├── AGENTS.md          — PM behavior rules + team directory
    ├── SOUL.md            — Bot personality
    ├── TOOLS.md           — Tool notes
    ├── scripts/
    │   └── yougile.py     — MCP client bridge
    └── skills/
        └── yougile/
            └── SKILL.md   — Yougile tool reference
```

## Updating

To update the bot after upstream OpenClaw changes:

```bash
git fetch upstream
git merge upstream/main
docker compose up -d --build
```
