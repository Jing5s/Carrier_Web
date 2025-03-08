import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';

export const container = style({
  width: 'calc(100vw - 80px)',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '80px',
});

export const header = style({
  width: '100%',
  padding: '32px 40px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const userInfos = style({
  display: 'flex',
  gap: '20px',
});

export const headerProfileImg = style({
  width: '84px',
  height: '84px',
  borderRadius: '100%',
  objectFit: 'cover',
});

export const textBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  padding: '13px 0 37px',
});

export const nameText = style({
  ...font.H2,
  color: `${theme.black}`,
});

export const emailText = style({
  ...font.p1,
  color: `${theme.gray[500]}`,
});

export const button = recipe({
  base: {
    padding: '0 20px',
    height: '40px',
    borderRadius: '8px',
    color: `${theme.white}`,
    ...font.H5,
  },
  variants: {
    type: {
      disabled: {
        backgroundColor: `${theme.blue[100]}`,
        cursor: 'not-allowed',
      },
      enabled: {
        backgroundColor: `${theme.blue[500]}`,
      },
    },
  },
});

export const mainContent = style({
  width: '100%',
  display: 'flex',
});

export const menuList = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px 40px',
  width: '26.25rem',
});

export const menu = style({
  display: 'flex',
  width: '100%',
  padding: '10px 12px',
  background: `${theme.gray[50]}`,
  borderRadius: '8px',
  gap: '12px',
  alignItems: 'center',
});

export const menuText = style({
  ...font.H4,
  fontWeight: 400,
  color: `${theme.gray[800]}`,
});
