import { defaultAxiosInstance, commonAxiosInstance } from '~/composables/axios/config';
import { AxiosResponse } from 'axios';
import { HandleAxiosResponse, HandleAxiosError } from '~/composables/axios/response';

export const useRequestApi = () => {
  // dashbaordStats
  const dashbaordStats = async (userid: string) => {
    try {
      const response = await commonAxiosInstance
        .get(`dashboard/get-stats?userid=${userid}`)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // getInspections
  const getInspections = async (params: { id: any }) => {
    try {
      const response = await commonAxiosInstance
        .get(`request/get-inspections/?inspector=64da4c17b783d17a99b16201`)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // singleInspection
  const singleInspection = async (params: { id: any }) => {
    try {
      const response = await commonAxiosInstance
        .post(
          `request/single-inspection?inspectionId=64dd4e4447345fbe150d1b9d&inspector=64da4c17b783d17a99b16201`,
        )
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // requestInspector
  const requestInspector = async (userid: string) => {
    try {
      const response = await commonAxiosInstance
        .get(
          `request/request-inspector?requestid=64dc924f1ca69963f76f1266&inspector=64da4c17b783d17a99b16201`,
        )
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // updateInspector
  const updateInspector = async (params: { id: any }) => {
    try {
      const response = await commonAxiosInstance
        .get(`request/inspector/update-inspection/64dd4e4447345fbe150d1b9d`)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  // updateFundRequestApprove
  const updateFundRequestApprove = async (params: { id: any }) => {
    try {
      const response = await commonAxiosInstance
        .post(`request/update/64dc924f1ca69963f76f1266`)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };
  // updateFundRequestReject
  const updateFundRequestReject = async (params: { id: any }) => {
    try {
      const response = await commonAxiosInstance
        .post(`request/reject/64dc924f1ca69963f76f1266`)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };
  // updateFundRequestUpdate
  const updateFundRequestUpdate = async (params: { id: any }) => {
    try {
      const response = await commonAxiosInstance
        .post(`request/update/64dc924f1ca69963f76f1266`)
        .then(async (response: AxiosResponse) => response);
      return HandleAxiosResponse(response);
    } catch (error: any) {
      return HandleAxiosError(error);
    }
  };

  return {
    dashbaordStats,
    getInspections,
    singleInspection,
    requestInspector,
    updateInspector,
    updateFundRequestApprove,
    updateFundRequestReject,
    updateFundRequestUpdate,
  };
};
