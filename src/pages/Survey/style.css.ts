import { style, keyframes } from '@vanilla-extract/css';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';

const upDownAnimation = keyframes({
  '0%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-50px)' },
  '100%': { transform: 'translateY(0)' },
});

export const container = style({
  position: 'relative',
  display: 'flex',
  width: '100vw',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  background: `linear-gradient(180deg, ${theme.white} 0%, #D2DCFF 100%)`,
});

export const center = style({
  width: '416px',
  backgroundColor: theme.white,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px 32px 40px 32px',
  borderRadius: '16px',
  gap: '4px',
});

export const skipButton = style({
  ...font.p1,
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'right',
  alignItems: 'center',
  gap: '4px',
  marginBottom: '16px',
  cursor: 'pointer',
});

export const title = style({
  ...font.H3,
  lineHeight: '140%',
});

export const subTitle = style({
  ...font.p2,
  color: theme.red[500],
});

export const nextButton = style({
  ...font.btn1,
  width: '100%',
  height: '48px',
  borderRadius: '8px',
  marginTop: '36px',
  color: theme.white,
  backgroundColor: theme.blue[400],
  ':disabled': {
    backgroundColor: theme.blue[200],
    cursor: 'not-allowed',
  },
});

export const shape = style({
  position: 'absolute',
});

export const Asterisk = style([
  shape,
  {
    top: '5%',
    left: '8%',
    animation: `${upDownAnimation} 3s infinite`,
    animationDelay: '0s',
  },
]);

export const Cube = style([
  shape,
  {
    right: '10%',
    top: '10%',
    animation: `${upDownAnimation} 3s infinite`,
    animationDelay: '0.5s',
  },
]);

export const Sphere = style([
  shape,
  {
    bottom: '5%',
    left: '6%',
    animation: `${upDownAnimation} 3s infinite`,
    animationDelay: '1s',
  },
]);

export const MobiusStrip = style([
  shape,
  {
    bottom: '5%',
    right: '2%',
    animation: `${upDownAnimation} 3s infinite`,
    animationDelay: '1.5s',
  },
]);
