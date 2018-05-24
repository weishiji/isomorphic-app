import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

const customTheme = {
  palette: {
    primary: {
      light: red[300],
      main: red[500],
      dark: red[700],
    },
    secondary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;',
  },
  overrides: {
    MuiToolbar: {
      root: {
        height: 76,
        '@media (min-width: 600px)': {
          minHeight: 76,
        },
      },
    },
    MuiTab: {
      root: {
        '@media (min-width: 960px)': {
          minWidth: 'auto',
        },
      },
    },
  },
};
export default customTheme;
