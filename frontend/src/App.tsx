import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import KanbanPage from './pages/KanbanPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
      <Route path="/kanban" element={<DashboardLayout><KanbanPage /></DashboardLayout>} />
    </Routes>
  )
}

export default App
