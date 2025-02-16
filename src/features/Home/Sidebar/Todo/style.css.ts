import { style } from '@vanilla-extract/css';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';

export const TodoListContainer = style({
  padding: '8px 12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '8px',
  borderRadius: '12px',
  alignSelf: 'stretch',
  backgroundColor: theme.white,
});

export const TodoListHeader = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'ceter',
  justifyContent: 'space-between',
});

export const TodoListTitle = style({
  color: theme.gray[600],
  fontFamily: 'Pretendard',
  ...font.H5,
});

export const TodoListSetDate = style({
  gap: '8px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const TodoListDateTitle = style({
  color: theme.gray[600],
  fontFamily: 'Pretendard',
  ...font.p2,
});

export const TodoListMain = style({
  display: 'flex',
  paddingLeft: '8px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2px',
});

export const TodoListItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

export const TodoListItemText = style({
  color: theme.black,
  fontFamily: 'Pretendard',
  ...font.p1,
});
