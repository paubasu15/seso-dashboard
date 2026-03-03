const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function getTenantConfig(tenant) {
  const res = await fetch(`${API_URL}/api/tenant/config?tenant=${tenant}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function updateTenantConfig(tenant, data) {
  const res = await fetch(`${API_URL}/api/tenant/config?tenant=${tenant}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function getTenantModules(tenant) {
  const res = await fetch(`${API_URL}/api/tenant/modules?tenant=${tenant}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
