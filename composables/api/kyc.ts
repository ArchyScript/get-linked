import { defaultAxiosInstance } from '~/composables/axios/config';
import { AxiosResponse } from 'axios';
import { HandleAxiosResponse, HandleAxiosError } from '~/composables/axios/response';

export const useKYCApi = () => {
  // verify file
  const verifyKYC = async (payload: any) => {
    try {
      const response = await defaultAxiosInstance
        .post(`kyc`, payload)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  return {
    verifyKYC,
  };
};
