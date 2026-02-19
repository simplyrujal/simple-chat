#!/bin/bash
echo "Building Meteor bundle..."
meteor build --directory ./bundle-output --server-only

echo "Copying bundle..."
rm -rf ./bundle
cp -r ./bundle-output/bundle ./bundle

echo "Restarting containers with new build..."
docker-compose up -d

echo "Cleaning up..."
rm -rf ./bundle-output ./bundle
