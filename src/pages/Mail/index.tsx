import { Sidebar, Content } from 'features/Mail';
import * as s from './style.css';
import SendModal from 'features/Mail/SendModal';
import useModal from 'shared/hooks/useModal';
import { MailModalType } from 'entities/mail/types/MailModalProps';
import CreateScheduleModal from 'features/Mail/CreateScheduleModal';
import { useMailMutation } from 'features/Mail/services/mail.mutation';
import { useEffect } from 'react';

const Mail = () => {
  const { isOpen, openModal, closeModal } = useModal<MailModalType>();
  const { mutate } = useMailMutation();
  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <div className={s.container}>
      <Sidebar />
      <Content toggleModalOpen={openModal} />
      {isOpen('send') && <SendModal toggleModalClose={closeModal} />}
      {isOpen('createSchedule') && (
        <CreateScheduleModal toggleModalClose={closeModal} />
      )}
    </div>
  );
};

export default Mail;
