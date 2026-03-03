import { useState } from 'react'
import GeneralSection from './GeneralSection.jsx'
import HeaderSection from './HeaderSection.jsx'
import HeroSection from './HeroSection.jsx'
import FeaturesSection from './FeaturesSection.jsx'
import TestimonialsSection from './TestimonialsSection.jsx'
import PricingSection from './PricingSection.jsx'
import FooterSection from './FooterSection.jsx'

const SECTION_MAP = {
  header: { label: '🧭 Header', Component: HeaderSection },
  hero: { label: '🦸 Hero', Component: HeroSection },
  features: { label: '✨ Features', Component: FeaturesSection },
  testimonials: { label: '💬 Testimonios', Component: TestimonialsSection },
  pricing: { label: '💰 Precios', Component: PricingSection },
  footer: { label: '📄 Footer', Component: FooterSection },
}

const DEFAULT_COMPONENTS = [
  { type: 'hero', visible: true, data: {} },
  { type: 'features', visible: true, data: { title: 'Features', items: [] } },
  { type: 'footer', visible: true, data: { text: '', links: [] } },
]

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

function SectionAccordion({ sectionDef, comp, onToggleVisible, onDataChange }) {
  const [open, setOpen] = useState(false)
  const { label, Component } = sectionDef

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Accordion header */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-white cursor-pointer hover:bg-gray-50 select-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-700">{label}</span>
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
          <Component data={comp.data || {}} onChange={onDataChange} />
        </div>
      )}
    </div>
  )
}

export default function EditorPanel({ data, onChange, onSave, saving, saved, saveError }) {
  const [generalOpen, setGeneralOpen] = useState(true)

  const components = getComponents(data)

  const handleToggleVisible = (type, visible) => {
    const newComponents = components.map((c) =>
      c.type === type ? { ...c, visible } : c
    )
    onChange({ components: newComponents })
  }

  const handleDataChange = (type, updates) => {
    const newComponents = components.map((c) =>
      c.type === type ? { ...c, data: { ...c.data, ...updates } } : c
    )
    onChange({ components: newComponents })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
        {components.map((comp) => {
          const sectionDef = SECTION_MAP[comp.type]
          if (!sectionDef) return null
          return (
            <SectionAccordion
              key={comp.type}
              sectionDef={sectionDef}
              comp={comp}
              onToggleVisible={handleToggleVisible}
              onDataChange={(updates) => handleDataChange(comp.type, updates)}
            />
          )
        })}
      </div>

      {/* Save button */}
      <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
        {saveError && <p className="text-xs text-red-500 mb-2">⚠️ {saveError}</p>}
        <button
          onClick={onSave}
          disabled={saving}
          className="w-full py-2.5 px-4 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Guardando...
            </>
          ) : saved ? (
            <>✅ ¡Guardado!</>
          ) : (
            '💾 Guardar cambios'
          )}
        </button>
      </div>
    </div>
  )
}
