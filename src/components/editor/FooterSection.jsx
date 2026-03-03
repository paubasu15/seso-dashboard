export default function FooterSection({ data, onChange }) {
  const footer = data.footer || { text: '', links: [] }
  const links = footer.links || []

  const updateFooterText = (text) => {
    onChange({ footer: { ...footer, text } })
  }

  const updateLink = (id, field, value) => {
    const updated = links.map((l) =>
      l.id === id ? { ...l, [field]: value } : l
    )
    onChange({ footer: { ...footer, links: updated } })
  }

  const addLink = () => {
    const newLink = { id: crypto.randomUUID(), label: 'Nuevo enlace', url: '#' }
    onChange({ footer: { ...footer, links: [...links, newLink] } })
  }

  const removeLink = (id) => {
    onChange({ footer: { ...footer, links: links.filter((l) => l.id !== id) } })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Texto del footer</label>
        <input
          type="text"
          value={footer.text || ''}
          onChange={(e) => updateFooterText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="© 2025 Mi Empresa"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Links del footer</label>
        <div className="space-y-2">
          {links.map((link) => (
            <div key={link.id} className="flex gap-2 items-center">
              <input
                type="text"
                value={link.label || ''}
                onChange={(e) => updateLink(link.id, 'label', e.target.value)}
                className="flex-1 px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Etiqueta"
              />
              <input
                type="text"
                value={link.url || ''}
                onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                className="flex-1 px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="URL"
              />
              <button
                onClick={() => removeLink(link.id)}
                className="text-red-400 hover:text-red-600 transition-colors text-sm px-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addLink}
          className="mt-2 w-full py-2 border-2 border-dashed border-indigo-300 rounded-lg text-indigo-500 hover:border-indigo-500 hover:bg-indigo-50 transition-colors text-sm font-medium"
        >
          + Agregar enlace
        </button>
      </div>
    </div>
  )
}
