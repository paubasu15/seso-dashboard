# SESO Dashboard

Panel de administración multi-tenant para la plataforma SESO.

## Instalación

```bash
npm install
```

## Correr en desarrollo

```bash
npm run dev
```

> **Requisitos:**
> - API corriendo en `http://localhost:5000`
> - Landing Astro corriendo en `http://localhost:4321`

## URLs de ejemplo

Puedes probar con diferentes tenants usando el query param `?tenant=`:

- http://localhost:5173/app?tenant=acme
- http://localhost:5173/app?tenant=globex
- http://localhost:5173/app (tenant por defecto)

## Build para producción

```bash
npm run build
```

## Feature principal: Editor de Landing

El editor (`/app/editor`) funciona con un sistema de **iframe + postMessage** para comunicarse con la landing real de Astro en tiempo real.

### Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    LandingEditor                         │
│  ┌──────────────┐          ┌────────────────────────┐   │
│  │  EditorPanel │          │  iframe (Astro Landing) │   │
│  │  (w-96)      │ ─────►  │  localhost:4321/preview  │   │
│  │              │ postMsg  │  ?tenant={slug}          │   │
│  └──────────────┘          └────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Comunicación postMessage

React envía mensajes al iframe cuando el usuario edita:

```javascript
const LANDING_URL = import.meta.env.VITE_LANDING_URL || 'http://localhost:4321'

// Cambio de colores
iframeRef.current.contentWindow.postMessage({
  type: 'UPDATE_COLORS',
  payload: { primaryColor: '#10B981', secondaryColor: '#059669' }
}, LANDING_URL)

// Cambio de datos de un componente
iframeRef.current.contentWindow.postMessage({
  type: 'UPDATE_COMPONENT',
  payload: { componentType: 'hero', data: { title: 'Nuevo título' } }
}, LANDING_URL)

// Mostrar/ocultar componente
iframeRef.current.contentWindow.postMessage({
  type: 'TOGGLE_COMPONENT',
  payload: { componentType: 'testimonials', visible: false }
}, LANDING_URL)
```

El iframe envía `{ type: 'PREVIEW_READY' }` cuando está listo para recibir mensajes.

### Layout del Editor

```
┌─────────────────────────────────────────────────────────────┐
│  🖥️ Editor de Landing Page  │  🖥️ Desktop  📱 Tablet  📱 Mobile │
├────────────────────┬────────────────────────────────────────┤
│  ⚙️ General        │                                        │
│  ▼ (accordion)     │                                        │
│    nombre, logo    │                                        │
│    colores...      │          iframe                        │
│                    │   (Astro Landing en tiempo real)       │
│  🦸 Hero      [ON] │                                        │
│  ▶ (collapsed)     │                                        │
│                    │                                        │
│  ✨ Features  [ON] │                                        │
│  💬 Testimonios [ON]│                                       │
│  💰 Precios   [OFF]│                                        │
│  📄 Footer    [ON] │                                        │
│                    │                                        │
│  [💾 Guardar]      │                                        │
└────────────────────┴────────────────────────────────────────┘
```

### Secciones del Editor

| Sección | Toggle | Descripción |
|---------|--------|-------------|
| ⚙️ General | No | Nombre, logo, colores del tenant |
| 🧭 Header | Sí | Links de navegación |
| 🦸 Hero | Sí | Título, subtítulo, CTA |
| ✨ Features | Sí | Características con iconos |
| 💬 Testimonios | Sí | Testimonios de clientes |
| 💰 Precios | Sí | Planes de precios |
| 📄 Footer | Sí | Texto y links del footer |

### Variables de entorno

`.env.development`:
```
VITE_API_URL=http://localhost:5000
VITE_LANDING_URL=http://localhost:4321
VITE_DOMAIN=localhost
VITE_ENV=development
```

## Estructura del proyecto

```
src/
├── api/           # Llamadas a la API (tenantApi.js)
├── components/
│   └── editor/   # Secciones del editor
│       ├── EditorPanel.jsx
│       ├── GeneralSection.jsx
│       ├── HeaderSection.jsx
│       ├── HeroSection.jsx
│       ├── FeaturesSection.jsx
│       ├── TestimonialsSection.jsx
│       ├── PricingSection.jsx
│       └── FooterSection.jsx
├── context/       # TenantContext
├── hooks/         # useTenant hook
├── layouts/       # DashboardLayout
├── pages/         # Dashboard y LandingEditor
└── utils/         # Detección de tenant
```
