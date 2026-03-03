export function detectTenant() {
  const hostname = window.location.hostname

  // In production, detect by subdomain
  if (import.meta.env.VITE_ENV === 'production') {
    const parts = hostname.split('.')
    if (parts.length > 2) {
      return parts[0]
    }
  }

  // In development, detect by ?tenant= query param
  const params = new URLSearchParams(window.location.search)
  const tenantParam = params.get('tenant')
  if (tenantParam) {
    return tenantParam
  }

  return 'default'
}
