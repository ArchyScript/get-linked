import axiosInstance from '~/composables/axios/config'
import { AxiosResponse } from 'axios'
import { HandleAxiosResponse, HandleAxiosError } from '~/composables/axios/response'

export const useDealsApi = () => {
  // deals
  const allDeals = async () => {
    try {
      const response = await axiosInstance
        .get(`deals`)
        .then(async (response: AxiosResponse) => response)
      return HandleAxiosResponse(response)
    } catch (error: any) {
      return HandleAxiosError(error)
    }
  }

  // getSingleDeal
  const getSingleDeal = async (params: { id: any }) => {
    try {
      const response = await axiosInstance
        .get(`deals/${params.id}`)
        .then(async (response: AxiosResponse) => response)
      return HandleAxiosResponse(response)
    } catch (error: any) {
      return HandleAxiosError(error)
    }
  }

  // createDeal
  const createDeal = async (params: { id: any }) => {
    try {
      const response = await axiosInstance
        .post(`deals`)
        .then(async (response: AxiosResponse) => response)
      return HandleAxiosResponse(response)
    } catch (error: any) {
      return HandleAxiosError(error)
    }
  }

  return {
    allDeals,
    getSingleDeal,
    createDeal,
  }
}
