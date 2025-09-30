# 🌐 Configuración de Red para Credit with Rami

## 🚀 Comandos para Ejecutar el Servidor

### Desarrollo con Acceso de Red
```bash
npm run dev
# o
npm run dev:network
```

### Solo Acceso Local
```bash
npm run dev:local
```

### Producción con Acceso de Red
```bash
npm run build
npm run start
```

### Ver Información de Red
```bash
npm run network-info
```

## 📱 Cómo Acceder desde Otros Dispositivos

### 1. Ejecutar el Servidor
```bash
npm run dev
```

### 2. Encontrar tu IP Local
El script automáticamente mostrará todas las IPs disponibles. Busca algo como:
- `192.168.1.XXX:3000` (Red WiFi doméstica)
- `10.0.0.XXX:3000` (Red corporativa)

### 3. Acceder desde Otros Dispositivos
En tu teléfono, tablet u otra computadora:
1. Conéctate a la **misma red WiFi**
2. Abre el navegador
3. Escribe la IP mostrada: `http://192.168.1.XXX:3000`

## 🔧 Configuración Técnica

### Configuración del Servidor
- **Host**: `0.0.0.0` (permite conexiones externas)
- **Puerto**: `3000` (puerto estándar)
- **CORS**: Habilitado para desarrollo

### Puertos Configurados
- **Desarrollo**: Puerto 3000 con acceso de red
- **Producción**: Puerto 3000 con acceso de red
- **Local**: Puerto 3000 solo localhost

## 🛡️ Consideraciones de Seguridad

### En Desarrollo
- ✅ Solo accesible en tu red local
- ✅ No expuesto a internet
- ✅ CORS configurado para desarrollo

### Para Producción
- 🔒 Usar HTTPS en servidor real
- 🔒 Configurar firewall apropiado
- 🔒 Limitar CORS a dominios específicos

## 🐛 Solución de Problemas

### No Puedo Acceder desde Otro Dispositivo
1. **Verifica la red**: Ambos dispositivos en la misma WiFi
2. **Verifica el firewall**: Permite conexiones en puerto 3000
3. **Verifica la IP**: Usa la IP correcta mostrada por el script
4. **Reinicia el servidor**: `Ctrl+C` y `npm run dev` nuevamente

### El Servidor No Inicia
1. **Puerto ocupado**: Usa `lsof -i :3000` para ver qué usa el puerto
2. **Permisos**: Asegúrate de tener permisos para usar el puerto
3. **Dependencias**: Ejecuta `npm install` nuevamente

### Errores de CORS
1. **Desarrollo**: Ya está configurado automáticamente
2. **Producción**: Configura dominios específicos en next.config.js

## 📋 Ejemplos de Uso

### Desarrollo Normal
```bash
npm run dev
```
Output esperado:
```
🌐 INFORMACIÓN DE RED - CREDIT WITH RAMI
==================================================

📱 ACCESO LOCAL:
   http://localhost:3000

🔗 ACCESO DESDE OTROS DISPOSITIVOS:
   http://192.168.1.123:3000

💡 INSTRUCCIONES:
   1. Asegúrate de que todos los dispositivos estén en la misma red WiFi
   2. En tu teléfono/tablet, abre el navegador y usa una de las IPs de arriba
   3. Si tienes firewall, asegúrate de permitir conexiones en el puerto 3000
```

### Testing en Múltiples Dispositivos
1. **Computadora**: `http://localhost:3000`
2. **Teléfono**: `http://192.168.1.XXX:3000`
3. **Tablet**: `http://192.168.1.XXX:3000`
4. **Otra computadora**: `http://192.168.1.XXX:3000`

## 🎯 Beneficios de esta Configuración

- ✅ **Testing responsive real**: Prueba en dispositivos reales
- ✅ **Colaboración**: Otros pueden ver el sitio en desarrollo
- ✅ **Demostración**: Muestra el sitio a clientes fácilmente
- ✅ **Debug móvil**: Depura problemas específicos de móviles
- ✅ **Performance real**: Testa velocidad en dispositivos reales

