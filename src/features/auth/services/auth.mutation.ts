import { useMutation } from '@tanstack/react-query';
import { Storage } from 'shared/lib/storage';
import { TOKEN } from 'shared/constants';
import { deleteLogout, postLogin } from './auth.api';

/* eslint-disable no-console */

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({ accessToken, refreshToken, isSignUp }) => {
      Storage.setItem(TOKEN.ACCESS, accessToken);
      Storage.setItem(TOKEN.REFRESH, refreshToken);
      if (isSignUp) {
        window.location.replace('/survey');
      } else {
        window.location.replace('/');
      }
    },
    onError: (error) => {
      console.error('로그인 중 에러 발생:', error);
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: deleteLogout,
    onSuccess: () => {
      window.location.reload();
    },
    onSettled: () => {
      Storage.delItem(TOKEN.ACCESS);
      Storage.delItem(TOKEN.REFRESH);
    },
  });
};
