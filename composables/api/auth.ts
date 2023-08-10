import axiosInstance from '~/composables/axios/config'
import { AxiosResponse } from 'axios'
import { HandleAxiosResponse, HandleAxiosError } from '~/composables/axios/response'
import { LoginPayloadType, RegisterPayloadType } from '~/types/auth'

export const useAuthApi = () => {
  // login
  const login = async (payload: LoginPayloadType) => {
    try {
      const response = await axiosInstance
        .post(`login`, payload)
        .then(async (response: AxiosResponse) => response)
      return HandleAxiosResponse(response)
    } catch (error: any) {
      return HandleAxiosError(error)
    }
  }

  // register
  // const register = async (payload: RegisterPayloadType) => {
  const register = async (payload: any) => {
    try {
      const response = await axiosInstance
        .post(`register`, payload)
        .then(async (response: AxiosResponse) => response)
      return HandleAxiosResponse(response)
    } catch (error: any) {
      return HandleAxiosError(error)
    }
  }

  // resend verification
  const resendtVerification = async (payload: any) => {
    try {
      const response = await axiosInstance
        .post(`resend-verification-mail`, payload)
        .then(async (response: AxiosResponse) => response)
      return HandleAxiosResponse(response)
    } catch (error: any) {
      return HandleAxiosError(error)
    }
  }

  // changePassowrd
  const changePassowrd = async (payload: any) => {
    try {
      const response = await axiosInstance
        .post(`auth/change-password`, payload)
        .then(async (response: AxiosResponse) => response)
      return HandleAxiosResponse(response)
    } catch (error: any) {
      return HandleAxiosError(error)
    }
  }

  // resetPassword
  const resetPassword = async (payload: any) => {
    try {
      const response = await axiosInstance
        .post(`reset-password`, payload)
        .then(async (response: AxiosResponse) => response)
      return HandleAxiosResponse(response)
    } catch (error: any) {
      return HandleAxiosError(error)
    }
  }

  // verify2FA
  const verify2FA = async (payload: any) => {
    try {
      const response = await axiosInstance
        .post(`verify-2fa`, payload)
        .then(async (response: AxiosResponse) => response)
      return HandleAxiosResponse(response)
    } catch (error: any) {
      return HandleAxiosError(error)
    }
  }

  // initiate2FA
  const initiate2FA = async (payload: any) => {
    try {
      const response = await axiosInstance
        .post(`initiate-2fa`, payload)
        .then(async (response: AxiosResponse) => response)
      return HandleAxiosResponse(response)
    } catch (error: any) {
      return HandleAxiosError(error)
    }
  }

  // requestUserPassword
  const requestUserPassword = async (payload: any) => {
    try {
      const response = await axiosInstance
        .post(`request-password`, payload)
        .then(async (response: AxiosResponse) => response)
      return HandleAxiosResponse(response)
    } catch (error: any) {
      return HandleAxiosError(error)
    }
  }

  // verifyUser
  const verifyUser = async (token: string | string[]) => {
    try {
      const response = await axiosInstance
        .get(`verify/${token}`)
        .then(async (response: AxiosResponse) => response)
      return HandleAxiosResponse(response)
    } catch (error: any) {
      return HandleAxiosError(error)
    }
  }

  // logout
  const logout = async (payload: any) => {
    try {
      const response = await axiosInstance
        .post(`logout`, payload)
        .then(async (response: AxiosResponse) => response)
      return HandleAxiosResponse(response)
    } catch (error: any) {
      return HandleAxiosError(error)
    }
  }

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
  }
}
