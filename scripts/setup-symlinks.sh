#!/bin/sh
set -e

# Setup symlinks for monorepo
echo "Setting up monorepo symlinks..."

# Create node_modules symlink in Meteor app for module resolution
if [ -d "apps/meteor-app" ]; then
  if [ ! -L "apps/meteor-app/node_modules" ]; then
    echo "Creating node_modules symlink for Meteor app..."
    cd apps/meteor-app
    ln -s ../../node_modules ./node_modules
    cd ../..
    echo "✓ node_modules symlink created"
  fi
else
  echo "ℹ Meteor app directory not found (likely Docker build) - skipping symlink"
fi

echo "✓ Monorepo symlinks setup complete"
