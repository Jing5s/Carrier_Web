import { useQueryClient } from '@tanstack/react-query';
import { useMailReadMutation } from 'features/Mail/services/mail.mutation';
import { mailKeys } from 'features/Mail/services/mail.keys';
import { Mail } from 'entities/mail/types';

export const useHandleMailClick = (
  setSelectedMail: (id: string) => void,
  setMails: (updateFn: (prevMails: Mail[]) => Mail[]) => void
) => {
  const queryClient = useQueryClient();
  const { mutate: mailReadMutate } = useMailReadMutation();

  const handleMailClick = (gmailId: string, isRead: boolean) => {
    setSelectedMail(gmailId);

    if (!isRead) {
      mailReadMutate(gmailId, {
        onSuccess: () => {
          setMails((prevMails) =>
            prevMails.map((mail) =>
              mail.gmailId === gmailId ? { ...mail, isRead: true } : mail
            )
          );

          queryClient.setQueryData(['mails'], (oldMails: Mail[]) => {
            if (!oldMails) return oldMails;
            return oldMails.map((mail: Mail) =>
              mail.gmailId === gmailId ? { ...mail, isRead: true } : mail
            );
          });

          queryClient.setQueryData(
            [mailKeys.mailDetail, gmailId],
            (oldData: Mail) => {
              if (!oldData) return oldData;
              return { ...oldData, isRead: true };
            }
          );

          queryClient.invalidateQueries({
            queryKey: [mailKeys.mailDetail, gmailId],
          });
        },
      });
    }
  };

  return handleMailClick;
};
