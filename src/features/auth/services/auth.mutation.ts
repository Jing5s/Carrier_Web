import { useMutation } from '@tanstack/react-query';
import { Storage } from 'shared/lib/storage';
import { TOKEN } from 'shared/constants';
import { postLogin } from './auth.api';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({ accessToken, refreshToken }) => {
      Storage.setItem(TOKEN.ACCESS, accessToken);
      Storage.setItem(TOKEN.REFRESH, refreshToken);
      window.location.href = '/';
    },
  });
};
