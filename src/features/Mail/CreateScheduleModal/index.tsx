import { MailModalProps } from 'entities/mail/types/MailModalProps';
import * as s from './style.css';
import AlertMark from 'features/Mail/ui/AlertMark';
import {
  CalendarEvent,
  ScheduleCategory,
  TodoPriority,
} from 'entities/calendar/type';
import useEventState from 'features/Home/Calendar/CalendarModal/calendarModal.hook';
import EventDropdown from 'features/Home/Calendar/Dropdown';
import { useState } from 'react';
import LoadingStatus from 'features/Mail/CreateScheduleModal/LoadingStatus';

const CreateScheduleModal = ({ toggleModalClose }: MailModalProps) => {
  const [isLoading] = useState(true);
  const [event] = useState<CalendarEvent>({
    type: 'Schedule',
    title: 'AI 일정 제목',
    start: '2025-02-09T14:00:00',
    end: '2025-02-12T14:00:00',
    content: 'AI 일정 내용',
    location: 'AI 일정 위치',
    repeatCycle: '매주',
    category: '나의 일정',
    allDay: false,
    priority: '낮음',
  });

  const { state, updateState } = useEventState({ event });

  const handleChangeInputs = (key: 'title' | 'content', value: string) => {
    updateState({ [key]: value });
  };

  const handleChangeRepeat = (value: string) =>
    updateState({ selectedRepeat: value });

  const handleChangeCategory = (value: string) =>
    updateState({
      selectedCategory: value as ScheduleCategory,
    });

  const handleChangePriority = (value: string) =>
    updateState({
      selectedPriority: value as TodoPriority,
    });

  const handleIsAllday = () =>
    updateState({
      isAllDay: !state.isAllDay,
    });

  return (
    <div className={s.background}>
      {isLoading ? (
        <LoadingStatus toggleModalClose={toggleModalClose} />
      ) : (
        <div className={s.container({ type: 'create' })}>
          <AlertMark />
          <p className={s.explainText}>
            아래 내용을 일정으로 추가하시겠습니까?
          </p>
          <div className={s.calendarModal}>
            <div className={s.calendarModalHeader}>
              <input
                className={s.calendarModalTitle}
                placeholder="새 일정"
                value={state.title}
                onChange={(e) => handleChangeInputs('title', e.target.value)}
              />
              <input
                className={s.calendarModalSubTitle}
                placeholder="메모"
                value={state.content}
                onChange={(e) => handleChangeInputs('content', e.target.value)}
              />
            </div>
            <div className={s.horizontalLine} />
            <div className={s.calendarModalBody}>
              {state.eventType === 'Schedule' && (
                <div className={s.calendarModalItem}>
                  <div className={s.calendarModalItemTitle}>하루 종일</div>
                  <div
                    className={s.displayBtnLayout({ isActive: state.isAllDay })}
                    onClick={handleIsAllday}
                  >
                    <div className={s.displayBtnObject} />
                  </div>
                </div>
              )}
              {event?.start &&
                event?.end &&
                !state.isAllDay &&
                state.eventType === 'Schedule' && (
                  <>
                    <div className={s.calendarModalItem}>
                      <div className={s.calendarModalItemTitle}>시작</div>
                      <div className={s.calendarModalItemAttribute}>
                        {new Date(event.start).toLocaleString()}
                      </div>
                    </div>
                    <div className={s.calendarModalItem}>
                      <div className={s.calendarModalItemTitle}>종료</div>
                      <div className={s.calendarModalItemAttribute}>
                        {new Date(event.end).toLocaleString()}
                      </div>
                    </div>
                  </>
                )}

              <div className={s.calendarModalItem}>
                <div className={s.calendarModalItemTitle}>반복</div>
                <EventDropdown
                  name="repeat"
                  value={state.selectedRepeat}
                  data={
                    state.eventType === 'Schedule'
                      ? [
                          { value: 'NONE', label: '없음' },
                          { value: 'DAILY', label: '매일' },
                          { value: 'WEEKDAYS', label: '매주' },
                          { value: 'WEEKENDS', label: '매달' },
                        ]
                      : [
                          { value: 'NONE', label: '없음' },
                          { value: 'DAILY', label: '매일' },
                          { value: 'WEEKLY', label: '매주' },
                          { value: 'BIWEEKLY', label: '격주' },
                          { value: 'MONTHLY', label: '매달' },
                          { value: 'QUARTERLY', label: '분기' },
                          { value: 'SEMIANNUALLY', label: '반기' },
                          { value: 'ANNUALLY', label: '매년' },
                        ]
                  }
                  onChange={handleChangeRepeat}
                />
              </div>

              {state.eventType === 'Schedule' ? (
                <div className={s.calendarModalItem}>
                  <div className={s.calendarModalItemTitle}>카테고리</div>
                  <EventDropdown
                    name="category"
                    value={state.selectedCategory}
                    data={[
                      { value: 'FIRST', label: '나의 일정', color: '#3B82F6' },
                      { value: 'SECOND', label: '게임', color: '#22C55E' },
                      { value: 'THIRD', label: '공휴일', color: '#EF4444' },
                    ]}
                    onChange={handleChangeCategory}
                  />
                </div>
              ) : (
                <div className={s.calendarModalItem}>
                  <div className={s.calendarModalItemTitle}>우선순위</div>
                  <EventDropdown
                    name="priority"
                    value={state.selectedPriority}
                    data={[
                      { value: 'LOW', label: '낮음' },
                      { value: 'MIDDLE', label: '중간' },
                      { value: 'HIGH', label: '높음' },
                    ]}
                    onChange={handleChangePriority}
                  />
                </div>
              )}
            </div>
            <div className={s.horizontalLine} />
            <div className={s.calendarModalFooter}>
              <div className={s.calendarModalLocationPlaceholder}>
                위치 추가
              </div>
            </div>
            <div className={s.horizontalLine} />
            <div className={s.buttons}>
              <button
                className={s.button({ type: 'cancel' })}
                onClick={() => toggleModalClose?.('createSchedule')}
              >
                취소
              </button>
              <button className={s.button({ type: 'create' })}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateScheduleModal;
