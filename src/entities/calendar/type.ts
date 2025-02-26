export const EVENT_TYPE = {
  Schedule: 'Schedule',
  Todo: 'Todo',
} as const;

export type EventType = (typeof EVENT_TYPE)[keyof typeof EVENT_TYPE];

export const SCHEDULE_REPEAT = {
  NONE: 'NONE',
  DAILY: 'DAILY',
  WEEKDAYS: 'WEEKDAYS',
  WEEKENDS: 'WEEKENDS',
  MONTHLY: 'MONTHLY',
} as const;

export type ScheduleRepeat =
  (typeof SCHEDULE_REPEAT)[keyof typeof SCHEDULE_REPEAT];

export const SCHEDULE_CATEGORY = {
  FIRST: 'FIRST',
  SECOND: 'SECOND',
  THIRD: 'THIRD',
} as const;

export type ScheduleCategory =
  (typeof SCHEDULE_CATEGORY)[keyof typeof SCHEDULE_CATEGORY];

export const TODO_REPEAT = {
  NONE: 'NONE',
  DAILY: 'DAILY',
  WEEKDAYS: 'WEEKDAYS',
  WEEKENDS: 'WEEKENDS',
  WEEKLY: 'WEEKLY',
  BIWEEKLY: 'BIWEEKLY',
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  SEMIANNUALLY: 'SEMIANNUALLY',
  ANNUALLY: 'ANNUALLY',
} as const;

export type TodoRepeat = (typeof TODO_REPEAT)[keyof typeof TODO_REPEAT];

export const TODO_PRIORITY = {
  LOW: 'LOW',
  MIDDLE: 'MEDIUM',
  HIGH: 'HIGH',
} as const;

export type TodoPriority = (typeof TODO_PRIORITY)[keyof typeof TODO_PRIORITY];

export interface CalendarEvent {
  type: EventType;
  title: string;
  start: string;
  end: string;
  startEditable: boolean;
  durationEditable: boolean;
  content?: string;
  location?: string;
  repeatCycle?: string;
  category?: string;
  allDay?: boolean;
  priority?: string;
}

export interface Schedule extends CalendarEvent {
  type: 'Schedule';
  startEditable: true;
  durationEditable: true;
  allDay: boolean;
  startTime?: string;
  endTime?: string;
  repeatCycle: ScheduleRepeat;
  category: ScheduleCategory;
}

export interface Todo extends CalendarEvent {
  type: 'Todo';
  startEditable: true;
  durationEditable: false;
  repeatCycle: TodoRepeat;
  priority: TodoPriority;
}
