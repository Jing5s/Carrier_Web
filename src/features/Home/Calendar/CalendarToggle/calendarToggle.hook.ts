import { useCallback } from 'react';
import { CalendarEvent } from 'entities/calendar/type';

const useCreateNewEvent = () => {
  const createNewEvent = useCallback(
    (type: 'Schedule' | 'Todo'): CalendarEvent => {
      const commonFields = {
        title: '',
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        startEditable: true,
        isRepeat: false,
      };

      if (type === 'Schedule') {
        return {
          ...commonFields,
          type: 'Schedule',
          durationEditable: true,
          allDay: true,
          category: 1,
        } as CalendarEvent;
      } else {
        return {
          ...commonFields,
          type: 'Todo',
          durationEditable: false,
          priority: 1,
        } as CalendarEvent;
      }
    },
    []
  );

  return createNewEvent;
};

export default useCreateNewEvent;
