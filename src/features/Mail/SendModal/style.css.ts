import { globalStyle, style } from '@vanilla-extract/css';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';

export const container = style({
  position: 'absolute',
  width: '37rem',
  height: '37rem',
  maxHeight: '37rem',
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column',
  background: theme.white,
  boxShadow: '0px 4px 32px 0px rgba(88, 88, 88, 0.25)',
  zIndex: 99,
  bottom: 30,
  right: 80,
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 16px',
  background: theme.gray[100],
  borderRadius: '20px 20px 0 0',
});

export const inputs = style({
  display: 'flex',
  flexDirection: 'column',
});

export const inputContainer = style({
  display: 'flex',
  gap: '8px',
  padding: '12px 20px',
  borderBottom: `1px solid ${theme.gray[100]}`,
  width: '100%',
});

export const label = style({
  color: theme.gray[600],
  ...font.p1,
});

export const input = style({
  color: theme.black,
  ...font.p1,
  flexGrow: 1,
});

export const footer = style({
  padding: '20px',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '8px',
});

export const icon = style({
  position: 'relative',
  padding: '16px',
  borderRadius: '8px',
  cursor: 'pointer',
  ':hover': {
    background: theme.gray[100],
  },
});

export const sent = style({
  display: 'flex',
  alignItems: 'center',
  background: theme.blue[500],
  ':hover': {
    background: theme.blue[500],
  },
});

export const editorContainer = style({
  flexGrow: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
});

export const textEditor = style({
  height: '210px',
});

export const editor = style({
  height: '100%',
});

export const fileList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  padding: '10px 16px',
});

export const fileItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '5px 8px',
  borderRadius: '8px',
  background: theme.gray[50],
  cursor: 'pointer',
});

export const fileName = style({
  ...font.p1,
  color: theme.black,
});

export const fileBytes = style({
  ...font.p1,
  color: theme.blue[500],
});

export const fileInput = style({
  position: 'absolute',
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: 'pointer',
});

export const fileDeleteBtn = style({
  cursor: 'pointer',
});

globalStyle(`${container} .ql-container`, {
  height: '100%',
  overflow: 'hidden',
  border: 'none',
});

globalStyle(`${container} .ql-container.ql-snow`, {
  border: 'none',
});

globalStyle(`${container} .ql-editor`, {
  height: '100%',
  overflowY: 'auto',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  padding: '12px 16px',
  ...font.p1,
});

globalStyle(`${container} .ql-toolbar`, {
  display: 'none',
});
