const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function getTenantConfig(tenant) {
  const res = await fetch(`${API_URL}/api/tenant/config?tenant=${tenant}`)
  if (!res.ok) throw new Error(`Failed to fetch tenant config: HTTP ${res.status}`)
  return res.json()
}

export async function getTenantConfigDraft(tenant) {
  const res = await fetch(`${API_URL}/api/tenant/config?tenant=${tenant}&draft=true`)
  if (!res.ok) throw new Error(`Failed to fetch tenant draft config: HTTP ${res.status}`)
  return res.json()
}

export async function updateTenantConfig(tenant, data) {
  const res = await fetch(`${API_URL}/api/tenant/config?tenant=${tenant}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Failed to update tenant config: HTTP ${res.status}`)
  return res.json()
}

export async function saveTenantConfigDraft(tenant, data) {
  const res = await fetch(`${API_URL}/api/tenant/config?tenant=${tenant}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Failed to save tenant draft: HTTP ${res.status}`)
  return res.json()
}

export async function publishTenantConfig(tenant) {
  const res = await fetch(`${API_URL}/api/tenant/config/publish?tenant=${tenant}`, {
    method: 'POST',
  })
  if (!res.ok) throw new Error(`Failed to publish tenant config: HTTP ${res.status}`)
  return res.json()
}

export async function discardTenantDraft(tenant) {
  const res = await fetch(`${API_URL}/api/tenant/config/draft?tenant=${tenant}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error(`Failed to discard tenant draft: HTTP ${res.status}`)
  return res.json()
}

export async function getTenantModules(tenant) {
  const res = await fetch(`${API_URL}/api/tenant/modules?tenant=${tenant}`)
  if (!res.ok) throw new Error(`Failed to fetch tenant modules: HTTP ${res.status}`)
  return res.json()
}

export async function getTemplates() {
  const res = await fetch(`${API_URL}/api/templates`)
  if (!res.ok) throw new Error(`Failed to fetch templates: HTTP ${res.status}`)
  return res.json()
}
