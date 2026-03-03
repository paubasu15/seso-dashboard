import { useState, useEffect, useRef, useCallback } from 'react'
import { useTenant } from '../hooks/useTenant.js'
import { updateTenantConfig } from '../api/tenantApi.js'
import EditorPanel from '../components/editor/EditorPanel.jsx'

const LANDING_URL = import.meta.env.VITE_LANDING_URL || 'http://localhost:4321'

const VIEWPORTS = [
  { id: 'desktop', label: '🖥️ Desktop', width: '100%' },
  { id: 'tablet', label: '📱 Tablet', width: 768 },
  { id: 'mobile', label: '📱 Mobile', width: 375 },
]

export default function LandingEditor() {
  const { tenant, config, setConfig } = useTenant()
  const [localConfig, setLocalConfig] = useState(config)
  const [viewport, setViewport] = useState('desktop')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState(null)
  const iframeRef = useRef(null)
  const previewReadyRef = useRef(false)

  // Sync when context config changes
  useEffect(() => {
    setLocalConfig(config)
  }, [config])

  const sendMessage = useCallback((message) => {
    if (previewReadyRef.current && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(message, LANDING_URL)
    }
  }, [])

  const sendFullConfig = useCallback((cfg) => {
    sendMessage({
      type: 'UPDATE_COLORS',
      payload: {
        primaryColor: cfg.primaryColor,
        secondaryColor: cfg.secondaryColor,
        backgroundColor: cfg.backgroundColor,
        textColor: cfg.textColor,
      },
    })
    if (cfg.components && Array.isArray(cfg.components)) {
      cfg.components.forEach((comp) => {
        sendMessage({
          type: 'UPDATE_COMPONENT',
          payload: { componentType: comp.type, data: comp.data },
        })
        if (comp.visible === false) {
          sendMessage({
            type: 'TOGGLE_COMPONENT',
            payload: { componentType: comp.type, visible: false },
          })
        }
      })
    }
  }, [sendMessage])

  // Listen for PREVIEW_READY from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'PREVIEW_READY') {
        previewReadyRef.current = true
        sendFullConfig(localConfig)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [localConfig, sendFullConfig])

  const handleChange = (updates) => {
    setSaved(false)
    setSaveError(null)
    const newConfig = { ...localConfig, ...updates }
    setLocalConfig(newConfig)

    // Send color updates
    const colorKeys = ['primaryColor', 'secondaryColor', 'backgroundColor', 'textColor']
    const hasColorUpdate = colorKeys.some((k) => k in updates)
    if (hasColorUpdate) {
      sendMessage({
        type: 'UPDATE_COLORS',
        payload: {
          primaryColor: newConfig.primaryColor,
          secondaryColor: newConfig.secondaryColor,
          backgroundColor: newConfig.backgroundColor,
          textColor: newConfig.textColor,
        },
      })
    }

    // Send component updates
    if (updates.components && Array.isArray(updates.components)) {
      const prevComponents = localConfig.components || []
      updates.components.forEach((comp) => {
        const prev = prevComponents.find((p) => p.type === comp.type)
        if (prev?.visible !== comp.visible) {
          sendMessage({
            type: 'TOGGLE_COMPONENT',
            payload: { componentType: comp.type, visible: comp.visible !== false },
          })
        }
        if (JSON.stringify(prev?.data) !== JSON.stringify(comp.data)) {
          sendMessage({
            type: 'UPDATE_COMPONENT',
            payload: { componentType: comp.type, data: comp.data },
          })
        }
      })
    }
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
  const iframeSrc = `${LANDING_URL}/preview?tenant=${tenant}`

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
        <div className="w-96 flex-shrink-0 bg-gray-50 border-r border-gray-200 overflow-hidden flex flex-col">
          <EditorPanel
            data={localConfig}
            onChange={handleChange}
            onSave={handleSave}
            saving={saving}
            saved={saved}
            saveError={saveError}
          />
        </div>

        {/* Right panel - iframe */}
        <div className="flex-1 bg-gray-200 flex items-center justify-center overflow-hidden p-4">
          <div
            className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300"
            style={{
              width: currentViewport?.width === '100%' ? '100%' : `${currentViewport?.width}px`,
              height: '100%',
              maxWidth: '100%',
            }}
          >
            <iframe
              ref={iframeRef}
              src={iframeSrc}
              className="w-full h-full border-0"
              title="Landing Page Preview"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
