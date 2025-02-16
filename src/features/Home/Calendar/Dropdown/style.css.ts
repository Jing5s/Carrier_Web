import { style } from '@vanilla-extract/css';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';

export const dropdownBtn = style({
  display: 'flex',
  padding: '4px 0px 4px 12px',
  alignItems: 'center',
  alignSelf: 'stretch',
  borderRadius: '4px',
  cursor: 'pointer',
  gap: '2px',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover': {
      backgroundColor: theme.gray[50],
    },
  },
});

export const dropdownContainer = style({
  position: 'fixed',
  display: 'inline-flex',
  padding: '4px 8px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '4px',
  borderRadius: '4px',
  border: `1px solid ${theme.gray[100]}`,
  backgroundColor: theme.gray[50],
  boxShadow: '0px 4px 32px 0px rgba(92,92,92,0.25)',
  zIndex: '1001',
});

export const dropdownItem = style({
  display: 'flex',
  height: '26px',
  padding: '0px 8px',
  alignItems: 'center',
  gap: '8px',
  alignSelf: 'stretch',
  borderRadius: '4px',
});

export const dropdownColorBox = style({
  width: '18px',
  height: '18px',
  borderRadius: '4px',
});

export const dropdownText = style({
  color: theme.gray[800],
  ...font.p2,
});
