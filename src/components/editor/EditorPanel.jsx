import { useState } from 'react'
import GeneralSection from './GeneralSection.jsx'
import HeroSection from './HeroSection.jsx'
import FeaturesSection from './FeaturesSection.jsx'
import FooterSection from './FooterSection.jsx'

const SECTIONS = [
  { id: 'general', label: '⚙️ General', component: GeneralSection },
  { id: 'hero', label: '🦸 Hero', component: HeroSection },
  { id: 'features', label: '✨ Features', component: FeaturesSection },
  { id: 'footer', label: '📄 Footer', component: FooterSection },
]

export default function EditorPanel({ data, onChange, onSave, saving, saved, saveError }) {
  const [activeSection, setActiveSection] = useState('general')

  const ActiveComponent = SECTIONS.find((s) => s.id === activeSection)?.component

  return (
    <div className="flex flex-col h-full">
      {/* Section tabs */}
      <div className="flex border-b border-gray-200 bg-white">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-3 text-xs font-medium transition-colors ${
              activeSection === section.id
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Section content */}
      <div className="flex-1 overflow-y-auto p-4">
        {ActiveComponent && (
          <ActiveComponent data={data} onChange={onChange} />
        )}
      </div>

      {/* Save button */}
      <div className="p-4 border-t border-gray-200 bg-white">
        {saveError && (
          <p className="text-xs text-red-500 mb-2">⚠️ {saveError}</p>
        )}
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
            <>✅ Guardado</>
          ) : (
            'Guardar cambios'
          )}
        </button>
      </div>
    </div>
  )
}
