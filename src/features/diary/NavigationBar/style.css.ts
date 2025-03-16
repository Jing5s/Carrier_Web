import { style } from '@vanilla-extract/css';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  width: '100%',
  height: '160px',
  alignItems: 'center',
  alignSelf: 'stretch',

  borderBottom: `1px solid ${theme.gray[100]}`,
});

export const buttonContainer = style({
  display: 'flex',
  width: '94px',
  padding: '0px 0px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'stretch',

  cursor: 'pointer',

  position: 'relative',

  backgroundColor: theme.white,
});

export const buttonBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const buttonText = style({
  color: theme.black,
  ...font.p3,
  userSelect: 'none',
});

export const datesContainer = style({
  display: 'flex',
  alignItems: 'center',
  flex: '1 0 0',
  alignSelf: 'stretch',

  backgroundColor: theme.white,
  borderLeft: `1px solid ${theme.gray[100]}`,
});

export const dayContainer = style({
  display: 'flex',
  padding: '4px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  flex: '1 0 0',
  alignSelf: 'stretch',

  cursor: 'pointer',
  position: 'relative',

  borderRight: `1px solid ${theme.gray[100]}`,
});

export const dayBox = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    left: '4px',
    top: '4px',

    width: '32px',
    height: '30px',
    borderRadius: '8px',
  },
  variants: {
    selected: {
      true: { backgroundColor: theme.blue[500] },
      false: { backgroundColor: theme.white },
    },
    today: {
      true: { border: `2px solid ${theme.blue[500]}` },
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export const dayText = recipe({
  base: {
    ...font.p1,
    userSelect: 'none',
  },
  variants: {
    isHoliday: {
      true: { color: theme.red[500] },
      false: { color: theme.black },
    },
    selected: {
      true: { color: theme.white },
      false: {},
    },
    disabled: {
      true: { color: theme.gray[400] },
      false: {},
    },
  },
  defaultVariants: {
    isHoliday: false,
    selected: false,
    disabled: false,
  },
});

export const dayDairyText = recipe({
  base: {
    userSelect: 'none',
  },
  variants: {
    isWritten: {
      true: { color: theme.black },
      false: { color: theme.gray[400] },
    },
  },
  defaultVariants: {
    isWritten: false,
  },
});

export const dayDiarySummary = style({
  display: 'flex',
  padding: '4px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const dayDiarySummaryEmoji = style({
  fontSize: '5em',
});

export const dayDiarySummaryText = style({
  ...font.p1,
  width: '100%',
  color: `${theme.black}`,
  textAlign: 'center',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  wordBreak: 'break-word',

  selectors: {
    '&': {
      WebkitLineClamp: 1,
    },
  },
});
