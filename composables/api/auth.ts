import { defaultAxiosInstance } from '~/composables/axios/config';
import { HandleAxiosResponse, HandleAxiosError } from '~/composables/axios/response';
import { LoginPayloadType, RegisterPayloadType } from '~/types/auth';

export const useAuthApi = () => {
  // login
  const login = async (payload: LoginPayloadType) => {
    try {
      const response = await defaultAxiosInstance.post(`login`, payload);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // register
  const register = async (payload: RegisterPayloadType) => {
    try {
      // const register = async (payload: any) => {
      const response = await defaultAxiosInstance.post(`register`, payload);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  return {
    login,
    register,
  };
};
