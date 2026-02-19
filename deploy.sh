#!/bin/bash
echo "Building Meteor bundle..."
meteor build --directory ./bundle-output --server-only

echo "Copying bundle..."
rm -rf ./bundle
cp -r ./bundle-output/bundle ./bundle

echo "Starting Docker..."
docker-compose up -d --build

echo "Cleaning up..."
rm -rf ./bundle-output ./bundle