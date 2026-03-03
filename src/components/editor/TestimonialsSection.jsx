export default function TestimonialsSection({ data, onChange }) {
  const items = data.items || []

  const updateItem = (id, field, value) => {
    const updated = items.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    onChange({ items: updated })
  }

  const addItem = () => {
    const newItem = {
      id: crypto.randomUUID(),
      name: 'Nombre',
      role: 'Empresa',
      text: 'Texto del testimonio...',
    }
    onChange({ items: [...items, newItem] })
  }

  const removeItem = (id) => {
    onChange({ items: items.filter((t) => t.id !== id) })
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Testimonio {index + 1}</span>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-400 hover:text-red-600 text-xs transition-colors"
            >
              ❌
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Nombre</label>
              <input
                type="text"
                value={item.name || ''}
                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ana García"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Rol / Empresa</label>
              <input
                type="text"
                value={item.role || ''}
                onChange={(e) => updateItem(item.id, 'role', e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="CEO, Acme Corp"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Testimonio</label>
            <textarea
              value={item.text || ''}
              onChange={(e) => updateItem(item.id, 'text', e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={3}
              placeholder="Excelente servicio..."
            />
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full py-2 border-2 border-dashed border-indigo-300 rounded-lg text-indigo-500 hover:border-indigo-500 hover:bg-indigo-50 transition-colors text-sm font-medium"
      >
        ➕ Agregar testimonio
      </button>
    </div>
  )
}
