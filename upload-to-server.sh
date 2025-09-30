#!/bin/bash

# Upload script for Credit with Rami
echo "📤 Uploading Credit with Rami to server..."

# Check if the package exists
if [ ! -f "credit-with-rami.tar.gz" ]; then
    echo "❌ Error: credit-with-rami.tar.gz not found"
    echo "Please run ./deploy.sh first to create the package"
    exit 1
fi

# Get server IP from user
read -p "Enter server IP address: " SERVER_IP

# Upload the package
echo "📦 Uploading credit-with-rami.tar.gz to server..."
scp -i /home/credbqjg/.ssh/webrami credit-with-rami.tar.gz credbqjg@$SERVER_IP:/home/credbqjg/web/

if [ $? -eq 0 ]; then
    echo "✅ Upload successful!"
    echo ""
    echo "📋 Next steps:"
    echo "1. SSH into the server:"
    echo "   ssh -i /home/credbqjg/.ssh/webrami credbqjg@$SERVER_IP"
    echo ""
    echo "2. Run the deployment script:"
    echo "   cd /home/credbqjg/web"
    echo "   chmod +x complete-deployment.sh"
    echo "   ./complete-deployment.sh"
    echo ""
    echo "3. Configure domain DNS to point to: $SERVER_IP"
else
    echo "❌ Upload failed. Please check:"
    echo "  - Server IP is correct"
    echo "  - SSH key path is correct"
    echo "  - Server is accessible"
fi






