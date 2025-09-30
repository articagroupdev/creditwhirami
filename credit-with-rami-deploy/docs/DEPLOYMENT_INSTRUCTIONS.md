# 🚀 Deployment Instructions - Credit with Rami

## 📋 Prerequisites
- SSH access to server with key: `/home/credbqjg/.ssh/webrami`
- Node.js environment: `/home/credbqjg/nodevenv/web/14/bin/activate`
- Project directory: `/home/credbqjg/web`

## 🔧 Server Setup Commands

### 1. Connect to Server
```bash
ssh -i /home/credbqjg/.ssh/webrami credbqjg@your-server-ip
```

### 2. Activate Node Environment
```bash
source /home/credbqjg/nodevenv/web/14/bin/activate
cd /home/credbqjg/web
```

### 3. Upload and Extract Project
```bash
# Upload credit-with-rami.tar.gz to server first
tar -xzf credit-with-rami.tar.gz
```

### 4. Install Dependencies
```bash
npm install --production
```

### 5. Install PM2 (if not installed)
```bash
npm install -g pm2
```

### 6. Start Application
```bash
pm2 start ecosystem.config.js
```

### 7. Configure PM2 to Start on Boot
```bash
pm2 startup
pm2 save
```

## 🌐 Nginx Configuration (Optional)

Create `/etc/nginx/sites-available/credit-with-rami`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/credit-with-rami /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔍 Monitoring Commands

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs credit-with-rami

# Restart application
pm2 restart credit-with-rami

# Stop application
pm2 stop credit-with-rami
```

## 📁 Project Structure
```
/home/credbqjg/web/
├── .next/                 # Next.js build output
├── public/               # Static assets
├── src/                  # Source code
├── package.json          # Dependencies
├── ecosystem.config.js   # PM2 configuration
└── credit-with-rami.tar.gz # Deployment package
```

## ✅ Verification
- Application should be running on port 3000
- Check: `curl http://localhost:3000`
- PM2 status: `pm2 status`
- Logs: `pm2 logs credit-with-rami`


