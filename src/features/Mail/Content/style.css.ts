import { style } from '@vanilla-extract/css';
import { font } from 'shared/styles/font.css';
import theme from 'shared/styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100% - 280px)',
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

export const mailOption_textButton = style({
  ...font.p1,
  color: theme.blue[500],
  cursor: 'pointer',
  padding: '8px 16px',
  border: `1px solid ${theme.blue[500]}`,
  borderRadius: '8px',
});

export const mailOption_iconButton = style({
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
  cursor: 'pointer',
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
  width: '440px',
  height: 'calc(100vh - 72px)',
  borderRight: `1px solid ${theme.gray[100]}`,
  overflowY: 'auto',
});

export const mailList_container = style({
  width: '100%',
  height: '7rem',
  maxHeight: '106px',
  position: 'relative',
  padding: '16px 32px',
  cursor: 'pointer',
});

export const mailList_container_selected = style({
  backgroundColor: theme.blue[500],
  color: `${theme.white} !important`,
});

export const mailList_description_selected = style({
  color: `${theme.blue[100]} !important`,
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
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1,
  width: '70%',
});

export const mailList_Date = style({
  ...font.p2,
  color: theme.gray[500],
});

export const mailList_title = style({
  ...font.p2,
  width: '100%',
  height: '19px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1,
});

export const mailList_description = style({
  ...font.p2,
  color: theme.gray[500],
  width: '100%',
  display: '-webkit-box',
  overflow: 'hidden',
  whiteSpace: 'normal',
  textOverflow: 'ellipsis',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
});

export const content_detail = style({
  height: 'calc(100vh - 72px)',
  overflow: 'auto',
  padding: '20px',
  flex: 1,
  display: 'flex',
  gap: '`16px',
  flexDirection: 'column',
});

export const detail_header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const detail_title = style({
  ...font.H2,
  fontWeight: '500',
});

export const detail_info = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
});

export const detail_sender = style({
  ...font.H4,
});

export const detail_Recipient = style({
  ...font.p1,
  color: theme.gray[600],
});

export const detail_date = style({
  ...font.p2,
  color: theme.gray[500],
});

export const detailContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const summaryContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const summaryTitle = style({
  fontSize: '16px',
  lineHeight: '120%',
  fontWeight: 600,
  color: `${theme.blue[500]}`,
  paddingTop: '8px',
});

export const summaryDesc = style({
  ...font.p2,
  color: `${theme.black}`,
});

export const hrLine = style({
  width: '100%',
  height: '1px',
  background: '#D8D8D8',
});

export const mail_body = style({
  all: 'unset',
});

export const notSelected = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  ...font.H3,
  color: `${theme.gray[300]}`,
});
