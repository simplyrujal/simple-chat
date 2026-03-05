#!/bin/bash
set -e

echo "=========================================="
echo "Cleaning previous builds if exists..."
echo "=========================================="
rm -rf ./bundle-output ./bundle ./servers/signaling-server/dist

echo "=========================================="
echo "Building Signaling Server..."
echo "=========================================="
cd servers/signaling-server
bun run build
cd ../..

echo "=========================================="
echo "Building Meteor bundle..."
echo "=========================================="
meteor build --directory ./bundle-output --server-only

echo "=========================================="
echo "Copying bundle..."
echo "=========================================="
rm -rf ./bundle
cp -r ./bundle-output/bundle ./bundle

echo "=========================================="
echo "Building Docker images (no cache)..."
echo "=========================================="
docker compose build --no-cache

echo "=========================================="
echo "Starting containers..."
echo "=========================================="
docker compose up -d

echo "=========================================="
echo "Cleaning up temporary files..."
echo "=========================================="
rm -rf ./bundle-output ./bundle ./servers/signaling-server/dist

echo "=========================================="
echo "Deployment complete!"
echo "=========================================="
echo "Meteor app: http://localhost:3000"
echo "Signaling server: ws://localhost:8080"
echo "TURN server: turn:localhost:3478"
