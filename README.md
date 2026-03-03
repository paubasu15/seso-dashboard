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

> **Requisito:** Tener la API corriendo en `http://localhost:5000`

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

El editor (`/app/editor`) permite al tenant modificar en tiempo real:

- **General**: nombre, logo, colores (primario, secundario, fondo, texto)
- **Hero**: título, subtítulo, botón CTA
- **Features**: lista de características con ícono, título y descripción
- **Footer**: texto y links

El **preview en tiempo real** muestra cómo se verá la landing en:
- 📱 Mobile (375px)
- 📱 Tablet (768px)
- 🖥️ Desktop (100%)

Los cambios se guardan en la API con el botón "Guardar cambios".

## Estructura del proyecto

```
src/
├── api/           # Llamadas a la API
├── components/    # Componentes reutilizables
│   ├── editor/   # Formularios del editor
│   └── preview/  # Preview de la landing
├── context/       # TenantContext
├── hooks/         # useTenant hook
├── layouts/       # DashboardLayout
├── pages/         # Dashboard y LandingEditor
└── utils/         # Detección de tenant
```
