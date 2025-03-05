import { style } from '@vanilla-extract/css';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';

export const container = style({
  flex: '0.9',

  position: 'sticky',
  top: '100px',

  height: 'calc(100vh - 160px)',
  display: 'flex',
  padding: '40px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '4px',
  alignSelf: 'stretch',
});

export const suggestionList = style({
  display: 'flex',
  minHeight: '48px',
  padding: '12px 16px',
  alignItems: 'center',
  gap: '8px',

  borderRadius: '8px',
  backgroundColor: theme.white,
});

export const suggestionText = style({
  flex: '1 0 0',
  color: theme.black,
  ...font.p1,
});

export const suggestionButton = style({
  display: 'flex',
  width: 'calc(100% - 80px)',
  padding: '16px 0',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',

  position: 'absolute',
  left: '40px',
  bottom: '40px',

  borderRadius: '8px',
  backgroundColor: theme.blue[50],
  cursor: 'pointer',
});

export const suggestionButtonText = style({
  color: theme.blue[500],
  ...font.btn1,
  userSelect: 'none',
});
