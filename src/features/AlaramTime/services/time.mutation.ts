import { useMutation } from '@tanstack/react-query';
import { patchAlarmTime } from 'features/AlaramTime/services/time.api';

export const useAlarmTime = () => {
  return useMutation({
    mutationFn: patchAlarmTime,
  });
};
