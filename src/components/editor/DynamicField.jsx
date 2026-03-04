export default function DynamicField({ schema, value, onChange }) {
  const { type, label, placeholder, options, itemFields } = schema

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'

  if (type === 'textarea') {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || ''}
          rows={3}
          className={inputClass}
        />
      </div>
    )
  }

  if (type === 'toggle') {
    return (
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${
            value ? 'bg-indigo-500' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
              value ? 'translate-x-4.5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>
    )
  }

  if (type === 'select') {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        >
          <option value="">— Seleccionar —</option>
          {(options || []).map((opt) => {
            const optValue = typeof opt === 'object' ? opt.value : opt
            const optLabel = typeof opt === 'object' ? opt.label : opt
            return (
              <option key={optValue} value={optValue}>
                {optLabel}
              </option>
            )
          })}
        </select>
      </div>
    )
  }

  if (type === 'color') {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={value || '#000000'}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 rounded cursor-pointer border border-gray-300"
          />
          <input
            type="text"
            value={value || '#000000'}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
          />
        </div>
      </div>
    )
  }

  if (type === 'list') {
    const items = Array.isArray(value) ? value : []

    const handleAddItem = () => {
      const newItem = {}
      ;(itemFields || []).forEach((f) => {
        newItem[f.key] = ''
      })
      onChange([...items, newItem])
    }

    const handleRemoveItem = (index) => {
      onChange(items.filter((_, i) => i !== index))
    }

    const handleItemFieldChange = (index, fieldKey, fieldValue) => {
      const updated = items.map((item, i) =>
        i === index ? { ...item, [fieldKey]: fieldValue } : item
      )
      onChange(updated)
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <button
            type="button"
            onClick={handleAddItem}
            className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-md hover:bg-indigo-100 transition-colors"
          >
            ➕ Agregar
          </button>
        </div>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="relative p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors text-sm"
                title="Eliminar"
              >
                🗑️
              </button>
              <div className="space-y-2 pr-6">
                {(itemFields || []).map((subField) => (
                  <DynamicField
                    key={subField.key}
                    schema={subField}
                    value={item[subField.key]}
                    onChange={(v) => handleItemFieldChange(index, subField.key, v)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Default: text, url, image, number
  const INPUT_TYPE_MAP = { image: 'url', text: 'text', number: 'number', url: 'url' }
  const inputType = INPUT_TYPE_MAP[type] || type

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={inputType}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || (type === 'image' ? 'URL de imagen' : '')}
        className={inputClass}
      />
    </div>
  )
}
