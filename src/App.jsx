import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TenantProvider } from './context/TenantContext.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import LandingEditor from './pages/LandingEditor.jsx'

export default function App() {
  return (
    <BrowserRouter basename="/app">
      <TenantProvider>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="editor" element={<LandingEditor />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </TenantProvider>
    </BrowserRouter>
  )
}
