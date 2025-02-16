import { style, globalStyle } from '@vanilla-extract/css';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';

export const calendarToggle = style({
  position: 'absolute',
  background: 'white',
  padding: '12px',
  borderRadius: '15px',
  width: '256px',
  height: '111px',
  border: '1.5px solid #E5E5E5',
  boxShadow: '0px 4px 32px rgba(91, 91, 91, 0.25)',
  flexShrink: '0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  top: '128%',
  left: '-164%',
  zIndex: 1000,

  ':before': {
    content: '""',
    position: 'absolute',
    top: '-15px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderWidth: '0 15px 15px 15px',
    borderStyle: 'solid',
    borderColor: 'transparent transparent white transparent',
    filter: 'drop-shadow(0px -1.5px 0px #E5E5E5)',
  },
});

export const calendarToggleMain = style({
  display: 'flex',
  width: '112px',
  height: '80px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  flexShrink: '0',
  borderRadius: '8px',
  color: theme.gray[600],
  cursor: 'pointer',
  transition: 'all 0.2s ease',
});

export const calendarToggleText = style({
  alignSelf: 'stretch',
  textAlign: 'center',
  color: theme.gray[600],
  fontFamily: 'Pretendard',
  ...font.p3,
});

globalStyle(`${calendarToggleMain}:hover`, {
  color: theme.blue[600],
});

globalStyle(`${calendarToggleMain}:hover svg path`, {
  fill: theme.blue[600],
});

globalStyle(`${calendarToggleMain}:hover ${calendarToggleText}`, {
  color: theme.blue[600],
});
