import { useState, useEffect, useRef, useCallback } from 'react'
import { useTenant } from '../hooks/useTenant.js'
import {
  getTenantConfigDraft,
  saveTenantConfigDraft,
  publishTenantConfig,
  discardTenantDraft,
} from '../api/tenantApi.js'
import EditorPanel from '../components/editor/EditorPanel.jsx'

const LANDING_URL = import.meta.env.VITE_LANDING_URL || 'http://localhost:4321'
const DEBOUNCE_DELAY_MS = 500

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
  const [hasChanges, setHasChanges] = useState(false)
  const [saveError, setSaveError] = useState(null)
  const [publishing, setPublishing] = useState(false)
  const [publishError, setPublishError] = useState(null)
  const [discarding, setDiscarding] = useState(false)
  const iframeRef = useRef(null)
  const debounceRef = useRef(null)
  const pendingConfigRef = useRef(null)

  // Load draft config on mount; config from context is the fallback
  useEffect(() => {
    if (!tenant) return
    getTenantConfigDraft(tenant)
      .then((draft) => {
        setLocalConfig(draft)
      })
      .catch(() => {
        setLocalConfig(config)
      })
  }, [tenant]) // intentionally run only on mount / tenant change

  const reloadIframe = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.src = `${LANDING_URL}/preview?tenant=${tenant}&draft=true&t=${Date.now()}`
    }
  }, [tenant])

  const saveDraft = useCallback(
    async (cfg) => {
      setSaving(true)
      setSaveError(null)
      try {
        await saveTenantConfigDraft(tenant, cfg)
        reloadIframe()
      } catch (err) {
        setSaveError(err.message || 'Error al guardar el borrador')
      } finally {
        setSaving(false)
      }
    },
    [tenant, reloadIframe]
  )

  const handleChange = useCallback(
    (updates) => {
      setHasChanges(true)
      setSaveError(null)
      setPublishError(null)
      const newConfig = { ...localConfig, ...updates }
      setLocalConfig(newConfig)
      pendingConfigRef.current = newConfig

      // Debounce: save draft after 500ms without changes
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        if (pendingConfigRef.current) {
          saveDraft(pendingConfigRef.current)
          pendingConfigRef.current = null
        }
      }, DEBOUNCE_DELAY_MS)
    },
    [localConfig, saveDraft]
  )

  const handleManualSave = async () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    pendingConfigRef.current = null
    await saveDraft(localConfig)
  }

  const handlePublish = async () => {
    setPublishing(true)
    setPublishError(null)
    try {
      await publishTenantConfig(tenant)
      setConfig(localConfig)
      setHasChanges(false)
      reloadIframe()
    } catch (err) {
      setPublishError(err.message || 'Error al publicar')
    } finally {
      setPublishing(false)
    }
  }

  const handleDiscard = async () => {
    setDiscarding(true)
    setSaveError(null)
    setPublishError(null)
    try {
      await discardTenantDraft(tenant)
      setLocalConfig(config)
      setHasChanges(false)
      reloadIframe()
    } catch (err) {
      setSaveError(err.message || 'Error al descartar cambios')
    } finally {
      setDiscarding(false)
    }
  }

  const currentViewport = VIEWPORTS.find((v) => v.id === viewport)
  const iframeSrc = `${LANDING_URL}/preview?tenant=${tenant}&draft=true`

  return (
    <div className="-m-6 h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Editor header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-gray-800">Editor de Landing Page</h2>
          {saving && (
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              Guardando...
            </span>
          )}
          {hasChanges && !saving && (
            <span className="text-xs text-amber-600 font-medium">⚠️ Cambios sin publicar</span>
          )}
        </div>
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
            onSave={handleManualSave}
            onPublish={handlePublish}
            onDiscard={handleDiscard}
            saving={saving}
            publishing={publishing}
            discarding={discarding}
            hasChanges={hasChanges}
            saveError={saveError}
            publishError={publishError}
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
