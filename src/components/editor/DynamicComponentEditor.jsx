import DynamicField from './DynamicField.jsx'

export default function DynamicComponentEditor({ schema, data, onChange }) {
  const handleFieldChange = (fieldKey, newValue) => {
    onChange({ ...data, [fieldKey]: newValue })
  }

  if (!schema || schema.length === 0) {
    return (
      <p className="text-xs text-gray-500 italic">No hay campos definidos para este componente.</p>
    )
  }

  return (
    <div className="space-y-4">
      {schema.map((field) => (
        <DynamicField
          key={field.key}
          schema={field}
          value={data?.[field.key]}
          onChange={(v) => handleFieldChange(field.key, v)}
        />
      ))}
    </div>
  )
}
