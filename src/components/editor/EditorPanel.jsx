import { useState, useEffect } from 'react'
import GeneralSection from './GeneralSection.jsx'
import DynamicComponentEditor from './DynamicComponentEditor.jsx'
import TemplateSelector from './TemplateSelector.jsx'
import { getTemplates } from '../../api/tenantApi.js'

const COMPONENT_EMOJI = {
  header: '🧭',
  hero: '🦸',
  features: '✨',
  testimonials: '💬',
  pricing: '💰',
  footer: '📄',
  'cta-banner': '📢',
  gallery: '🖼️',
  skills: '🎯',
  'contact-form': '📬',
  'hero-slider': '🎠',
  'product-grid': '🛍️',
  'trust-badges': '✅',
}

function getComponents(data) {
  if (data.components && Array.isArray(data.components) && data.components.length > 0) {
    return data.components
  }
  // Build from legacy flat format
  return [
    { type: 'hero', visible: true, data: data.hero || {} },
    {
      type: 'features',
      visible: true,
      data: { title: 'Features', items: data.features || [] },
    },
    { type: 'footer', visible: true, data: data.footer || { text: '', links: [] } },
  ]
}

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onChange(!checked)
      }}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${
        checked ? 'bg-indigo-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-4.5' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

function SectionAccordion({ comp, schema, onToggleVisible, onDataChange }) {
  const [open, setOpen] = useState(false)
  const emoji = COMPONENT_EMOJI[comp.type] || '📦'
  const label = schema?.label || comp.type

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Accordion header */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-white cursor-pointer hover:bg-gray-50 select-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-700">
            {emoji} {label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ToggleSwitch
            checked={comp.visible !== false}
            onChange={(val) => onToggleVisible(comp.type, val)}
          />
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {/* Accordion body */}
      {open && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <DynamicComponentEditor
            schema={schema?.fields || []}
            data={comp.data || {}}
            onChange={onDataChange}
          />
        </div>
      )}
    </div>
  )
}

export default function EditorPanel({ data, onChange, onSave, onPublish, onDiscard, saving, publishing, discarding, hasChanges, saveError, publishError }) {
  const [generalOpen, setGeneralOpen] = useState(true)
  const [templates, setTemplates] = useState([])
  const [activeTemplate, setActiveTemplate] = useState(null)
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [templateLoadError, setTemplateLoadError] = useState(null)

  useEffect(() => {
    getTemplates()
      .then(setTemplates)
      .catch((err) => setTemplateLoadError(err.message || 'Error al cargar plantillas'))
  }, [])

  useEffect(() => {
    if (templates.length > 0 && data?.template) {
      const tpl = templates.find((t) => t.id === data.template)
      setActiveTemplate(tpl || null)
    }
  }, [templates, data?.template])

  const handleTemplateChange = (newTemplateId) => {
    const newTpl = templates.find((t) => t.id === newTemplateId)
    if (!newTpl) return
    const newComponents = newTpl.components.map((comp) => ({
      type: comp.type,
      order: comp.order,
      visible: comp.visible,
      data: { ...comp.defaultData },
    }))
    onChange({
      ...data,
      template: newTemplateId,
      components: newComponents,
    })
  }

  const components = getComponents(data)

  const handleToggleVisible = (type, visible) => {
    const newComponents = components.map((c) =>
      c.type === type ? { ...c, visible } : c
    )
    onChange({ components: newComponents })
  }

  const handleDataChange = (type, newData) => {
    const newComponents = components.map((c) =>
      c.type === type ? { ...c, data: newData } : c
    )
    onChange({ components: newComponents })
  }

  // Build a map from component type → schema info (label + fields)
  const schemaMap = {}
  if (activeTemplate) {
    activeTemplate.components.forEach((tplComp) => {
      schemaMap[tplComp.type] = {
        label: tplComp.label || tplComp.type,
        fields: tplComp.schema || [],
      }
    })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Template selector button */}
        {templateLoadError ? (
          <p className="text-xs text-red-500">⚠️ {templateLoadError}</p>
        ) : (
        <button
          type="button"
          onClick={() => setShowTemplateSelector(true)}
          className="w-full py-2 px-3 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors flex items-center justify-between"
        >
          <span>📐 Cambiar plantilla</span>
          {activeTemplate && (
            <span className="text-gray-500">{activeTemplate.name}</span>
          )}
        </button>
        )}

        {/* General section - always visible */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="flex items-center justify-between px-4 py-3 bg-white cursor-pointer hover:bg-gray-50 select-none"
            onClick={() => setGeneralOpen((prev) => !prev)}
          >
            <span className="text-xs font-medium text-gray-700">⚙️ General</span>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${generalOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {generalOpen && (
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
              <GeneralSection data={data} onChange={onChange} />
            </div>
          )}
        </div>

        {/* Dynamic component sections */}
        {components.map((comp) => (
          <SectionAccordion
            key={comp.type}
            comp={comp}
            schema={schemaMap[comp.type]}
            onToggleVisible={handleToggleVisible}
            onDataChange={(newData) => handleDataChange(comp.type, newData)}
          />
        ))}
      </div>

      {/* Action buttons */}
      <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0 space-y-2">
        {saveError && <p className="text-xs text-red-500">⚠️ {saveError}</p>}
        {publishError && <p className="text-xs text-red-500">⚠️ {publishError}</p>}
        <button
          onClick={onSave}
          disabled={saving}
          className="w-full py-2 px-4 bg-gray-700 text-white rounded-lg font-medium text-sm hover:bg-gray-800 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Guardando...
            </>
          ) : (
            '💾 Guardar borrador'
          )}
        </button>
        <button
          onClick={onPublish}
          disabled={publishing || saving}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
        >
          {publishing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Publicando...
            </>
          ) : (
            '🚀 Publicar'
          )}
        </button>
        {hasChanges && (
          <button
            onClick={onDiscard}
            disabled={discarding}
            className="w-full py-2 px-4 bg-white text-red-600 border border-red-300 rounded-lg font-medium text-sm hover:bg-red-50 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
          >
            {discarding ? (
              <>
                <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                Descartando...
              </>
            ) : (
              '🗑️ Descartar cambios'
            )}
          </button>
        )}
      </div>

      {/* Template selector modal */}
      {showTemplateSelector && (
        <TemplateSelector
          currentTemplate={data?.template}
          onChangeTemplate={handleTemplateChange}
          onClose={() => setShowTemplateSelector(false)}
        />
      )}
    </div>
  )
}
