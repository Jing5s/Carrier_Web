import { style } from '@vanilla-extract/css';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';

export const categoryContainer = style({
  display: 'flex',
  padding: '8px 12px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '8px',
  flexShrink: '0',
  alignSelf: 'stretch',
  borderRadius: '12px',
  backgroundColor: theme.white,
});

export const categoryHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
});

export const categoryTitle = style({
  color: theme.gray[600],
  fontFamily: 'Pretendard',
  ...font.H5,
});

export const categoryPlusBtn = style({
  width: '24px',
  height: '25px',
  backgroundColor: theme.white,
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  borderRadius: '4px',

  selectors: {
    '&:hover': {
      backgroundColor: theme.gray[50],
    },
  },
});

export const categoryItemContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2px',
  alignSelf: 'stretch',
});

export const categoryItem = style({
  display: 'flex',
  padding: '6px 8px',
  alignItems: 'center',
  gap: '8px',
  alignSelf: 'stretch',
  borderRadius: '4px',
});

export const categoryItemTitle = style({
  flex: '1 0 0',
  color: theme.black,
  fontFamily: 'Pretendard',
  ...font.p1,
  borderRadius: '5px',
  padding: '0px 4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  selectors: {
    '&:hover': {
      backgroundColor: theme.gray[50],
    },
  },
});

export const categoryItemInput = style({
  padding: '1px 3px',
});

export const categoryNewItemInput = style({
  padding: '1px 3px',
});

export const categoryNewItem = style({
  backgroundColor: theme.blue[50],
});

export const btnCategoryItemStatic = style({
  width: '24px',
  height: '24px',
  borderRadius: '4px',
  border: `1px solid ${theme.gray[100]}`,
  backgroundColor: '#EE3A3A',
});
