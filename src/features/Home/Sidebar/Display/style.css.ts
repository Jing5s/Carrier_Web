import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';

export const DisplayContainer = style({
  width: '292px',
  padding: '0px 8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flexShrink: '0',
  alignSelf: 'stretch',
});

export const DisplayObject = style({
  display: 'flex',
  height: '26px',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const DisplayTitle = style({
  color: theme.black,
  textAlign: 'center',
  fontFamily: 'Pretendard',
  ...font.p1,
});

export const DisplayBtnLayout = recipe({
  base: {
    display: 'flex',
    height: '24px',
    padding: '2px 2px 2px 22px',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: '9999px',
    backgroundColor: theme.blue[400],
    boxShadow: '0px 0px 0px 0px rgba(121, 121, 121, 0.25) inset',
  },
  variants: {
    isActive: {
      true: {
        backgroundColor: theme.gray[50],
        padding: '2px 22px 2px 2px',
        justifyContent: 'unset',
      },
    },
  },
});

export const DisplayBtnObject = style({
  width: '20px',
  height: '20px',
  borderRadius: '9999px',
  backgroundColor: theme.white,
  boxShadow: '0px 2px 10px 0px rgba(84, 84, 84, 0.25)',
});
