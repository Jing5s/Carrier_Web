import { customAxios } from 'shared/api';

export const getUserInfo = async () => {
  const { data } = await customAxios.get('/users');
  return data;
};

export const patchUserInfo = async (nickname: string) => {
  const { data } = await customAxios.patch('/users', { nickname });
  return data;
};

export const patchUserPicture = async (formData: FormData) => {
  const { data } = await customAxios.patch('/users/picture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const deleteUser = async () => {
  const { data } = await customAxios.delete('/users');
  return data;
};
