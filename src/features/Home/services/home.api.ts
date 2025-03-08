import { customAxios } from 'shared/api';
import { GetScheduleListReq, PostScheduleReq } from 'entities/calendar/remote';
import { Schedule, EVENT_TYPE } from 'entities/calendar/type';
import { toQueryString } from 'shared/lib/queryString';

export const getTodoList = async (date: string) => {
  const { data } = await customAxios.get(`/todos?date=${date}`);
  return data;
};

export const postTodo = async (todo: {
  title: string;
  date: string;
  isRepeat: boolean;
  priority: string;
  memo: string;
  location: string;
}) => {
  const { data } = await customAxios.post('/todos', todo);
  return data;
};

export const patchTodo = async (id: number) => {
  const { data } = await customAxios.patch(`todos/change/${id}`);
  return data;
};

export const getCategory = async () => {
  const { data } = await customAxios.get('/categories');
  return data;
};

export const postCategory = async (category: {
  name: string;
  color: string;
}) => {
  const { data } = await customAxios.post('/categories', category);
  return data;
};

export const patchCategory = async (id: number) => {
  const { data } = await customAxios.patch(`categories/change/${id}`);
  return data;
};

export const getScheduleList = async (params: GetScheduleListReq) => {
  const { data } = await customAxios.get<Schedule[]>(
    `/schedules?${toQueryString(params)}`
  );

  return data.map(
    ({ title, allDay, isRepeat, startDate, endDate, category }) => ({
      type: EVENT_TYPE.Schedule,
      title,
      allDay,
      isRepeat,
      start: startDate,
      end: allDay && !endDate ? startDate : endDate || '',
      category: category.id,
      startEditable: true,
      durationEditable: true,
    })
  );
};

export const postAddSchedule = async (params: PostScheduleReq) => {
  const { data } = await customAxios.post('/schedules', params);
  return data;
};
