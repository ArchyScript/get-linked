import { uploadAxiosInstance, commonAxiosInstance } from '~/composables/axios/config';
import { AxiosResponse } from 'axios';
import { HandleAxiosResponse, HandleAxiosError } from '~/composables/axios/response';

export const useCommonApi = () => {
  // upload file
  const uploadFile = async (payload: FormData) => {
    try {
      const response = await uploadAxiosInstance
        .post(`cloudinary/upload`, payload)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // liveness check
  const livenessCheck = async (payload: any) => {
    try {
      const response = await commonAxiosInstance
        .post(`liveness-check`, payload)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  return {
    uploadFile,
    livenessCheck,
  };
};
