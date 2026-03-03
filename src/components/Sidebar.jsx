import { NavLink, useLocation } from 'react-router-dom'
import { useTenant } from '../hooks/useTenant.js'

export default function Sidebar({ open, onToggle }) {
  const { config, modules } = useTenant()
  const location = useLocation()

  // Preserve tenant query param in navigation
  const search = location.search

  return (
    <aside
      className={`bg-gray-900 text-white transition-all duration-300 flex flex-col ${
        open ? 'w-64' : 'w-16'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center px-4 py-4 border-b border-gray-700">
        {config.logo ? (
          <img src={config.logo} alt={config.name} className="w-8 h-8 rounded object-cover" />
        ) : (
          <div
            className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: config.primaryColor || '#6366f1' }}
          >
            {config.name?.charAt(0)?.toUpperCase() || 'S'}
          </div>
        )}
        {open && (
          <span className="ml-3 font-semibold text-sm truncate">{config.name}</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          <li>
            <NavLink
              to={`/${search}`}
              end
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <span className="text-lg">🏠</span>
              {open && <span className="ml-3">Dashboard</span>}
            </NavLink>
          </li>
          {modules.map((mod) => (
            <li key={mod.id}>
              {mod.active ? (
                <NavLink
                  to={`${mod.path}${search}`}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  <span className="text-lg">{mod.icon}</span>
                  {open && <span className="ml-3">{mod.name}</span>}
                </NavLink>
              ) : (
                <div className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-500 cursor-not-allowed">
                  <span className="text-lg opacity-50">{mod.icon}</span>
                  {open && (
                    <span className="ml-3 flex items-center gap-1">
                      {mod.name}
                      <span className="text-xs">🔒</span>
                    </span>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {open && (
        <div className="px-4 py-3 border-t border-gray-700 text-xs text-gray-500">
          SESO Dashboard v1.0
        </div>
      )}
    </aside>
  )
}
