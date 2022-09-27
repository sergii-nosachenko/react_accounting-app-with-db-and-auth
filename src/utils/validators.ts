type TValidateFn = (value: string) => boolean;

export const validateEmail: TValidateFn = (value) => {
  return value !== '' && /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/.test(value);
};

export const validatePassword: TValidateFn = (value) => {
  return value !== '' && value.length >= 6;
};
