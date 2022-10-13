import React, { ReactNode, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, createTheme, Divider, Theme, ThemeProvider, Typography } from '@mui/material';

type CustomDialogProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  action: string;
  buttonActive?: boolean;
  onContinueClick: () => void;
};

export default function BaseDialog({
  title,
  subtitle,
  children,
  action,
  buttonActive = true,
  onContinueClick,
}: CustomDialogProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleClickOpen();
  }, []);

  return (
    <ThemeProvider
      theme={(theme: Theme) =>
        createTheme({
          ...theme,
          palette: {
            primary: {
              main: '#65D36E',
              dark: '#51A958',
              contrastText: '#FFFFFF',
            },
            text: {
              primary: '#FFFFFF',
              secondary: '#ACACAC',
            },
            success: {
              main: '#65D36E',
            },
            background: {
              paper: 'black',
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
            MuiDivider: {
              styleOverrides: {
                root: {
                  borderColor: '#434343',
                },
              },
            },
            MuiCardContent: {
              styleOverrides: {
                root: {
                  padding: '24px',
                },
              },
            },
            MuiButton: {
              styleOverrides: {
                root: {
                  borderRadius: '24px',
                },
              },
            },
          },
        })
      }
    >
      <Dialog fullWidth maxWidth="md" open={open}>
        <DialogTitle margin={2} marginBottom={1} variant="h5">
          {title}
          <Typography>{subtitle}</Typography>
        </DialogTitle>
        <Divider variant="middle" />
        <Box marginX={2}>{children}</Box>
        <Divider variant="middle" />
        <DialogActions>
          <Box margin={3} marginTop={2}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={handleClose}
              sx={{
                color: '#65D36E',
                borderColor: '#ACACAC',
                '&:hover': {
                  borderColor: '#65D36E',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant={buttonActive ? 'contained' : 'outlined'}
              color={buttonActive ? 'success' : 'primary'}
              size="large"
              onClick={onContinueClick}
              disabled={!buttonActive}
              sx={{
                '&.Mui-disabled': {
                  color: '#ACACAC',
                  borderColor: '#ACACAC',
                },
                marginLeft: '16px',
              }}
            >
              {action}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
