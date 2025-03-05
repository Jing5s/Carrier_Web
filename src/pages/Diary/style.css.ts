import { style } from '@vanilla-extract/css';
import theme from 'shared/styles/theme.css';

export const container = style({
  width: 'calc(100vw - 80px)',
  height: '100%',
  display: 'flex',

  flexDirection: 'column',
});

export const main = style({
  display: 'flex',
  height: 'calc(100% - 160px)',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  alignSelf: 'stretch',

  backgroundColor: theme.white,
});
