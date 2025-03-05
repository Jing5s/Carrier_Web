import { style } from '@vanilla-extract/css';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';

export const container = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: '2.5 0 0',
  alignSelf: 'stretch',

  borderRight: `1px solid ${theme.gray[100]}`,
});

export const titleContainer = style({
  display: 'flex',
  padding: '28px 40px',
  alignItems: 'center',
  alignSelf: 'stretch',

  borderBottom: `1px solid ${theme.gray[100]}`,
});

export const titleText = style({
  color: theme.black,
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  ...font.H1,
  fontWeight: '600',

  '::placeholder': {
    color: theme.gray[400],
  },
});

export const mainContainer = style({
  padding: '28px 40px 40px 40px',
  flex: '1 0 0',
  overflowY: 'auto',
  alignSelf: 'stretch',

  '::-webkit-scrollbar': {
    display: 'none',
  },
});

export const emojiPicker = style({
  display: 'flex',
  width: '100px',
  height: '100px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  aspectRatio: '1/1',

  borderRadius: '99999px',
  backgroundColor: theme.gray[50],

  cursor: 'pointer',
});

export const emojiPickerText = style({
  color: theme.gray[500],

  ...font.p3,

  userSelect: 'none',
});

export const textBox = style({
  display: 'flex',
  width: '100%',
  minHeight: '150px',
  height: 'auto',
  marginTop: '20px',
  resize: 'none',

  overflow: 'hidden',

  ...font.H4,
  fontWeight: '500',
  color: theme.black,
  fontFamily: 'Pretendard',

  '::placeholder': {
    color: theme.gray[400],
  },
});
