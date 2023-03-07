import { createTheme, ThemeOptions } from '@mui/material';

export const customTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#293241',
      light: '#495057',
      dark: '#212121',
    },
    background: {
      paper: '#151515',
      default: '#121212',
    },
  },
});
