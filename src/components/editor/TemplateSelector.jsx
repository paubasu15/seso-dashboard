import { useState, useEffect } from 'react'
import { getTemplates } from '../../api/tenantApi.js'

export default function TemplateSelector({ currentTemplate, onChangeTemplate, onClose }) {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pending, setPending] = useState(null)

  useEffect(() => {
    getTemplates()
      .then(setTemplates)
      .catch((err) => setError(err.message || 'Error al cargar plantillas'))
      .finally(() => setLoading(false))
  }, [])

  const handleSelect = (templateId) => {
    if (templateId === currentTemplate) return
    setPending(templateId)
  }

  const handleConfirm = () => {
    if (pending) {
      onChangeTemplate(pending)
      setPending(null)
      onClose()
    }
  }

  const handleCancel = () => {
    setPending(null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
          <h2 className="font-semibold text-gray-800">📐 Cambiar plantilla</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && (
            <div className="flex items-center justify-center py-10">
              <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <p className="text-sm text-red-500 text-center py-10">⚠️ {error}</p>
          )}

          {!loading && !error && (
            <div className="space-y-3">
              {templates.map((tpl) => {
                const isActive = tpl.id === currentTemplate
                const isPending = tpl.id === pending
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => handleSelect(tpl.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isActive
                        ? 'border-indigo-500 bg-indigo-50'
                        : isPending
                        ? 'border-indigo-300 bg-indigo-50/50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-800 text-sm">{tpl.name}</span>
                      {isActive && (
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                          Activa
                        </span>
                      )}
                    </div>
                    {tpl.description && (
                      <p className="text-xs text-gray-500 mb-2">{tpl.description}</p>
                    )}
                    {tpl.components && tpl.components.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {tpl.components.map((comp) => (
                          <span
                            key={comp.type}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                          >
                            {comp.type}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Confirmation footer */}
        {pending && (
          <div className="px-6 py-4 border-t border-gray-200 bg-amber-50 flex-shrink-0">
            <p className="text-sm text-amber-800 mb-3">
              ⚠️ Cambiar de plantilla reemplazará los componentes actuales. ¿Continuar?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleConfirm}
                className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Continuar
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-2 px-4 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
