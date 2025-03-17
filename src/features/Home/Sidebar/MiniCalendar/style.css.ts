import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';

export const miniCalendarContainer = style({
  padding: '12px',
  borderRadius: '12px',
  flexShrink: 0,
  alignSelf: 'stretch',
  backgroundColor: theme.white,
  overflow: 'hidden',
});

export const miniCalendarHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const miniCalendarTitle = style({
  color: theme.black,
  textAlign: 'center',
  fontFamily: 'Pretendard',
  ...font.H4,
  fontWeight: '500',
});

export const miniCalendarGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  rowGap: '2px',
  justifyContent: 'space-between',
  margin: '8px 4px 0 4px',
  justifyItems: 'center',
});

export const miniCalendarWeek = style({
  width: '24px',
  textAlign: 'center',
  color: theme.black,
  fontFamily: 'Pretendard',
  ...font.H5,
});

export const miniCalendarDay = recipe({
  base: {
    display: 'flex',
    width: '34px',
    height: '34px',
    padding: '2px 5px 3px 5px',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.black,
    ...font.p1,
    fontWeight: '500',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  variants: {
    selected: {
      true: { backgroundColor: theme.blue[500], color: theme.white },
      false: { backgroundColor: theme.white },
    },
    isEmpty: {
      true: { opacity: 0.3 },
      false: {},
    },
  },
  defaultVariants: {
    selected: false,
    isEmpty: false,
  },
});
