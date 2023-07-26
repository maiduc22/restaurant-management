import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { notiType, renderNotification } from './helpers';

const api = axios.create({
  baseURL: 'https://localhost:7119/api',
});

interface UseCallApiProps {
  endPoint: string;
  method: AxiosRequestConfig['method'];
  payload?: any;
  headers?: AxiosRequestConfig['headers'];
  params?: AxiosRequestConfig['params'];
}

interface UseCallApiResponse {
  response: AxiosResponse | null;
  error: any;
}

export const useCallApi = async ({
  endPoint,
  headers,
  method,
  params,
  payload,
}: UseCallApiProps): Promise<UseCallApiResponse> => {
  try {
    const result = await api({
      method,
      url: endPoint,
      headers,
      data: payload,
      params,
    });

    return {
      response: result,
      error: null,
    };
  } catch (error) {
    return {
      response: null,
      error,
    };
  }
};

export const errorHandler = (err: AxiosError) => {
  console.log(err);
  if (err.response && err.response.data && typeof err.response.data === 'object' && 'devMsg' in err.response.data) {
    const errMsg = err.response.data.devMsg;
    console.log(errMsg);
    renderNotification('Lỗi', `${errMsg}`, notiType.ERROR);
  }
};
