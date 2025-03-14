export const EVENT_TYPE = {
  Schedule: 'Schedule',
  Todo: 'Todo',
} as const;

export type EventType = (typeof EVENT_TYPE)[keyof typeof EVENT_TYPE];

export interface Category {
  id: number;
  name: string;
  color: string;
  active: boolean;
}

export interface CalendarEvent {
  type: EventType;
  title: string;
  memo: string | null;
  isRepeat: boolean;
  start: string;
  end: string;
  location?: string | null;
  allDay?: boolean;
  category?: number;
  priority?: number;
  startEditable?: boolean;
  durationEditable?: boolean;
}

export interface Schedule {
  title: string;
  memo: string | null;
  allDay: boolean;
  isRepeat: boolean;
  startDate: string;
  endDate: string | null;
  category: Category;
  location: string;
}
