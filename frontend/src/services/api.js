import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export async function fetchDashboardStats() {
  const { data } = await api.get('/dashboard/stats')
  return data
}

/**
 * @param {{ page?: number, per_page?: number, sort?: string, direction?: 'asc'|'desc', search?: string }} params
 */
export async function fetchCustomers(params = {}) {
  const { data } = await api.get('/customers', { params })
  return data
}

export async function fetchCustomer(id) {
  const { data } = await api.get(`/customers/${id}`)
  return data
}

export async function createCustomer(payload) {
  const { data } = await api.post('/customers', payload)
  return data
}

export async function updateCustomer(id, payload) {
  const { data } = await api.put(`/customers/${id}`, payload)
  return data
}

export async function deleteCustomer(id) {
  await api.delete(`/customers/${id}`)
}

export function getValidationErrors(error) {
  if (error?.response?.status === 422 && error.response.data?.errors) {
    return error.response.data.errors
  }
  return null
}

export function getErrorMessage(error, fallback = 'Something went wrong.') {
  if (error?.response?.data?.message) {
    return error.response.data.message
  }
  if (error?.message) {
    return error.message
  }
  return fallback
}
