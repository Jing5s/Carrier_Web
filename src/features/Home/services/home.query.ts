import { queryOptions } from '@tanstack/react-query';
import { getCategory, getTodos } from './home.api';

export const todoQuery = {
  getTodo: (date: string) =>
    queryOptions({
      queryKey: ['todo', date],
      queryFn: () => getTodos(date),
    }),
};

export const categoryQuery = {
  getCategories: () =>
    queryOptions({
      queryKey: ['Categories'],
      queryFn: () => getCategory(),
    }),
};
