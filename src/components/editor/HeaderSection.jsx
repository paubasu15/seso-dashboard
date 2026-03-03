export default function HeaderSection({ data, onChange }) {
  const navLinks = data.navLinks || []

  const updateLink = (id, field, value) => {
    const updated = navLinks.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    onChange({ navLinks: updated })
  }

  const addLink = () => {
    const newLink = { id: crypto.randomUUID(), label: 'Enlace', url: '#' }
    onChange({ navLinks: [...navLinks, newLink] })
  }

  const removeLink = (id) => {
    onChange({ navLinks: navLinks.filter((l) => l.id !== id) })
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Links de navegación</label>
        <div className="space-y-2">
          {navLinks.map((link) => (
            <div key={link.id} className="flex gap-1.5 items-center">
              <input
                type="text"
                value={link.label || ''}
                onChange={(e) => updateLink(link.id, 'label', e.target.value)}
                className="flex-1 px-2 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Etiqueta"
              />
              <input
                type="text"
                value={link.url || ''}
                onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                className="flex-1 px-2 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="URL"
              />
              <button
                onClick={() => removeLink(link.id)}
                className="text-red-400 hover:text-red-600 transition-colors text-sm px-1"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addLink}
          className="mt-2 w-full py-1.5 border-2 border-dashed border-indigo-300 rounded-lg text-indigo-500 hover:border-indigo-500 hover:bg-indigo-50 transition-colors text-xs font-medium"
        >
          ➕ Agregar enlace
        </button>
      </div>
    </div>
  )
}
