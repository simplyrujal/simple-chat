#!/bin/bash
set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=========================================="
echo "Bun Monorepo Deployment Script"
echo "==========================================${NC}"

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"
command -v bun >/dev/null 2>&1 || { echo -e "${RED}Error: bun is not installed${NC}"; exit 1; }
command -v meteor >/dev/null 2>&1 || { echo -e "${RED}Error: Meteor is not installed${NC}"; exit 1; }
command -v docker >/dev/null 2>&1 || { echo -e "${RED}Error: Docker is not installed${NC}"; exit 1; }
echo -e "${GREEN}✓ All prerequisites found${NC}\n"

# Cleanup previous builds
echo -e "${YELLOW}=========================================="
echo "Step 1: Cleaning previous builds..."
echo "==========================================${NC}"
rm -rf ./bundle-output ./apps/meteor-app/bundle ./services/signaling-server/dist
echo -e "${GREEN}✓ Cleanup complete${NC}\n"

# Build Signaling Server
echo -e "${YELLOW}=========================================="
echo "Step 2: Building Signaling Server..."
echo "==========================================${NC}"
bun run build:signaling
echo -e "${GREEN}✓ Signaling server build complete${NC}\n"

# Build Meteor bundle
echo -e "${YELLOW}=========================================="
echo "Step 3: Building Meteor bundle..."
echo "==========================================${NC}"
cd apps/meteor-app
meteor build --directory ../../bundle-output --server-only
cd ../..
echo -e "${GREEN}✓ Meteor build complete${NC}\n"

# Copy bundle to correct location
echo -e "${YELLOW}=========================================="
echo "Step 4: Preparing bundle for Docker..."
echo "==========================================${NC}"
rm -rf ./apps/meteor-app/bundle
cp -r ./bundle-output/bundle ./apps/meteor-app/bundle
echo -e "${GREEN}✓ Bundle prepared${NC}\n"

# Build Docker images
echo -e "${YELLOW}=========================================="
echo "Step 5: Building Docker images (no cache)..."
echo "==========================================${NC}"
docker compose build --no-cache
echo -e "${GREEN}✓ Docker images built${NC}\n"

# Start containers
echo -e "${YELLOW}=========================================="
echo "Step 6: Starting containers..."
echo "==========================================${NC}"
docker compose up -d
echo -e "${GREEN}✓ Containers started${NC}\n"

# Cleanup temporary files
echo -e "${YELLOW}=========================================="
echo "Step 7: Cleaning up temporary files..."
echo "==========================================${NC}"
rm -rf ./bundle-output ./apps/meteor-app/bundle ./services/signaling-server/dist
echo -e "${GREEN}✓ Temporary files cleaned${NC}\n"

# Display status
echo -e "${GREEN}=========================================="
echo "✓ Deployment complete!"
echo "==========================================${NC}"
echo -e "${YELLOW}Services:${NC}"
echo "  • Meteor app:     http://localhost:3000"
echo "  • Signaling:      ws://localhost:8080"
echo "  • TURN server:    turn:localhost:3478"
echo "  • MongoDB:        mongodb://localhost:27017"
echo ""
echo -e "${YELLOW}Useful commands:${NC}"
echo "  • View logs:      docker compose logs -f"
echo "  • Stop services:  docker compose down"
echo "  • Restart:        docker compose restart"
echo "  • Full rebuild:   ./deploy.sh"
