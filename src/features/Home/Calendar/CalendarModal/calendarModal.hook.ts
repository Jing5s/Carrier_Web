import { useState, useEffect, useCallback } from 'react';
import { CalendarEvent } from 'entities/calendar/type';
import { usePostScheduleMutation } from 'features/Home/services/home.mutation';

interface UseEventStateProps {
  event?: CalendarEvent;
}

interface EventState {
  eventType: 'Schedule' | 'Todo';
  title: string;
  memo: string;
  startDate: string;
  endDate: string | null;
  selectedRepeatId: number;
  selectedCategoryId: number;
  selectedPriorityId: number;
  isAllDay: boolean;
  location: string;
}

const useEventState = ({ event }: UseEventStateProps) => {
  const [state, setState] = useState<EventState>({
    eventType: event?.type || 'Schedule',
    title: event?.title || '',
    memo: event?.memo || '',
    startDate: event?.start || '',
    endDate: event?.end || null,
    selectedRepeatId: 1,
    selectedCategoryId: event?.type === 'Schedule' ? event.category || 1 : 1,
    selectedPriorityId: event?.type === 'Todo' ? event.priority || 1 : 1,
    isAllDay: event?.type === 'Schedule' ? event.allDay || false : false,
    location: event?.location || '',
  });

  const isInitial = !event || event.title === '';

  const updateState = useCallback((updates: Partial<EventState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const switchEventType = useCallback(
    (type: 'Schedule' | 'Todo') => {
      updateState({
        eventType: type,
        ...(type === 'Schedule'
          ? {
              selectedCategory: 1,
              isAllDay: true,
              selectedPriority: undefined,
            }
          : {
              selectedPriority: 'MIDDLE',
              isAllDay: false,
            }),
      });
    },
    [updateState]
  );

  const scheduleData = {
    title: state.title,
    allDay: state.isAllDay,
    isRepeat: false,
    categoryId: state.selectedCategoryId,
    startDate: state.startDate,
    endDate: state.endDate,
    location: state.location,
  };
  const { postScheduleMutate } = usePostScheduleMutation(scheduleData);

  const createEvent = useCallback(() => {
    postScheduleMutate();
  }, [postScheduleMutate]);

  useEffect(() => {
    if (event) {
      setState({
        eventType: event.type,
        title: event.title,
        memo: event.memo || '',
        startDate: event?.start || '',
        endDate: event?.end || null,
        selectedRepeatId: 1,
        location: event.location || '',
        selectedCategoryId: event.type === 'Schedule' ? event.category || 1 : 1,
        selectedPriorityId: event.type === 'Todo' ? event.priority || 1 : 1,
        isAllDay: event.type === 'Schedule' ? event.allDay || false : false,
      });
    }
  }, [event]);

  return {
    state,
    updateState,
    switchEventType,
    isInitial,
    createEvent,
  };
};

export default useEventState;
