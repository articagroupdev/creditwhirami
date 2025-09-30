module.exports = {
  apps: [{
    name: 'credit-with-rami',
    script: 'npm',
    args: 'start',
    cwd: '/home/credbqjg/web',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}






