# Configuración del Servicio de Email

## Instrucciones para implementar el envío real de emails

El sistema está preparado para enviar emails a `info@creditwhitrami.com` cuando los usuarios completen el formulario de consulta gratuita. Actualmente está simulado, pero puedes implementar el envío real siguiendo estos pasos:

### Opción 1: SendGrid (Recomendado)

1. **Instalar SendGrid:**
   ```bash
   npm install @sendgrid/mail
   ```

2. **Crear cuenta en SendGrid:**
   - Ve a [sendgrid.com](https://sendgrid.com)
   - Crea una cuenta gratuita
   - Verifica tu dominio o email

3. **Obtener API Key:**
   - En el dashboard de SendGrid, ve a Settings > API Keys
   - Crea una nueva API Key con permisos de envío

4. **Configurar variables de entorno:**
   Crea un archivo `.env.local` en la raíz del proyecto:
   ```
   SENDGRID_API_KEY=tu_api_key_aquí
   SENDGRID_FROM_EMAIL=noreply@creditwhitrami.com
   ```

5. **Actualizar el archivo API:**
   En `/src/app/api/consultation/route.ts`, descomenta y modifica la sección de SendGrid:
   ```typescript
   const sgMail = require('@sendgrid/mail')
   sgMail.setApiKey(process.env.SENDGRID_API_KEY)
   
   await sgMail.send({
     to: 'info@creditwhitrami.com',
     from: process.env.SENDGRID_FROM_EMAIL,
     subject: emailContent.subject,
     html: emailContent.html,
   })
   ```

### Opción 2: Nodemailer con Gmail

1. **Instalar Nodemailer:**
   ```bash
   npm install nodemailer
   npm install @types/nodemailer --save-dev
   ```

2. **Configurar variables de entorno:**
   ```
   GMAIL_USER=tu_email@gmail.com
   GMAIL_APP_PASSWORD=tu_contraseña_de_aplicación
   ```

3. **Implementar en la API:**
   ```typescript
   import nodemailer from 'nodemailer'
   
   const transporter = nodemailer.createTransporter({
     service: 'gmail',
     auth: {
       user: process.env.GMAIL_USER,
       pass: process.env.GMAIL_APP_PASSWORD,
     },
   })
   
   await transporter.sendMail({
     from: process.env.GMAIL_USER,
     to: 'info@creditwhitrami.com',
     subject: emailContent.subject,
     html: emailContent.html,
   })
   ```

### Opción 3: Resend (Moderno y fácil)

1. **Instalar Resend:**
   ```bash
   npm install resend
   ```

2. **Configurar:**
   ```
   RESEND_API_KEY=tu_api_key
   ```

3. **Implementar:**
   ```typescript
   import { Resend } from 'resend'
   
   const resend = new Resend(process.env.RESEND_API_KEY)
   
   await resend.emails.send({
     from: 'noreply@creditwhitrami.com',
     to: 'info@creditwhitrami.com',
     subject: emailContent.subject,
     html: emailContent.html,
   })
   ```

## Funcionalidades Actuales

✅ **Formulario de consulta:** Funcional en Hero, Header y CTA
✅ **Validación de datos:** Campos requeridos y formato de email
✅ **API endpoint:** `/api/consultation` para procesar formularios
✅ **Redirección a WhatsApp:** Automática después del envío
✅ **Experiencia de usuario:** Loading states y mensajes de confirmación

## Próximos Pasos

1. Elegir un servicio de email (SendGrid recomendado)
2. Configurar las credenciales
3. Probar el envío en desarrollo
4. Verificar que los emails lleguen a `info@creditwhitrami.com`
5. Configurar el dominio para el envío (opcional pero recomendado)

## Número de WhatsApp Configurado

El sistema redirige automáticamente a: **+1 (786) 883-5543**

El mensaje incluye:
- Nombre del cliente
- Confirmación de que llenó el formulario
- El mensaje que escribió (si lo hay)
