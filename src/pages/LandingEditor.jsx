import { useState, useEffect } from 'react'
import { useTenant } from '../hooks/useTenant.js'
import { updateTenantConfig } from '../api/tenantApi.js'
import EditorPanel from '../components/editor/EditorPanel.jsx'
import LandingPreview from '../components/preview/LandingPreview.jsx'

const VIEWPORTS = [
  { id: 'mobile', label: '📱 Mobile', width: 375 },
  { id: 'tablet', label: '📱 Tablet', width: 768 },
  { id: 'desktop', label: '🖥️ Desktop', width: '100%' },
]

export default function LandingEditor() {
  const { tenant, config, setConfig } = useTenant()
  const [localConfig, setLocalConfig] = useState(config)
  const [viewport, setViewport] = useState('desktop')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState(null)

  // Sync when context config changes
  useEffect(() => {
    setLocalConfig(config)
  }, [config])

  const handleChange = (updates) => {
    setSaved(false)
    setSaveError(null)
    setLocalConfig((prev) => ({ ...prev, ...updates }))
  }

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    setSaveError(null)
    try {
      await updateTenantConfig(tenant, localConfig)
      setConfig(localConfig)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setSaveError(err.message || 'Error al guardar los cambios')
    } finally {
      setSaving(false)
    }
  }

  const currentViewport = VIEWPORTS.find((v) => v.id === viewport)

  return (
    <div className="-m-6 h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Editor header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <h2 className="font-semibold text-gray-800">Editor de Landing Page</h2>
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {VIEWPORTS.map((v) => (
            <button
              key={v.id}
              onClick={() => setViewport(v.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                viewport === v.id
                  ? 'bg-white shadow text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Split layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - Editor */}
        <div className="w-80 flex-shrink-0 bg-gray-50 border-r border-gray-200 overflow-hidden flex flex-col">
          <EditorPanel
            data={localConfig}
            onChange={handleChange}
            onSave={handleSave}
            saving={saving}
            saved={saved}
            saveError={saveError}
          />
        </div>

        {/* Right panel - Preview */}
        <div className="flex-1 bg-gray-200 flex items-center justify-center overflow-hidden p-4">
          <div
            className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300"
            style={{
              width: currentViewport?.width === '100%' ? '100%' : `${currentViewport?.width}px`,
              height: '100%',
              maxWidth: '100%',
            }}
          >
            <LandingPreview config={localConfig} viewport={viewport} />
          </div>
        </div>
      </div>
    </div>
  )
}
