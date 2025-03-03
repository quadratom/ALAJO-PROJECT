import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const authService = {
  signup: (data: { email: string; password: string }) => axios.post(`${API_URL}/auth/signup`, data),
  login: (data: { email: string; password: string }) => axios.post(`${API_URL}/auth/login`, data),
}
