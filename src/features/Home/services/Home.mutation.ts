import { useMutation } from '@tanstack/react-query';
import { patchTodo, postTodo } from './Home.api';

export const useCreateTodoMutation = () => {
  return useMutation({
    mutationFn: postTodo,
  });
};

export const usePatchTodoMutation = () => {
  return useMutation({
    mutationFn: patchTodo,
  });
};
