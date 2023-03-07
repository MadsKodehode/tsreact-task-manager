import { createTheme, ThemeOptions } from '@mui/material';

export const customTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ee6c4d',
      light: '#495057',
      dark: '#212121',
    },
    background: {
      paper: '#151515',
      default: '#121212',
    },
  },
});
