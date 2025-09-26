# 🚀 Manual Deployment Instructions - Credit with Rami

## 📦 Archivos Listos para Deployment

- ✅ **`credit-with-rami.zip`** (25MB) - Proyecto completo
- ✅ **`ecosystem.config.js`** - Configuración de PM2
- ✅ **`complete-deployment.sh`** - Script de deployment

## 📤 Paso 1: Subir Archivos al Servidor

### Opción A: Usando cPanel File Manager
1. Accede a tu cPanel
2. Ve a **File Manager**
3. Navega a `/home/credbqjg/web/`
4. Sube el archivo `credit-with-rami.zip`
5. Extrae el archivo ZIP en el directorio

### Opción B: Usando SCP (si tienes acceso SSH)
```bash
scp -i /path/to/ssh/key credit-with-rami.zip credbqjg@server-ip:/home/credbqjg/web/
```

## 🔧 Paso 2: Configurar en el Servidor

### 1. Conectar al servidor
```bash
ssh -i /path/to/ssh/key credbqjg@server-ip
```

### 2. Activar entorno Node.js
```bash
source /home/credbqjg/nodevenv/web/14/bin/activate
```

### 3. Navegar al directorio del proyecto
```bash
cd /home/credbqjg/web
```

### 4. Extraer el proyecto (si no se extrajo automáticamente)
```bash
unzip credit-with-rami.zip
```

### 5. Instalar dependencias
```bash
npm install --production
```

### 6. Instalar PM2 (si no está instalado)
```bash
npm install -g pm2
```

### 7. Iniciar la aplicación
```bash
pm2 start ecosystem.config.js
```

### 8. Configurar PM2 para inicio automático
```bash
pm2 save
pm2 startup
```

## 🌐 Paso 3: Configurar Dominio

### 1. Obtener IP del servidor
```bash
curl ifconfig.me
```

### 2. Configurar DNS en Namecheap
- **A Record**: `@` → IP del servidor
- **CNAME**: `www` → `creditwithrami.com`

### 3. Configurar Nginx (si es necesario)
Crear archivo `/etc/nginx/sites-available/creditwithrami.com`:

```nginx
server {
    listen 80;
    server_name creditwithrami.com www.creditwithrami.com;

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

Activar el sitio:
```bash
sudo ln -s /etc/nginx/sites-available/creditwithrami.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🧪 Paso 4: Verificar Deployment

### 1. Verificar que la aplicación esté corriendo
```bash
pm2 status
pm2 logs credit-with-rami
```

### 2. Probar localmente
```bash
curl http://localhost:3000
```

### 3. Probar el dominio
- Abrir `https://creditwithrami.com` en el navegador
- Verificar que todas las secciones carguen correctamente
- Probar el formulario de consulta

## 🔧 Comandos Útiles

```bash
# Ver estado de la aplicación
pm2 status

# Ver logs en tiempo real
pm2 logs credit-with-rami

# Reiniciar aplicación
pm2 restart credit-with-rami

# Detener aplicación
pm2 stop credit-with-rami

# Eliminar aplicación
pm2 delete credit-with-rami
```

## 📋 Checklist de Deployment

- [ ] Archivo ZIP subido al servidor
- [ ] Proyecto extraído en `/home/credbqjg/web/`
- [ ] Dependencias instaladas (`npm install --production`)
- [ ] PM2 instalado y configurado
- [ ] Aplicación iniciada con PM2
- [ ] DNS configurado (A record y CNAME)
- [ ] Nginx configurado (si es necesario)
- [ ] Dominio accesible desde navegador
- [ ] Formulario de consulta funcionando
- [ ] Email de consulta configurado

## 🆘 Solución de Problemas

### Si la aplicación no inicia:
```bash
pm2 logs credit-with-rami
# Revisar logs para errores específicos
```

### Si el dominio no carga:
1. Verificar DNS: `nslookup creditwithrami.com`
2. Verificar Nginx: `sudo nginx -t`
3. Verificar firewall: `sudo ufw status`

### Si hay errores de permisos:
```bash
sudo chown -R credbqjg:credbqjg /home/credbqjg/web/
chmod -R 755 /home/credbqjg/web/
```

## 📞 Contacto de Soporte

Si necesitas ayuda con el deployment, contacta con:
- **Email**: info@creditwhitrami.com
- **WhatsApp**: +1 (786) 883-5543


