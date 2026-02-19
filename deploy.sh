#!/bin/bash
set -e

echo "Building Meteor bundle..."
meteor build --directory ./bundle-output --server-only

echo "Copying bundle..."
rm -rf ./bundle
cp -r ./bundle-output/bundle ./bundle

echo "Building Docker image (no cache)..."
docker-compose build --no-cache

echo "Starting containers..."
docker-compose up -d

echo "Cleaning up temporary files..."
rm -rf ./bundle-output ./bundle