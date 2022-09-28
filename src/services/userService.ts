import { httpClient } from '../http/httpClient';
import { TAuthResponse, TUserData } from './authService';

function patch(
  userId: number,
  userData: TUserData & { passwordNew: string },
) {
  return httpClient.patch<null, TAuthResponse>(`/auth/user/${userId}`, userData);
}

function remove(userId: number, password: string) {
  return httpClient.post<null, TAuthResponse>(`/auth/user/${userId}/delete`, { password });
}

export const userService = {
  patch,
  remove,
};
