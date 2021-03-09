import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    primary: {
      //original color
      //  main: '#e4007c',
      main: '#e92a8a',
    },
    secondary: {
      main: '#231b56',
    },
  },
  props: {
    MuiSvgIcon: {
      color: 'primary',
    },
  },
});

export default theme;
