import { useMutation } from '@tanstack/react-query';
import { PostScheduleReq, PostScheduleListReq } from 'entities/calendar/remote';
import { postAddSchedule, postScheduleList } from './home.api';
import { Schedule, EVENT_TYPE } from 'entities/calendar/type';

export const usePostScheduleMutation = (scheduleData: PostScheduleReq) => {
  const { mutate: postScheduleMutate, ...restMutation } = useMutation({
    mutationFn: () => postAddSchedule(scheduleData),
  });

  return { postScheduleMutate, ...restMutation };
};

export const useScheduleListMutation = (params: PostScheduleListReq) => {
  const { mutateAsync: postScheduleListMutate, ...restMutation } = useMutation({
    mutationFn: async () => {
      const response = await postScheduleList(params);
      if (!response) return [];

      return response.map((schedule: Schedule) => ({
        type: EVENT_TYPE.Schedule,
        title: schedule.title,
        allDay: schedule.allDay,
        isRepeat: schedule.isRepeat,
        start: schedule.startDate,
        end:
          schedule.allDay && !schedule.endDate
            ? schedule.startDate
            : schedule.endDate || '',
        category: schedule.category.id,
        startEditable: true,
        durationEditable: true,
      }));
    },
  });

  return { postScheduleListMutate, ...restMutation };
};
