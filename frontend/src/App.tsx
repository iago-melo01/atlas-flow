import './App.css'

function App() {
  return (
    <main className="home-shell">
      <header className="topbar" aria-label="Atlas Flow navigation">
        <a className="brand" href="/" aria-label="Atlas Flow home">
          <span className="brand-mark">AF</span>
          <span>Atlas Flow</span>
        </a>

        <a className="signin-link" href="/login">
          Sign in
        </a>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Daily execution system</p>
          <h1>Seu dia inteiro em um fluxo claro.</h1>
          <p className="hero-description">
            Hábitos, treinos, dieta, finanças e progresso reunidos em uma visão diária
            para você entrar, executar e voltar melhor amanhã.
          </p>

          <div className="hero-actions" aria-label="Primary actions">
            <a className="primary-button" href="/login">
              Sign in
            </a>
            <a className="secondary-button" href="#preview">
              Ver o painel
            </a>
          </div>

          <div className="signal-row" aria-label="Atlas Flow modules">
            <span>Hábitos</span>
            <span>Treinos</span>
            <span>Dieta</span>
            <span>Finanças</span>
          </div>
        </div>

        <section className="dashboard-preview" id="preview" aria-label="Dashboard preview">
          <div className="preview-header">
            <div>
              <p>Hoje</p>
              <strong>Plano de execução</strong>
            </div>
            <span>68%</span>
          </div>

          <div className="focus-card">
            <span className="status-dot"></span>
            <div>
              <p>Próxima ação</p>
              <strong>Treino Push + jantar planejado</strong>
            </div>
          </div>

          <div className="mini-grid">
            <article className="metric-card success">
              <span>Hábitos</span>
              <strong>4/6</strong>
              <div className="progress-bar">
                <span></span>
              </div>
            </article>
            <article className="metric-card info">
              <span>Treino</span>
              <strong>Push A</strong>
              <small>Últimos 3 salvos</small>
            </article>
            <article className="metric-card warning">
              <span>Dieta</span>
              <strong>132g</strong>
              <small>Proteína hoje</small>
            </article>
            <article className="metric-card danger">
              <span>Finanças</span>
              <strong>-R$ 42</strong>
              <small>Saídas do dia</small>
            </article>
          </div>

          <div className="assistant-card">
            <span>Assistente Atlas</span>
            <p>Seu dia está consistente. Priorize concluir o treino antes das 20h.</p>
          </div>
        </section>
      </section>

      <section className="value-section" aria-label="Why Atlas Flow">
        <article>
          <span>01</span>
          <h2>Execute o dia</h2>
          <p>Abra o app e veja o que precisa acontecer agora, sem telas densas.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Registre progresso</h2>
          <p>Check-ins, treinos, macros e movimentações viram histórico útil.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Receba contexto</h2>
          <p>O Assistente Atlas resume dados e sugere próximos passos sem alterar nada sozinho.</p>
        </article>
      </section>
    </main>
  )
}

export default App
