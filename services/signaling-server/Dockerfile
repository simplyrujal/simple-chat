FROM oven/bun:1-alpine

WORKDIR /app

# Copy workspace root package.json and lock files
COPY package.json bun.lock* ./

# Copy scripts folder (needed for postinstall hook)
COPY scripts ./scripts

# Copy signaling-server source
COPY services/signaling-server ./services/signaling-server

WORKDIR /app/services/signaling-server

# Install dependencies
RUN bun install --frozen-lockfile || bun install

# Build TypeScript
RUN bun run build

EXPOSE 8080

ENV SIGNALING_PORT=8080

CMD ["bun", "run", "start"]
