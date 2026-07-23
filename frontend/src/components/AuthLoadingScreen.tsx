export function AuthLoadingScreen() {
  return (
    <div className="auth-loading" role="status" aria-live="polite">
      <div className="auth-loading-card">
        <span className="auth-loading-dot" aria-hidden="true" />
        <p>Carregando sessão...</p>
      </div>
    </div>
  )
}
