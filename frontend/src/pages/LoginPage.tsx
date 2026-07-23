import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { extractValidationErrors } from '../lib/validation'
import atlasLogo from '../assets/atlas_logo.png'
import '../styles/auth.css'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setFieldErrors({})
    setFormError(null)

    try {
      await login({ email, password })
      navigate('/dashboard', { replace: true })
    } catch (error) {
      const validation_errors = extractValidationErrors(error)
      const next_field_errors: Record<string, string> = {}

      if (validation_errors.email?.[0]) {
        next_field_errors.email = validation_errors.email[0]
      }

      if (validation_errors.password?.[0]) {
        next_field_errors.password = validation_errors.password[0]
      }

      setFieldErrors(next_field_errors)

      if (Object.keys(next_field_errors).length === 0) {
        setFormError('Não foi possível entrar. Tente novamente.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <Link className="auth-brand" to="/" aria-label="Atlas Flow home">
          <img src={atlasLogo} alt="" className="auth-brand-mark" />
          <span>Atlas Flow</span>
        </Link>

        <div className="auth-header">
          <p className="auth-eyebrow">Entrar</p>
          <h1>Bem-vindo de volta</h1>
          <p className="auth-description">Acesse seu plano de execução diária.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? 'login-email-error' : undefined}
              required
            />
            {fieldErrors.email ? (
              <p id="login-email-error" className="auth-field-error" role="alert">
                {fieldErrors.email}
              </p>
            ) : null}
          </div>

          <div className="auth-field">
            <label htmlFor="login-password">Senha</label>
            <input
              id="login-password"
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={fieldErrors.password ? 'login-password-error' : undefined}
              required
            />
            {fieldErrors.password ? (
              <p id="login-password-error" className="auth-field-error" role="alert">
                {fieldErrors.password}
              </p>
            ) : null}
          </div>

          {formError ? (
            <p className="auth-form-error" role="alert">
              {formError}
            </p>
          ) : null}

          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="auth-footer">
          Ainda não tem conta? <Link to="/register">Criar conta</Link>
        </p>
      </div>
    </main>
  )
}
