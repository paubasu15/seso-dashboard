export default function GeneralSection({ data, onChange }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del sitio</label>
        <input
          type="text"
          value={data.name || ''}
          onChange={(e) => onChange({ name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Mi Empresa"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">URL del Logo</label>
        <input
          type="url"
          value={data.logo || ''}
          onChange={(e) => onChange({ logo: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="https://ejemplo.com/logo.png"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Color Primario</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={data.primaryColor || '#6366f1'}
              onChange={(e) => onChange({ primaryColor: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer border border-gray-300"
            />
            <input
              type="text"
              value={data.primaryColor || '#6366f1'}
              onChange={(e) => onChange({ primaryColor: e.target.value })}
              className="flex-1 px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Color Secundario</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={data.secondaryColor || '#8b5cf6'}
              onChange={(e) => onChange({ secondaryColor: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer border border-gray-300"
            />
            <input
              type="text"
              value={data.secondaryColor || '#8b5cf6'}
              onChange={(e) => onChange({ secondaryColor: e.target.value })}
              className="flex-1 px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Color de Fondo</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={data.backgroundColor || '#ffffff'}
              onChange={(e) => onChange({ backgroundColor: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer border border-gray-300"
            />
            <input
              type="text"
              value={data.backgroundColor || '#ffffff'}
              onChange={(e) => onChange({ backgroundColor: e.target.value })}
              className="flex-1 px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Color de Texto</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={data.textColor || '#1f2937'}
              onChange={(e) => onChange({ textColor: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer border border-gray-300"
            />
            <input
              type="text"
              value={data.textColor || '#1f2937'}
              onChange={(e) => onChange({ textColor: e.target.value })}
              className="flex-1 px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
