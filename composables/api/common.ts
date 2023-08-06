import axiosInstance from '~/composables/axios/config'
import { AxiosResponse } from 'axios'
import { HandleAxiosResponse, HandleAxiosError } from '~/composables/axios/response'

export const useCommonApi = () => {
  // upload file
  const upload = async (payload: any) => {
    try {
      const response = await axiosInstance
        .post(`upload`, payload)
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
        .post(`user/logout`, payload)
        .then(async (response: AxiosResponse) => response)
      return HandleAxiosResponse(response)
    } catch (error: any) {
      return HandleAxiosError(error)
    }
  }

  //
  return {
    upload,
    logout,
  }
}
