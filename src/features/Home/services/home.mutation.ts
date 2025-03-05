import { useMutation } from '@tanstack/react-query';
import {
  patchCategory,
  patchTodo,
  postCategory,
  postTodo,
  postAddSchedule,
  postScheduleList,
} from './home.api';
import { PostScheduleReq, PostScheduleListReq } from 'entities/calendar/remote';
import { Schedule, EVENT_TYPE } from 'entities/calendar/type';

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

export const usePatchCategoryMutation = () => {
  return useMutation({
    mutationFn: patchCategory,
  });
};

export const useCreateCategoryMutation = () => {
  return useMutation({
    mutationFn: postCategory,
  });
};

export const usePostScheduleMutation = (scheduleData: PostScheduleReq) => {
  const { mutate: postScheduleMutate, ...restMutation } = useMutation({
    mutationFn: () => postAddSchedule(scheduleData),
  });

  return { postScheduleMutate, ...restMutation };
};

export const useScheduleListMutation = (params: PostScheduleListReq) => {
  const { mutateAsync: postScheduleListMutate, ...restMutation } = useMutation({
    mutationFn: async () => {
      const response = (await postScheduleList(params)) ?? [];

      return response.map(
        ({
          title,
          allDay,
          isRepeat,
          startDate,
          endDate,
          category,
        }: Schedule) => ({
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
    },
  });

  return { postScheduleListMutate, ...restMutation };
};
