import createTheme from '@mui/material/styles/createTheme';

const theme = createTheme({
  palette: {
    primary: {
      main: '#65D36E',
      dark: '#51A958',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2D43A5',
    },
    success: {
      main: '#65D36E',
    },
    warning: {
      main: '#FFEA79',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#ACACAC',
    },
    background: {
      paper: '#222429',
      default: '#31343B',
    },
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    fontWeightMedium: 600,
    fontWeightBold: 800,
    fontSize: 13,
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          height: '46px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: '#191B1F',
          borderRadius: '24px',
        },
        indicator: {
          display: 'none',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#000000',
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          textAlign: 'center',
          fontWeight: '400',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          width: '2px',
          color: '#ACACAC',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          backgroundColor: '#191B1F',
          height: '60px',
        },
      },
    },
  },
});

export default theme;
