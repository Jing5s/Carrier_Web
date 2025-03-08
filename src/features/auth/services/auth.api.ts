import { customAxios } from 'shared/api';

export const getLoginLink = async () => {
  const { data } = await customAxios.get('/auth');
  return data;
};

export const postLogin = async (code: string) => {
  const { data } = await customAxios.post('/auth', {
    token: code,
    redirectUrl: import.meta.env.VITE_APPLICATION_REDIRECT,
  });
  return data;
};

export const deleteLogout = async () => {
  const { data } = await customAxios.delete('/auth');
  return data;
};
