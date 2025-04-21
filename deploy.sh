#!/bin/bash

# Путь к проекту (если нужно, можно оставить точку)
cd "$(dirname "$0")" || exit

echo "📥 Pulling latest changes from Git..."
git pull origin main

echo "🐳 Rebuilding and restarting Docker containers..."
docker-compose down
docker-compose up -d --build

echo "✅ Deployment complete!"
