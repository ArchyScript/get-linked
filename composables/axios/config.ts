import axios, { AxiosRequestHeaders } from 'axios';
const API_BASE_URL = 'https://api.vesseltrust.com/api/v1';
// const API_BASE_URL = 'https://3af4-154-120-94-121.ngrok-free.app/api/v1';
// causing error, find a way to get api url from .env file
// const API_BASE_URL = useRuntimeConfig().public?.API_BASE_URL;

export const getAuthHeaders = (): AxiosRequestHeaders & any => {
  let authToken = null;
  // let authToken =

  if (process.client && typeof window !== 'undefined') {
    authToken = window.localStorage.getItem('authToken');
  }

  authToken = !authToken || authToken === undefined ? authToken : authToken;
  console.log('autbToken::::', authToken);

  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  return headers;
};

// Axios instances
const defaultAxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/financier`,
  headers: { ...getAuthHeaders() },
});

const commonAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { ...getAuthHeaders() },
});

const uploadAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    ...getAuthHeaders(),
    'Content-Type': 'multipart/form-data',
  },
});

export { defaultAxiosInstance, commonAxiosInstance, uploadAxiosInstance };
