import type { AxiosError } from 'axios'
import type { ValidationErrors } from '../types/user'

type LaravelValidationResponse = {
  message?: string
  errors?: ValidationErrors
}

export function extractValidationErrors(error: unknown): ValidationErrors {
  const axios_error = error as AxiosError<LaravelValidationResponse>

  if (axios_error.response?.status === 422 && axios_error.response.data.errors) {
    return axios_error.response.data.errors
  }

  return {}
}

export function firstFieldError(errors: ValidationErrors, field: string): string | undefined {
  return errors[field]?.[0]
}
