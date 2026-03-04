FROM oven/bun:1-alpine

WORKDIR /app

# Copy server-specific package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile || bun install

# Copy source code
COPY . .

# Build TypeScript
RUN bun run build

EXPOSE 8080

ENV SIGNALING_PORT=8080

CMD ["bun", "run", "start"]
