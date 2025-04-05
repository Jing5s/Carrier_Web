import { useMutation } from '@tanstack/react-query';
import {
  deleteUser,
  patchUserInfo,
  patchUserPicture,
} from 'features/user/services/user.api';
import { TOKEN } from 'shared/constants';
import { Storage } from 'shared/lib/storage';

export const useUpdateUserInfo = () => {
  return useMutation({ mutationFn: patchUserInfo });
};

export const useUpdateUserPicture = () => {
  return useMutation({ mutationFn: patchUserPicture });
};

export const useUserSecession = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      Storage.delItem(TOKEN.ACCESS);
      Storage.delItem(TOKEN.REFRESH);
      window.location.href = '/';
    },
  });
};
