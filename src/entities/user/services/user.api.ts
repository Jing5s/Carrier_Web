import { customAxios } from 'shared/api';
import { authorization } from 'shared/api/header';

export const getUserInfo = async () => {
  const { data } = await customAxios.get('/users', authorization());
  return data;
};
