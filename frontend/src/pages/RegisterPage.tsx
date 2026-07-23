import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { extractValidationErrors } from '../lib/validation'
import atlasLogo from '../assets/atlas_logo.png'
import '../styles/auth.css'

export function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [name, setName] = useState('')
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
      await register({ name, email, password })
      navigate('/dashboard', { replace: true })
    } catch (error) {
      const validation_errors = extractValidationErrors(error)
      const next_field_errors: Record<string, string> = {}

      for (const field of ['name', 'email', 'password'] as const) {
        if (validation_errors[field]?.[0]) {
          next_field_errors[field] = validation_errors[field][0]
        }
      }

      setFieldErrors(next_field_errors)

      if (Object.keys(next_field_errors).length === 0) {
        setFormError('Não foi possível criar a conta. Tente novamente.')
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
          <p className="auth-eyebrow">Cadastro</p>
          <h1>Comece seu fluxo</h1>
          <p className="auth-description">Crie sua conta e entre direto no dashboard.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label htmlFor="register-name">Nome</label>
            <input
              id="register-name"
              type="text"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? 'register-name-error' : undefined}
              required
            />
            {fieldErrors.name ? (
              <p id="register-name-error" className="auth-field-error" role="alert">
                {fieldErrors.name}
              </p>
            ) : null}
          </div>

          <div className="auth-field">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? 'register-email-error' : undefined}
              required
            />
            {fieldErrors.email ? (
              <p id="register-email-error" className="auth-field-error" role="alert">
                {fieldErrors.email}
              </p>
            ) : null}
          </div>

          <div className="auth-field">
            <label htmlFor="register-password">Senha</label>
            <input
              id="register-password"
              type="password"
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={fieldErrors.password ? 'register-password-error' : undefined}
              minLength={8}
              required
            />
            {fieldErrors.password ? (
              <p id="register-password-error" className="auth-field-error" role="alert">
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
            {isSubmitting ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="auth-footer">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </main>
  )
}
