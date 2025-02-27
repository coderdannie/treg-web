import { useMutation } from 'react-query';
import {
  forgotPassword,
  login,
  signUp,
  changePassword,
  verifyEmail,
  verifyPasswordOtp,
  resendPasswordOtp,
  resendAccountCreationOtp,
} from '../api/auth';

export const useLogin = (options = {}) => {
  const { mutate, isLoading } = useMutation(login, {
    mutationKey: 'LOGIN',
    ...options,
  });
  return { mutate, isLoading };
};

export const useSignUp = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(signUp, {
    mutationKey: 'SIGN_UP',
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useVerifyEmail = (options = {}) => {
  const { mutate, isLoading } = useMutation(verifyEmail, {
    mutationKey: 'VERIFY_EMAIL',
    ...options,
  });

  return { mutate, isLoading };
};
export const useForgotPassword = (options = {}) => {
  const { mutate, isLoading } = useMutation(forgotPassword, {
    mutationKey: 'CHANGE_PASSWORD_OTP',
    ...options,
  });
  return { mutate, isLoading };
};

export const useVerifyPasswordOtp = (options = {}) => {
  const { mutate, isLoading } = useMutation(verifyPasswordOtp, {
    mutationKey: 'verifyPasswordOtp',
    ...options,
  });

  return { mutate, isLoading };
};

export const useChangePassword = (options = {}) => {
  const { mutate, isLoading } = useMutation(changePassword, {
    mutationKey: 'UPDATE_PASSWORD',
    ...options,
  });

  return { mutate, isLoading };
};

export const useResendPasswordOtp = (options = {}) => {
  const { mutate, isLoading } = useMutation(resendPasswordOtp, {
    mutationKey: 'RESEND_PASS_OTP',
    ...options,
  });

  return { mutate, isLoading };
};
export const useResendAccountCreationOtp = (options = {}) => {
  const { mutate, isLoading } = useMutation(resendAccountCreationOtp, {
    mutationKey: 'RESEND_ACCOUNT_CREATION_OTP',
    ...options,
  });

  return { mutate, isLoading };
};
