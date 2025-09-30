#!/bin/bash

# Server-side deployment script
echo "🚀 Deploying Credit with Rami to server..."

# Activate Node environment
echo "🔧 Activating Node environment..."
source /home/credbqjg/nodevenv/web/14/bin/activate

# Navigate to project directory
echo "📁 Navigating to project directory..."
cd /home/credbqjg/web

# Stop existing application if running
echo "⏹️ Stopping existing application..."
pm2 stop credit-with-rami 2>/dev/null || echo "No existing application to stop"

# Extract new version
echo "📦 Extracting new version..."
tar -xzf credit-with-rami.tar.gz

# Install dependencies
echo "📥 Installing dependencies..."
npm install --production

# Start application
echo "▶️ Starting application..."
pm2 start ecosystem.config.js

# Show status
echo "📊 Application status:"
pm2 status

echo "✅ Deployment completed!"
echo "🌐 Application should be running on port 3000"
echo "📋 Check logs with: pm2 logs credit-with-rami"






