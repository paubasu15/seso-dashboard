export default function FeaturesSection({ data, onChange }) {
  const features = data.features || []

  const updateFeature = (id, field, value) => {
    const updated = features.map((f) =>
      f.id === id ? { ...f, [field]: value } : f
    )
    onChange({ features: updated })
  }

  const addFeature = () => {
    const newFeature = {
      id: crypto.randomUUID(),
      icon: '✨',
      title: 'Nueva feature',
      description: 'Descripción de la feature',
    }
    onChange({ features: [...features, newFeature] })
  }

  const removeFeature = (id) => {
    onChange({ features: features.filter((f) => f.id !== id) })
  }

  return (
    <div className="space-y-4">
      {features.map((feature, index) => (
        <div key={feature.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Feature {index + 1}</span>
            <button
              onClick={() => removeFeature(feature.id)}
              className="text-red-400 hover:text-red-600 text-sm transition-colors"
            >
              Eliminar
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Ícono</label>
              <input
                type="text"
                value={feature.icon || ''}
                onChange={(e) => updateFeature(feature.id, 'icon', e.target.value)}
                className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="⚡"
              />
            </div>
            <div className="col-span-3">
              <label className="block text-xs text-gray-500 mb-1">Título</label>
              <input
                type="text"
                value={feature.title || ''}
                onChange={(e) => updateFeature(feature.id, 'title', e.target.value)}
                className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Título"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Descripción</label>
            <input
              type="text"
              value={feature.description || ''}
              onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
              className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Descripción de la feature"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addFeature}
        className="w-full py-2 border-2 border-dashed border-indigo-300 rounded-lg text-indigo-500 hover:border-indigo-500 hover:bg-indigo-50 transition-colors text-sm font-medium"
      >
        + Agregar feature
      </button>
    </div>
  )
}
