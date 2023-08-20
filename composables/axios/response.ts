import { AxiosError, AxiosResponse } from 'axios';

const setResponseReturn = (data: any, status: any, error: any) => {
  return {
    data,
    status,
    error,
  };
};

export const HandleAxiosError = (error: AxiosError) => {
  // const error_data = error.response?.data;
  const error_data = error.response;
  const status = error.response?.status || null;

  console.log('error from config:::::', error);

  if (error_data) {
    const errorIsArray = Array.isArray(error_data);
    const error_message = errorIsArray ? error_data[0] : error_data;

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
