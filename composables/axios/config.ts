import axios, { AxiosRequestHeaders } from 'axios';
const API_BASE_URL = '';

export const getAuthHeaders = (): AxiosRequestHeaders & any => {
  let authToken = null;

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

export { defaultAxiosInstance };
