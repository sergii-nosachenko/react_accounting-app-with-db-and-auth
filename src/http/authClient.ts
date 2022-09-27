import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { accessTokenService } from '../services/accessTokenService';
import { createClient } from './index';

export const authClient = createClient();

function onRequest(request: AxiosRequestConfig) {
  const accessToken = accessTokenService.get();

  if (!request) {
    return null;
  }

  const requestWithToken = { ...request };

  if (accessToken) {
    requestWithToken.headers = {
      ...requestWithToken.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return requestWithToken;
}

function onResponseSuccess(res: AxiosResponse) {
  const { accessToken } = res.data;

  accessTokenService.save(accessToken);

  return res.data;
}

async function onResponseError(error: AxiosError) {
  return error.response?.data
    || {
      message: error.response
        ? `${error.response?.status}: ${error.response?.statusText}`
        : 'Network Error',
    };
}

authClient.interceptors.request.use(onRequest);
authClient.interceptors.response.use(onResponseSuccess, onResponseError);
