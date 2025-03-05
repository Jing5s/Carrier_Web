import { createGlobalTheme } from '@vanilla-extract/css';

const theme = createGlobalTheme(':root', {
  blue: {
    50: '#EAEFFF',
    100: '#BECDFE',
    200: '#9FB5FE',
    300: '#7393FD',
    400: '#587EFD',
    500: '#2E5EFC',
    600: '#2A56E5',
    700: '#2143B3',
    800: '#19348B',
    900: '#13276A',
  },
  gray: {
    50: '#F4F4F4',
    100: '#E5E5E5',
    200: '#D8D8D8',
    300: '#C5C5C5',
    400: '#A2A2A2',
    500: '#787878',
    600: '#5A5A5A',
    800: '#323131',
    900: '#1E1E20',
  },
  red: {
    100: '#FFDDDD',
    200: '#FFB4B4',
    500: '#EE3A3A',
  },
  white: '#FFFFFF',
  black: '#121213',
});

export default theme;
