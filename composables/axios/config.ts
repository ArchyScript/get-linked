import axios, { AxiosRequestHeaders } from 'axios';
const API_BASE_URL = useRuntimeConfig().public?.API_BASE_URL;

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
  headers: getAuthHeaders(),
});

const commonAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: getAuthHeaders(),
});
// Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNjcmlwdEBtYWlsaW5hdG9yLmNvbSIsImlkIjoiNjRkMjY3OTlkYTU3ZGQwYjQ1MDdiMzc0IiwidHlwZSI6IkZpbmFuY2llciIsImlhdCI6MTY5MjI2ODA1MCwiZXhwIjoxNjkyMzExMjUwfQ.IGMHH30A_M2nUmZWqMxlBEI6P5K1gUkFJfqmev2GezA`,

// Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNjcmlwdEBtYWlsaW5hdG9yLmNvbSIsImlkIjoiNjRkMjY3OTlkYTU3ZGQwYjQ1MDdiMzc0IiwidHlwZSI6IkZpbmFuY2llciIsImlhdCI6MTY5MjI3Mzk5MiwiZXhwIjoxNjkyMzE3MTkyfQ.8pXgfRYwzIXMeSdN464LbteXrAjLPrjc1E3-CSxZz6M`,
// ...getAuthHeaders(),
const uploadAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Interceptor to set Authorization header
// uploadAxiosInstance.interceptors.request.use(
//   (config) => {
//     config.headers.Authorization = `Bearer ${getAuthHeaders()}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export { defaultAxiosInstance, commonAxiosInstance, uploadAxiosInstance };
