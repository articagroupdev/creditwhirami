#!/bin/bash

# Complete deployment script for Credit with Rami
echo "🚀 Starting complete deployment of Credit with Rami..."

# Check if we're in the right directory
if [ ! -f "credit-with-rami.tar.gz" ]; then
    echo "❌ Error: credit-with-rami.tar.gz not found in current directory"
    echo "Please upload the file first using:"
    echo "scp -i /path/to/ssh/key credit-with-rami.tar.gz credbqjg@server-ip:/home/credbqjg/web/"
    exit 1
fi

# Activate Node environment
echo "🔧 Activating Node.js environment..."
source /home/credbqjg/nodevenv/web/14/bin/activate

# Navigate to project directory
echo "📁 Navigating to project directory..."
cd /home/credbqjg/web

# Stop existing application if running
echo "⏹️ Stopping existing application..."
pm2 stop credit-with-rami 2>/dev/null || echo "No existing application to stop"

# Backup existing files (if any)
echo "💾 Creating backup..."
if [ -d ".next" ]; then
    mv .next .next.backup.$(date +%Y%m%d_%H%M%S) 2>/dev/null || true
fi

# Extract new version
echo "📦 Extracting new version..."
tar -xzf credit-with-rami.tar.gz

# Install dependencies
echo "📥 Installing dependencies..."
npm install --production

# Install PM2 if not installed
echo "🔧 Checking PM2 installation..."
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
fi

# Start application
echo "▶️ Starting application..."
pm2 start ecosystem.config.js

# Show status
echo "📊 Application status:"
pm2 status

# Test the application
echo "🧪 Testing application..."
sleep 5
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Application is running successfully on port 3000!"
    echo "🌐 You can access it at: http://localhost:3000"
else
    echo "❌ Application failed to start. Check logs with: pm2 logs credit-with-rami"
fi

echo ""
echo "📋 Useful commands:"
echo "  - View logs: pm2 logs credit-with-rami"
echo "  - Restart: pm2 restart credit-with-rami"
echo "  - Stop: pm2 stop credit-with-rami"
echo "  - Status: pm2 status"
echo ""
echo "🔧 To configure domain (creditwithrami.com):"
echo "  1. Update DNS records to point to this server's IP"
echo "  2. Configure Nginx (if needed) to proxy to localhost:3000"
echo "  3. Test domain access"






