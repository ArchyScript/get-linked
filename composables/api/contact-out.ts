import { defaultAxiosInstance } from '~/composables/axios/config';
import { HandleAxiosResponse, HandleAxiosError } from '~/composables/axios/response';
import { LoginPayloadType, RegisterPayloadType } from '~/types/auth';

export const useContactOutApi = () => {
  const linkedInProfileDetails = async (payload: LoginPayloadType) => {
    try {
      const response = await defaultAxiosInstance.post(
        `https://api.contactout.com/v1/people/linkedin?profile=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fdaniel-ugah-7a57ab243%2F&include_phone=true`,
        payload,
      );
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  const linkedInProfileWithId = async (payload: LoginPayloadType) => {
    try {
      const response = await defaultAxiosInstance.post(
        `https://api.contactout.com/v1/people/linkedin?profile=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fdaniel-ugah-7a57ab243%2F&include_phone=true`,
        payload,
      );
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  return {
    linkedInProfileWithId,
    linkedInProfileDetails,
  };
};
