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
      contrastText: '#000000',
    },
    warning: {
      main: '#FFEA79',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#ACACAC',
    },
    background: {
      paper: '#31343B',
      default: '#222429',
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: '"Open Sans", sans-serif',
    fontWeightMedium: 600,
    fontWeightBold: 800,
    fontSize: 13,
    h1: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '1rem',
    },
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
          backgroundColor: 'transparent',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
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
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(34, 36, 41, 0.6)',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'yellow',

          '&:focus': {
            backgroundColor: 'deeppink',
          },
        },
      },
    },
  },
});

export default theme;
