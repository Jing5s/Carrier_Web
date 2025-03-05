import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';

export const calendarModal = style({
  display: 'flex',
  flexDirection: 'column',
  width: '360px',
  height: 'auto',
  borderRadius: '12px',
  border: `1.5px solid ${theme.gray[100]}`,
  backgroundColor: theme.white,
  boxShadow: '0px 4px 32px 0px rgba(92, 92, 92, 0.25)',
  padding: '20px 24px 15px 24px',
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
      default: { borderRadius: 'none' },
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

export const calendarModalContour = style({
  width: '312px',
  height: '1px',
  borderBottom: `1px solid ${theme.gray[300]}`,
});

export const calendarModalBody = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '4px',
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

export const calendarModalLocationTitle = style({
  alignSelf: 'stretch',
  fontFamily: 'Pretendard',
  ...font.H5,
  fontWeight: '500',
  color: theme.gray[800],
});

export const calendarModalLocationSubTitle = style({
  alignSelf: 'stretch',
  fontFamily: 'Pretendard',
  ...font.p3,
  color: theme.gray[600],
});

export const calendarModalDeleteBtn = style({
  display: 'flex',
  padding: '8px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '8px',
  border: `1px solid ${theme.gray[200]}`,
  backgroundColor: theme.gray[50],
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover': {
      backgroundColor: theme.red[500],
      border: `1px solid ${theme.white}`,
    },
  },
});
export const calendarModalDeleteBtnText = style({
  color: theme.red[500],
  fontFamily: 'Pretendard',
  ...font.btn2,
  transition: 'all 0.2s ease',
  selectors: {
    [`${calendarModalDeleteBtn}:hover &`]: {
      color: theme.white,
    },
  },
});

export const calendarModalCreateBtn = style({
  display: 'flex',
  padding: '8px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '8px',
  border: `1px solid ${theme.gray[200]}`,
  backgroundColor: theme.gray[50],
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover': {
      backgroundColor: '#15A665',
      border: `1px solid ${theme.white}`,
    },
  },
});
export const calendarModalCreateBtnText = style({
  color: '#15A665',
  fontFamily: 'Pretendard',
  ...font.btn2,
  transition: 'all 0.2s ease',
  selectors: {
    [`${calendarModalCreateBtn}:hover &`]: {
      color: theme.white,
    },
  },
});

export const calendarModalOverlay = style({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1001,
});
