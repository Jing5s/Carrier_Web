import { customAxios } from 'shared/api';

export const patchAlarmTime = async (time: string) => {
  const { data } = await customAxios.patch('/users/notification', { time });
  return data;
};
