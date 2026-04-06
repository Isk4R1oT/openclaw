#!/usr/bin/env bash
set -e

echo "=== Yougile PM Bot Setup ==="
echo ""

# Check Docker
if ! command -v docker &> /dev/null; then
  echo "ERROR: Docker is required. Install it first."
  exit 1
fi

if ! command -v docker compose &> /dev/null && ! docker compose version &> /dev/null; then
  echo "ERROR: Docker Compose is required."
  exit 1
fi

# Create .env if missing
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from template."
  echo ""
  echo "IMPORTANT: Edit .env and fill in your keys:"
  echo "  - TELEGRAM_BOT_TOKEN (from @BotFather)"
  echo "  - ANTHROPIC_API_KEY (from console.anthropic.com)"
  echo "  - YOUGILE_API_KEY (run: uvx yougile-mcp setup)"
  echo ""
  echo "Then run: docker compose up -d"
  exit 0
fi

echo "Building and starting the bot..."
docker compose up -d --build

echo ""
echo "Done! Bot is running."
echo ""
echo "IMPORTANT: In @BotFather, go to Bot Settings → Group Privacy → DISABLE"
echo "Then remove and re-add the bot to your group."
echo ""
echo "Commands:"
echo "  docker compose logs -f     — view logs"
echo "  docker compose restart     — restart bot"
echo "  docker compose down        — stop bot"
