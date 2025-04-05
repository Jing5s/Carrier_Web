import { style } from '@vanilla-extract/css';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';

export const container = style({
  width: '100%',
  height: '100%',
  overflowY: 'hidden',
  padding: '0 40px',
});

export const category = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  paddingBottom: '40px',
});

export const categoryText = style({
  ...font.H2,
  color: `${theme.gray[800]}`,
  padding: '14px 0 12px',
  borderBottom: `1px solid ${theme.gray[300]}`,
  fontWeight: 600,
});

export const colorRed = style({
  color: theme.red[500],
});

export const profileContent = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const profileContentLeft = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  width: '32.5rem',
});

export const explainText = style({
  ...font.p1,
  color: `${theme.black}`,
});

export const inputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const label = style({
  ...font.H4,
  color: `${theme.gray[800]}`,
});

export const input = style({
  width: '100%',
  borderRadius: '8px',
  border: `1px solid ${theme.gray[100]}`,
  background: `${theme.gray[50]}`,
  color: `${theme.black}`,
  ...font.H4,
  fontWeight: 400,
  padding: '12px 16px',
  ':focus': {
    background: `${theme.white}`,
  },
  caretColor: '#5A5A5A',
});

export const profileImage = style({
  width: '22.5rem',
  height: '22.5rem',
  borderRadius: '100%',
  color: `${theme.white}`,
  ...font.H4,
  flexDirection: 'column',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundBlendMode: 'darken',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const imageInner = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '8px',
});

export const innerText = style({
  ...font.H4,
  color: `${theme.white}`,
});

export const logoutButton = style({
  padding: '12px',
  borderRadius: '8px',
  border: `1px solid ${theme.gray[100]}`,
  background: `${theme.gray[50]}`,
  width: '200px',
  color: `${theme.red[500]}`,
  ...font.btn1,
});
