import { useMutation } from '@tanstack/react-query';
import { patchUserInfo } from 'features/user/services/user.api';

export const useUpdateUserInfo = () => {
  return useMutation({ mutationFn: patchUserInfo });
};
