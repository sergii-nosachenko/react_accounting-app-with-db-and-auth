export interface IError {
  message?: string;
  errors?: {
    username?: string;
    email?: string;
    password?: string;
    passwordNew?: string;
  };
}
