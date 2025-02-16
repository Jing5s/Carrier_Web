import { keyframes, style } from '@vanilla-extract/css';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';

const rotateDown = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(90deg)' },
});

const rotateRight = keyframes({
  '0%': { transform: 'rotate(90deg)' },
  '100%': { transform: 'rotate(0deg)' },
});

export const container = style({
  width: '280px',
  height: '100%',
  borderRight: `1px solid ${theme.gray[100]}`,
  background: `${theme.gray[50]}`,
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 24px',
  right: '70%',
});

export const emailText = style({
  color: `${theme.gray[500]}`,
  textAlign: 'center',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '160%',
});

export const categories = style({
  marginTop: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const category = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  ':hover': {
    background: `${theme.gray[100]}`,
  },
});

export const selected = style({
  background: `${theme.gray[100]}`,
});

export const categoryText = style({
  color: `${theme.black}`,
  ...font.p1,
});

export const arrowBox = style({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  transition: 'transform 0.1s ease-in-out',
});

export const opened = style({
  animation: `${rotateDown} 0.1s forwards`,
});

export const closed = style({
  animation: `${rotateRight} 0.1s forwards`,
});

export const subCategories = style({
  marginTop: '-4px',
  paddingLeft: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});
