import axios, { AxiosRequestHeaders } from 'axios'
const API_BASE_URL = useRuntimeConfig().public?.API_BASE_URL
// const API_BASE_URL = 'https://ad93-154-118-20-176.ngrok-free.app/api/v1/financier/'

export const getAuthHeaders = (): AxiosRequestHeaders & any => {
  let accessToken = null

  if (process.client && typeof window !== 'undefined') {
    accessToken = window.localStorage.getItem('accessToken')
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
