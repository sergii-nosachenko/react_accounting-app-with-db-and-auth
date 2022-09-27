import { authClient } from '../http/authClient';
import { IUser } from '../types/User.interface';

export type TRegisterData = {
  username: string;
  email: string;
  password: string;
};

export type TLoginData = {
  email: string;
  password: string;
};

type TAuthResponse = {
  user?: IUser;
  accessToken?: string;
  message?: string;
  errors?: {};
};

function register(userData: TRegisterData) {
  return authClient.post<null, TAuthResponse>('/auth/registration', userData);
}

function login({ email, password }: TLoginData) {
  return authClient.post<null, TAuthResponse>(
    '/auth/login', { email, password },
  );
}

function logout() {
  return authClient.post<null, TAuthResponse>('/auth/logout');
}

function activate(activationToken: string) {
  return authClient.get<null, TAuthResponse>(`/auth/activation/${activationToken}`);
}

function refresh() {
  return authClient.get<null, TAuthResponse>('/auth/refresh');
}

export const authService = {
  register,
  login,
  logout,
  activate,
  refresh,
};
