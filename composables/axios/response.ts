import { AxiosError, AxiosResponse } from 'axios';
// import { useStore } from '@pinia/nuxt';
import { useAuthStore } from '~/store/authentication';

const setResponseReturn = (data: any, status: any, error: any) => {
  return {
    data,
    status,
    error,
  };
};

export const HandleAxiosError = (error: AxiosError) => {
  // pinia store will be available before any api request is made so no error
  const { logout } = useAuthStore();

  const error_data = error.response;
  const status = error.response?.status || null;

  // logout if error is an unauthorized error
  // don't return from here so that {data, status and error} will be reurned as an object

  // check if user is session has expired

  if (error_data) {
    const errorIsArray = Array.isArray(error_data);
    const error_message = errorIsArray ? error_data[0] : error_data;

    if (error_data?.status == 401) logout();

    return setResponseReturn(null, status, error_message);
  }

  //   if (error_data?.defaultUserMessage) {
  //     const error_data_default_user_message = error_data?.defaultUserMessage

  //     const errorIsArray = Array.isArray(error_data_default_user_message)
  //     const error_message = errorIsArray ? error_data[0] : error_data

  //     return setResponseReturn(null, status, error_message)
  //   }

  return setResponseReturn(null, status, error_data); // return error.message || 'Sorry, an error occurred'
};

export const HandleAxiosResponse = async (response: AxiosResponse) => {
  const { data, status } = response;
  console.log('response::::', response);

  return setResponseReturn(data.data, status, null);
};

export const HandleTokenResponse = async (token: any) => {
  if (!token) return 'Token not found';

  //   const decoded_token: any = JWT_DECODE(token)
  //   const { user_id } = decoded_token

  //   sessionStorage.removeItem('architecture_hub_user_token')
  //   sessionStorage.setItem('architecture_hub_user_token', token)

  //   return user_id
  return token;
};
