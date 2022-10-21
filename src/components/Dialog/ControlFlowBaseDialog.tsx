import React, { ReactNode, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, IconButton, Theme, ThemeProvider, createTheme } from '@mui/material';
import { CloseIcon } from './icons';

type ControlFlowBaseDialogProps = {
  children: ReactNode;
  action?: string;
  onActionClick?: () => null;
  canBeClosed?: boolean;
};

export default function ControlFlowBaseDialog({
  action = '',
  children,
  onActionClick = () => null,
  canBeClosed = false,
}: ControlFlowBaseDialogProps) {
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
            ...theme.palette,
            background: {
              paper: 'black',
            },
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
      <Dialog fullWidth maxWidth="sm" open={open} onClose={canBeClosed ? handleClose : () => null}>
        {canBeClosed && (
          <DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        )}
        <Box marginX={2}>{children}</Box>

        {action !== '' && (
          <DialogActions>
            <Box margin={3} marginTop={2}>
              <Button variant="contained" color="success" size="large" onClick={onActionClick}>
                {action}
              </Button>
            </Box>
          </DialogActions>
        )}
      </Dialog>
    </ThemeProvider>
  );
}
