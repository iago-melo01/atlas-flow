import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import atlasLogo from '../assets/atlas_logo.png'
import '../styles/dashboard.css'

const NAV_LINKS = [
  { to: '/dashboard', label: 'Hoje', admin_only: false },
  { to: '/habits', label: 'Hábitos', admin_only: false },
  { to: '/admin/templates', label: 'Modelos', admin_only: true },
]

export function AppTopbar() {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const visible_links = NAV_LINKS.filter(
    (link) => link.to !== pathname && (!link.admin_only || user?.role === 'admin'),
  )

  async function handleLogout() {
    if (isLoggingOut) {
      return
    }

    setIsLoggingOut(true)

    try {
      await logout()
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="dashboard-topbar">
      <Link className="dashboard-brand" to="/dashboard" aria-label="Atlas Flow dashboard">
        <img src={atlasLogo} alt="" className="dashboard-brand-mark" />
        <span>Atlas Flow</span>
      </Link>

      <div className="dashboard-actions">
        {visible_links.map((link) => (
          <Link key={link.to} className="dashboard-nav-link" to={link.to}>
            {link.label}
          </Link>
        ))}
        <span className="dashboard-user">{user?.name}</span>
        <button
          className="dashboard-logout"
          type="button"
          onClick={() => void handleLogout()}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Saindo...' : 'Sair'}
        </button>
      </div>
    </header>
  )
}
