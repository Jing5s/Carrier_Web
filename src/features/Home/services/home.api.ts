import { customAxios } from 'shared/api';
import { authorization } from 'shared/api/header';
import { PostScheduleListReq, PostScheduleReq } from 'entities/calendar/remote';
import { Schedule } from 'entities/calendar/type';

export const postScheduleList = async (params: PostScheduleListReq) => {
  const { data } = await customAxios.post<Schedule[]>(
    '/schedule',
    params,
    authorization()
  );
  return data;
};

export const postAddSchedule = async (params: PostScheduleReq) => {
  const { data } = await customAxios.post(
    '/schedule/add',
    params,
    authorization()
  );
  return data;
};
