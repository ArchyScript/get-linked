import axios, { AxiosRequestHeaders } from 'axios';
const API_BASE_URL = 'https://api.vesseltrust.com/api/v1';
// const API_BASE_URL = 'https://b2ac-41-217-101-162.ngrok-free.app/api/v1';
// causing error, find a way to get api url from .env file
// const API_BASE_URL = useRuntimeConfig().public?.API_BASE_URL;

export const getAuthHeaders = (): AxiosRequestHeaders & any => {
  let authToken = null;

  if (process.client && typeof window !== 'undefined') {
    authToken = window.localStorage.getItem('authToken');
  }

  authToken = !authToken || authToken === undefined ? '' : authToken;

  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  return headers;
};

// Axios instances
const defaultAxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/financier`,

  // headers: {
  //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyY2h5c2NyaXB0KzEwQGdtYWlsLmNvbSIsImlkIjoiNjRlNWIyMTQ0ZTZlYTM0Y2EwNDFkMDJlIiwidHlwZSI6IkZpbmFuY2llciIsImlhdCI6MTY5Mjc3NDkzMiwiZXhwIjoxNjkyODE4MTMyfQ.bb-4b19B0IZ8waM3WefhqrxHAABBst_pA8NkfcTraB8`,
  // },

  headers: { ...getAuthHeaders() },
});

const commonAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { ...getAuthHeaders() },
});

// Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNjcmlwdEBtYWlsaW5hdG9yLmNvbSIsImlkIjoiNjRkMjY3OTlkYTU3ZGQwYjQ1MDdiMzc0IiwidHlwZSI6IkZpbmFuY2llciIsImlhdCI6MTY5MjI3Mzk5MiwiZXhwIjoxNjkyMzE3MTkyfQ.8pXgfRYwzIXMeSdN464LbteXrAjLPrjc1E3-CSxZz6M`,
const uploadAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    ...getAuthHeaders(),
    'Content-Type': 'multipart/form-data',
  },
});

export { defaultAxiosInstance, commonAxiosInstance, uploadAxiosInstance };
