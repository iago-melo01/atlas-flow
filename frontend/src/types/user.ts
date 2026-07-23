export type User = {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

export type AuthCredentials = {
  email: string
  password: string
}

export type RegisterPayload = AuthCredentials & {
  name: string
}

export type ValidationErrors = Record<string, string[]>
