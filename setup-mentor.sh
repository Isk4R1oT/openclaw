#!/bin/bash
set -e

echo "=== AI Mentor Setup ==="
echo ""

# Check prerequisites
command -v docker >/dev/null 2>&1 || { echo "Docker is required. Install from https://docker.com"; exit 1; }
command -v pnpm >/dev/null 2>&1 || { echo "pnpm is required. Install: npm install -g pnpm"; exit 1; }

# Create directories
echo "Creating data directories..."
mkdir -p config/agents/ai-mentor
mkdir -p workspace
mkdir -p mentor-data/sessions
mkdir -p mentor-data/assignments
mkdir -p mentor-data/papers
mkdir -p mentor-data/reviews/weekly
mkdir -p mentor-data/reviews/monthly
mkdir -p mentor-data/experiments
mkdir -p mentor-data/lit-reviews

# Copy agent config if not exists
if [ ! -f config/agents/ai-mentor/agent.json ]; then
  cp config/agents/ai-mentor/agent.json config/agents/ai-mentor/agent.json 2>/dev/null || true
fi

# Setup .env
if [ ! -f .env ]; then
  cp .env.example .env
  echo ""
  echo "Created .env from .env.example"
  echo "Please edit .env and fill in:"
  echo "  - ANTHROPIC_API_KEY"
  echo "  - TELEGRAM_BOT_TOKEN"
  echo "  - OPENCLAW_GATEWAY_TOKEN (run: openssl rand -hex 32)"
  echo ""
else
  echo ".env already exists, skipping"
fi

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Build
echo "Building..."
pnpm build

echo ""
echo "=== Setup complete! ==="
echo ""
echo "Next steps:"
echo "  1. Edit .env with your API keys"
echo "  2. Run: docker compose up -d"
echo "  3. Start a Telegram conversation with your bot"
echo ""
echo "Or run locally without Docker:"
echo "  pnpm start gateway"
echo ""
