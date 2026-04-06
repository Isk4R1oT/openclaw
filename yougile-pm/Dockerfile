FROM node:24-slim

# Install Python + uv for yougile-mcp
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip curl ca-certificates git \
  && rm -rf /var/lib/apt/lists/*

# Install uv
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.local/bin:$PATH"

# Pre-install yougile-mcp so it's cached in the image
RUN uvx --from 'git+https://github.com/Isk4R1oT/YouGlieMCP' yougile-mcp --help || true

# Install openclaw globally
RUN npm install -g openclaw

# Setup workspace
WORKDIR /app
COPY workspace/ /app/workspace/
COPY openclaw.json /root/.openclaw/openclaw.json

# Pre-create state dirs
RUN mkdir -p /root/.openclaw/skills /root/.openclaw/state

# Copy the yougile skill into openclaw skills
COPY workspace/skills/ /root/.openclaw/skills/

# Copy the MCP bridge script
COPY workspace/scripts/ /app/workspace/scripts/
RUN chmod +x /app/workspace/scripts/yougile.py

EXPOSE 18789

CMD ["openclaw", "gateway", "--verbose"]
