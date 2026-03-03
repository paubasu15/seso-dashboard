export default function PricingSection({ data, onChange }) {
  const plans = data.plans || []

  const updatePlan = (id, field, value) => {
    const updated = plans.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    onChange({ plans: updated })
  }

  const addPlan = () => {
    const newPlan = {
      id: crypto.randomUUID(),
      name: 'Plan Básico',
      price: '$9.99',
      period: '/mes',
      features: 'Feature 1\nFeature 2\nFeature 3',
      featured: false,
    }
    onChange({ plans: [...plans, newPlan] })
  }

  const removePlan = (id) => {
    onChange({ plans: plans.filter((p) => p.id !== id) })
  }

  return (
    <div className="space-y-3">
      {plans.map((plan, index) => (
        <div key={plan.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Plan {index + 1}</span>
            <button
              onClick={() => removePlan(plan.id)}
              className="text-red-400 hover:text-red-600 text-xs transition-colors"
            >
              ❌
            </button>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Nombre del plan</label>
            <input
              type="text"
              value={plan.name || ''}
              onChange={(e) => updatePlan(plan.id, 'name', e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Plan Básico"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Precio</label>
              <input
                type="text"
                value={plan.price || ''}
                onChange={(e) => updatePlan(plan.id, 'price', e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="$9.99"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Periodo</label>
              <input
                type="text"
                value={plan.period || ''}
                onChange={(e) => updatePlan(plan.id, 'period', e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="/mes"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Features (una por línea)</label>
            <textarea
              value={plan.features || ''}
              onChange={(e) => updatePlan(plan.id, 'features', e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={4}
              placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`featured-${plan.id}`}
              checked={plan.featured || false}
              onChange={(e) => updatePlan(plan.id, 'featured', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor={`featured-${plan.id}`} className="text-xs text-gray-600">
              Plan destacado
            </label>
          </div>
        </div>
      ))}
      <button
        onClick={addPlan}
        className="w-full py-2 border-2 border-dashed border-indigo-300 rounded-lg text-indigo-500 hover:border-indigo-500 hover:bg-indigo-50 transition-colors text-sm font-medium"
      >
        ➕ Agregar plan
      </button>
    </div>
  )
}
