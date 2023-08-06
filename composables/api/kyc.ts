import axiosInstance from '~/composables/axios/config'
import { AxiosResponse } from 'axios'
import { HandleAxiosResponse, HandleAxiosError } from '~/composables/axios/response'

export const useKYCApi = () => {
  // verify file
  const verify = async (payload: any) => {
    try {
      const response = await axiosInstance
        .post(`verify`, payload)
        .then(async (response: AxiosResponse) => response)
      return HandleAxiosResponse(response)
    } catch (error: any) {
      return HandleAxiosError(error)
    }
  }

  return {
    verify,
  }
}
