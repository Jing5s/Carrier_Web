import { useCallback } from 'react';
import { Schedule, Todo } from 'entities/calendar/type';

const useCreateNewEvent = () => {
  const createNewEvent = useCallback(
    (type: 'Schedule' | 'Todo'): Schedule | Todo => {
      const commonFields = {
        title: '',
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        startEditable: true,
        repeatCycle: 'NONE',
      };

      if (type === 'Schedule') {
        return {
          ...commonFields,
          type,
          durationEditable: true,
          allDay: true,
          category: 'FIRST',
        } as Schedule;
      } else {
        return {
          ...commonFields,
          type,
          durationEditable: false,
          priority: 'MEDIUM',
        } as Todo;
      }
    },
    []
  );

  return createNewEvent;
};

export default useCreateNewEvent;
