import { customAxios } from 'shared/api';

export const getTodos = async (date: string) => {
  const { data } = await customAxios.get(`/todo?date=${date}`);
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
  const { data } = await customAxios.post('/todo/add', todo);
  return data;
};

export const patchTodo = async (id: number) => {
  const { data } = await customAxios.patch(`todo/change/${id}`);
  return data;
};

export const getCategory = async () => {
  const { data } = await customAxios.get('/category');
  return data;
};
