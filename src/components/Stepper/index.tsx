import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  createTheme,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { RequestState } from '../../store/slices/processesSlice';
import { getProcessByRequestId } from '../../util/oak/egendata';
import { RootState } from '../../store/store';
import {
  Arrow,
  CheckIcon,
  StepOneIcon,
  StepOneActiveIcon,
  StepTwoIcon,
  StepTwoActiveIcon,
} from './icons';

type Props = {
  requestId: string,
  landing?: boolean,
};

function Stepper({ requestId, landing }: Props) {
  const rootState = useSelector((state: RootState) => state);
  const [status, setStatus] = useState<RequestState>('void');

  useEffect(() => {
    setStatus(getProcessByRequestId(rootState, requestId).state);
  }, [rootState, requestId]);

  let stepOne;
  if (!landing && status === 'received') {
    stepOne = (<StepOneActiveIcon />);
  } else if (!landing && status in ['fetching', 'available', 'shared']) {
    stepOne = (<CheckIcon />);
  } else {
    stepOne = (<StepOneIcon />);
  }

  let stepTwo;
  if (!landing && status === 'available') {
    stepTwo = (<StepTwoActiveIcon />);
  } else if (!landing && status === 'shared') {
    stepTwo = (<CheckIcon />);
  } else {
    stepTwo = (<StepTwoIcon />);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <ThemeProvider theme={createTheme({
        palette: {
          text: {
            primary: '#FFFFFF',
            secondary: '#ACACAC',
          },
          background: {
            paper: '#2D43A5',
          },
        },
        components: {
          MuiSvgIcon: {
            styleOverrides: {
              root: {
                height: '32px',
                width: '32px',
              },
            },
          },
        },
      })}
      >
        <Paper elevation={0} sx={{ borderRadius: '16px' }}>
          <Container sx={{ paddingTop: 2, paddingBottom: 2 }}>
            {landing && (<Typography variant="h6">Egendata</Typography>)}

            <Grid container spacing={0}>
              <Grid item sx={{ flexGrow: 1 }} />
              <Grid item>
                { stepOne }
              </Grid>
              <Grid item sx={{ flexBasis: 0, flexGrow: 2, alignSelf: 'center' }}>
                <Box textAlign="center">
                  <Arrow />
                </Box>
              </Grid>
              <Grid item>
                { stepTwo }
              </Grid>
              <Grid item sx={{ flexGrow: 1 }} />
            </Grid>

            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Typography align="center">
                  <FormattedMessage id="stepper_get_data" />
                </Typography>
                <Typography align="center" fontSize="small">
                  <FormattedMessage id="stepper_get_data_description" />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="center">
                  <FormattedMessage id="stepper_share_data" />
                </Typography>
                <Typography align="center" fontSize="small">
                  <FormattedMessage id="stepper_share_data_description" />
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}

Stepper.defaultProps = { landing: false };

export default Stepper;
