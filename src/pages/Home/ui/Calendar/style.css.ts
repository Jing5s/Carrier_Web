import { globalStyle, style } from '@vanilla-extract/css';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';

export const calendarContainer = style({
  width: 'calc(100vw - 440px)',
  height: '100vh',
});

export const calendarHeaderContainer = style({
  display: 'inline-flex',
  padding: '18px 16px 17px 0px',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '80px',
});

export const calendarHeaderMain = style({
  display: 'flex',
  alignItems: 'center',
  height: '80x',
  gap: '8px',
});

export const calendarHeaderPlusBtn = style({
  position: 'relative',
  display: 'flex',
  width: '60px',
  height: '36px',
  padding: '5px 17px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '8px',
  background: theme.white,
});

export const calendarHeaderSub = style({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

export const calendarHeaderBtnLayout = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const calendarHeaderBtn = style({
  width: '26px',
  height: '26px',
  color: theme.black,
});
export const calendarHeaderTodayBtn = style({
  color: theme.black,
  ...font.p1,
  cursor: 'pointer',
  userSelect: 'none',
});

export const calendarTitle = style({
  display: 'flex',
  gap: '6px',
});

export const calendarTitleYear = style({
  color: theme.black,
  fontFamily: 'Pretendard',
  ...font.H2,
  fontWeight: '400',
});
export const calendarTitleMonth = style({
  color: theme.black,
  fontFamily: 'Pretendard',
  ...font.H2,
  fontWeight: '600',
});

export const calendarSearchBar = style({
  display: 'flex',
  width: '378px',
  height: '40px',
  padding: '7px 0px 7px 12px',
  alignItems: 'center',
  gap: '12px',
  borderRadius: '8px',
  border: `1px solid ${theme.gray[100]}`,
  backgroundColor: theme.white,
});

export const calendarSearchText = style({
  color: theme.black,
  ...font.p2,
  width: '100%',
  '::placeholder': {
    color: theme.gray[400],
  },
});

export const calendarScheduleContainer = style({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  gap: '8px',
  alignSelf: 'stretch',
  flexShrink: '0',
  borderRadius: '5px',
  backgroundColor: theme.blue[50],
  borderLeft: `5px solid ${theme.blue[500]}`,
  padding: '0 8px',
});

export const calendarScheduleText = style({
  ...font.p2,
});

export const calendarTodoContainer = style({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
});

export const calendarTodoText = style({
  flex: '1 0 0',
  ...font.p2,
  overflow: 'hidden',
  selectors: {
    '&::before': {
      content: '"•"',
      fontSize: '1.2em',
      marginRight: '6px',
      color: theme.black,
    },
  },
});

globalStyle(`${calendarContainer} .fc-theme-standard .fc-scrollgrid`, {
  borderRadius: '20px 20px 0px 0px',
  borderTop: `1px solid ${theme.gray[100]}`,
  borderRight: `2px solid ${theme.gray[100]}`,
  borderLeft: `2px solid ${theme.gray[100]}`,
});

globalStyle(`${calendarContainer} .fc-col-header`, {
  borderBottom: `1px solid ${theme.gray[100]}`,
});

globalStyle(`${calendarContainer} .fc .fc-toolbar.fc-header-toolbar`, {
  margin: '0',
});

globalStyle(
  `${calendarContainer} .fc-theme-standard td, .fc-theme-standard th`,
  {
    borderRight: `1px solid ${theme.gray[100]}`,
    borderBottom: `1px solid ${theme.gray[100]}`,
  }
);

globalStyle(`${calendarContainer} .fc .fc-daygrid-day-top`, {
  display: 'flex',
  flexDirection: 'row',
});

globalStyle(`${calendarContainer} .fc-day-sun`, {
  color: 'red',
});

globalStyle(`${calendarContainer} .fc-day`, {
  fontFamily: 'Pretendard',
  ...font.p1,
});

globalStyle(`${calendarContainer} .fc .fc-daygrid-day-frame`, {
  minHeight: '100%',
  position: 'relative',
});

globalStyle(`${calendarContainer} .fc .fc-col-header-cell-cushion`, {
  fontFamily: 'Pretendard',
  ...font.p1,
});

globalStyle(`${calendarContainer} .fc .fc-daygrid-day-number`, {
  padding: '4px',
  position: 'relative',
  zIndex: '4',
  borderRadius: '8px',
});

globalStyle(`${calendarContainer} .fc-popover-header`, {
  visibility: 'hidden',
});

globalStyle(`${calendarContainer} .fc .fc-popover`, {
  boxShadow: 'none',
  zIndex: '1',
});

globalStyle(`${calendarContainer} .fc .fc-more-popover .fc-popover-body`, {
  padding: '20px 16px',
  gap: '4px',
  position: 'absolute',
  borderRadius: '8px',
  backgroundColor: theme.white,
  boxShadow: '0px 4px 32px 0px rgba(92, 92, 92, 0.25)',
});

globalStyle(`${calendarContainer} .fc .fc-daygrid-event-harness`, {
  marginBottom: '4px',
});

globalStyle(`${calendarContainer} .fc-direction-ltr .fc-daygrid-more-link`, {
  float: 'none',
});

globalStyle(`${calendarContainer} .fc .fc-daygrid-more-link`, {
  marginTop: '20px',
  borderRadius: '6px',
  cursor: 'pointer',
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  gap: '8px',
  alignSelf: 'stretch',
  flexShrink: '0',
  backgroundColor: theme.gray[50],
  borderLeft: `5px solid ${theme.gray[500]}`,
  padding: '0 8px',
  zIndex: '4',
  color: theme.gray[500],
  ...font.p2,
});
