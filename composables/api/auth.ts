import { defaultAxiosInstance, commonAxiosInstance } from '~/composables/axios/config';
import { AxiosResponse } from 'axios';
import {
  HandleAxiosResponse,
  HandleAxiosError,
  setResponseReturn,
} from '~/composables/axios/response';
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
    // finally {
    //   return setResponseReturn(null, null, { message: 'Something happened' });
    // }
  };

  // register
  const register = async (payload: RegisterPayloadType) => {
    try {
      // const register = async (payload: any) => {
      const response = await defaultAxiosInstance
        .post(`register`, payload)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // resend verification
  const resendtVerification = async (payload: any) => {
    try {
      const response = await defaultAxiosInstance
        .post(`resend-verification-mail`, payload)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // changePassowrd
  const changePassowrd = async (payload: any) => {
    try {
      const response = await commonAxiosInstance
        .post(`auth/change-password`, payload)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // resetPassword
  const resetPassword = async (payload: any) => {
    try {
      const response = await defaultAxiosInstance
        .post(`reset-password`, payload)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // verify2FA
  const verify2FA = async (payload: any) => {
    try {
      const response = await defaultAxiosInstance
        .post(`verify`, payload)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // initiate2FA
  const initiate2FA = async (payload: any) => {
    try {
      const response = await defaultAxiosInstance
        .post(`authentication`, payload)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // requestUserPassword
  const requestUserPassword = async (payload: any) => {
    try {
      const response = await defaultAxiosInstance
        .post(`request-password`, payload)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // verifyUser
  const verifyUser = async (token: string | string[]) => {
    try {
      const response = await defaultAxiosInstance
        .get(`verify/${token}`)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // delete financier
  const deleteFinancier = async () => {
    try {
      const response = await defaultAxiosInstance
        .post(`delete-account`)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // logout
  const logout = async (payload: any) => {
    try {
      const response = await defaultAxiosInstance
        .post(`logout`, payload)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  return {
    login,
    register,
    resendtVerification,
    changePassowrd,
    resetPassword,
    verify2FA,
    initiate2FA,
    requestUserPassword,
    verifyUser,
    logout,
    deleteFinancier,
  };
};
