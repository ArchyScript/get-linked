import axios, { AxiosRequestHeaders } from 'axios'
const API_BASE_URL = useRuntimeConfig().public?.API_BASE_URL

export const getAuthHeaders = (): AxiosRequestHeaders & any => {
  let accessToken = null

  if (process.client && typeof window !== 'undefined') {
    accessToken = window.localStorage.getItem('user_token')
  }

  accessToken = !accessToken || accessToken === undefined ? '' : accessToken

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  }

  return headers
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: getAuthHeaders(),
})

export default axiosInstance
