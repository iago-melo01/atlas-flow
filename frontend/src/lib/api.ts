import axios from 'axios'

const backend_url = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000'

export const api = axios.create({
  baseURL: backend_url,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export async function prepareAuthRequest(): Promise<void> {
  await api.get('/sanctum/csrf-cookie')
}
