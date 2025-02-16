import { style } from '@vanilla-extract/css';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';

export const MiniCalendarContainer = style({
  padding: '12px',
  borderRadius: '12px',
  flexShrink: 0,
  alignSelf: 'stretch',
  backgroundColor: theme.white,
  overflow: 'hidden',
});

export const MiniCalendarHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const MiniCalendarTitle = style({
  color: theme.black,
  textAlign: 'center',
  fontFamily: 'Pretendard',
  ...font.H4,
  fontWeight: '500',
});

export const MiniCalendarGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  rowGap: '8px',
  justifyContent: 'space-between',
  margin: '8px 4px 0 4px',
  justifyItems: 'center',
});

export const MiniCalendarWeek = style({
  width: '24px',
  textAlign: 'center',
  color: theme.black,
  fontFamily: 'Pretendard',
  ...font.H5,
});

export const MiniCalendarDay = style({
  width: '24px',
  textAlign: 'center',
  color: theme.black,
  ...font.p1,
  fontWeight: '500',
});

export const MiniCalendarSelectedDay = style({
  display: 'flex',
  width: '34px',
  height: '34px',
  margin: '-3px -5px -3px -5px',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: '0',
  textAlign: 'center',
  borderRadius: '12px',
  color: theme.white,

  backgroundColor: theme.blue[400],
  ...font.H5,
});

export const MiniCalendarEmptyDay = style({
  width: '24px',
  textAlign: 'center',
  color: theme.black,
  opacity: 0.3,
  fontFamily: 'Pretendard',
  ...font.p1,
  fontWeight: '500',
});
