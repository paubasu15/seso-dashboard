const ICON_OPTIONS = [
  { value: 'rocket', label: '🚀 Rocket' },
  { value: 'shield', label: '🛡️ Shield' },
  { value: 'chart', label: '📊 Chart' },
  { value: 'star', label: '⭐ Star' },
  { value: 'zap', label: '⚡ Zap' },
  { value: 'heart', label: '❤️ Heart' },
]

export default function FeaturesSection({ data, onChange }) {
  const items = data.items || []
  const sectionTitle = data.title || ''

  const updateItem = (id, field, value) => {
    const updated = items.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    onChange({ items: updated })
  }

  const addItem = () => {
    const newItem = {
      id: crypto.randomUUID(),
      icon: 'rocket',
      title: 'Nueva feature',
      description: 'Descripción de la feature',
    }
    onChange({ items: [...items, newItem] })
  }

  const removeItem = (id) => {
    onChange({ items: items.filter((f) => f.id !== id) })
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Título de la sección</label>
        <input
          type="text"
          value={sectionTitle}
          onChange={(e) => onChange({ title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Nuestras características"
        />
      </div>
      {items.map((item, index) => (
        <div key={item.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Feature {index + 1}</span>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-400 hover:text-red-600 text-xs transition-colors"
            >
              ❌
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Ícono</label>
              <select
                value={item.icon || 'rocket'}
                onChange={(e) => updateItem(item.id, 'icon', e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-gray-500 mb-1">Título</label>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Título"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Descripción</label>
            <textarea
              value={item.description || ''}
              onChange={(e) => updateItem(item.id, 'description', e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={2}
              placeholder="Descripción de la feature"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full py-2 border-2 border-dashed border-indigo-300 rounded-lg text-indigo-500 hover:border-indigo-500 hover:bg-indigo-50 transition-colors text-sm font-medium"
      >
        ➕ Agregar feature
      </button>
    </div>
  )
}
