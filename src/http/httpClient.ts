import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { createClient } from './index';
import { authService } from '../services/authService';
import { accessTokenService } from '../services/accessTokenService';

export const httpClient = createClient();

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

  if (accessToken) {
    accessTokenService.save(accessToken);
  }

  return res.data;
}

async function onResponseError(error: AxiosError) {
  const originalRequest = error.config;

  if (error?.response?.status !== 401) {
    return error.response?.data || {
      message: error.message || 'Error in response',
    };
  }

  const data = await authService.refresh();

  const { accessToken, message } = data;

  if (!accessToken) {
    return { message: message || 'Error in response' };
  }

  accessTokenService.save(accessToken);

  return httpClient.request(originalRequest);
}

httpClient.interceptors.request.use(onRequest);
httpClient.interceptors.response.use(onResponseSuccess, onResponseError);
