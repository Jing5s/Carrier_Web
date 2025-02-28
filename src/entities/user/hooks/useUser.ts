'use client';

import { Storage } from 'shared/lib/storage';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { IUser } from 'entities/user/types';
import { userContext } from 'entities/user/contexts/user';
import { useAtom } from 'jotai';
import { getUserInfo } from 'entities/user/services/user.api';
import { userKeys } from 'entities/user/services/user.keys';

const useUser = () => {
  const [user, setUser] = useAtom(userContext);

  const { data: userInfo } = useQuery<IUser>({
    queryKey: [userKeys.userInfo],
    queryFn: getUserInfo,
    enabled: !!Storage.getItem('accessToken'),
  });

  useEffect(() => {
    if (userInfo) setUser(userInfo);
  }, [setUser, userInfo]);

  return {
    user,
    isLoggedIn: !!userInfo,
  };
};

export default useUser;
