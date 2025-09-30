#!/bin/bash

# Deploy script for Credit with Rami
echo "🚀 Starting deployment..."

# Build the project
echo "📦 Building project..."
npm run build

# Create deployment package
echo "📁 Creating deployment package..."
tar -czf credit-with-rami.tar.gz \
  --exclude=node_modules \
  --exclude=.next/cache \
  --exclude=.git \
  --exclude=*.log \
  .

echo "✅ Deployment package created: credit-with-rami.tar.gz"
echo "📋 Next steps:"
echo "1. Upload credit-with-rami.tar.gz to your server"
echo "2. Extract: tar -xzf credit-with-rami.tar.gz"
echo "3. Install dependencies: npm install --production"
echo "4. Start with PM2: pm2 start ecosystem.config.js"



