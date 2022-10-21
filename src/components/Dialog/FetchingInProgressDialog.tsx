import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ControlFlowBaseDialog from './ControlFlowBaseDialog';
import { CloseIcon, EmailIcon, ErrorIcon, OkIcon } from './icons';

type FetchState = 'fetching' | 'success' | 'timeout' | 'missing' | 'error';

type FetchingInProgressDialogProps = {
  requestState: any;
  error: boolean;
};

export default function FetchingInProgressDialog({ requestState, error }: FetchingInProgressDialogProps) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FetchState>('fetching');

  setTimeout(() => {
    if (state === 'fetching') {
      setState('timeout');
    }
  }, 15000);

  useEffect(() => {
    if (requestState === 'available') setState('success');
  }, [requestState]);

  useEffect(() => {
    if (error) setState('error');
  }, [error]);

  function handleAddEmail() {
    console.log(`Adding email: ${email}`);
  }

  function handleClose() {
    console.log('closing');
  }

  return (
    <ControlFlowBaseDialog>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {state === 'timeout' ? (
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
        ) : null}
      </DialogTitle>
      <DialogContent>
        {state === 'fetching' && (
          <Box marginY={8}>
            <Typography variant="h5" align="center" marginBottom={2}>
              <FormattedMessage defaultMessage="Fetching..." id="F50OAe" description="Fetching document modal." />
            </Typography>
            <LinearProgress
              sx={{
                height: '10px',
                backgroundColor: '#434343',
                borderRadius: '5px',
                '& *': {
                  borderRadius: '5px',
                },
              }}
            />
          </Box>
        )}
        {state === 'success' && (
          <Box>
            <Typography variant="h5" align="center">
              <OkIcon />
              <FormattedMessage
                defaultMessage="Your Registration certificate from Arbetsförmedlingen has now been fetched. Click view data to review all the fetched data."
                id="S3tJF0"
                description="Fetching document modal, successful."
              />
            </Typography>
          </Box>
        )}
        {state === 'timeout' && (
          <Grid container direction="column" alignItems="center">
            <Grid item m={4}>
              <Typography variant="h5" align="center">
                <FormattedMessage
                  defaultMessage="Your fetching is processing, add your email and get notified when it's ready."
                  id="pHE0rC"
                  description="Fetching document modal, took too long time."
                />
              </Typography>
            </Grid>
            <Grid item>
              <FormControl variant="filled">
                <InputLabel htmlFor="email-input">
                  <FormattedMessage
                    defaultMessage="Email"
                    id="YCdA/w"
                    description="Fetching document modal, label for email input."
                  />
                </InputLabel>
                <FilledInput
                  id="email-input"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item marginTop={2} marginBottom={4}>
              <FormControl>
                <Button variant="contained" color="success" size="large" onClick={handleAddEmail}>
                  <FormattedMessage
                    defaultMessage="Add email"
                    id="sN26ST"
                    description="Fetching document modal, button for adding email."
                  />
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        )}
        {state === 'missing' && (
          <Box>
            <Typography variant="h5" align="center">
              <FormattedMessage
                defaultMessage="We can't find your unemployment certificate. Make sure you're registered at Arbetsförmedlingen as unemployed."
                id="aWT2YD"
                description="Fetching document modal, missing prerequisites."
              />
            </Typography>
          </Box>
        )}
        {state === 'error' && (
          <Grid container direction="column" alignItems="center">
            <Grid item m={4} textAlign="center">
              <ErrorIcon />
            </Grid>
            <Grid item>
              <Typography variant="h5" align="center">
                <FormattedMessage
                  defaultMessage="Something went wrong with your transfer. Try again later."
                  id="pqiVfp"
                  description="Fetching document modal, error."
                />
              </Typography>
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </ControlFlowBaseDialog>
  );
}
