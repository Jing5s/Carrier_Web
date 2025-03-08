import { queryOptions } from '@tanstack/react-query';
import { IUser } from 'entities/user/types';
import { getUserInfo } from 'features/user/services/user.api';
import { userKeys } from 'features/user/services/user.keys';

export const userQuery = {
  userInfo: () =>
    queryOptions<IUser>({
      queryKey: [userKeys.userInfo],
      queryFn: getUserInfo,
    }),
};
