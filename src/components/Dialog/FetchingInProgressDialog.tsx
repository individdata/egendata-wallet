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
import { FormEvent, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { RequestState } from '../../types';
import ControlFlowBaseDialog from './ControlFlowBaseDialog';
import { CloseIcon, EmailIcon, ErrorIcon, OkIcon } from './icons';

type FetchingInProgressDialogProps = {
  state: RequestState;
  error: boolean;
  handleClose: () => void;
};

export default function FetchingInProgressDialog({ state, error, handleClose }: FetchingInProgressDialogProps) {
  const [email, setEmail] = useState('');

  function handleAddEmail() {
    console.log(`Adding email: ${email}`);
  }

  return (
    <ControlFlowBaseDialog canBeClosed>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {['timeout', 'error'].includes(state) && (
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
        )}
      </DialogTitle>
      <DialogContent>
        {state === 'fetching' && !error && (
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
        {state === 'available' && !error && (
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
        {state === 'timeout' && !error && (
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
        {error && (
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
