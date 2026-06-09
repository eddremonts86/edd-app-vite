import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { env } from '@/shared/lib/env'

/**
 * Pre-configured axios instance. Use this everywhere instead of calling
 * `fetch` or constructing a new `axios` per-call so the base URL, headers,
 * and interceptors stay consistent.
 *
 * If you need a different base URL (e.g. an external SaaS API), create a
 * second instance — do not mutate this one at runtime.
 */
export const api: AxiosInstance = axios.create({
  baseURL: env.VITE_API_BASE_URL ?? '/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  timeout: 30_000,
})

/** Lightweight `api.get` wrapper that returns `data` and throws a typed error. */
export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await api.get<T>(url, config)
  return response.data
}

/** Lightweight `api.post` wrapper. */
export async function apiPost<T, D = unknown>(
  url: string,
  body?: D,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await api.post<T>(url, body, config)
  return response.data
}
