export type MailModalType = 'send' | 'createSchedule';

export interface MailModalProps {
  toggleModalOpen?: (filter: MailModalType) => void;
  toggleModalClose?: (filter: MailModalType) => void;
}
