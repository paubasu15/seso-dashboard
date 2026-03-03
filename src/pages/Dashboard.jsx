import { useTenant } from '../hooks/useTenant.js'
import ModuleCard from '../components/ModuleCard.jsx'

export default function Dashboard() {
  const { config, modules } = useTenant()

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          {config.logo && (
            <img src={config.logo} alt={config.name} className="w-12 h-12 rounded-lg object-cover" />
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{config.name}</h1>
            <p className="text-gray-500 text-sm">Panel de administración</p>
          </div>
        </div>
      </div>

      {/* Modules grid */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Módulos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {modules.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              primaryColor={config.primaryColor || '#6366f1'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
