import { customAxios } from 'shared/api';
import {
  GetCategoriesRes,
  GetScheduleListReq,
  GetTodoListReq,
  PatchCategoriesReq,
  PatchScheduleReq,
  PatchTodoReq,
  PostScheduleReq,
  PostTodoReq,
} from 'entities/calendar/remote';
import { Schedule, EVENT_TYPE, Todo } from 'entities/calendar/type';
import { toQueryString } from 'shared/lib/queryString';

export const getTodoList = async (params: GetTodoListReq) => {
  const { data } = await customAxios.get<Todo[]>(
    `/todos?${toQueryString(params)}`
  );

  return data.map(({ id, title, memo, isDone, date }) => ({
    type: EVENT_TYPE.Todo,
    eventId: id,
    title,
    memo,
    isRepeat: false,
    start: `${date}T00:00:00`,
    end: `${date}T23:59:59`,
    isDone: isDone,
    startEditable: true,
    durationEditable: false,
  }));
};

export const postTodo = async (params: PostTodoReq) => {
  const { data } = await customAxios.post('/todos', params);
  return data;
};

export const patchTodo = async (params: PatchTodoReq) => {
  const { data } = await customAxios.patch('/todos', params);
  return data;
};

export const patchTodoState = async (id: number) => {
  const { data } = await customAxios.patch(`/todos/change/${id}`);
  return data;
};

export const deleteTodo = async (id: number) => {
  const { data } = await customAxios.delete(`/todos/${id}`);
  return data;
};

export const getCategory = async () => {
  const { data } = await customAxios.get<GetCategoriesRes[]>('/categories');
  return data;
};

export const postCategory = async (category: {
  name: string;
  color: string;
}) => {
  const { data } = await customAxios.post('/categories', category);
  return data;
};

export const patchCategory = async (params: PatchCategoriesReq) => {
  const { data } = await customAxios.patch(`/categories`, params);
  return data;
};

export const patchCategoryState = async (id: number) => {
  const { data } = await customAxios.patch(`/categories/change/${id}`);
  return data;
};

export const getScheduleList = async (params: GetScheduleListReq) => {
  const { data } = await customAxios.get<Schedule[]>(
    `/schedules?${toQueryString(params)}`
  );

  return data.map(
    ({
      id,
      title,
      memo,
      allDay,
      isRepeat,
      startDate,
      endDate,
      category,
      location,
    }) => ({
      type: EVENT_TYPE.Schedule,
      eventId: id,
      title,
      memo,
      isAllDay: allDay,
      isRepeat,
      start: startDate,
      end: allDay && !endDate ? startDate : endDate || '',
      category: category.id,
      location,
      allDay: true,
      startEditable: true,
      durationEditable: true,
    })
  );
};

export const postSchedule = async (params: PostScheduleReq) => {
  const { data } = await customAxios.post('/schedules', params);
  return data;
};

export const patchSchedule = async (params: PatchScheduleReq) => {
  const { data } = await customAxios.patch('/schedules', params);
  return data;
};

export const deleteSchedule = async (id: number) => {
  const { data } = await customAxios.delete(`/schedules/${id}`);
  return data;
};

export const getTips = async () => {
  const { data } = await customAxios.get('/users/tips');
  return data;
};
