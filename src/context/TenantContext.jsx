import { createContext, useState, useEffect } from 'react'
import { detectTenant } from '../utils/tenantDetector.js'
import { getTenantConfig, getTenantModules } from '../api/tenantApi.js'

export const TenantContext = createContext(null)

const DEFAULT_CONFIG = {
  name: 'Mi Empresa',
  logo: '',
  primaryColor: '#6366f1',
  secondaryColor: '#8b5cf6',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  hero: {
    title: 'Bienvenido a nuestra plataforma',
    subtitle: 'La mejor solución para tu negocio',
    ctaText: 'Comenzar ahora',
    ctaLink: '#',
  },
  features: [
    { id: 1, icon: '⚡', title: 'Rápido', description: 'Rendimiento excepcional' },
    { id: 2, icon: '🔒', title: 'Seguro', description: 'Máxima seguridad' },
    { id: 3, icon: '📊', title: 'Analytics', description: 'Datos en tiempo real' },
  ],
  footer: {
    text: '© 2025 Mi Empresa. Todos los derechos reservados.',
    links: [
      { id: 1, label: 'Privacidad', url: '#' },
      { id: 2, label: 'Términos', url: '#' },
    ],
  },
}

const DEFAULT_MODULES = [
  { id: 'editor', name: 'Editor de Landing', icon: '🎨', active: true, path: '/editor' },
  { id: 'analytics', name: 'Analytics', icon: '📊', active: true, path: '/analytics' },
  { id: 'users', name: 'Usuarios', icon: '👥', active: false, path: '/users' },
  { id: 'billing', name: 'Facturación', icon: '💳', active: false, path: '/billing' },
]

export function TenantProvider({ children }) {
  const [tenant, setTenant] = useState('default')
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [modules, setModules] = useState(DEFAULT_MODULES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const tenantId = detectTenant()
    setTenant(tenantId)

    async function loadData() {
      try {
        const [cfg, mods] = await Promise.all([
          getTenantConfig(tenantId),
          getTenantModules(tenantId),
        ])
        if (cfg && cfg.name) setConfig(cfg)
        if (mods && Array.isArray(mods)) setModules(mods)
      } catch {
        // API not available, use defaults
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <TenantContext.Provider value={{ tenant, config, setConfig, modules, loading }}>
      {children}
    </TenantContext.Provider>
  )
}
