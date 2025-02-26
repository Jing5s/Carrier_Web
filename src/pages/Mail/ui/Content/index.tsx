import * as s from './style.css';
import { useState } from 'react';
import { WriteIcon, Trash } from 'features/Mail/ui';
import { useMenuState } from 'entities/mail/hooks';

const mailData = [
  {
    id: 1,
    sender: '보낸이름',
    Recipient: '받는이름',
    title: '보안알림',
    description:
      'macOS에 Google 계정 액세스 권한이 부여됨 chltjdgns1009@gmail.com 액세스 권한을 부여한 적이 없다면 이 활동을 확인하고 계정을 보호하세요.',
    date: '2025.01.12.',
    RecipientEmail: 'dltmdgus1412@gmail.com',
    senderEmail: 'notifications@github.com',
    read: false,
  },
  {
    id: 2,
    sender: '추성우',
    Recipient: 'seonghoon07/Kotlin_study',
    title: '[seonghoon07/Kotlin_study] 하지마 (Issue #1)',
    description:
      '— Reply to this email directly, view it on GitHub, or unsubscribe. You are receiving this because you are subscribed to this thread.',
    date: '2025.01.12.',
    RecipientEmail: 'Kotlin_study@noreply.github.com',
    senderEmail: 'notifications@github.com',
    read: true,
  },
  {
    id: 3,
    sender: 'PAYCO',
    Recipient: '받는이름',
    title: 'PAYCO 전자금융거래 이용약관 개정 안내',
    description:
      'PAYCO 전자금융거래 이용약관 개정 안내 PAYCO 서비스를 이용해주시는 회원 여러분께 감사드리며, 전자금융거래 이용약관 개정 안내 드립니다. 1. 개정약관 시행일 : 2025년 2월 17일',
    date: '2025.01.12.',
    RecipientEmail: 'dltmdgus1412@gmail.com',
    senderEmail: 'notifications@github.com',
    read: true,
  },
];

const Content = () => {
  const { selectedMenu } = useMenuState();
  const [selectedMail, setSelectedMail] = useState(0);
  const selectedMailData = mailData.find((mail) => mail.id === selectedMail);
  return (
    <div className={s.container}>
      <header className={s.header}>
        <div className={s.mailType}>
          {selectedMenu}
          <div className={s.subTitle}>4개의 메일, 1개 읽지 않음</div>
        </div>

        <div className={s.mailOption}>
          <div className={s.mailOption_addPlan}>일정으로 추가</div>
          <div className={s.mailOption_write}>
            <WriteIcon />
          </div>
          <div className={s.mailOption_delete}>
            <Trash />
          </div>
        </div>
      </header>

      <main className={s.content}>
        <div className={s.content_list}>
          {mailData.map((data) => (
            <div
              className={`${s.mailList_container} ${
                selectedMail === data.id ? s.mailList_container_selected : ''
              }`}
              onClick={() => setSelectedMail(data.id)}
            >
              {data.read ? '' : <div className={s.mailList_readState} />}
              <div className={s.mailList_header}>
                <div className={s.mailList_Sender}>{data.sender}</div>
                <div
                  className={`${s.mailList_Date} ${
                    selectedMail === data.id
                      ? s.mailList_container_selected
                      : ''
                  }`}
                >
                  {data.date}
                </div>
              </div>
              <div className={s.mailList_title}>{data.title}</div>
              <div
                className={`${s.mailList_description} ${
                  selectedMail === data.id ? s.mailList_container_selected : ''
                }`}
              >
                {data.description}
              </div>
            </div>
          ))}
        </div>
        <div className={s.content_description}>
          {selectedMail !== 0 && selectedMailData && (
            <>
              <div className={s.description_header}>
                <div className={s.description_title}>
                  {selectedMailData.title}
                </div>
                <div className={s.description_info}>
                  <div className={s.description_sender}>
                    {selectedMailData.sender} &lt;{selectedMailData.senderEmail}
                    &gt;
                  </div>
                  <div className={s.description_Recipient}>
                    {selectedMailData.Recipient} &lt;
                    {selectedMailData.RecipientEmail}&gt;
                  </div>
                </div>
              </div>
              <div className={s.description_content}>
                {mailData.find((mail) => mail.id === selectedMail)?.description}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Content;
