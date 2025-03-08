import { Mail } from 'entities/mail/types';
import { getMailList, patchMails } from 'features/Mail/services/mail.api';
import { atom } from 'jotai';

export const mailsAtom = atom<Mail[]>([]);

export const updateMailsAtom = atom(null, async (_, set) => {
  await patchMails();
  const updatedMails = await getMailList();
  set(mailsAtom, updatedMails);
});

export const selectedMailIdAtom = atom<string | null>(null);
