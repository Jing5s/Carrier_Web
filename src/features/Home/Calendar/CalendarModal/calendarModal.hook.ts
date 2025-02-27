import { useState, useEffect, useCallback } from 'react';
import {
  CalendarEvent,
  ScheduleCategory,
  TodoPriority,
  Schedule,
  Todo,
} from 'entities/calendar/type';

interface UseEventStateProps {
  event?: CalendarEvent;
}

interface EventState {
  eventType: 'Schedule' | 'Todo';
  title: string;
  content: string;
  selectedRepeat: string;
  selectedCategory?: ScheduleCategory;
  selectedPriority?: TodoPriority;
  isAllDay: boolean;
  location: string;
}

const useEventState = ({ event }: UseEventStateProps) => {
  const [state, setState] = useState<EventState>({
    eventType: event?.type || 'Schedule',
    title: event?.title || '',
    content: event?.content || '',
    selectedRepeat: event?.repeatCycle || 'NONE',
    selectedCategory:
      event?.type === 'Schedule' ? (event as Schedule).category : undefined,
    selectedPriority:
      event?.type === 'Todo' ? (event as Todo).priority : undefined,
    isAllDay:
      event?.type === 'Schedule' ? (event as Schedule).allDay || false : false,
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
              selectedCategory: 'FIRST',
              isAllDay: true,
              selectedPriority: undefined,
            }
          : {
              selectedPriority: 'MEDIUM',
              selectedCategory: undefined,
              isAllDay: false,
            }),
      });
    },
    [updateState]
  );

  useEffect(() => {
    if (event) {
      setState({
        eventType: event.type,
        title: event.title,
        content: event.content || '',
        selectedRepeat: event.repeatCycle || 'NONE',
        location: event.location || '',
        selectedCategory:
          event.type === 'Schedule' ? (event as Schedule).category : undefined,
        selectedPriority:
          event.type === 'Todo' ? (event as Todo).priority : undefined,
        isAllDay:
          event.type === 'Schedule' ? (event as Schedule).allDay : false,
      });
    }
  }, [event]);

  return { state, updateState, switchEventType, isInitial };
};

export default useEventState;
