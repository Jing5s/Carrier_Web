import { style } from '@vanilla-extract/css';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100vw - 360px)',
  height: '100vh',
});

export const header = style({
  width: 'calc(100vw - 360px)',
  height: '72px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.gray[100]}`,
  padding: '0 24px 0 28px',
});

export const mailType = style({
  ...font.H4,
  display: 'flex',
  flexDirection: 'column',
});

export const subTitle = style({
  ...font.p3,
});

export const mailOption = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '12px',
});

export const mailOption_addPlan = style({
  ...font.p1,
  color: theme.blue[500],
  marginRight: '12px',
  cursor: 'pointer',
});

export const mailOption_write = style({
  width: '48px',
  height: '48px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  ':hover': {
    backgroundColor: theme.gray[50],
  },
});

export const mailOption_delete = style({
  width: '48px',
  height: '48px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  ':hover': {
    backgroundColor: theme.gray[50],
  },
});

export const content = style({
  width: 'calc(100vw - 360px)',
  height: 'calc(100vh - 72px)',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const content_list = style({
  width: '520px',
  height: 'calc(100vh - 72px)',
  borderRight: `1px solid ${theme.gray[100]}`,
});

export const mailList_container = style({
  width: '100%',
  height: '114px',
  position: 'relative',
  padding: '16px 32px',
  gap: '4px',
  cursor: 'pointer',
});

export const mailList_container_selected = style({
  backgroundColor: theme.blue[500],
  color: `${theme.white} !important`,
});

export const mailList_readState = style({
  width: '10px',
  height: '10px',
  position: 'absolute',
  backgroundColor: theme.blue[500],
  borderRadius: '100%',
  left: '12px',
  top: '12px',
});

export const mailList_header = style({
  width: '100%',
  height: '24px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const mailList_Sender = style({
  ...font.H4,
  fontWeight: '700',
});

export const mailList_Date = style({
  ...font.p2,
  color: theme.gray[500],
});

export const mailList_title = style({
  ...font.p2,
  height: '19px',
});

export const mailList_description = style({
  ...font.p2,
  color: theme.gray[500],
  width: '100%',
  height: '38px',
  display: '-webkit-box',
  overflow: 'hidden',
  whiteSpace: 'normal',
  textOverflow: 'ellipsis',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
});

export const content_description = style({
  height: 'calc(100vh - 72px)',
  padding: '20px',
  flex: 1,
});

export const description_header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: '20px',
});

export const description_title = style({
  ...font.H2,
  fontWeight: '500',
  marginBottom: '16px',
});

export const description_info = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
});

export const description_sender = style({
  ...font.H4,
});

export const description_Recipient = style({
  ...font.p1,
  color: theme.gray[600],
});

export const description_date = style({
  ...font.p2,
  color: theme.gray[500],
});

export const description_content = style({});
