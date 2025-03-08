import { Schedule } from './type';

export interface GetScheduleListReq {
  startDate: string;
  endDate: string;
  categoryIds: number[];
}

export interface GetScheduleListRes {
  dataList: Schedule[];
}

export interface PostScheduleReq {
  title: string;
  allDay: boolean;
  isRepeat: boolean;
  categoryId: number;
  startDate: string;
  endDate: string | null;
  location: string | null;
}

export interface PostTodoReq {
  title: string;
  date: string;
  isRepeat: boolean;
  priority: string;
  memo: string | null;
  location: string | null;
}
