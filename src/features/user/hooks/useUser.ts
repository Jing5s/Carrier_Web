'use client';

import { Storage } from 'shared/lib/storage';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { userContext } from 'entities/user/contexts/user';
import { useAtom } from 'jotai';
import { getUserInfo } from 'features/userCheck/services/user.api';
import { userKeys } from 'features/userCheck/services/user.keys';

const useUser = () => {
  const [user, setUser] = useAtom(userContext);

  const { data: userInfo, isLoading } = useQuery({
    ...userQuery.userInfo(),
    enabled: !!Storage.getItem('accessToken'),
  });

  useEffect(() => {
    if (userInfo) setUser(userInfo);
  }, [setUser, userInfo]);

  return {
    user,
    isLoggedIn: !!userInfo,
    isLoading,
  };
};

export default useUser;
