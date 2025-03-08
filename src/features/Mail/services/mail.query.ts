import { queryOptions } from '@tanstack/react-query';
import { Schedule } from 'entities/calendar/type';
import { Mail } from 'entities/mail/types';
import {
  getMailDetail,
  getMailToSchedule,
} from 'features/Mail/services/mail.api';
import { mailKeys } from 'features/Mail/services/mail.keys';

export const mailQuery = {
  mailDetail: (gmailId: string) =>
    queryOptions<Mail>({
      queryKey: [mailKeys.mailDetail, gmailId],
      queryFn: () => getMailDetail(gmailId),
    }),
  mailToSchedule: (gmailId: string) =>
    queryOptions<Schedule>({
      queryKey: [mailKeys.mailToSchedule, gmailId],
      queryFn: () => getMailToSchedule(gmailId),
    }),
};
