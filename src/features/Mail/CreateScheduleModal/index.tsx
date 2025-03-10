import { MailModalProps } from 'entities/mail/types/MailModalProps';
import * as s from './style.css';
import AlertMark from 'features/Mail/ui/AlertMark';
import { CalendarEvent } from 'entities/calendar/type';
import useEventState from 'features/Home/Calendar/CalendarModal/calendarModal.hook';
import EventDropdown from 'features/Home/Calendar/Dropdown';
import { useCallback, useEffect, useState } from 'react';
import LoadingStatus from 'features/Mail/CreateScheduleModal/LoadingStatus';
import { useAtom } from 'jotai';
import { selectedMailIdAtom } from 'features/Mail/contexts/mail';
import { useQuery } from '@tanstack/react-query';
import { mailQuery } from 'features/Mail/services/mail.query';
import { usePostScheduleMutation } from 'features/Home/services/home.mutation';
import { useCategories } from 'entities/calendar/hooks/useCategory';

const CreateScheduleModal = ({ toggleModalClose }: MailModalProps) => {
  const [gmailId] = useAtom(selectedMailIdAtom);
  const { data: mailToScheduleData, isLoading } = useQuery({
    ...mailQuery.mailToSchedule(gmailId ?? ''),
    enabled: !!gmailId,
  });
  const [event, setEvent] = useState<CalendarEvent>({
    type: 'Schedule',
    title: '',
    start: '',
    end: '',
    memo: '',
    location: '',
    isRepeat: false,
    category: 1,
    allDay: false,
    priority: 1,
    startEditable: true,
    durationEditable: true,
  });

  useEffect(() => {
    if (mailToScheduleData) {
      setEvent((prev) => ({
        ...prev,
        title: mailToScheduleData?.title ?? prev.title,
        allDay: mailToScheduleData?.allDay ?? prev.allDay,
        start: mailToScheduleData?.startDate ?? prev.start,
        end: mailToScheduleData?.endDate ?? prev.end,
      }));
    }
  }, [mailToScheduleData]);

  const { state, updateState } = useEventState({ event });

  const categories = useCategories();

  const handleChangeInputs = (key: 'title' | 'content', value: string) => {
    updateState({ [key]: value });
  };

  const handleChangeRepeat = (id: number) =>
    updateState({ selectedRepeatId: id });

  const handleChangeCategory = (id: number) =>
    updateState({ selectedCategoryId: id });

  const handleChangePriority = (id: number) =>
    updateState({ selectedPriorityId: id });

  const handleIsAllday = () =>
    updateState({
      isAllDay: !state.isAllDay,
    });

  const scheduleData = {
    title: state.title,
    memo: state.memo,
    allDay: state.isAllDay,
    isRepeat: false,
    categoryId: state.selectedCategoryId,
    startDate: state.startDate,
    endDate: state.endDate,
    location: state.location,
  };

  const { mutate: postScheduleMutate } = usePostScheduleMutation();

  const createEvent = useCallback(() => {
    postScheduleMutate(scheduleData);
    toggleModalClose?.('createSchedule');
  }, [postScheduleMutate, scheduleData, toggleModalClose]);

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
                value={state.memo}
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
                  id={state.selectedRepeatId}
                  data={
                    state.eventType === 'Schedule'
                      ? [
                          { id: 1, value: 'NONE', name: '없음' },
                          { id: 2, value: 'DAILY', name: '매일' },
                          { id: 3, value: 'WEEKLY', name: '매주' },
                          { id: 4, value: 'MONTHLY', name: '매달' },
                        ]
                      : [
                          { id: 1, value: 'NONE', name: '없음' },
                          { id: 2, value: 'DAILY', name: '매일' },
                          { id: 3, value: 'WEEKLY', name: '매주' },
                          { id: 4, value: 'BIWEEKLY', name: '격주' },
                          { id: 5, value: 'MONTHLY', name: '매달' },
                          { id: 6, value: 'QUARTERLY', name: '3개월마다' },
                          { id: 7, value: 'SEMIANNUALLY', name: '6개월마다' },
                          { id: 8, value: 'YEARLY', name: '매년' },
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
                    id={state.selectedCategoryId}
                    data={categories}
                    onChange={handleChangeCategory}
                  />
                </div>
              ) : (
                <div className={s.calendarModalItem}>
                  <div className={s.calendarModalItemTitle}>우선순위</div>
                  <EventDropdown
                    name="priority"
                    id={state.selectedPriorityId}
                    data={[
                      { id: 1, value: 'LOW', name: '낮음' },
                      { id: 2, value: 'MIDDLE', name: '중간' },
                      { id: 3, value: 'HIGH', name: '높음' },
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
              <button
                className={s.button({ type: 'create' })}
                onClick={createEvent}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateScheduleModal;
