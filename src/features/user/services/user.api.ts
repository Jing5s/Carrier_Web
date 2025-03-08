import { customAxios } from 'shared/api';

export const getUserInfo = async () => {
  const { data } = await customAxios.get('/users');
  return data;
};

export const patchUserInfo = async (nickname: string) => {
  const { data } = await customAxios.patch('/users', { nickname });
  return data;
};
