import { Schedule } from './type';

export interface PostScheduleListReq {
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
