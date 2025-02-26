import { keyframes, style } from '@vanilla-extract/css';
import { font } from 'shared/styles/font.css';
import { recipe } from '@vanilla-extract/recipes';
import theme from 'shared/styles/theme.css';

export const background = style({
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.20)',
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const container = recipe({
  base: {
    width: '37.5rem',
    padding: '20px 24px',
    background: `${theme.white}`,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  variants: {
    type: {
      create: {},
      loading: {
        justifyContent: 'center',
        height: '28rem',
      },
    },
  },
});

export const explainText = style({
  ...font.H4,
  color: `${theme.black}`,
});

export const calendarModal = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  gap: '12px',
});

export const calendarEventButtonLayout = style({
  display: 'flex',
  width: '312px',
  alignItems: 'center',
  borderRadius: '8px',
});
export const calendarEventButton = recipe({
  base: {
    display: 'flex',
    padding: '3px 0px',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 0 0',
    border: `1.5px solid ${theme.blue[400]}`,
    transition: 'all 0.2s ease-in-out',
  },
  variants: {
    position: {
      left: { borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' },
      right: { borderTopRightRadius: '8px', borderBottomRightRadius: '8px' },
      default: { borderRadius: 0 },
    },
    isActive: {
      true: {
        backgroundColor: theme.blue[400],
        color: theme.white,
      },
      false: {
        backgroundColor: theme.white,
        color: theme.blue[400],
      },
    },
  },
  defaultVariants: {
    position: 'default',
    isActive: true,
  },
});

export const calendarEventText = style({
  fontFamily: 'Pretendard',
  ...font.context,
});

export const calendarModalHeader = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '4px',
  width: '100%',
});

export const calendarModalTitle = style({
  alignSelf: 'stretch',
  fontFamily: 'Pretendard',
  ...font.H3,
  color: theme.gray[800],
  '::placeholder': {
    color: theme.gray[400],
  },
});

export const calendarModalSubTitle = style({
  alignSelf: 'stretch',
  fontFamily: 'Pretendard',
  ...font.H5,
  fontWeight: '500',
  color: theme.gray[800],
  '::placeholder': {
    color: theme.gray[400],
  },
});

export const horizontalLine = style({
  width: '100%',
  height: '1px',
  background: `${theme.gray[300]}`,
});

export const calendarModalBody = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '8px',
  alignSelf: 'stretch',
});

export const calendarModalItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
});

export const calendarModalItemTitle = style({
  color: theme.gray[600],
  ...font.p2,
});

export const calendarModalItemAttribute = style({
  color: theme.gray[800],
  ...font.p2,
});

export const displayBtnLayout = recipe({
  base: {
    display: 'flex',
    height: '24px',
    padding: '2px 2px 2px 22px',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: '9999px',
    backgroundColor: theme.blue[400],
    boxShadow: '0px 0px 0px 0px rgba(121, 121, 121, 0.25) inset',
    transition: 'all 0.2s ease',
  },
  variants: {
    isActive: {
      false: {
        backgroundColor: theme.gray[50],
        padding: '2px 22px 2px 2px',
        justifyContent: 'unset',
      },
    },
  },
});

export const displayBtnObject = style({
  width: '20px',
  height: '20px',
  borderRadius: '9999px',
  backgroundColor: theme.white,
  boxShadow: '0px 2px 10px 0px rgba(84, 84, 84, 0.25)',
  transition: 'all 0.2s ease',
});

export const calendarModalFooter = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'stretch',
});

export const calendarModalLocationPlaceholder = style({
  alignSelf: 'stretch',
  fontFamily: 'Pretendard',
  ...font.H5,
  fontWeight: '500',
  color: theme.gray[400],
  cursor: 'pointer',
});

export const buttons = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
});

export const button = recipe({
  base: {
    padding: '8px 16px',
    borderRadius: '4px',
    ...font.btn2,
    cursor: 'pointer',
  },
  variants: {
    type: {
      cancel: {
        background: `${theme.white}`,
        color: `${theme.black}`,
        border: `1px solid ${theme.gray[100]}`,
      },
      create: {
        backgroundColor: `${theme.blue[500]}`,
        color: `${theme.white}`,
      },
    },
  },
});

export const loadingText = style({
  ...font.p2,
  color: `${theme.gray[800]}`,
});

const fadeOutKeyframes = keyframes({
  '0%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
  '100%': {
    opacity: 0,
    transform: 'translateY(-20px)',
  },
});

export const fadeOut = style({
  animation: `${fadeOutKeyframes} 0.5s forwards ease-in-out`,
});

const fadeInKeyframes = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(20px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const fadeIn = style({
  animation: `${fadeInKeyframes} 0.5s forwards ease-in-out`,
});
