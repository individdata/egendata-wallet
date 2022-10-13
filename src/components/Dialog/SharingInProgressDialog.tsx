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
import { useIntl, FormattedMessage } from 'react-intl';
import ControlFlowBaseDialog from './ControlFlowBaseDialog';
import { CloseIcon, EmailIcon, ErrorIcon, OkIcon } from './icons';

type ShareState = 'sharing' | 'success' | 'error';

type SharingInProgressDialogProps = {
  requestState: any;
  error: boolean;
};

export default function SharingInProgressDialog({ requestState, error }: SharingInProgressDialogProps) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<ShareState>('sharing');

  setTimeout(() => {
    if (state === 'sharing') {
      setState('error');
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
      <DialogContent>
        {state === 'sharing' && (
          <Box marginY={8}>
            <Typography variant="h5" align="center" marginBottom={2}>
              <FormattedMessage defaultMessage="Sharing..." id="sg8aJi" description="Sharing document modal." />
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
                defaultMessage="Your unemployement certificate is now being shared with BNP Paribas."
                id="CRXT3O"
                description="Sharing document modal, successful."
              />
            </Typography>
            <Typography>
              <FormattedMessage
                defaultMessage="You can always revoke your consent under Consents."
                id="UCFPOA"
                description="Sharing document modal, successful information."
              />
            </Typography>
            <Typography>
              <FormattedMessage
                defaultMessage="Add your email address to get notified when further actions are needed."
                id="Z35aBz"
                description="Sharing document modal, get notified by email."
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
                  defaultMessage="Something went wrong when sharing your document. Try again later."
                  id="/+PMp+"
                  description="Sharing document modal, error."
                />
              </Typography>
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </ControlFlowBaseDialog>
  );
}
