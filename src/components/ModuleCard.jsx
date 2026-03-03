import { useNavigate, useLocation } from 'react-router-dom'

export default function ModuleCard({ module, primaryColor }) {
  const navigate = useNavigate()
  const location = useLocation()
  const search = location.search

  const handleClick = () => {
    if (module.active && module.path) {
      navigate(`${module.path}${search}`)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`rounded-xl p-6 border-2 transition-all duration-200 ${
        module.active
          ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1 border-transparent'
          : 'cursor-not-allowed opacity-60 border-gray-200 bg-gray-50'
      }`}
      style={
        module.active
          ? { backgroundColor: primaryColor + '15', borderColor: primaryColor + '40' }
          : {}
      }
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{module.icon}</span>
        {!module.active && <span className="text-gray-400 text-lg">🔒</span>}
      </div>
      <h3
        className={`font-semibold text-base mb-1 ${
          module.active ? 'text-gray-800' : 'text-gray-400'
        }`}
      >
        {module.name}
      </h3>
      {module.active ? (
        <p className="text-xs" style={{ color: primaryColor }}>
          Acceder →
        </p>
      ) : (
        <p className="text-xs text-gray-400">Módulo bloqueado</p>
      )}
    </div>
  )
}
