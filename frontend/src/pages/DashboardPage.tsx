import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import atlasLogo from '../assets/atlas_logo.png'
import '../styles/auth.css'
import '../styles/dashboard.css'

export function DashboardPage() {
  const { user, logout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

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
    <div className="dashboard-shell">
      <header className="dashboard-topbar">
        <Link className="dashboard-brand" to="/dashboard" aria-label="Atlas Flow dashboard">
          <img src={atlasLogo} alt="" className="dashboard-brand-mark" />
          <span>Atlas Flow</span>
        </Link>

        <div className="dashboard-actions">
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

      <main className="dashboard-main">
        <section className="dashboard-hero">
          <p className="dashboard-eyebrow">Hoje</p>
          <h1>Olá, {user?.name?.split(' ')[0] ?? 'atleta'}.</h1>
          <p className="dashboard-description">
            Seu painel está pronto. Em breve hábitos, treinos, dieta e finanças aparecerão aqui.
          </p>
        </section>

        <section className="dashboard-grid" aria-label="Resumo do dia">
          <article className="dashboard-card">
            <span>Hábitos</span>
            <strong>0/0</strong>
            <p>Nenhum hábito cadastrado ainda.</p>
          </article>
          <article className="dashboard-card">
            <span>Treino</span>
            <strong>—</strong>
            <p>Configure sua ficha para ver o treino do dia.</p>
          </article>
          <article className="dashboard-card">
            <span>Dieta</span>
            <strong>0 kcal</strong>
            <p>Registre refeições para acompanhar macros.</p>
          </article>
          <article className="dashboard-card">
            <span>Finanças</span>
            <strong>R$ 0</strong>
            <p>Saldo geral aparecerá aqui.</p>
          </article>
        </section>

        <section className="dashboard-assistant">
          <span>Assistente Atlas</span>
          <p>Quando houver dados, o assistente resumirá seu dia e sugerirá próximos passos.</p>
        </section>
      </main>
    </div>
  )
}
