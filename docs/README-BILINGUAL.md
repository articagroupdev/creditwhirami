# Credit with Rami - Landing Page Bilingüe

## 🌍 Funcionalidad Bilingüe

La landing page de "Credit with Rami" ahora incluye soporte completo para **español** e **inglés** con un sistema de traducción dinámico.

### ✨ Características Implementadas

1. **Toggle de Idioma**: Botón en el header para cambiar entre español e inglés
2. **Traducción Dinámica**: Todo el contenido se traduce instantáneamente
3. **Persistencia**: El idioma seleccionado se guarda en localStorage
4. **Traducciones Completas**: Todas las secciones están traducidas

### 🎯 Secciones Traducidas

- **Header**: Navegación y logo
- **Hero**: Título principal, subtítulo, botones y estadísticas
- **Features**: 6 servicios con descripciones y características
- **Pricing**: 3 planes con precios y características
- **Testimonials**: Casos de éxito y estadísticas
- **CTA**: Llamada a la acción y información de contacto

### 🚀 Cómo Usar

1. **Cambiar Idioma**: Haz clic en el botón "EN/ES" en el header
2. **Idioma por Defecto**: Inglés (se puede cambiar en el código)
3. **Persistencia**: El idioma se recuerda entre sesiones

### 📝 Traducciones Clave

#### Inglés → Español
- "Credit Score" → "Puntuación Crediticia"
- "Financial Freedom" → "Libertad Financiera"
- "Credit Repair" → "Reparación Crediticia"
- "Success Stories" → "Casos de Éxito"
- "Get Started" → "Comenzar"

### 🔧 Estructura Técnica

```
src/
├── i18n/
│   └── translations.ts          # Archivo de traducciones
├── scripts/
│   └── translations.js          # Sistema de traducción
├── components/
│   ├── LanguageToggle.astro    # Componente de cambio de idioma
│   ├── Header.astro            # Header con navegación
│   ├── Hero.astro              # Sección principal
│   ├── Features.astro          # Servicios
│   ├── Pricing.astro           # Planes de precios
│   ├── Testimonials.astro      # Testimonios
│   └── CTA.astro               # Llamada a la acción
```

### 🎨 Atributos de Traducción

- `data-translate="key"` - Traduce texto simple
- `data-translate-features="service"` - Traduce listas de características
- `data-translate-plan="planType"` - Traduce características de planes
- `data-translate-testimonial` - Traduce testimonios

### 🌟 Ejemplo de Uso

```html
<!-- Texto simple -->
<h1 data-translate="hero.title">Transform Your</h1>

<!-- Lista de características -->
<ul data-translate-features="creditRepair">
  <li><span data-translate-feature="0">Feature 1</span></li>
  <li><span data-translate-feature="1">Feature 2</span></li>
</ul>
```

### 🚀 Comandos

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

### 📱 Responsive

La funcionalidad bilingüe funciona perfectamente en:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

### 🎯 Próximos Pasos

1. Agregar más idiomas (francés, portugués)
2. Detección automática de idioma del navegador
3. SEO optimizado para múltiples idiomas
4. Traducción de meta tags y títulos

---

**¡La landing page está lista para usuarios hispanohablantes e ingleses!** 🎉

