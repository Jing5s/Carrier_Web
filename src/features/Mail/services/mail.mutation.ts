import { useMutation } from '@tanstack/react-query';
import { updateMailsAtom } from 'features/Mail/contexts/mail';
import {
  patchMailRead,
  patchMails,
  patchMailSummary,
  postMailsBatchSave,
} from 'features/Mail/services/mail.api';
import { useSetAtom } from 'jotai';

export const useMailMutation = () => {
  const updatedMails = useSetAtom(updateMailsAtom);
  return useMutation({
    mutationFn: patchMails,
    onSuccess: () => {
      updatedMails();
    },
  });
};

export const useMailBatchSaveMutation = () => {
  return useMutation({
    mutationFn: postMailsBatchSave,
  });
};

export const useMailReadMutation = () => {
  return useMutation({
    mutationFn: (gmailId: string) => patchMailRead(gmailId),
  });
};

export const useMailSummaryMutation = () => {
  return useMutation({
    mutationFn: (gmailId: string) => patchMailSummary(gmailId),
  });
};
