import axios from 'axios'

const API_URL = 'http://147.93.40.101:3332'

const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return { Authorization: `Bearer ${token}` }
}

export const transactionService = {
  create: (data: any) => axios.post(`${API_URL}/transactions`, data, { headers: getAuthHeader() }),
  getAll: (params: any) =>
    axios.get(`${API_URL}/transactions`, { headers: getAuthHeader(), params }),
  getById: (id: string) => axios.get(`${API_URL}/transactions/${id}`, { headers: getAuthHeader() }),
  update: (id: string, data: any) =>
    axios.patch(`${API_URL}/transactions/${id}`, data, { headers: getAuthHeader() }),
  delete: (id: string) =>
    axios.delete(`${API_URL}/transactions/${id}`, { headers: getAuthHeader() }),
}
