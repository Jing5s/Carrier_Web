import { style } from '@vanilla-extract/css';
import theme from '../../shared/styles/theme.css';

export const container = style({
  position: 'sticky',
  top: '0',
  display: 'flex',
  padding: '80px 12px',
  flexDirection: 'column',
  width: '80px',
  height: '100vh',
  background: theme.gray[900],
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const icons = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
});

export const icon = style({
  cursor: 'pointer',
  display: 'flex',
  padding: '12px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '8px',
  background: theme.gray[900],

  ':hover': {
    background: theme.gray[800],
  },
});

export const active = style({
  background: theme.gray[800],
});

export const others = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '44px',
  cursor: 'pointer',
});

export const profileImg = style({
  width: '52px',
  height: '52px',
  borderRadius: '100%',
  objectFit: 'cover',
});
