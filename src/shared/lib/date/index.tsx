const today = new Date();
const year = today.getFullYear();
const month = ('0' + (today.getMonth() + 1)).slice(-2);
const day = ('0' + today.getDate()).slice(-2);

export const NowDateDash = year + '-' + month + '-' + day;

export const NowDatePeriod = year + '.' + month + '.' + day;

export const formatDateToPeriod = (date: Date): string => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}.${month}.${day}`;
};

export const getNextDate = (dateStr: string): string => {
  const date = new Date(dateStr.replace(/\./g, '-'));
  date.setDate(date.getDate() + 1);
  return formatDateToPeriod(date);
};

export const getPrevDate = (dateStr: string): string => {
  const date = new Date(dateStr.replace(/\./g, '-'));
  date.setDate(date.getDate() - 1);
  return formatDateToPeriod(date);
};

export const ChangeDateToDash = (dateStr: string): string => {
  const date = new Date(dateStr.replace(/\./g, '-'));
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};
