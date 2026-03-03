export default function HeroSection({ data, onChange }) {
  const update = (field, value) => {
    onChange({ hero: { ...data.hero, [field]: value } })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Título principal</label>
        <input
          type="text"
          value={data.hero?.title || ''}
          onChange={(e) => update('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Bienvenido a nuestra plataforma"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
        <textarea
          value={data.hero?.subtitle || ''}
          onChange={(e) => update('subtitle', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          rows={3}
          placeholder="La mejor solución para tu negocio"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texto del botón CTA</label>
          <input
            type="text"
            value={data.hero?.ctaText || ''}
            onChange={(e) => update('ctaText', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Comenzar ahora"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Link del CTA</label>
          <input
            type="text"
            value={data.hero?.ctaLink || ''}
            onChange={(e) => update('ctaLink', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="#"
          />
        </div>
      </div>
    </div>
  )
}
